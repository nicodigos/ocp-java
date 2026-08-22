import { createReadStream, existsSync, statSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { createPrivateKey, sign } from "node:crypto";
import { extname, resolve, sep } from "node:path";
import pg from "pg";

const projectRoot = resolve(import.meta.dirname);
const port = Number(process.env.PORT || 8890);

function parseEnv(text) {
  return Object.fromEntries(
    text.split(/\r?\n/).map((line) => line.trim()).filter((line) => line && !line.startsWith("#") && line.includes("=")).map((line) => {
      const separator = line.indexOf("=");
      return [line.slice(0, separator).trim(), line.slice(separator + 1).trim().replace(/^["']|["']$/g, "")];
    })
  );
}

const envPath = resolve(projectRoot, ".env");
const fileEnv = existsSync(envPath) ? parseEnv(await readFile(envPath, "utf8")) : {};
const env = { ...fileEnv, ...process.env };
const databaseUrl = new URL(env.DATABASE_URL);
const pool = new pg.Pool({
  host: databaseUrl.hostname,
  port: Number(databaseUrl.port || 5432),
  database: databaseUrl.pathname.slice(1) || "postgres",
  user: decodeURIComponent(databaseUrl.username),
  password: env.DATABASE_PASSWORD || decodeURIComponent(databaseUrl.password),
  ssl: { rejectUnauthorized: false },
  max: 5,
});

const generatorCooldowns = new Map();
let googleToken = null;

function base64Url(value) {
  return Buffer.from(value).toString("base64url");
}

function googleServiceAccount() {
  let account;
  try {
    account = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT_JSON || "");
  } catch {
    throw new Error("Question generator is not configured correctly");
  }
  if (!account?.client_email || !account?.private_key) throw new Error("Question generator is not configured correctly");
  return { ...account, private_key: String(account.private_key).replace(/\\n/g, "\n") };
}

async function googleAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  if (googleToken?.expiresAt > now + 60) return googleToken.value;
  const account = googleServiceAccount();
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64Url(JSON.stringify({
    iss: account.client_email,
    scope: "https://www.googleapis.com/auth/cloud-platform",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  }));
  const unsigned = `${header}.${claims}`;
  const signature = sign("RSA-SHA256", Buffer.from(unsigned), createPrivateKey(account.private_key)).toString("base64url");
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${signature}` }),
    signal: AbortSignal.timeout(20_000),
  });
  const payload = await response.json();
  if (!response.ok || !payload.access_token) throw new Error("Could not authenticate the question generator");
  googleToken = { value: payload.access_token, expiresAt: now + Number(payload.expires_in || 3600) };
  return googleToken.value;
}

async function chapterContext(chapters) {
  const [manifest, markdown] = await Promise.all([
    readFile(resolve(projectRoot, "assets/review-tests/index.json"), "utf8").then(JSON.parse),
    readFile(resolve(projectRoot, "assets/flashcards/ocp-java-21-flashcards.md"), "utf8"),
  ]);
  return chapters.map((chapter) => {
    const meta = manifest.find((item) => item.chapter === chapter);
    const section = markdown.match(new RegExp(`^## Chapter ${chapter}[^\\n]*\\n([\\s\\S]*?)(?=^## Chapter |^## Rapid Review)`, "m"))?.[1] || "";
    const notes = section.split(/\r?\n/).filter((line) => /^\| \d+ \|/.test(line)).join("\n").replace(/<img\b[^>]*>/gi, "").slice(0, 4_500);
    return `CHAPTER ${chapter}: ${meta?.title || "Unknown"}\n${notes}`;
  }).join("\n\n");
}

