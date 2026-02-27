import { getDb } from "../utils/db";

export default defineEventHandler(async (event) => {
  const db = getDb();
  return db.prepare("SELECT * FROM orders").all();
});
