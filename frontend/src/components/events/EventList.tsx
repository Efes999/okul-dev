import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  onShowDetail: (id: string) => void;
  emptyText?: string;
  className?: string;
}

/** Hem ana sayfa hem etkinlikler ekranı aynı liste bileşenini kullanır. */
function EventList({ events, onShowDetail, emptyText = "Etkinlik bulunamadı.", className = "" }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="bos-sonuc" role="status">
        <h3>{emptyText}</h3>
        <p>Başka bir kelime veya kategori deneyebilirsin.</p>
      </div>
    );
  }
  return (
    <div className={`etkinlik-listesi${className ? ` ${className}` : ""}`}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} onShowDetail={onShowDetail} />
      ))}
    </div>
  );
}

export default EventList;
