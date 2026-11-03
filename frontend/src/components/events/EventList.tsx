import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";
interface Props { events: CampusEvent[]; emptyText?: string; }
export default function EventList({ events, emptyText = "Henüz etkinlik bulunmuyor." }: Props) {
  if (events.length === 0) return <div className="bos-sonuc" role="status">{emptyText}</div>;
  return <div className="etkinlik-listesi">{events.map((event) => <EventCard key={event.id} event={event} />)}</div>;
}
