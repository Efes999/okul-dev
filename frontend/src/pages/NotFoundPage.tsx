import { Link } from "react-router-dom";
export default function NotFoundPage() {
  return <section className="icerik-bolumu not-found" role="alert"><span className="error-code">404</span><h2>Sayfa bulunamadı</h2><p>Aradığınız adres geçerli değil veya kaldırılmış olabilir.</p><Link className="ana-buton" to="/">Ana Sayfaya dön</Link></section>;
}
