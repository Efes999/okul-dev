import { useEffect, useState } from "react";
import { events } from "./data/events";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { toISODate } from "./utils/format-date";
import { filterByCategory, findEventById, searchEvents } from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventNotFound from "./components/events/EventNotFound";
import EventForm from "./components/forms/EventForm";
import "./App.css";

function App() {
  // Sprint 4 state'leri aynı yerde: lifting state, prop + callback.
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }
  const upcoming = [...events]
    .sort((a, b) => toISODate(a.date).localeCompare(toISODate(b.date)))
    .slice(0, 2);
  const categories: Category[] = [...new Set(events.map((event) => event.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const selected = selectedId ? findEventById(events, selectedId) : undefined;
  const pageTitles: Record<PageName, string> = {
    home: "Ana Sayfa", events: "Tüm Etkinlikler",
    detail: selected?.title ?? "Etkinlik Bulunamadı",
    add: "Etkinlik Ekle", update: "Etkinlik Güncelle",
  };
  const title = pageTitles[page];
  const displayTitle = page === "detail" && selected ? selected.title
    : page === "home" ? "Kampüs Etkinlikleri" : title;
  const subtitle = page === "home" ? "Seminerleri, atölyeleri ve kampüsteki buluşmaları keşfet."
    : page === "events" ? "İlgini çeken etkinliği ara, filtrele ve detaylarını görüntüle."
    : page === "detail" ? "Etkinlik hakkında tüm bilgiler bir arada."
    : "Kampüs etkinlikleri yönetim formu.";
  useEffect(() => { document.title = `Kampüs Etkinlikleri — ${title}`; }, [title]);

  return (
    <>
      <Header title={displayTitle} text={subtitle}>
        <Navigation current={page} onNavigate={go} />
      </Header>
      <main id="icerik" className="site-icerik">
        {page === "home" && (
          <section aria-labelledby="yaklasan-baslik" className="icerik-bolumu">
            <div className="bolum-baslik">
              <div><p className="bolum-ust-etiket">Kampüste neler var?</p>
                <h2 id="yaklasan-baslik">Yaklaşan 2 Etkinlik</h2>
                <p>Tarihe göre sıralanmış ilk iki etkinlik.</p></div>
              <button className="ikincil-buton" type="button" onClick={() => go("events")}>
                Tüm etkinlikler <span aria-hidden="true">→</span>
              </button>
            </div>
            <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
          </section>
        )}
        {page === "events" && (
          <section aria-labelledby="tum-etkinlikler-baslik" className="icerik-bolumu">
            <div className="bolum-baslik"><div>
              <p className="bolum-ust-etiket">Tüm program</p>
              <h2 id="tum-etkinlikler-baslik">Tüm Etkinlikler</h2>
              <p>Aradığın etkinliği başlık veya açıklamasından bulabilirsin.</p>
            </div></div>
            <EventFilter searchText={searchText} category={category} categories={categories}
              onSearchChange={setSearchText} onCategoryChange={setCategory} />
            <p className="sonuc-sayisi" aria-live="polite">
              {filtered.length === 0 ? "Etkinlik bulunamadı." : `Toplam ${filtered.length} etkinlik bulundu.`}
            </p>
            <EventList events={filtered} onShowDetail={(id) => go("detail", id)}
              emptyText="Aramana uygun etkinlik bulunamadı." className="tum-liste" />
          </section>
        )}
        {page === "detail" && !selected && <EventNotFound onBack={() => go("events")} />}
        {page === "detail" && selected && <EventDetail event={selected}
          onBack={() => go("events")} onEdit={(id) => go("update", id)} />}
        {(page === "add" || page === "update") && (
          <EventForm mode={page} onSubmit={() => window.scrollTo(0, 0)} />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
