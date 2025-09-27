const express = require('express');
const router = express.Router();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(path.resolve(__dirname, '../worksheets.db'));

router.get('/', (req, res) => {
  const { level, search } = req.query;
  let sql = "SELECT id, title, level, topic, tags, downloads FROM worksheets";
  const params = [];
  const conditions = [];
  if (level) {
    conditions.push("level = ?");
    params.push(level);
  }
  if (search) {
    conditions.push("title LIKE ?");
    params.push(`%${search}%`);
  }
  if (conditions.length) {
    sql += " WHERE " + conditions.join(" AND ");
  }
  sql += " ORDER BY downloads DESC, created_at DESC";
  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json({ worksheets: rows });
  });
});

router.get('/:id', (req, res) => {
  db.get("SELECT * FROM worksheets WHERE id = ?", [req.params.id], (err, row) => {
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  });
});

router.get('/:id/preview', (req, res) => {
  db.get("SELECT filename, level FROM worksheets WHERE id = ?", [req.params.id], (err, row) => {
    if (!row) return res.status(404).json({ error: "Not found" });
    const filePath = path.resolve(__dirname, `../uploads/${row.level}/${row.filename}`);
    res.sendFile(filePath);
  });
});

router.get('/:id/download', (req, res) => {
  db.get("SELECT filename, level FROM worksheets WHERE id = ?", [req.params.id], (err, row) => {
    if (!row) return res.status(404).json({ error: "Not found" });
    const filePath = path.resolve(__dirname, `../uploads/${row.level}/${row.filename}`);
    db.run("UPDATE worksheets SET downloads = downloads + 1 WHERE id = ?", [req.params.id], function (err) {
      if (err) return res.status(500).json({ error: "Failed to increment download" });
      res.download(filePath, row.filename);
    });
  });
});

module.exports = router;