import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { events } from "../src/data/events.ts";
import { searchEvents, filterByCategory, findEventById } from "../src/utils/filter-events.ts";

const sprint3 = JSON.parse(readFileSync(new URL("./sprint3-original-events.json", import.meta.url), "utf8"));

test("6 orijinal Sprint 3 etkinliği var ve kimlikler benzersiz", () => {
  assert.equal(events.length, 6);
  assert.equal(new Set(events.map(e => e.id)).size, 6);
});
test("Sprint 3 verilerindeki her alan ve değer aynen korunmuş", () => {
  assert.deepEqual(events.map(({image, ...rest}) => rest), sprint3);
});
test("Sadece ilk etkinliğe /afis.svg eklendi; diğerlerinde afiş yok", () => {
  assert.equal(events[0].image, "/afis.svg");
  assert.ok(events.slice(1).every(e => e.image === undefined));
});
test("Türkçe arama başlık ve açıklamada çalışıyor", () => {
  assert.deepEqual(searchEvents(events, "ROBOTİK").map(e => e.id), ["event-2"]);
  assert.deepEqual(searchEvents(events, "kullanım").map(e => e.id), ["event-5"]);
  assert.equal(searchEvents(events, "xyz").length, 0);
});
test("Boşluklu arama Türkçe yerel küçük harfe duyarlı", () => {
  assert.equal(searchEvents(events, "  ATÖLYE ").length, 3);
  assert.equal(searchEvents(events, "").length, 6);
});
test("Gerçek Sprint 3 verisinde 3 Atölye ve 3 Seminer", () => {
  assert.equal(filterByCategory(events, "Atölye").length, 3);
  assert.equal(filterByCategory(events, "Seminer").length, 3);
  assert.equal(filterByCategory(events, "").length, 6);
});
test("Arama ve kategori beraber uygulanıyor", () => {
  assert.deepEqual(filterByCategory(searchEvents(events, "web"), "Atölye").map(e=>e.id), ["event-4"]);
  assert.equal(filterByCategory(searchEvents(events, "web"), "Seminer").length, 0);
});
test("Etkinlik seçme: varsa kayıt, yoksa undefined", () => {
  assert.equal(findEventById(events, "event-3")?.title, "Siber Güvenlik Söyleşisi");
  assert.equal(findEventById(events, "yok"), undefined);
});
test("GG-AA-YYYY biçiminden tarihe göre ilk iki doğru bulunuyor", () => {
  const original = events.map(e => e.id);
  const toISODate = s => { const [d, m, y] = s.split("-"); return `${y}-${m}-${d}`; };
  const sorted = [...events].sort((a, b) => toISODate(a.date).localeCompare(toISODate(b.date))).slice(0,2);
  assert.deepEqual(sorted.map(e => e.id), ["event-1", "event-2"]);
  assert.deepEqual(events.map(e => e.id), original);
});
test("Orijinal veri tipleri doğru ve tarihler GG-AA-YYYY", () => {
  for (const e of events) {
    assert.match(e.date, /^\d{2}-\d{2}-\d{4}$/);
    assert.ok(Number.isInteger(e.capacity));
    assert.ok(e.capacity > 0);
  }
});
