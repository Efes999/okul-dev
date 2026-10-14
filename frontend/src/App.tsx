import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";
import "./App.css";

/** Sprint 4: React Router kullanılmaz; beş ekran bu state ile yönetilir. */
type PageName = "home" | "events" | "detail" | "add" | "update";

type MenuLink = {
  label: string;
  page: PageName;
};

const menuLinks: MenuLink[] = [
  { label: "Ana Sayfa", page: "home" },
  { label: "Etkinlikler", page: "events" },
  { label: "Ekle", page: "add" },
];

/** Sprint 3 tarihleri GG-AA-YYYY; <time> ve tarihe göre sıralama için ISO'ya çevir. */
function toISODate(sprint3Date: string): string {
  const [day, month, year] = sprint3Date.split("-");
  return `${year}-${month}-${day}`;
}

/** Kullanıcının gördüğü tarih: 12 Ekim 2026 gibi okunabilir biçim. */
function formatDate(sprint3Date: string): string {
  const isoDate = toISODate(sprint3Date);
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function App() {
  // Adım 8: Sayfa ve seçilen etkinliğin kimliği (iki ayrı state).
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Adım 10: Arama ve kategori controlled input'larla yönetilir.
  const [searchText, setSearchText] = useState<string>("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null): void {
    setPage(next);
    setSelectedId(id);
  }

  // Adım 9: Orijinal dizi bozulmadan en yakın iki tarihli kayıt.
  const upcoming = [...events]
    .sort((a, b) => toISODate(a.date).localeCompare(toISODate(b.date)))
    .slice(0, 2);

  // Adım 10: Kategoriler sabit yazılmaz; veriden çıkarılır.
  const categories: Category[] = [...new Set(events.map((event) => event.category))];
  // Türetilen liste bir state DEĞİLDİR.
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  // Adım 12: Yanlış veya eksik kimlik için undefined dönebilir.
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  const pageTitles: Record<PageName, string> = {
    home: "Ana Sayfa",
    events: "Tüm Etkinlikler",
    detail: selected?.title ?? "Etkinlik Bulunamadı",
    add: "Etkinlik Ekle",
    update: "Etkinlik Güncelle",
  };
  const title = pageTitles[page];

  // Adım 11: Yan etki yalnızca başlık değiştiğinde çalışır.
  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  /** Adım 9: Ana sayfa ve liste için ortak JSX kartı. */
  function renderCard(event: CampusEvent) {
    return (
      <article className="kart event-card" key={event.id}>
        <div className="kart-ust">
          <span className="kategori-etiketi">{event.category}</span>
          <span className="kontenjan">{event.capacity} kişilik</span>
        </div>
        <h3>{event.title}</h3>
        <dl className="kart-bilgiler">
          <div>
            <dt>Tarih</dt>
            <dd>
              <time dateTime={toISODate(event.date)}>{formatDate(event.date)}</time>
              {" · "}
              <time dateTime={event.time}>{event.time}</time>
            </dd>
          </div>
          <div>
            <dt>Yer</dt>
            <dd>{event.location}</dd>
          </div>
          <div>
            <dt>Kontenjan</dt>
            <dd>{event.capacity} kişi</dd>
          </div>
        </dl>
        <p className="kart-aciklama">{event.description}</p>
        <a
          href="#detay"
          className="kart-baglanti"
          onClick={(e: MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            go("detail", event.id);
          }}
          aria-label={`${event.title} etkinliğinin detaylarını gör`}
        >
          Detayları gör <span aria-hidden="true">→</span>
        </a>
      </article>
    );
  }

  return (
    <>
      {/* Adım 7: Bütün sayfalar aynı header, nav, main ve footer'ı paylaşır. */}
      <header className="site-baslik">
        <div className="header-inner">
          <div className="baslik-grubu">
            <p className="ust-etiket">2026 • Kampüs yaşamı</p>
            <h1>{page === "detail" && selected ? selected.title : page === "home" ? "Kampüs Etkinlikleri" : title}</h1>
            <p className="baslik-aciklama">
              {page === "home"
                ? "Seminerleri, atölyeleri ve kampüsteki buluşmaları keşfet."
                : page === "events"
                  ? "İlgini çeken etkinliği ara, filtrele ve detaylarını görüntüle."
                  : page === "detail"
                    ? "Etkinlik hakkında tüm bilgiler bir arada."
                    : "Kampüs etkinlikleri yönetim formu."}
            </p>
          </div>
          <nav className="menu" aria-label="Ana menü">
            {menuLinks.map((item) => (
              <a
                key={item.page}
                href={`#${item.page}`}
                onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  go(item.page);
                }}
                aria-current={
                  page === item.page || (page === "detail" && item.page === "events")
                    ? "page"
                    : undefined
                }
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="icerik" className="site-icerik">
        {/* 1. GÖRÜNÜM: Ana Sayfa */}
        {page === "home" && (
          <section aria-labelledby="yaklasan-baslik" className="icerik-bolumu">
            <div className="bolum-baslik">
              <div>
                <p className="bolum-ust-etiket">Kampüste neler var?</p>
                <h2 id="yaklasan-baslik">Yaklaşan 2 Etkinlik</h2>
                <p>Tarihe göre sıralanmış ilk iki etkinlik.</p>
              </div>
              <button className="ikincil-buton" type="button" onClick={() => go("events")}>
                Tüm etkinlikler <span aria-hidden="true">→</span>
              </button>
            </div>
            <div className="etkinlik-listesi">{upcoming.map(renderCard)}</div>
          </section>
        )}

        {/* 2. GÖRÜNÜM: Etkinlikler ve birlikte çalışan filtreler */}
        {page === "events" && (
          <section aria-labelledby="tum-etkinlikler-baslik" className="icerik-bolumu">
            <div className="bolum-baslik">
              <div>
                <p className="bolum-ust-etiket">Tüm program</p>
                <h2 id="tum-etkinlikler-baslik">Tüm Etkinlikler</h2>
                <p>Aradığın etkinliği başlık veya açıklamasından bulabilirsin.</p>
              </div>
            </div>
            <div className="filtre-paneli">
              <div className="form-grup">
                <label htmlFor="search-events">Etkinlik Ara</label>
                <input
                  id="search-events"
                  type="search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Etkinlik adı ya da açıklama..."
                  autoComplete="off"
                />
              </div>
              <div className="form-grup">
                <label htmlFor="category-filter">Kategori</label>
                <select
                  id="category-filter"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className="sonuc-sayisi" aria-live="polite">
              {filtered.length === 0
                ? "Etkinlik bulunamadı."
                : `Toplam ${filtered.length} etkinlik bulundu.`}
            </p>
            {filtered.length === 0 ? (
              <div className="bos-sonuc" role="status">
                <h3>Aramana uygun etkinlik bulunamadı.</h3>
                <p>Başka bir kelime veya kategori deneyebilirsin.</p>
              </div>
            ) : (
              <div className="etkinlik-listesi tum-liste">{filtered.map(renderCard)}</div>
            )}
          </section>
        )}

        {/* 3. GÖRÜNÜM: Eksik/yanlış id için güvenli hata durumu */}
        {page === "detail" && !selected && (
          <section className="icerik-bolumu hata-mesaji" role="alert">
            <h2>Etkinlik bulunamadı</h2>
            <p>Seçtiğin etkinlik silinmiş veya geçersiz olabilir.</p>
            <button type="button" className="ana-buton" onClick={() => go("events")}>
              Listeye dön
            </button>
          </section>
        )}
        {page === "detail" && selected && (
          <section className="icerik-bolumu" aria-labelledby="detay-baslik">
            <div className="detay-ust">
              <button type="button" className="metin-buton" onClick={() => go("events")}>
                <span aria-hidden="true">←</span> Etkinlik listesine dön
              </button>
            </div>
            <article className="detay event-detail">
              <div className={`detail-layout ${selected.image ? "afisli" : "afissiz"}`}>
                {selected.image && (
                  <figure className="etkinlik-afisi">
                    <img src={selected.image} alt={`${selected.title} afişi`} />
                    <figcaption>{selected.title}</figcaption>
                  </figure>
                )}
                <div className="detay-kunye">
                  <p className="bolum-ust-etiket">Etkinlik Künyesi</p>
                  <h2 id="detay-baslik">{selected.title}</h2>
                  <dl className="kunye-listesi">
                    <div>
                      <dt>Tarih</dt>
                      <dd><time dateTime={toISODate(selected.date)}>{formatDate(selected.date)}</time></dd>
                    </div>
                    <div>
                      <dt>Saat</dt>
                      <dd><time dateTime={selected.time}>{selected.time}</time></dd>
                    </div>
                    <div>
                      <dt>Yer</dt>
                      <dd>{selected.location}</dd>
                    </div>
                    <div>
                      <dt>Kategori</dt>
                      <dd><span className="kategori-etiketi">{selected.category}</span></dd>
                    </div>
                    <div>
                      <dt>Kontenjan</dt>
                      <dd>{selected.capacity} kişi</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="detay-alt">
                <h3>Açıklama</h3>
                <p>{selected.description}</p>
                <div className="aksiyonlar">
                  <button type="button" className="ikincil-buton" onClick={() => go("events")}>
                    Listeye dön
                  </button>
                  <button type="button" className="ana-buton" onClick={() => go("update", selected.id)}>
                    Bu etkinliği güncelle
                  </button>
                </div>
              </div>
            </article>
          </section>
        )}

        {/* 4+5. GÖRÜNÜMLER: Aynı JSX formu, yalnızca başlık değişir. */}
        {(page === "add" || page === "update") && (
          <section className="icerik-bolumu form-sayfasi" aria-labelledby="form-baslik">
            <div className="bolum-baslik">
              <div>
                <p className="bolum-ust-etiket">Etkinlik yönetimi</p>
                <h2 id="form-baslik">
                  {page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}
                </h2>
                <p>
                  Bu sprintte yalnızca formun görünümü hazırlanır.
                  Kaydet butonu sayfayı yenilemez.
                </p>
              </div>
            </div>
            <form
              className="form etkinlik-formu"
              onSubmit={(e) => e.preventDefault()}
              noValidate
              aria-label={page === "add" ? "Etkinlik ekleme formu" : "Etkinlik güncelleme formu"}
            >
              <div className="form-grup">
                <label htmlFor="title">Etkinlik Adı</label>
                <input id="title" name="title" type="text" maxLength={80} placeholder="Örn. Kariyer Günleri 2026" />
              </div>
              <div className="form-grup">
                <label htmlFor="event-category">Kategori</label>
                <select id="event-category" name="category" defaultValue="">
                  <option value="">Seçiniz</option>
                  <option value="Seminer">Seminer</option>
                  <option value="Atölye">Atölye</option>
                  <option value="Konferans">Konferans</option>
                  <option value="Spor">Spor</option>
                </select>
              </div>
              <div className="form-iki-sutun">
                <div className="form-grup">
                  <label htmlFor="date">Tarih</label>
                  <input id="date" name="date" type="date" />
                </div>
                <div className="form-grup">
                  <label htmlFor="time">Saat</label>
                  <input id="time" name="time" type="time" />
                </div>
              </div>
              <div className="form-grup">
                <label htmlFor="location">Yer</label>
                <input id="location" name="location" type="text" placeholder="Örn. A Blok Konferans Salonu" />
              </div>
              <div className="form-grup">
                <label htmlFor="capacity">Kontenjan</label>
                <input id="capacity" name="capacity" type="number" min={1} step={1} placeholder="Örn. 120" />
              </div>
              <div className="form-grup">
                <label htmlFor="description">Açıklama</label>
                <textarea id="description" name="description" rows={6} placeholder="Etkinlik açıklaması..." />
              </div>
              <div className="form-dugme-satiri">
                <button type="submit" className="ana-buton">{page === "update" ? "Güncelle" : "Kaydet"}</button>
                <span className="form-bilgilendirme">Sprint 4: kayıt işlemi yapılmaz.</span>
              </div>
            </form>
          </section>
        )}
      </main>

      <footer className="site-footer">
        <p>Kampüs Etkinlikleri · Efe SARIHAN · 2416501081 · 2026</p>
        <p>Sprint 4 — Vite + TypeScript + React</p>
      </footer>
    </>
  );
}

export default App;
