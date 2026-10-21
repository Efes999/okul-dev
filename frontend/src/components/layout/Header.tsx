import type { ReactNode } from "react";

interface HeaderProps {
  title: string;
  text?: string;
  children?: ReactNode;
}

/** Başlık ve açıklama props olarak App'ten gelir; menü, children alanındadır. */
function Header({ title, text, children }: HeaderProps) {
  return (
    <header className="site-baslik">
      <div className="header-inner">
        <div className="baslik-grubu">
          <p className="ust-etiket">2026 • Kampüs yaşamı</p>
          <h1>{title}</h1>
          <p className="baslik-aciklama">{text}</p>
        </div>
        {children}
      </div>
    </header>
  );
}

export default Header;
