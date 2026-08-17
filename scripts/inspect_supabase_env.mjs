import { readFile } from "node:fs/promises";

const lines = (await readFile(".env", "utf8")).split(/\r?\n/);
const databaseLine = lines.find((line) => /^\s*DATABASE_URL\s*=/.test(line));
const raw = databaseLine.split("=", 2)[1].trim().replace(/^["']|["']$/g, "");
const url = new URL(raw);
console.log(
  JSON.stringify({
    pooler: url.hostname.endsWith("pooler.supabase.com"),
    username: decodeURIComponent(url.username),
    port: url.port,
    passwordLength: decodeURIComponent(url.password).length,
    passwordLooksPlaceholder: /password|\[|\]/i.test(decodeURIComponent(url.password)),
  })
);
