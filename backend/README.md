# Kampüs Etkinlikleri | Sprint 7 — Express REST API

**Geliştirici:** Efe SARIHAN  
**Öğrenci numarası:** 2416501081  
**Kapsam:** Web Programlama / Sprint 7  
**Teknolojiler:** Node.js (ES Modules), Express, dotenv, cors, Postman

## Proje özeti

Önceki Sprint'lerde geliştirilmiş **React frontend** korunur. Aynı Git deposundaki `backend/` klasörü, etkinlikleri JSON üzerinden sunan **bağımsız** bir Express uygulamasıdır. Bu Sprint'te frontend ve backend birbirine bağlanmaz. **Veriler RAM'dedir:** POST ile eklenen kayıtlar sunucu yeniden başlatılınca silinir. MongoDB, PATCH, DELETE ve kalıcı depolama bu Sprint'in kapsamında değildir.

## Kurulum (repo kökünden)

```bash
cd backend
npm install
cp .env.example .env  # Windows Git Bash için; .env yerelde kalır
npm run dev
```

Windows PowerShell ile başlatırken npm engelleniyorsa `npm.cmd install`, `npm.cmd run dev` kullanabilirsiniz. Sunucu: `http://localhost:3000`.

Alternatif üretim komutu: `npm start`. Kod kontrolleri için `npm test` (Node 20+).

## REST API sözleşmesi

| Metot | Adres | İşlev | Başarı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/health` | Sunucu ve öğrenci bilgisi | 200 | — | Sprint 7 |
| GET | `/events` | Altı etkinlik | 200 | — | Sprint 7 |
| GET | `/events?category=Atölye` | Kategori filtresi | 200 | — | Ek filtre |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Sprint 7 |
| POST | `/events` | Yeni etkinlik oluşturma | 201 | 400 | Sprint 7 |
| PATCH | `/events/:id` | Güncelleme | 200 | 400 / 404 | **Sprint 9** |
| DELETE | `/events/:id` | Silme | 204 | 404 | **Sprint 9** |

Tüm hata yanıtları aynı yapıda gönderilir:

```json
{ "error": { "message": "Event not found" } }
```

## Yanıt örnekleri

**GET `/health` → 200**

```json
{ "status": "ok", "time": "2026-11-11T00:00:00.000Z", "student": "2416501081" }
```

> `time`, sunucunun istek anında ürettiği gerçek ISO zamanıdır; yukarıdaki yalnızca biçim örneğidir.

**GET `/events` → 200:** Başlangıçta `event-1` ... `event-6` kayıtlarını içeren JSON dizisi. Kayıtlar eski frontend'deki özgün seminer ve atölyelerden aktarılmıştır. `date` alanları REST için `YYYY-MM-DD` biçimindedir.

**GET `/events/event-2` → 200:** `Robotik Atölyesi` JSON nesnesi.

**GET `/events/yok` → 404:** `{ "error": { "message": "Event not found" } }`.

**POST `/events` → 201:** JSON gövdesinde en az `title`, `category` ve `date` gerekir. Eksikse `400` döner.

```json
{
  "title": "Git Atölyesi",
  "category": "Atölye",
  "date": "2026-12-01",
  "capacity": 30,
  "time": "14:00",
  "location": "Mühendislik Laboratuvarı",
  "description": "Sürüm kontrolü ve ekip çalışması atölyesi."
}
```

Başarılı POST yeni `id` alanını döndürür; ardından GET `/events` 7 kayıt gösterir. Eksik veri örneği `{ "title": "Yalnızca başlık" }` → 400:

```json
{ "error": { "message": "title, category and date are required" } }
```

## Dosya yapısı

```text
kampus-etkinlik/
├── frontend/                      # Önceki Sprint — değiştirilmedi
└── backend/
    ├── src/
    │   ├── app.js                 # Express + middleware + health
    │   ├── server.js              # dotenv + PORT + listen
    │   ├── routes/event-routes.js # endpoint eşleştirme
    │   ├── controllers/event-controller.js
    │   └── data/events.js        # kullanıcının 6 etkinliği
    ├── requests/kampus-api.json   # 6 Postman isteği
    ├── tests/                    # npm test
    ├── .env.example
    ├── .gitignore
    ├── package.json
    └── README.md
```

## Postman testleri

`backend/requests/kampus-api.json` dosyasını Postman'de **Import** ile açın. Collection içindeki istekleri sırasıyla gönderin. Her birinin `Tests` sekmesinde beklenen durum kodu ve JSON koşulları bulunur. `{{baseUrl}}` değişkeninin varsayılan değeri `http://localhost:3000`'dir.

| Sıra | İstek | Beklenen |
|---|---|---|
| 1 | GET `/health` | 200 + student 2416501081 |
| 2 | GET `/events` | 200 + 6 kayıt |
| 3 | GET `/events/event-2` | 200 + event-2 |
| 4 | GET `/events/yok` | 404 + error |
| 5 | POST `/events` geçerli JSON | 201 + yeni id |
| 6 | POST `/events` yalnız title | 400 + error |

**Not:** POST isteği aynı sunucu oturumunda ikinci kez çalıştırılırsa listede 8, 9… kayıt olabilir. Altı isteği baştan sınamak için sunucuyu yeniden başlatın.

## Kontrol / güvenlik

- `backend/.env` ve `backend/node_modules/` `.gitignore` ile korunur; repoya eklenmemelidir.
- `.env.example` gerçek değerleri ifşa etmeden port ayarını gösterir.
- CORS etkinleştirilmiştir; port 5173'teki React frontend'in sonraki Sprint'te istekte bulunması mümkün olacaktır.
- Her istek uygun HTTP kodu ve JSON yanıtı döndürür.
- POST doğrulaması şu an Sprint 7 sözleşmesindeki **üç zorunlu alan** içindir. Kapsamlı form doğrulama ileride genişletilebilir.
- Gerçek API çalışma testi için `npm install` gereklidir. `npm test`, Express yüklemeden controller ve dosya yapısını doğrular.

## 5 anlamlı Git commit'i

1. `feat: initialize Express backend`
2. `feat: add event data and list endpoint`
3. `feat: add event detail endpoint`
4. `feat: add event creation endpoint`
5. `test: add Postman collection and API docs`

Tek commit'e sıkıştırmayın. Repo kökünde `git log -5 --oneline` ve `git status` çıktısını kontrol edin. `sprint-07` etiketi son commit'e uygulanır. GitHub gönderimi ve ders portalına repo adresi eklenmesi öğrencinin hesabında yapılmalıdır. **Backend bu Sprint'te Vercel'e deploy edilmez.**
