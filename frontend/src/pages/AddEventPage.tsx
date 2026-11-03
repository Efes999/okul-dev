import { useNavigate } from "react-router-dom";
import EventForm from "../components/forms/EventForm";
import { useEvents } from "../context/EventsContext";
import { emptyEventForm } from "../types/event-form";
export default function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();
  return <section className="icerik-bolumu form-sayfasi"><div className="bolum-baslik"><div>
    <p className="bolum-ust-etiket">YÖNETİM · YENİ KAYIT</p><h2>Etkinlik Ekle</h2><p>Tüm bilgileri doldurun. Kaydettiğiniz etkinlik listeye eklenecektir.</p>
  </div></div><EventForm initialData={emptyEventForm} submitText="Kaydet" onSubmit={(data) => { addEvent(data); navigate("/admin"); }} /></section>;
}