function validateGeneratedQuestion(value) {
  if (!value || typeof value.stem !== "string" || value.stem.trim().length < 10 || value.stem.length > 4_000) throw new Error("Gemini returned an invalid question");
  if (!Array.isArray(value.choices) || value.choices.length < 3 || value.choices.length > 6) throw new Error("Gemini returned invalid choices");
  const letters = value.choices.map((choice) => String(choice?.letter || ""));
  if (new Set(letters).size !== letters.length || !letters.every((letter, index) => letter === String.fromCharCode(65 + index))) throw new Error("Gemini returned invalid choice labels");
  if (!value.choices.every((choice) => typeof choice.text === "string" && choice.text.trim())) throw new Error("Gemini returned an empty choice");
  if (!Array.isArray(value.correct) || !value.correct.length || !value.correct.every((letter) => letters.includes(letter))) throw new Error("Gemini returned an invalid answer key");
  if (typeof value.explanation !== "string" || value.explanation.trim().length < 10) throw new Error("Gemini returned an invalid explanation");
  return {
    stem: value.stem.replace(/^```(?:java)?\s*$/gim, "").trim(),
    choices: value.choices.map((choice) => ({ letter: choice.letter, text: choice.text.trim() })),
    correct: [...new Set(value.correct)],
    multi: value.correct.length > 1,
    explanation: value.explanation.trim(),
  };
}

async function generateQuestion(chapters) {
  const accessToken = await googleAccessToken();
  const project = env.GOOGLE_CLOUD_PROJECT || googleServiceAccount().project_id;
  const location = env.GOOGLE_CLOUD_LOCATION || "global";
  const model = env.GEMINI_MODEL || "gemini-2.5-flash";
  const endpoint = `https://aiplatform.googleapis.com/v1/projects/${encodeURIComponent(project)}/locations/${encodeURIComponent(location)}/publishers/google/models/${encodeURIComponent(model)}:generateContent`;
  const context = await chapterContext(chapters);
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: "You write original OCP Java SE 21 exam-style questions. Use only the supplied chapter notes. Test reasoning, compilation, behavior, or rules; do not mention the notes. Create either one correct answer or multiple correct answers. Distractors must be plausible. Java snippets must be complete enough to evaluate. Return only the requested JSON." }] },
      contents: [{ role: "user", parts: [{ text: `Selected chapters: ${chapters.join(", ")}. Generate one new question that combines them when useful. Do not copy an existing review question verbatim.\n\nSTUDY NOTES\n${context}` }] }],
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          required: ["stem", "choices", "correct", "explanation"],
          properties: {
            stem: { type: "string" },
            choices: { type: "array", minItems: 3, maxItems: 6, items: { type: "object", required: ["letter", "text"], properties: { letter: { type: "string" }, text: { type: "string" } } } },
            correct: { type: "array", minItems: 1, items: { type: "string" } },
            explanation: { type: "string" },
          },
        },
      },
    }),
    signal: AbortSignal.timeout(45_000),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(`Gemini request failed (${response.status})`);
  const text = payload.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("").trim();
  if (!text) throw new Error("Gemini returned no question");
  return validateGeneratedQuestion(JSON.parse(text));
}

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

function json(response, status, value) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(value));
}

async function readJson(request) {
  let body = "";
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 1_000_000) throw new Error("Request is too large");
  }
  return JSON.parse(body || "{}");
}

function validateAnswer(value) {
  const chapter = Number(value.chapter);
  const question = Number(value.question);
  const selected = value.selected;
  const correct = value.correct;
  if (!Number.isInteger(chapter) || chapter < 1 || chapter > 14) throw new Error("Invalid chapter");
  if (!Number.isInteger(question) || question < 1) throw new Error("Invalid question");
  if (!Array.isArray(selected) || !selected.every((item) => /^[A-H]$/.test(item))) throw new Error("Invalid selection");
  if (typeof correct !== "boolean") throw new Error("Invalid result");
  return { chapter, question, selected, correct };
}

function validateFlashRating(value) {
  const collection = String(value.collection || "");
  const deck = String(value.deck || "");
  const cardId = String(value.cardId || "");
  const rating = String(value.rating || "");
  if (!/^(java|g1)$/.test(collection)) throw new Error("Invalid collection");
  if (!/^[\w-]{1,40}$/.test(deck) || !/^[\w-]{1,60}$/.test(cardId)) throw new Error("Invalid card identifier");
  if (!/^(again|known)$/.test(rating)) throw new Error("Invalid rating");
  return { collection, deck, cardId, rating };
}

function progressFromRows(rows) {
  const progress = {};
  for (const row of rows) {
    const chapterKey = `chapter-${row.chapter}`;
    progress[chapterKey] ||= {};
    progress[chapterKey][String(row.question)] = {
      selected: row.selected,
      correct: row.correct,
    };
  }
  return progress;
}

