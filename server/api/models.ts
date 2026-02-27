import { getDb } from "../utils/db";

export default defineEventHandler(async (event) => {
  const db = getDb();
  const method = getMethod(event);

  if (method === 'GET') {
    return db.prepare("SELECT * FROM models").all();
  }

  if (method === 'POST') {
    const body = await readBody(event);
    const { name, file_size, material, volume, preview_url } = body;
    const info = db.prepare(`
      INSERT INTO models (user_id, name, file_size, upload_date, status, material, volume, preview_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(1, name, file_size, new Date().toISOString().split('T')[0], 'Printable', material, volume, preview_url);
    return { id: info.lastInsertRowid };
  }
});
