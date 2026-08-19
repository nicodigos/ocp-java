import pg from "pg";

let pool;

function database() {
  if (pool) return pool;
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured");
  const url = new URL(process.env.DATABASE_URL);
  pool = new pg.Pool({
    host: url.hostname,
    port: Number(url.port || 5432),
    database: url.pathname.slice(1) || "postgres",
    user: decodeURIComponent(url.username),
    password: process.env.DATABASE_PASSWORD || decodeURIComponent(url.password),
    ssl: { rejectUnauthorized: false },
    max: 3,
  });
  return pool;
}

const reply = (statusCode, value) => ({ statusCode, headers: { "Content-Type": "application/json; charset=utf-8" }, body: JSON.stringify(value) });

function answer(value) {
  const chapter = Number(value.chapter);
  const question = Number(value.question);
  if (!Number.isInteger(chapter) || chapter < 1 || chapter > 14) throw new Error("Invalid chapter");
  if (!Number.isInteger(question) || question < 1) throw new Error("Invalid question");
  if (!Array.isArray(value.selected) || !value.selected.every((item) => /^[A-H]$/.test(item))) throw new Error("Invalid selection");
  if (typeof value.correct !== "boolean") throw new Error("Invalid result");
  return { chapter, question, selected: value.selected, correct: value.correct };
}

function flashcardRating(value) {
  const item = {
    collection: String(value.collection || ""), deck: String(value.deck || ""), cardId: String(value.cardId || ""),
    rating: String(value.rating || ""),
  };
  if (!/^(java|g1)$/.test(item.collection)) throw new Error("Invalid collection");
  if (!/^[\w-]{1,40}$/.test(item.deck) || !/^[\w-]{1,60}$/.test(item.cardId)) throw new Error("Invalid card identifier");
  if (!/^(again|known)$/.test(item.rating)) throw new Error("Invalid rating");
  return item;
}

export async function handler(event) {
  try {
    const db = database();
    const method = event.httpMethod;
    const route = event.path.replace(/^\/\.netlify\/functions\/api/, "").replace(/^\/api/, "");
    const body = JSON.parse(event.body || "{}");

    if (route === "/progress" && method === "GET") {
      const result = await db.query("SELECT chapter, question, selected, correct FROM public.answers ORDER BY chapter, question");
      const progress = {};
      for (const row of result.rows) {
        progress[`chapter-${row.chapter}`] ||= {};
        progress[`chapter-${row.chapter}`][row.question] = { selected: row.selected, correct: row.correct };
      }
      return reply(200, progress);
    }
    if (route === "/progress" && method === "PUT") {
      const item = answer(body);
      await db.query(`INSERT INTO public.answers (chapter, question, selected, correct, updated_at) VALUES ($1,$2,$3,$4,now())
        ON CONFLICT (chapter,question) DO UPDATE SET selected=excluded.selected,correct=excluded.correct,updated_at=now()`,
      [item.chapter, item.question, item.selected, item.correct]);
      return reply(200, { saved: true });
    }
    if (route === "/progress" && method === "DELETE") {
      await db.query("DELETE FROM public.answers");
      return reply(200, { cleared: true });
    }
    if (route === "/progress/import" && method === "POST") {
      for (const [chapterKey, questions] of Object.entries(body.progress || {})) {
        for (const [question, result] of Object.entries(questions)) {
          const item = answer({ chapter: Number(chapterKey.replace("chapter-", "")), question: Number(question), ...result });
          await db.query(`INSERT INTO public.answers (chapter, question, selected, correct, updated_at) VALUES ($1,$2,$3,$4,now())
            ON CONFLICT (chapter,question) DO NOTHING`, [item.chapter, item.question, item.selected, item.correct]);
        }
      }
      return reply(200, { imported: true });
    }
    if (route === "/flashcards/progress" && method === "GET") {
      const collection = event.queryStringParameters?.collection || "";
      if (!/^(java|g1)$/.test(collection)) throw new Error("Invalid collection");
      const result = await db.query("SELECT deck, card_id, mastery, seen_count, due_order, learned FROM public.flashcard_progress WHERE collection=$1", [collection]);
      return reply(200, Object.fromEntries(result.rows.map((row) => [`${row.deck}:${row.card_id}`, {
        mastery: row.mastery, seenCount: row.seen_count, dueOrder: Number(row.due_order), learned: row.learned,
      }])));
    }
    if (route === "/flashcards/rate" && method === "POST") {
      const item = flashcardRating(body);
      const learned = item.rating === "known";
      const result = await db.query(`INSERT INTO public.flashcard_progress (collection,deck,card_id,mastery,seen_count,due_order,learned,updated_at)
        VALUES ($1,$2,$3,$4,1,1,$5,now()) ON CONFLICT (collection,deck,card_id) DO UPDATE SET
        mastery=excluded.mastery,seen_count=public.flashcard_progress.seen_count+1,
        due_order=public.flashcard_progress.due_order+1,learned=excluded.learned,updated_at=now()
        RETURNING mastery,seen_count,due_order,learned`,
      [item.collection, item.deck, item.cardId, learned ? 3 : 0, learned]);
      const row = result.rows[0];
      return reply(200, { mastery: row.mastery, seenCount: row.seen_count, dueOrder: Number(row.due_order), learned: row.learned });
    }
    if (route === "/flashcards/progress" && method === "DELETE") {
      const collection = event.queryStringParameters?.collection || "";
      const deck = event.queryStringParameters?.deck || "";
      if (!/^(java|g1)$/.test(collection) || !/^[\w-]{1,40}$/.test(deck)) throw new Error("Invalid deck");
      await db.query("DELETE FROM public.flashcard_progress WHERE collection=$1 AND deck=$2", [collection, deck]);
      return reply(200, { cleared: true });
    }
    return reply(404, { error: "Not found" });
  } catch (error) {
    return reply(400, { error: error.message });
  }
}
