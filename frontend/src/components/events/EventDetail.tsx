import type { CampusEvent } from "../../types/campus-event";
import { formatDate, toISODate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <section className="icerik-bolumu" aria-labelledby="detay-baslik">
      <div className="detay-ust">
        <button type="button" className="metin-buton" onClick={onBack}>
          <span aria-hidden="true">←</span> Etkinlik listesine dön
        </button>
      </div>
      <article className="detay event-detail">
        <div className={`detail-layout ${event.image ? "afisli" : "afissiz"}`}>
          {event.image && (
            <figure className="etkinlik-afisi">
              <img src={event.image} alt={`${event.title} afişi`} />
              <figcaption>{event.title}</figcaption>
            </figure>
          )}
          <div className="detay-kunye">
            <p className="bolum-ust-etiket">Etkinlik Künyesi</p>
            <h2 id="detay-baslik">{event.title}</h2>
            <dl className="kunye-listesi">
              <div><dt>Tarih</dt><dd><time dateTime={toISODate(event.date)}>{formatDate(event.date)}</time></dd></div>
              <div><dt>Saat</dt><dd><time dateTime={event.time}>{event.time}</time></dd></div>
              <div><dt>Yer</dt><dd>{event.location}</dd></div>
              <div><dt>Kategori</dt><dd><span className="kategori-etiketi">{event.category}</span></dd></div>
              <div><dt>Kontenjan</dt><dd>{event.capacity} kişi</dd></div>
            </dl>
          </div>
        </div>
        <div className="detay-alt">
          <h3>Açıklama</h3>
          <p>{event.description}</p>
          <div className="aksiyonlar">
            <button type="button" className="ikincil-buton" onClick={onBack}>Listeye dön</button>
            <button type="button" className="ana-buton" onClick={() => onEdit(event.id)}>Bu etkinliği güncelle</button>
          </div>
        </div>
      </article>
    </section>
  );
}

export default EventDetail;
