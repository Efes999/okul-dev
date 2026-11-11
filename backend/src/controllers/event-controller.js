import { events } from "../data/events.js";

export function getEvents(req, res) {
  const { category } = req.query;
  const result = category
    ? events.filter((event) => event.category === category)
    : events;
  res.status(200).json(result);
}

export function getEventById(req, res) {
  const event = events.find((item) => item.id === req.params.id);
  if (!event) {
    return res.status(404).json({ error: { message: "Event not found" } });
  }
  return res.status(200).json(event);
}

// Bellek içi kayıt için event-7, event-8, ... biçiminde çakışmayan ID üretir.
let nextEventNumber = 7;

export function createEvent(req, res) {
  const body = req.body ?? {};
  const { title, category, date } = body;

  // Sprint 7 sözleşmesi: en az title, category, date gereklidir.
  if (
    typeof title !== "string" || !title.trim() ||
    typeof category !== "string" || !category.trim() ||
    typeof date !== "string" || !date.trim()
  ) {
    return res.status(400).json({
      error: { message: "title, category and date are required" },
    });
  }

  const newEvent = {
    id: `event-${nextEventNumber++}`,
    title: title.trim(),
    category: category.trim(),
    date: date.trim(),
    capacity: Number(body.capacity) || 0,
    time: typeof body.time === "string" ? body.time : "",
    location: typeof body.location === "string" ? body.location : "",
    description: typeof body.description === "string" ? body.description : "",
  };

  events.push(newEvent);
  return res.status(201).json(newEvent);
}
