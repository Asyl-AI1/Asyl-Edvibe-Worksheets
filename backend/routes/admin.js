const express = require('express');
const router = express.Router();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(path.resolve(__dirname, '../worksheets.db'));
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/auth');

// Login (session-based)
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    req.session.isAdmin = true;
    res.json({ success: true });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// Upload worksheet
router.post('/upload', authMiddleware, upload.single('pdf'), (req, res) => {
  const { title, level, topic, tags } = req.body;
  if (!req.file || !title || !level) {
    return res.status(400).json({ error: "Missing fields or file" });
  }
  db.run(
    "INSERT INTO worksheets (title, filename, filepath, level, topic, tags, downloads) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      title,
      req.file.filename,
      `/uploads/${level}/${req.file.filename}`,
      level,
      topic || "",
      tags || "",
      0
    ],
    function (err) {
      if (err) return res.status(500).json({ error: "DB insert error" });
      res.json({ id: this.lastID });
    }
  );
});

// Edit worksheet metadata
router.put('/worksheets/:id', authMiddleware, (req, res) => {
  const { title, topic, tags, level } = req.body;
  db.run(
    "UPDATE worksheets SET title = ?, topic = ?, tags = ?, level = ? WHERE id = ?",
    [title, topic, tags, level, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: "DB update error" });
      res.json({ updated: true });
    }
  );
});

// Delete worksheet
router.delete('/worksheets/:id', authMiddleware, (req, res) => {
  db.get("SELECT filename, level FROM worksheets WHERE id = ?", [req.params.id], (err, row) => {
    if (!row) return res.status(404).json({ error: "Not found" });
    db.run("DELETE FROM worksheets WHERE id = ?", [req.params.id], function (err) {
      if (err) return res.status(500).json({ error: "DB delete error" });
      // Remove file (best-effort)
      const filePath = path.resolve(__dirname, `../uploads/${row.level}/${row.filename}`);
      require('fs').unlink(filePath, () => {});
      res.json({ deleted: true });
    });
  });
});

// Top 10 by downloads
router.get('/stats/top', authMiddleware, (req, res) => {
  db.all("SELECT id, title, downloads FROM worksheets ORDER BY downloads DESC LIMIT 10", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json({ top: rows });
  });
});

// Overview stats
router.get('/stats/overview', authMiddleware, (req, res) => {
  db.all("SELECT level, COUNT(*) as count, SUM(downloads) as downloads FROM worksheets GROUP BY level", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json({ overview: rows });
  });
});

module.exports = router;