import { useNavigate, useParams } from "react-router-dom";
import EventForm from "../components/forms/EventForm";
import EventNotFound from "../components/events/EventNotFound";
import { useEvents } from "../context/EventsContext";
import { toISODate } from "../utils/format-date";
import type { EventFormData } from "../types/event-form";
export default function EditEventPage() {
  const { id } = useParams();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();
  const event = events.find((item) => item.id === id);
  if (!event) return <EventNotFound />;
  const initialData: EventFormData = {
    title: event.title.trim(), category: event.category, date: toISODate(event.date),
    time: event.time, location: event.location, capacity: String(event.capacity), description: event.description,
  };
  return <section className="icerik-bolumu form-sayfasi"><div className="bolum-baslik"><div>
    <p className="bolum-ust-etiket">YÖNETİM · DÜZENLE</p><h2>Etkinlik Düzenle</h2><p>Mevcut etkinlik bilgilerini güncelleyin.</p>
  </div></div><EventForm key={event.id} initialData={initialData} submitText="Güncelle" onSubmit={(data) => { updateEvent(event.id, data); navigate("/admin"); }} /></section>;
}
