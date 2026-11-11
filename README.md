# Kampüs Etkinlikleri

**Sprint 6 + Sprint 7 · Web Programlama Projesi**  
React, TypeScript, React Router ve Context API ile geliştirilen duyarlı (responsive) kampüs etkinlikleri arayüzü; Sprint 7 kapsamında eklenen Node.js/Express REST API ile aynı depoda sunulmaktadır.

**Geliştirici:** Efe SARIHAN · **Öğrenci No:** 2416501081  
**Teknolojiler:** React 19 · TypeScript 5 · Vite 7 · React Router 7 · Context API · Node.js · Express  
**Kaynak kod:** [GitHub — okul-dev](https://github.com/Efes999/okul-dev)  
**Canlı demo:** https://efesarihan-frontend.vercel.app/

> **Proje kapsamı:** Sprint 6'da geliştirilen frontend'e Sprint 7'de ayrı bir Express backend eklenmiştir. Frontend etkinlikleri React state'inde, backend ise örnek etkinlikleri sunucu belleğinde yönetir. İki katman henüz API üzerinden birbirine bağlanmamıştır; gerçek kullanıcı hesapları, kimlik doğrulama ve kalıcı veritabanı bulunmaz.

## İçindekiler

- [Proje hakkında](#proje-hakkında)
- [Temel özellikler](#temel-özellikler)
- [Teknoloji yığını](#teknoloji-yığını)
- [Kurulum ve çalıştırma](#kurulum-ve-çalıştırma)
- [Sayfalar ve yönlendirme](#sayfalar-ve-yönlendirme)
- [Proje yapısı](#proje-yapısı)
- [Mimari ve veri yönetimi](#mimari-ve-veri-yönetimi)
- [Sprint 7 — Backend API](#sprint-7--backend-api)
- [Form doğrulama kuralları](#form-doğrulama-kuralları)
- [Test ve kalite kontrol](#test-ve-kalite-kontrol)
- [Vercel dağıtımı](#vercel-dağıtımı)
- [Bilinen sınırlar](#bilinen-sınırlar)
- [Teslim bilgileri](#teslim-bilgileri)

## Proje hakkında

**Kampüs Etkinlikleri**, öğrencilerin seminer, atölye, söyleşi ve yarışmaları tek yerden inceleyebildiği; yönetim ekranında ise etkinlikleri ekleyip düzenleyebildiği veya silebildiği bir React uygulamasıdır. Sprint 5'te oluşturulan yeniden kullanılabilir bileşen mimarisi, Sprint 6'da gerçek URL yönlendirmeleri ve uygulama genelinde paylaşılan Context state ile genişletilmiştir.

Frontend başlangıçta **6 örnek etkinlik** gösterir. Etkinlik ekleme, güncelleme ve silme işlemleri bütün ilgili sayfalara anında yansır. Sayfa yenilendiğinde başlangıç verileri yeniden yüklenir; bu davranış ders yönergesinin istemci tarafı kapsamıyla uyumludur.

**Sprint 7** ile projeye sağlık kontrolü, etkinlik listeleme/filtreleme, ID ile detay getirme ve veri doğrulamalı etkinlik oluşturma işlemlerini sunan Express tabanlı bir REST API eklenmiştir.

## Temel özellikler

| Alan | Uygulanan özellik |
| --- | --- |
| Etkinlik keşfi | Ana sayfada iki etkinlik, tüm etkinlik listesi ve detay ekranları |
| Arama ve filtreleme | Metin araması ile kategori filtresinin birlikte kullanımı; boş sonuç mesajı |
| Yönetim | `/admin` üzerinden tablo, etkinlik ekleme, güncelleme ve silme |
| Silme güvenliği | Silme öncesinde `window.confirm()` ile kullanıcı onayı |
| Ortak veri | Context API sayesinde işlem sonrası ana sayfa, liste ve detaylarda senkron güncelleme |
| Form deneyimi | Controlled input yapısı, alan bazlı hata mesajları ve tekrar kullanılabilir etkinlik formu |
| Hesap ekranları | Giriş, kayıt ve şifremi unuttum için eğitim amaçlı form doğrulama ekranları |
| Yönlendirme | React Router ile 10 rota; geçersiz adreslerde 404 görünümü |
| Duyarlı tasarım | Dar ekranlarda yönetim tablosunun kart düzeninde gösterimi |
| Backend API (Sprint 7) | `GET` ve `POST` uç noktaları, kategori filtresi, 400/404 hata yanıtları |
| API testleri | Node.js ile otomatik testler ve Postman koleksiyonu |

## Teknoloji yığını

- **React 19:** Bileşen tabanlı kullanıcı arayüzü ve Hook'lar
- **TypeScript 5:** Etkinlik, kategori ve form veri tipleri
- **React Router 7:** `Routes`, `Route`, `Link`, `NavLink`, `useNavigate` ve `useParams`
- **Context API:** `EventsProvider` ve `useEvents()` ile ortak etkinlik state'i
- **Vite 7:** Geliştirme sunucusu ve üretim derlemesi
- **CSS:** Mobil uyumlu bileşen ve yönetim ekranı stilleri
- **Node.js + Express:** REST API, yönlendirme ve istek işleme
- **CORS ve dotenv:** Backend erişimi ve ortam değişkeni yapılandırması
- **Node.js test çalıştırıcısı:** Frontend ve backend için ayrı otomatik testler

## Kurulum ve çalıştırma

**Gereksinimler:** Node.js **22.12+** ve npm. Frontend ve backend, deponun kök dizininden ayrı terminallerde başlatılır.

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

Geliştirme sunucusu varsayılan olarak **http://localhost:5173/** adresinde açılır. Geliştirme boyunca terminal açık kalmalıdır. `frontend/index.html` dosyasını dosya gezgininden çift tıklayarak açmak yerine Vite sunucusunu kullanın.

**Windows PowerShell notu:** `npm.ps1 cannot be loaded` hatası alınırsa yürütme ilkesini değiştirmeden `npm` yerine `npm.cmd` kullanabilirsiniz:

```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

**Üretim derlemesi ve önizleme:**

```bash
npm run build
npm run preview
```

**Frontend otomatik testleri** (`frontend/` klasöründe):

```bash
npm test
```

**Backend (Sprint 7)** — ayrı bir terminalde, depo kökünden:

```bash
cd backend
npm install
npm run dev
```

Backend varsayılan olarak **http://localhost:3000** adresinde çalışır. Sunucu hazır olduğunda `http://localhost:3000/health` üzerinden `200 OK` yanıtı alınabilir. Gerekirse `backend/.env.example` örnek alınarak yerel `.env` dosyası oluşturulabilir; `.env` Git'e eklenmez.

## Sayfalar ve yönlendirme

`src/App.tsx` içerisinde 10 rota tanımlanmıştır:

| URL | React sayfası | İşlev |
| --- | --- | --- |
| `/` | `HomePage` | Ana sayfa, iki etkinlik |
| `/events` | `EventsPage` | Tüm etkinlikler, arama ve filtreleme |
| `/events/:id` | `EventDetailPage` | Seçilen etkinliğin bilgileri |
| `/login` | `LoginPage` | Demo giriş formu |
| `/register` | `RegisterPage` | Demo kayıt formu |
| `/forgot-password` | `ForgotPasswordPage` | Demo şifre sıfırlama formu |
| `/admin` | `AdminPage` | Etkinlik yönetim tablosu |
| `/admin/new` | `AddEventPage` | Yeni etkinlik oluşturma |
| `/admin/:id/edit` | `EditEventPage` | Etkinlik güncelleme |
| `*` | `NotFoundPage` | Tanımlanmamış adresler için 404 |

Etkinlik detayında `useParams()` URL'deki `id` değerini okur. İlgili etkinlik bulunamazsa uygun bulunamadı ekranı gösterilir. `Header`, aktif sayfanın başlığını ve tarayıcı sekmesinin `document.title` değerini günceller. Sayfa geçişlerinde `Link` ve aktif menü durumunda `NavLink` kullanılır.

## Proje yapısı

```text
kampus-etkinlik/
├── README.md
├── DENETIM-RAPORU.md
└── frontend/
    ├── public/
    │   ├── afis.svg
    │   └── favicon.svg
    ├── src/
    │   ├── components/
    │   │   ├── layout/        # Header, Navigation, Footer
    │   │   ├── events/        # EventCard, EventList, EventFilter, EventDetail, EventNotFound
    │   │   └── forms/         # EventForm
    │   ├── context/           # EventsContext
    │   ├── pages/             # 10 sayfa bileşeni
    │   ├── data/              # Başlangıç etkinlik verileri
    │   ├── types/             # CampusEvent ve EventFormData
    │   ├── utils/             # Tarih, filtreleme, doğrulama ve CRUD fonksiyonları
    │   ├── App.tsx            # Route tanımları
    │   ├── App.css
    │   ├── index.css
    │   └── main.tsx           # Router ve Provider kurulumu
    ├── tests/                 # Node.js test dosyaları
    ├── package.json
    ├── vite.config.ts
    └── vercel.json            # SPA yönlendirme kuralı
```

Sprint 7 ile eklenen backend dizini:

```text
backend/
├── src/
│   ├── app.js                 # Express uygulaması
│   ├── server.js              # Sunucu başlangıcı
│   ├── controllers/           # İstek işleyicileri
│   ├── routes/                # API rotaları
│   └── data/                  # Bellekte tutulan örnek etkinlikler
├── requests/
│   └── kampus-api.json        # Postman koleksiyonu
├── tests/                     # Otomatik API ve yapı testleri
├── .env.example
├── package.json
└── README.md                  # Backend kullanım notları
```

## Mimari ve veri yönetimi

Uygulama, **üst seviyede ortak state / alt seviyede tekrar kullanılabilir bileşenler** yaklaşımıyla tasarlanmıştır.

`main.tsx` içinde Router ve `EventsProvider` uygulamayı sarar. Bileşenler `useEvents()` ile şu özelliklere ulaşır:

| Context öğesi | Görevi |
| --- | --- |
| `events` | Güncel etkinlik dizisi |
| `addEvent(data)` | Yeni etkinlik ekler |
| `updateEvent(id, data)` | İlgili etkinliği günceller |
| `deleteEvent(id)` | İlgili etkinliği siler |

Veri dönüşümleri `src/utils/event-operations.ts` içinde saf fonksiyonlara ayrılmıştır. Eklemede yeni dizi oluşturulur, güncellemede `map()`, silmede `filter()` kullanılır. Mevcut state dizisi doğrudan değiştirilmez. Böylece React güncellenen veriyi yeniden render eder.

**Örnek kullanıcı akışı:** `/admin/new` ekranında formu doldur → kaydet → `/admin` ekranına dön → etkinliğin `/events` ve ana sayfada güncellenen listelere yansıdığını gör.

Frontend'deki Context API veri yönetimi ile Sprint 7 backend'inin bellek içi veri yönetimi **birbirinden bağımsızdır**. Bu nedenle API'ye `POST` ile eklenen etkinlik, mevcut frontend listesine otomatik yansımaz.

## Sprint 7 — Backend API

Sprint 7 backend'i, Express üzerinde `http://localhost:3000` adresinden erişilebilen temel bir etkinlik REST API'sidir. Uç noktalar aşağıda özetlenmiştir:

| Yöntem | Uç nokta | İşlev | Başarı / hata durumu |
| --- | --- | --- | --- |
| `GET` | `/health` | Sunucu sağlık kontrolü | `200 OK` |
| `GET` | `/events` | Altı örnek etkinliği listeler | `200 OK` |
| `GET` | `/events?category=Atölye` | Kategoriye göre etkinlikleri filtreler | `200 OK` |
| `GET` | `/events/:id` | ID'ye göre etkinlik detayı | `200 OK` / `404 Not Found` |
| `POST` | `/events` | Yeni etkinlik oluşturur | `201 Created` / `400 Bad Request` |

`POST /events` isteğinde en az `title`, `category` ve `date` alanları gereklidir. Yanıtlar JSON biçimindedir; eksik veya geçersiz istekler uygun HTTP durum kodlarıyla karşılanır. Yeni kayıtlar sunucu belleğinde tutulduğu için backend yeniden başlatıldığında başlangıç verilerine dönülür.

**Örnek istek:**

```bash
curl http://localhost:3000/events
```

Hazır Postman koleksiyonu `backend/requests/kampus-api.json` dosyasındadır. Koleksiyonun `baseUrl` değişkeni yerel geliştirme için `http://localhost:3000` olmalıdır. Sağlık kontrolü, listeleme, detay, bulunamayan ID, başarılı POST ve hatalı POST senaryoları koleksiyondan denenebilir.

## Form doğrulama kuralları

`EventForm` kontrollü form mantığıyla çalışır: tüm alanlar bir `EventFormData` state nesnesine bağlıdır. Gönderimde `preventDefault()` çağrılır; `validateEvent()` hataları döndürür ve hata mesajları ilgili alanın altında gösterilir. Hatasız veri üst bileşene `onSubmit()` ile iletilir.

| Alan | Doğrulama |
| --- | --- |
| Etkinlik adı | En az 3 karakter |
| Kategori | Seminer, Atölye, Söyleşi veya Yarışma seçilmeli |
| Tarih | Boş olamaz |
| Saat | Boş olamaz |
| Yer | Boş olamaz |
| Kontenjan | 1–1000 arasında tam sayı |
| Açıklama | En az 10 karakter |

Ekleme ve düzenleme sayfaları **aynı** `EventForm` bileşenini farklı başlangıç değerleriyle kullanır. Giriş, kayıt ve şifre sıfırlama formları ayrı kullanıcı arayüzleri ve demo doğrulama mesajları sunar.

## Test ve kalite kontrol

Projenin `frontend/tests/` klasöründe etkinlik arama/filtreleme, form doğrulama, CRUD veri işlemleri ve yapısal gereksinim kontrollerini kapsayan testler vardır. Sprint 6 kaynak denetiminde **25 frontend otomatik testi başarılı** olmuştur.

Sprint 7'de `backend/tests/` altında API davranışları, hata durumları, temel veri doğrulama ve proje yapısını kontrol eden testler eklenmiştir. **11 Kasım 2026'da çalıştırılan backend testlerinin 13'ü de başarılıdır (13/13; 0 hata).** Backend testleri için:

```bash
cd backend
npm test
```

Bu otomatik test sonuçları, üretim dağıtımının veya Postman üzerinden yapılan tüm manuel kontrollerin tamamlandığı anlamına gelmez.

Teslimden önce aşağıdaki manuel testler yapılmalıdır:

- [ ] `npm run build` hatasız tamamlanıyor.
- [ ] 10 route doğrudan açılıyor ve menü bağlantıları çalışıyor.
- [ ] Ekleme/güncelleme/silme işlemleri ilgili sayfalara anında yansıyor.
- [ ] Silme penceresinde **İptal** ve **Onay** doğru davranıyor.
- [ ] Arama ve kategori filtresi birlikte çalışıyor; sonuç yok mesajı görülüyor.
- [ ] Etkinlik ve demo hesap formları geçersiz girdilerde doğru mesajı gösteriyor.
- [ ] Mobil görünümde (ör. 375 px) tablo kartlara dönüşüyor, yatay taşma yok.
- [ ] Vercel'de `/events/event-1` gibi alt URL doğrudan açılıyor ve yenilenebiliyor.
- [ ] Backend açıkken Postman'da 200, 201, 400 ve 404 yanıtları manuel olarak doğrulanıyor.

## Vercel dağıtımı

GitHub deposu Vercel'e bağlandıktan sonra proje ayarlarında şunlar kullanılmalıdır:

| Ayar | Değer |
| --- | --- |
| Framework Preset | `Vite` |
| Root Directory | `frontend` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

`frontend/vercel.json` dosyası SPA fallback rewrite kuralı içerir. Böylece React Router ile tanımlanan alt URL'ler doğrudan açıldığında Vercel istekleri `index.html` dosyasına yönlendirir.

**Not:** Yukarıdaki Vercel dağıtımı yalnızca frontend'i kapsar. Sprint 7 Express API'si bu yapılandırmayla Vercel'de yayınlanmaz; burada anlatılan API adresi yerel geliştirme ortamı içindir.

**Teslimde canlı alan adı** öğretim görevlisinin istediği `isimsoyisim-frontend.vercel.app` biçiminde olmalıdır. Gerçek alan adı Vercel'de tanımlanıp doğrulandıktan sonra bu README'nin üst kısmındaki **Canlı demo** satırı güncellenmelidir; örnek veya henüz alınmamış bir adres canlı link olarak kullanılmamalıdır.

## Bilinen sınırlar

1. **Kalıcı veri yok:** Frontend etkinlikleri React `useState`, backend etkinlikleri sunucu belleğinde tutulur. Sayfa yenileme veya sunucu yeniden başlatma ilgili verileri sıfırlayabilir; veritabanı kullanılmaz.
2. **Frontend–backend bağlantısı:** İki katman aynı depoda yer alsa da frontend henüz Express API'sinden veri çekmez.
3. **Kimlik doğrulama demosu:** Giriş, kayıt ve şifre sıfırlama ekranları gerçek hesap oluşturmaz, oturum açmaz veya e-posta göndermez.
4. **Yönetim erişimi:** `/admin` sayfası ders kapsamı gereği giriş denetimi olmadan açılır; üretim ortamına uygun bir yetkilendirme sistemi olarak değerlendirilmemelidir.

## Teslim bilgileri

**Ders:** Web Programlama · **Çalışma:** Sprint 6 + Vize, Sprint 7 Backend  
**Geliştirici:** Efe SARIHAN · **Öğrenci Numarası:** 2416501081

Sprint 6 yönergesindeki `frontend` etiketi, önceki frontend teslimiyle ilgilidir. **Sprint 7** için backend geliştirme adımları **5 ayrı commit** halinde GitHub `main` dalına gönderilmiş ve son sürüm **`sprint-07`** etiketiyle işaretlenmiştir.

Sprint 7 commit sırası: Express kurulumu → etkinlik verileri ve GET → ID/404 kontrolleri → POST/doğrulama → Postman koleksiyonu, testler ve API dokümantasyonu. GitHub tesliminin doğrulanması ile Postman'daki manuel test/ekran görüntüsü kontrolleri ayrı adımlardır.

---

*Bu depo, eğitim ve değerlendirme amacıyla hazırlanmış frontend ve backend bileşenlerinden oluşan bir Web Programlama projesidir.*
