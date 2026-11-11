import { events } from "../data/events.js";

// GET /events ve isteğe bağlı GET /events?category=Atölye
export function getEvents(req, res) {
  const { category } = req.query;
  const result = category
    ? events.filter((event) => event.category === category)
    : events;

  res.status(200).json(result);
}
