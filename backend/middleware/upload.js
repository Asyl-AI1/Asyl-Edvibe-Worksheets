// Multer config for PDF upload (10MB max, PDF only, safe filename)

const multer = require('multer');
const path = require('path');
const sanitize = require('sanitize-filename');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const level = req.body.level;
    if (!level || !["A1","A2","B1","B2","C1","C2"].includes(level)) {
      return cb(new Error("Invalid CEFR level"), null);
    }
    cb(null, path.join(__dirname, `../uploads/${level}`));
  },
  filename: function (req, file, cb) {
    let name = sanitize(file.originalname.replace(/\s+/g, "-"));
    cb(null, name);
  }
});

function fileFilter (req, file, cb) {
  if (file.mimetype !== "application/pdf") {
    cb(new Error("Only PDF files allowed"), false);
  } else {
    cb(null, true);
  }
}

module.exports = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter
});