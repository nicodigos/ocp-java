import { createReadStream, existsSync, statSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
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

const env = parseEnv(await readFile(resolve(projectRoot, ".env"), "utf8"));
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
