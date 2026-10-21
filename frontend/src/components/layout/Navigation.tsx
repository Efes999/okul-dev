import type { MouseEvent } from "react";
import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

const menuLinks: { label: string; page: PageName }[] = [
  { label: "Ana Sayfa", page: "home" },
  { label: "Etkinlikler", page: "events" },
  { label: "Ekle", page: "add" },
];

function Navigation({ current, onNavigate }: NavigationProps) {
  function navigate(e: MouseEvent<HTMLAnchorElement>, page: PageName) {
    e.preventDefault();
    onNavigate(page);
  }
  return (
    <nav className="menu" aria-label="Ana menü">
      {menuLinks.map((item) => (
        <a
          key={item.page}
          href={`#${item.page}`}
          onClick={(e) => navigate(e, item.page)}
          aria-current={current === item.page || (current === "detail" && item.page === "events") ? "page" : undefined}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export default Navigation;
