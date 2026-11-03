import { useParams } from "react-router-dom";
import EventDetail from "../components/events/EventDetail";
import EventNotFound from "../components/events/EventNotFound";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
export default function EventDetailPage() {
  const { id } = useParams();
  const { events } = useEvents();
  const event = findEventById(events, id ?? "");
  if (!event) return <EventNotFound />;
  return <section className="icerik-bolumu"><EventDetail event={event} /></section>;
}
