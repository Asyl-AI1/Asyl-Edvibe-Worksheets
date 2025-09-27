const request = require("supertest");
const express = require("express");
const session = require('express-session');
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const worksheetsRouter = require("../routes/worksheets");
const adminRouter = require("../routes/admin");

const app = express();
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'test',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true }
}));
app.use('/api/worksheets', worksheetsRouter);
app.use('/api/admin', adminRouter);

describe("Worksheets API", () => {
  it("lists worksheets", async () => {
    const res = await request(app).get("/api/worksheets");
    expect(res.statusCode).toBe(200);
    expect(res.body.worksheets).toBeInstanceOf(Array);
  });

  it("increments download count", async () => {
    // assumes seeded worksheet with id = 1
    const before = await request(app).get("/api/worksheets/1");
    const downloadsBefore = before.body.downloads;
    await request(app).get("/api/worksheets/1/download");
    const after = await request(app).get("/api/worksheets/1");
    expect(after.body.downloads).toBe(downloadsBefore + 1);
  });
});