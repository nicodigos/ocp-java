import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { DatabaseSync } from "node:sqlite";
import pg from "pg";

if (!existsSync("java21-review.sqlite")) {
  console.log("No local SQLite database found; nothing to migrate");
  process.exit(0);
}

const env = Object.fromEntries(
  (await readFile(".env", "utf8"))
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#") && line.includes("="))
    .map((line) => {
      const separator = line.indexOf("=");
      return [line.slice(0, separator).trim(), line.slice(separator + 1).trim().replace(/^["']|["']$/g, "")];
    })
);
const url = new URL(env.DATABASE_URL);
const client = new pg.Client({
  host: url.hostname,
  port: Number(url.port || 5432),
  database: url.pathname.slice(1) || "postgres",
  user: decodeURIComponent(url.username),
  password: env.DATABASE_PASSWORD || decodeURIComponent(url.password),
  ssl: { rejectUnauthorized: false },
});
const sqlite = new DatabaseSync("java21-review.sqlite", { readOnly: true });
const rows = sqlite.prepare("SELECT chapter, question, selected, correct FROM answers ORDER BY chapter, question").all();
sqlite.close();

await client.connect();
try {
  await client.query("BEGIN");
  for (const row of rows) {
    await client.query(
      `INSERT INTO public.answers (chapter, question, selected, correct, updated_at)
       VALUES ($1, $2, $3, $4, now())
       ON CONFLICT (chapter, question) DO UPDATE SET
         selected = excluded.selected,
         correct = excluded.correct,
         updated_at = now()`,
      [row.chapter, row.question, JSON.parse(row.selected), Boolean(row.correct)]
    );
  }
  await client.query("COMMIT");
  console.log(`Migrated ${rows.length} SQLite answer(s) to Supabase`);
} catch (error) {
  await client.query("ROLLBACK");
  throw error;
} finally {
  await client.end();
}
