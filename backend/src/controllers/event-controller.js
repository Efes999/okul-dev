import { events } from "../data/events.js";

export function getEvents(req, res) {
  const { category } = req.query;
  const result = category
    ? events.filter((event) => event.category === category)
    : events;
  res.status(200).json(result);
}

// GET /events/:id - örn. /events/event-2
export function getEventById(req, res) {
  const event = events.find((item) => item.id === req.params.id);
  if (!event) {
    return res.status(404).json({ error: { message: "Event not found" } });
  }
  return res.status(200).json(event);
}
