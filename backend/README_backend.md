# Backend API — Asyl Edvibe Worksheets

## Endpoints

All responses are JSON.

### Public

- `GET /api/worksheets?level=A1&search=...` — List worksheets (filtered)
- `GET /api/worksheets/:id` — Get worksheet metadata
- `GET /api/worksheets/:id/preview` — Stream PDF for browser preview
- `GET /api/worksheets/:id/download` — Increment download count and stream PDF

### Admin

- `POST /api/admin/login` — Login (body: `{ username, password }`)
- `POST /api/admin/upload` — Upload worksheet (PDF+metadata)
- `PUT /api/admin/worksheets/:id` — Edit metadata
- `DELETE /api/admin/worksheets/:id` — Delete worksheet
- `GET /api/admin/stats/top` — Top 10 worksheets by downloads
- `GET /api/admin/stats/overview` — Download stats by level

## Example curl commands

List worksheets:
```bash
curl http://localhost:5000/api/worksheets