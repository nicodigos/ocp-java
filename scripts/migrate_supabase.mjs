import { readFile, readdir } from "node:fs/promises";
import pg from "pg";

function parseEnv(text) {
  return Object.fromEntries(
    text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const separator = line.indexOf("=");
        const name = line.slice(0, separator).trim();
        const value = line.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
        return [name, value];
      })
  );
}

const env = parseEnv(await readFile(".env", "utf8"));
if (!env.DATABASE_URL) throw new Error("DATABASE_URL is missing from .env");
const databaseUrl = new URL(env.DATABASE_URL);

const migrationFiles = (await readdir("supabase/migrations"))
  .filter((file) => file.endsWith(".sql"))
  .sort();
const client = new pg.Client({
  host: databaseUrl.hostname,
  port: Number(databaseUrl.port || 5432),
  database: databaseUrl.pathname.slice(1) || "postgres",
  user: decodeURIComponent(databaseUrl.username),
  password: env.DATABASE_PASSWORD || decodeURIComponent(databaseUrl.password),
  ssl: { rejectUnauthorized: false },
});

await client.connect();
try {
  await client.query("begin");
  for (const file of migrationFiles) {
    await client.query(await readFile(`supabase/migrations/${file}`, "utf8"));
  }
  await client.query("commit");
  const result = await client.query(
    "select count(*)::int as count from public.answers"
  );
  console.log(`Supabase migrations applied; ${result.rows[0].count} saved answer(s)`);
} catch (error) {
  await client.query("rollback");
  throw error;
} finally {
  await client.end();
}
