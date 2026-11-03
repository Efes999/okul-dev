import { Link } from "react-router-dom";
import EventList from "../components/events/EventList";
import { useEvents } from "../context/EventsContext";
import { toISODate } from "../utils/format-date";
export default function HomePage() {
  const { events } = useEvents();
  const upcoming = [...events].sort((a, b) => toISODate(a.date).localeCompare(toISODate(b.date))).slice(0, 2);
  return <section className="icerik-bolumu" aria-labelledby="yaklasan-baslik">
    <div className="bolum-baslik"><div><p className="bolum-ust-etiket">KAMPÜSTE NELER VAR?</p>
      <h2 id="yaklasan-baslik">Yaklaşan 2 Etkinlik</h2>
      <p>Seminerler, atölyeler ve kampüsteki buluşmalar burada.</p></div>
      <Link className="ikincil-buton" to="/events">Tüm etkinlikler <span aria-hidden="true">→</span></Link>
    </div>
    <EventList events={upcoming} emptyText="Henüz etkinlik yok. Yönetim'den yeni etkinlik ekleyebilirsiniz." />
  </section>;
}
