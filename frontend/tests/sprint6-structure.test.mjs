import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

test("Yönergenin 10 route'u eksiksiz tanımlı", () => {
  const text = read("src/App.tsx");
  const required = ["/", "/events", "/events/:id", "/login", "/register", "/forgot-password", "/admin", "/admin/new", "/admin/:id/edit", "*"];
  const routes = [...text.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(routes, required);
});

test("10 sayfa ile 8 zorunlu bileşenin tüm dosyaları var", () => {
  const names = ["HomePage", "EventsPage", "EventDetailPage", "LoginPage", "RegisterPage", "ForgotPasswordPage", "AdminPage", "AddEventPage", "EditEventPage", "NotFoundPage"];
  names.forEach((name) => assert.ok(fs.existsSync(path.join(root, `src/pages/${name}.tsx`)), name));
  for (const file of ["layout/Header", "layout/Navigation", "layout/Footer", "events/EventCard", "events/EventList", "events/EventFilter", "events/EventDetail", "forms/EventForm"]) {
    assert.ok(fs.existsSync(path.join(root, `src/components/${file}.tsx`)), file);
  }
});

test("Context provider tüm route'ları sarıyor", () => {
  const main = read("src/main.tsx");
  assert.match(main, /<BrowserRouter>/);
  assert.match(main, /<EventsProvider>\s*<App\s*\/>\s*<\/EventsProvider>/);
  const context = read("src/context/EventsContext.tsx");
  for (const fn of ["appendEvent", "replaceEvent", "removeEvent"]) assert.ok(context.includes(fn));
});

test("Silme yalnızca onay verilirse çalışır", () => {
  const page = read("src/pages/AdminPage.tsx");
  assert.match(page, /if\s*\(window\.confirm\([^\n]*\)\)\s*deleteEvent\(event\.id\)/);
});

test("Menüde React Router NavLink ve etkinlik kartında Link var", () => {
  assert.match(read("src/components/layout/Navigation.tsx"), /<NavLink/);
  assert.match(read("src/components/events/EventCard.tsx"), /to=\{`\/events\/\$\{event\.id\}`\}/);
});

test("Yönetim tablosu ve mobil kartlar responsive CSS'de ayrı", () => {
  const css = read("src/App.css");
  assert.match(css, /@media\s*\(max-width:\s*680px\)/);
  assert.match(css, /\.table-scroll\s*\{display:none;/);
  assert.match(css, /\.yonetim-kartlari\s*\{display:grid;/);
});

test("Vercel SPA doğrudan sayfa yenileme için rewrite tanımlı", () => {
  const config = JSON.parse(read("vercel.json"));
  assert.ok(config.rewrites.some((row) => row.source === "/(.*)" && row.destination === "/index.html"));
});
