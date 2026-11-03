import { useState } from "react";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";
import { useEvents } from "../context/EventsContext";
import type { Category } from "../types/campus-event";
import { searchEvents, filterByCategory } from "../utils/filter-events";
export default function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const categories: Category[] = [...new Set(events.map((event) => event.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);
  return <section className="icerik-bolumu" aria-labelledby="tum-baslik">
    <div className="bolum-baslik"><div><p className="bolum-ust-etiket">TÜM PROGRAM</p>
      <h2 id="tum-baslik">Etkinlikleri Keşfet</h2><p>İlginizi çeken etkinliği arayın, kategoriye göre filtreleyin.</p></div></div>
    <EventFilter searchText={searchText} category={category} categories={categories} onSearchChange={setSearchText} onCategoryChange={setCategory} />
    <p className="sonuc-sayisi" aria-live="polite">{filtered.length === 0 ? "Etkinlik bulunamadı." : `${filtered.length} etkinlik listeleniyor.`}</p>
    <EventList events={filtered} emptyText="Aramanıza uygun etkinlik bulunamadı. Farklı bir kelime deneyin." />
  </section>;
}
