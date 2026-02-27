import Database from "better-sqlite3";
import path from "path";

let _db: any = null;

export function getDb() {
  if (!_db) {
    _db = new Database("printflow.db");
    _db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT,
        full_name TEXT,
        company TEXT,
        avatar_url TEXT
      );

      CREATE TABLE IF NOT EXISTS models (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        name TEXT,
        file_size TEXT,
        upload_date TEXT,
        status TEXT,
        material TEXT,
        volume TEXT,
        preview_url TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
      );

      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        order_number TEXT UNIQUE,
        date TEXT,
        total REAL,
        status TEXT,
        payment_status TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
      );

      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        sender TEXT,
        content TEXT,
        timestamp TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
      );
    `);
  }
  return _db;
}
