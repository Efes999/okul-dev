import type { MouseEvent } from "react";
import type { CampusEvent } from "../../types/campus-event";
import { toISODate, formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  function showDetail(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    onShowDetail(event.id);
  }
  return (
    <article className="kart event-card">
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
        <div><dt>Yer</dt><dd>{event.location}</dd></div>
        <div><dt>Kontenjan</dt><dd>{event.capacity} kişi</dd></div>
      </dl>
      <p className="kart-aciklama">{event.description}</p>
      <a
        href="#detay"
        className="kart-baglanti"
        onClick={showDetail}
        aria-label={`${event.title} etkinliğinin detaylarını gör`}
      >
        Detayları gör <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}

export default EventCard;
