import { NavLink } from "react-router-dom";
const menu = [
  { to: "/", label: "Ana Sayfa", end: true },
  { to: "/events", label: "Etkinlikler", end: false },
  { to: "/admin", label: "Yönetim", end: false },
  { to: "/login", label: "Giriş", end: false },
];
export default function Navigation() {
  return (
    <nav className="menu" aria-label="Ana menü">
      {menu.map(({ to, label, end }) => (
        <NavLink key={to} to={to} end={end} className={({ isActive }) => isActive ? "nav-link aktif" : "nav-link"}>
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
