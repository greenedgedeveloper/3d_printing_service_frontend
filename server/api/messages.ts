import { getDb } from "../utils/db";

export default defineEventHandler(async (event) => {
  const db = getDb();
  const method = getMethod(event);

  if (method === 'GET') {
    return db.prepare("SELECT * FROM messages").all();
  }

  if (method === 'POST') {
    const body = await readBody(event);
    const { content, sender } = body;
    db.prepare(`
      INSERT INTO messages (user_id, sender, content, timestamp)
      VALUES (?, ?, ?, ?)
    `).run(1, sender, content, new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    return { success: true };
  }
});
