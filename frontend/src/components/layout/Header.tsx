import { useEffect } from "react";
import { useLocation, useMatch } from "react-router-dom";
import { useEvents } from "../../context/EventsContext";
import Navigation from "./Navigation";

const titles: Record<string, string> = {
  "/": "Kampüs Etkinlikleri", "/events": "Tüm Etkinlikler", "/login": "Giriş Yap",
  "/register": "Kayıt Ol", "/forgot-password": "Şifremi Unuttum", "/admin": "Etkinlik Yönetimi",
  "/admin/new": "Yeni Etkinlik", 
};
export default function Header() {
  const location = useLocation();
  const { events } = useEvents();
  const detail = useMatch("/events/:id");
  const editing = useMatch("/admin/:id/edit");
  const found = events.find((item) => item.id === detail?.params.id);
  const title = detail ? (found?.title.trim() ?? "Etkinlik Bulunamadı")
    : editing ? "Etkinlik Düzenle" : titles[location.pathname] ?? "Sayfa Bulunamadı";
  useEffect(() => { document.title = `${title} | Kampüs Etkinlikleri`; }, [title]);
  return (
    <header className="site-baslik">
      <div className="header-inner">
        <div className="brand-row">
          <div className="brand-symbol" aria-hidden="true">K</div>
          <div className="brand-copy">
            <p className="ust-etiket">KAMPÜS YAŞAMI · 2026</p>
            <h1>{title}</h1>
            <p className="baslik-aciklama">Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
          </div>
        </div>
        <Navigation />
      </div>
    </header>
  );
}
