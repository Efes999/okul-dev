// Sıfır harici test bağımlılığı: node:test + mock response.
// npm test, Express yüklenmeden de controller davranışlarını sınar.
import { test } from "node:test";
import assert from "node:assert/strict";
import { events } from "../src/data/events.js";
import { getEvents, getEventById, createEvent } from "../src/controllers/event-controller.js";

function response() {
  return {
    statusCode: 200,
    body: undefined,
    status(code) { this.statusCode = code; return this; },
    json(value) { this.body = value; return this; },
  };
}

test("Başlangıçta 6 özgün etkinlik ve 6 farklı id var", () => {
  assert.equal(events.length, 6);
  assert.deepEqual(events.map((e) => e.id), ["event-1","event-2","event-3","event-4","event-5","event-6"]);
  assert.equal(events[1].title, "Robotik Atölyesi");
});

test("GET /events 200, 6 etkinlik", () => {
  const res = response();
  getEvents({ query: {} }, res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.length, 6);
});

test("GET /events?category=Atölye kategori filtreler", () => {
  const res = response();
  getEvents({ query: { category: "Atölye" } }, res);
  assert.equal(res.statusCode, 200);
  assert.ok(res.body.length > 0);
  assert.ok(res.body.every((e) => e.category === "Atölye"));
});

test("GET /events/event-2 200, Robotik", () => {
  const res = response();
  getEventById({ params: { id: "event-2" } }, res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.id, "event-2");
});

test("GET /events/yok 404, yapılandırılmış JSON", () => {
  const res = response();
  getEventById({ params: { id: "yok" } }, res);
  assert.equal(res.statusCode, 404);
  assert.deepEqual(res.body, { error: { message: "Event not found" } });
});

test("POST sadece title 400, dizi değişmez", () => {
  const before = events.length;
  const res = response();
  createEvent({ body: { title: "Eksik" } }, res);
  assert.equal(res.statusCode, 400);
  assert.ok(res.body.error.message.includes("required"));
  assert.equal(events.length, before);
});

test("POST boş body 400, sunucu hata fırlatmaz", () => {
  const res = response();
  createEvent({ body: undefined }, res);
  assert.equal(res.statusCode, 400);
});

test("POST tam body 201, yeni id ve 7 kayıt", () => {
  const res = response();
  createEvent({ body: { title:"Git Atölyesi",category:"Atölye",date:"2026-12-01",capacity:30,location:"Lab" } }, res);
  assert.equal(res.statusCode, 201);
  assert.match(res.body.id, /^event-\d+$/);
  assert.equal(events.length, 7);
  assert.equal(events.at(-1).title, "Git Atölyesi");
});

test("Art arda POST işlemleri benzersiz id üretir", () => {
  const res = response();
  createEvent({ body: {title:"Siber Güvenlik",category:"Seminer",date:"2026-12-02"} }, res);
  assert.equal(res.statusCode, 201);
  assert.equal(new Set(events.map((e) => e.id)).size, events.length);
});
