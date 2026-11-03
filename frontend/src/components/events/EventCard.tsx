import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate, toISODate } from "../../utils/format-date";
export default function EventCard({ event }: { event: CampusEvent }) {
  return (
    <article className="kart event-card">
      <div className="kart-ust">
        <span className="kategori-etiketi">{event.category}</span>
        <span className="kontenjan">{event.capacity} kişilik</span>
      </div>
      <h3>{event.title}</h3>
      <dl className="kart-bilgiler">
        <div><dt>Tarih</dt><dd><time dateTime={toISODate(event.date)}>{formatDate(event.date)}</time> · {event.time}</dd></div>
        <div><dt>Yer</dt><dd>{event.location}</dd></div>
      </dl>
      <p className="kart-aciklama">{event.description}</p>
      <Link className="kart-baglanti" to={`/events/${event.id}`}>Detayları gör <span aria-hidden="true">→</span></Link>
    </article>
  );
}
