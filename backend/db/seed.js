/**
 * Seed script for Asyl Edvibe Worksheets
 * Registers 'superhero-family-a1.pdf' in the DB if present.
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, '../../backend/worksheets.db');
const uploadsDir = path.resolve(__dirname, '../uploads/A1');
const pdfFilename = 'superhero-family-a1.pdf';
const pdfFilePath = path.join(uploadsDir, pdfFilename);

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS worksheets (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, filename TEXT NOT NULL, filepath TEXT NOT NULL, level TEXT CHECK(level IN ('A1','A2','B1','B2','C1','C2')) NOT NULL, topic TEXT, tags TEXT, downloads INTEGER DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)");

  if (fs.existsSync(pdfFilePath)) {
    db.get("SELECT id FROM worksheets WHERE filename = ?", [pdfFilename], (err, row) => {
      if (!row) {
        db.run(
          "INSERT INTO worksheets (title, filename, filepath, level, topic, tags, downloads) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            'Superhero Family',
            pdfFilename,
            `/uploads/A1/${pdfFilename}`,
            'A1',
            'Family',
            'hero, family',
            0
          ],
          function (err) {
            if (err) console.error('Seed insert error:', err);
            else console.log('Seeded superhero-family-a1.pdf');
          }
        );
      } else {
        console.log('Worksheet already seeded.');
      }
    });
  } else {
    console.log('PDF file not found. Place superhero-family-a1.pdf in backend/uploads/A1/');
  }
});

db.close();