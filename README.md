# Kampüs Etkinlikleri

**Sprint 6 · Web Programlama Vize Projesi**  
React, TypeScript, React Router ve Context API ile geliştirilen, kampüs etkinliklerinin keşfedilmesini ve yönetilmesini sağlayan duyarlı (responsive) tek sayfalı web uygulaması.

**Geliştirici:** Efe SARIHAN · **Öğrenci No:** 2416501081  
**Teknolojiler:** React 19 · TypeScript 5 · Vite 7 · React Router 7 · Context API  
**Kaynak kod:** [GitHub — okul-dev](https://github.com/Efes999/okul-dev)  
**Canlı demo:** *Vercel yayını tamamlandığında doğrulanmış adres buraya eklenecektir.*

> **Proje kapsamı:** Sprint 6 / vize yönergesi kapsamında frontend uygulamasıdır. Gerçek kullanıcı hesapları, sunucu tarafı kimlik doğrulama ve kalıcı veritabanı bulunmaz. Etkinlik değişiklikleri uygulama açıkken React state'inde tutulur.

## İçindekiler

- [Proje hakkında](#proje-hakkında)
- [Temel özellikler](#temel-özellikler)
- [Teknoloji yığını](#teknoloji-yığını)
- [Kurulum ve çalıştırma](#kurulum-ve-çalıştırma)
- [Sayfalar ve yönlendirme](#sayfalar-ve-yönlendirme)
- [Proje yapısı](#proje-yapısı)
- [Mimari ve veri yönetimi](#mimari-ve-veri-yönetimi)
- [Form doğrulama kuralları](#form-doğrulama-kuralları)
- [Test ve kalite kontrol](#test-ve-kalite-kontrol)
- [Vercel dağıtımı](#vercel-dağıtımı)
- [Bilinen sınırlar](#bilinen-sınırlar)
- [Teslim bilgileri](#teslim-bilgileri)

## Proje hakkında

**Kampüs Etkinlikleri**, öğrencilerin seminer, atölye, söyleşi ve yarışmaları tek yerden inceleyebildiği; yönetim ekranında ise etkinlikleri ekleyip düzenleyebildiği veya silebildiği bir React uygulamasıdır. Sprint 5'te oluşturulan yeniden kullanılabilir bileşen mimarisi, Sprint 6'da gerçek URL yönlendirmeleri ve uygulama genelinde paylaşılan Context state ile genişletilmiştir.

Uygulama başlangıçta **6 örnek etkinlik** gösterir. Etkinlik ekleme, güncelleme ve silme işlemleri bütün ilgili sayfalara anında yansır. Sayfa yenilendiğinde başlangıç verileri yeniden yüklenir; bu davranış ders yönergesinin istemci tarafı kapsamıyla uyumludur.

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

## Teknoloji yığını

- **React 19:** Bileşen tabanlı kullanıcı arayüzü ve Hook'lar
- **TypeScript 5:** Etkinlik, kategori ve form veri tipleri
- **React Router 7:** `Routes`, `Route`, `Link`, `NavLink`, `useNavigate` ve `useParams`
- **Context API:** `EventsProvider` ve `useEvents()` ile ortak etkinlik state'i
- **Vite 7:** Geliştirme sunucusu ve üretim derlemesi
- **CSS:** Mobil uyumlu bileşen ve yönetim ekranı stilleri
- **Node.js test çalıştırıcısı:** Veri işlemleri, doğrulama ve proje yapısı testleri

## Kurulum ve çalıştırma

**Gereksinimler:** Node.js **22.12+** ve npm. Aşağıdaki komutları deponun kök dizininden çalıştırın.

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

**Otomatik testler:**

```bash
npm test
```

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

Projenin `frontend/tests/` klasöründe etkinlik arama/filtreleme, form doğrulama, CRUD veri işlemleri ve yapısal gereksinim kontrollerini kapsayan testler vardır. Son kaynak denetiminde **25 otomatik test başarılı** olmuştur; bu sonuç gerçek tarayıcı davranışlarının ve üretim derlemesinin tamamının doğrulandığı anlamına gelmez.

Teslimden önce aşağıdaki manuel testler yapılmalıdır:

- [ ] `npm run build` hatasız tamamlanıyor.
- [ ] 10 route doğrudan açılıyor ve menü bağlantıları çalışıyor.
- [ ] Ekleme/güncelleme/silme işlemleri ilgili sayfalara anında yansıyor.
- [ ] Silme penceresinde **İptal** ve **Onay** doğru davranıyor.
- [ ] Arama ve kategori filtresi birlikte çalışıyor; sonuç yok mesajı görülüyor.
- [ ] Etkinlik ve demo hesap formları geçersiz girdilerde doğru mesajı gösteriyor.
- [ ] Mobil görünümde (ör. 375 px) tablo kartlara dönüşüyor, yatay taşma yok.
- [ ] Vercel'de `/events/event-1` gibi alt URL doğrudan açılıyor ve yenilenebiliyor.

## Vercel dağıtımı

GitHub deposu Vercel'e bağlandıktan sonra proje ayarlarında şunlar kullanılmalıdır:

| Ayar | Değer |
| --- | --- |
| Framework Preset | `Vite` |
| Root Directory | `frontend` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

`frontend/vercel.json` dosyası SPA fallback rewrite kuralı içerir. Böylece React Router ile tanımlanan alt URL'ler doğrudan açıldığında Vercel istekleri `index.html` dosyasına yönlendirir.

**Teslimde canlı alan adı** öğretim görevlisinin istediği `isimsoyisim-frontend.vercel.app` biçiminde olmalıdır. Gerçek alan adı Vercel'de tanımlanıp doğrulandıktan sonra bu README'nin üst kısmındaki **Canlı demo** satırı güncellenmelidir; örnek veya henüz alınmamış bir adres canlı link olarak kullanılmamalıdır.

## Bilinen sınırlar

1. **Kalıcı veri yok:** `events` React `useState` içinde tutulur; F5 ile altı başlangıç etkinliği geri gelir. `localStorage`, API veya veritabanı kullanılmaz.
2. **Kimlik doğrulama demosu:** Giriş, kayıt ve şifre sıfırlama ekranları gerçek hesap oluşturmaz, oturum açmaz veya e-posta göndermez.
3. **Yönetim erişimi:** `/admin` sayfası ders kapsamı gereği giriş denetimi olmadan açılır; üretim ortamına uygun bir yetkilendirme sistemi olarak değerlendirilmemelidir.

## Teslim bilgileri

**Ders:** Web Programlama · **Çalışma:** Sprint 6 + Vize  
**Geliştirici:** Efe SARIHAN · **Öğrenci Numarası:** 2416501081

Git etiketi, ilgili Sprint 6 yönergesinde **`frontend`** olarak istenmiştir. Etiket oluşturmadan önce `git tag --list frontend` ile aynı isimde eski bir etiket olup olmadığı kontrol edilmelidir. Güncel kaynak kodun GitHub'a gönderilmesi ve canlı Vercel bağlantısının README'ye eklenmesi teslim sürecinin ayrı aşamalarıdır.

---

*Bu depo, eğitim ve değerlendirme amacıyla hazırlanmış bir frontend projesidir.*
