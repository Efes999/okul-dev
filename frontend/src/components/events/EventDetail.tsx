import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate, toISODate } from "../../utils/format-date";
export default function EventDetail({ event }: { event: CampusEvent }) {
  return <article className="detay event-detail">
    <div className={`detail-layout ${event.image ? "afisli" : "afissiz"}`}>
      {event.image && <figure className="etkinlik-afisi"><img src={event.image} alt={`${event.title} afişi`} /><figcaption>{event.title}</figcaption></figure>}
      <section className="detay-kunye" aria-labelledby="detay-baslik">
        <p className="bolum-ust-etiket">ETKİNLİK KÜNYESİ</p><h2 id="detay-baslik">{event.title}</h2>
        <dl className="kunye-listesi">
          <div><dt>Tarih</dt><dd><time dateTime={toISODate(event.date)}>{formatDate(event.date)}</time></dd></div>
          <div><dt>Saat</dt><dd>{event.time}</dd></div>
          <div><dt>Yer</dt><dd>{event.location}</dd></div>
          <div><dt>Kategori</dt><dd><span className="kategori-etiketi">{event.category}</span></dd></div>
          <div><dt>Kontenjan</dt><dd>{event.capacity} kişi</dd></div>
        </dl>
      </section>
    </div>
    <section className="detay-alt"><h3>Açıklama</h3><p>{event.description}</p>
      <div className="aksiyonlar"><Link className="ikincil-buton" to="/events">← Listeye dön</Link>
        <Link className="ana-buton" to={`/admin/${event.id}/edit`}>Bu etkinliği güncelle</Link></div>
    </section>
  </article>;
}
