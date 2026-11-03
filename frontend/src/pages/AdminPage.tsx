import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { formatDate } from "../utils/format-date";
import type { CampusEvent } from "../types/campus-event";
export default function AdminPage() {
  const { events, deleteEvent } = useEvents();
  function handleDelete(event: CampusEvent) {
    if (window.confirm(`"${event.title.trim()}" silinsin mi?`)) deleteEvent(event.id);
  }
  return <section className="icerik-bolumu" aria-labelledby="admin-heading">
    <div className="bolum-baslik"><div><p className="bolum-ust-etiket">YÖNETİM PANELİ</p><h2 id="admin-heading">Etkinlik Yönetimi</h2><p>Etkinlik ekleyin, güncelleyin veya silin.</p></div>
      <Link to="/admin/new" className="ana-buton">+ Yeni etkinlik</Link></div>
    {events.length === 0 ? <div className="bos-sonuc" role="status">Henüz etkinlik yok.</div> : <>
      <div className="table-scroll"><table className="tablo"><thead><tr><th>Etkinlik</th><th>Tarih</th><th>Kategori</th><th>İşlemler</th></tr></thead>
        <tbody>{events.map((event) => <tr key={event.id}>
          <td className="tablo-etkinlik">{event.title}</td><td>{formatDate(event.date)}</td><td>{event.category}</td>
          <td><div className="tablo-aksiyonlar"><Link className="buton-duzenle" to={`/admin/${event.id}/edit`}>Düzenle</Link>
            <button type="button" className="buton-sil" onClick={() => handleDelete(event)}>Sil</button></div></td>
        </tr>)}</tbody></table></div>
      <div className="yonetim-kartlari" aria-label="Mobil etkinlik yönetimi">{events.map((event) => <article key={event.id} className="yonetim-karti">
        <h3>{event.title}</h3><p><strong>Tarih:</strong> {formatDate(event.date)}</p><p><strong>Kategori:</strong> {event.category}</p>
        <div className="tablo-aksiyonlar"><Link className="buton-duzenle" to={`/admin/${event.id}/edit`}>Düzenle</Link>
          <button type="button" className="buton-sil" onClick={() => handleDelete(event)}>Sil</button></div>
      </article>)}</div>
    </>}
    <p className="ipucu">Yaptığınız değişiklikler ana sayfaya ve etkinlik listesine anında yansır. Sayfa yenilenince başlangıç verileri geri gelir (Sprint 6).</p>
  </section>;
}
