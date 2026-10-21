# Sprint 5 — React Bileşenleri (Efe SARIHAN · 2416501081)

> Canlı Vercel adresi (yayına aldıktan sonra ilk satırla değiştir): https://okul-dev.vercel.app

Bu proje, gönderilen Sprint 4 ZIP'inin **aynı görünümünü ve 5 sayfasını** koruyarak bileşenlere ayrılmış sürümüdür. Sprint 5 sunumuna göre yeni bir klasör açılmadı; çalışmaya repository içindeki **frontend/** klasöründe devam edilir.

## Windows / VS Code

1. Node.js 22 veya üstü yüklü olsun: `node -v`
2. ZIP'ten gelen **frontend** klasörünü Git deposundaki mevcut **frontend** klasörüyle değiştir (Sprint 4'ün yedeğini sakla).
3. Repo kökünde terminal aç, ardından:

```bash
cd frontend
npm install
npm run dev
```

Tarayıcıda terminalin gösterdiği adresi aç (genellikle http://localhost:5173).

## Doğrulama

```bash
npm run typecheck
npm run test
npm run build
```

- Ana sayfa yaklaşan **2** etkinlik gösterir.
- Etkinlikler ekranında **6** etkinlik, arama ve kategori filtresi çalışır.
- Detay kartından seçilen etkinlik açılır; **Listeye dön** ve **Bu etkinliği güncelle** çalışır.
- Ekle/Güncelle formu sayfayı yenilemeden yukarı kaydırır. **Bu sprintte veritabanına kayıt yapılmaz.**
- Mobil / masaüstü görünüm, App.css ve mevcut veri dosyaları **Sprint 4 ile aynıdır**.

## Bileşen yapısı

- `src/components/layout/`: `Header`, `Navigation`, `Footer`
- `src/components/events/`: `EventCard`, `EventList`, `EventFilter`, `EventDetail`, `EventNotFound`
- `src/components/forms/`: `EventForm`
- `src/types/page.ts`: `PageName` türü
- `src/utils/format-date.ts`: `toISODate`, `formatDate` fonksiyonları

Toplam **9 React bileşeni**: sunumdaki isim verilen sekiz bileşene, Sprint 4'ün geçersiz detay ekranını korumak için `EventNotFound` eklendi. State (`page`, `selectedId`, `searchText`, `category`) App'te; veriler **props** ile aşağı, olaylar **callback** ile yukarı gider. `App.tsx` içinde HTML kart ve form JSX'i artık yoktur.

## Teslim

Git repository kökünde:

```bash
git add .
git commit -m "Complete sprint 5 React components"
git tag sprint-05
git push
git push --tags
```

Vercel: **Root Directory = `frontend`**, Framework Preset = **Vite**. Push ardından yeni deployment durumunu kontrol et, gerekiyorsa Redeploy. Vercel adresini kökteki README'nin ilk satırına da yaz.

**Not:** Git/Vercel komutlarını bu ZIP oluşturulurken çalıştırmadık. Canlı yayına almak ve teslim etmek senin GitHub / Vercel hesabında yapılacak.
