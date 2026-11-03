import { Link } from "react-router-dom";
export default function EventNotFound() {
  return <div className="bos-sonuc" role="alert"><h2>Etkinlik bulunamadı</h2><p>Bu etkinlik silinmiş veya bağlantı geçersiz olabilir.</p><Link className="ana-buton" to="/events">Etkinliklere dön</Link></div>;
}