async function handleApi(request, response, pathname) {
  if (pathname === "/api/flashcards/progress" && request.method === "GET") {
    const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
    const collection = url.searchParams.get("collection");
    if (!/^(java|g1)$/.test(collection || "")) throw new Error("Invalid collection");
    const result = await pool.query(
      "SELECT deck, card_id, mastery, seen_count, due_order, learned FROM public.flashcard_progress WHERE collection = $1",
      [collection]
    );
    const progress = Object.fromEntries(result.rows.map((row) => [`${row.deck}:${row.card_id}`, {
      mastery: row.mastery, seenCount: row.seen_count, dueOrder: Number(row.due_order), learned: row.learned,
    }]));
    json(response, 200, progress);
    return true;
  }
  if (pathname === "/api/flashcards/rate" && request.method === "POST") {
    const item = validateFlashRating(await readJson(request));
    const learned = item.rating === "known";
    const result = await pool.query(
      `INSERT INTO public.flashcard_progress (collection, deck, card_id, mastery, seen_count, due_order, learned, updated_at)
       VALUES ($1, $2, $3, $4, 1, 1, $5, now())
       ON CONFLICT (collection, deck, card_id) DO UPDATE SET
         mastery = excluded.mastery,
         seen_count = public.flashcard_progress.seen_count + 1,
         due_order = public.flashcard_progress.due_order + 1,
         learned = excluded.learned,
         updated_at = now()
       RETURNING mastery, seen_count, due_order, learned`,
      [item.collection, item.deck, item.cardId, learned ? 3 : 0, learned]
    );
    const row = result.rows[0];
    json(response, 200, { mastery: row.mastery, seenCount: row.seen_count, dueOrder: Number(row.due_order), learned: row.learned });
    return true;
  }
  if (pathname === "/api/flashcards/progress" && request.method === "DELETE") {
    const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
    const collection = url.searchParams.get("collection");
    const deck = url.searchParams.get("deck");
    if (!/^(java|g1)$/.test(collection || "") || !/^[\w-]{1,40}$/.test(deck || "")) throw new Error("Invalid deck");
    await pool.query("DELETE FROM public.flashcard_progress WHERE collection = $1 AND deck = $2", [collection, deck]);
    json(response, 200, { cleared: true });
    return true;
  }
  if (pathname === "/api/progress" && request.method === "GET") {
    const result = await pool.query("SELECT chapter, question, selected, correct FROM public.answers ORDER BY chapter, question");
    json(response, 200, progressFromRows(result.rows));
    return true;
  }
  if (pathname === "/api/progress" && request.method === "PUT") {
    const answer = validateAnswer(await readJson(request));
    await pool.query(
      `INSERT INTO public.answers (chapter, question, selected, correct, updated_at)
       VALUES ($1, $2, $3, $4, now())
       ON CONFLICT (chapter, question) DO UPDATE SET
         selected = excluded.selected,
         correct = excluded.correct,
         updated_at = now()`,
      [answer.chapter, answer.question, answer.selected, answer.correct]
    );
    json(response, 200, { saved: true });
    return true;
  }
  if (pathname === "/api/progress/import" && request.method === "POST") {
    const { progress = {} } = await readJson(request);
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      for (const [chapterKey, questions] of Object.entries(progress)) {
        const chapter = Number(chapterKey.replace("chapter-", ""));
        for (const [question, result] of Object.entries(questions)) {
          const answer = validateAnswer({ chapter, question: Number(question), ...result });
          await client.query(
            `INSERT INTO public.answers (chapter, question, selected, correct, updated_at)
             VALUES ($1, $2, $3, $4, now())
             ON CONFLICT (chapter, question) DO UPDATE SET
               selected = excluded.selected,
               correct = excluded.correct,
               updated_at = now()`,
            [answer.chapter, answer.question, answer.selected, answer.correct]
          );
        }
      }
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
    json(response, 200, { imported: true });
    return true;
  }
  if (pathname === "/api/progress" && request.method === "DELETE") {
    await pool.query("DELETE FROM public.answers");
    json(response, 200, { cleared: true });
    return true;
  }
  if (pathname === "/api/questions/generate" && request.method === "POST") {
    const payload = await readJson(request);
    const chapters = [...new Set(Array.isArray(payload.chapters) ? payload.chapters.map(Number) : [])].sort((a, b) => a - b);
    if (!chapters.length || !chapters.every((chapter) => Number.isInteger(chapter) && chapter >= 1 && chapter <= 14)) throw new Error("Select at least one valid chapter");
    const client = String(request.headers["x-forwarded-for"] || request.socket.remoteAddress || "unknown").split(",")[0].trim();
    const now = Date.now();
    if ((generatorCooldowns.get(client) || 0) > now - 8_000) {
      response.setHeader("Retry-After", "8");
      json(response, 429, { error: "Please wait a few seconds before generating another question" });
      return true;
    }
    generatorCooldowns.set(client, now);
    json(response, 200, await generateQuestion(chapters));
    return true;
  }
  return false;
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
    if (url.pathname.startsWith("/api/")) {
      if (!(await handleApi(request, response, url.pathname))) json(response, 404, { error: "Not found" });
      return;
    }

    const relativePath = url.pathname === "/" ? "index.html" : decodeURIComponent(url.pathname.slice(1));
    const pathSegments = relativePath.split(/[\\/]/);
    const isPrivatePath = pathSegments.some((segment) => segment.startsWith("."))
      || /^(?:server\.mjs|package(?:-lock)?\.json|pnpm-lock\.yaml|java21-review\.sqlite(?:-shm|-wal)?)$/i.test(relativePath)
      || relativePath.startsWith("scripts/")
      || relativePath.startsWith("supabase/")
      || relativePath.startsWith("node_modules/");
    if (isPrivatePath) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }
    const filePath = resolve(projectRoot, relativePath);
    if (!filePath.startsWith(projectRoot + sep) || !existsSync(filePath) || !statSync(filePath).isFile()) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }
    response.writeHead(200, {
      "Content-Type": mimeTypes[extname(filePath).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-cache",
    });
    if (request.method === "HEAD") response.end();
    else createReadStream(filePath).pipe(response);
  } catch (error) {
    json(response, 400, { error: error.message });
  }
});

await pool.query("SELECT 1");
server.listen(port, () => {
  console.log(`Java 21 Review Lab: http://localhost:${port}`);
  console.log("Progress database: Supabase Postgres");
});

function shutdown() {
  server.close(() => {
    pool.end().finally(() => process.exit(0));
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
