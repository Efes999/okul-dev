# Sprint 7 — 5 commit kontrolü

| # | Kod değişikliği | Commit mesajı | Kontrol |
|---|---|---|---|
| 1 | `src/app.js`, `src/server.js`, `package.json`, `.gitignore`, `.env.example` | `feat: initialize Express backend` | `GET /health` → 200 |
| 2 | `src/data/events.js`, liste controller/route, `app.js` router | `feat: add event data and list endpoint` | `GET /events` → 6 |
| 3 | ID controller/route; 404 | `feat: add event detail endpoint` | `GET /events/event-2` → 200, `/yok` → 404 |
| 4 | POST controller/route, zorunlu alan kontrolü | `feat: add event creation endpoint` | geçerli POST 201, eksik POST 400 |
| 5 | Postman collection, README, otomatik test, başlatıcı | `test: add Postman collection and API docs` | 6 Postman isteği, `npm test` |

Her adımda yalnızca o aşamanın dosyalarını repoya ekleyin. Bir tek toplu commit yerine bu beş checkpoint'i ayrı ayrı oluşturun.
