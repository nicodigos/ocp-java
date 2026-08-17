import { DatabaseSync } from "node:sqlite";

const database = new DatabaseSync("java21-review.sqlite", { readOnly: true });
const table = database
  .prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'answers'")
  .get();
if (!table) throw new Error("The answers table is missing");

const invalidRows = database
  .prepare(`
    SELECT COUNT(*) AS count
    FROM answers
    WHERE chapter NOT BETWEEN 1 AND 14
       OR question < 1
       OR correct NOT IN (0, 1)
  `)
  .get();
if (invalidRows.count !== 0) throw new Error("The database contains invalid answer rows");

const total = database.prepare("SELECT COUNT(*) AS count FROM answers").get().count;
database.close();
console.log(`SQLite verified: answers table is valid with ${total} saved answer(s)`);
