import test from "node:test";
import assert from "node:assert/strict";
import { events as original } from "../src/data/events.ts";
import { appendEvent, replaceEvent, removeEvent } from "../src/utils/event-operations.ts";
import { filterByCategory, searchEvents, findEventById } from "../src/utils/filter-events.ts";

const sample = {
  title: " Yeni Konferans ", category: "Seminer", date: "2026-11-20", time: "15:30",
  location: " A Salonu ", capacity: "80", description: "Yeni bir etkinliğin detayları",
};

test("Context'in kullandığı ekleme listeyi günceller; eski diziyi değiştirmez", () => {
  const result = appendEvent(original, "event-new", sample);
  assert.equal(original.length, 6);
  assert.equal(result.length, 7);
  assert.equal(result[6].id, "event-new");
  assert.equal(result[6].title, "Yeni Konferans");
  assert.equal(result[6].date, "20-11-2026");
  assert.equal(result[6].capacity, 80);
  assert.notStrictEqual(result, original);
  assert.ok(findEventById(result, "event-new"));
});

test("Context'in güncellemesi yalnızca seçilen kaydı değiştirir ve filtreye yansır", () => {
  const updated = replaceEvent(original, "event-2", { ...sample, category: "Yarışma" });
  assert.equal(original[1].title, "Robotik Atölyesi");
  assert.equal(updated[1].title, "Yeni Konferans");
  assert.equal(updated[1].category, "Yarışma");
  assert.equal(updated[0], original[0]);
  assert.equal(searchEvents(updated, "Yeni Konferans").length, 1);
  assert.equal(filterByCategory(updated, "Yarışma").length, 1);
});

test("Context silme sonrası liste ve detayda silinen etkinlik kaybolur", () => {
  const result = removeEvent(original, "event-1");
  assert.equal(result.length, 5);
  assert.equal(findEventById(result, "event-1"), undefined);
  assert.equal(original.length, 6);
});

