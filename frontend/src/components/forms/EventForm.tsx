import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { EventFormData, EventFormErrors } from "../../types/event-form";
import { CATEGORIES } from "../../types/event-form";
import { validateEvent } from "../../utils/validate-event";
interface Props { initialData: EventFormData; submitText: string; onSubmit: (data: EventFormData) => void; }
export default function EventForm({ initialData, submitText, onSubmit }: Props) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});
  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setData((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateEvent(data);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit(data);
  }
  const err = (name: keyof EventFormData) => errors[name] ? <span id={`${name}-error`} className="hata-metni" role="alert">{errors[name]}</span> : null;
  const invalid = (name: keyof EventFormData) => errors[name] ? true : undefined;
  return (
    <form className="form etkinlik-formu" noValidate onSubmit={handleSubmit} aria-label="Etkinlik formu">
      <div className="form-grup"><label htmlFor="title">Etkinlik Adı</label>
        <input name="title" id="title" type="text" placeholder="Örn. Kariyer Günleri 2026" value={data.title} onChange={handleChange} aria-invalid={invalid("title")} aria-describedby={errors.title ? "title-error" : undefined} />{err("title")}</div>
      <div className="form-grup"><label htmlFor="category">Kategori</label>
        <select name="category" id="category" value={data.category} onChange={handleChange} aria-invalid={invalid("category")} aria-describedby={errors.category ? "category-error" : undefined}>
          <option value="">Seçiniz</option>{CATEGORIES.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>{err("category")}</div>
      <div className="form-iki-sutun">
        <div className="form-grup"><label htmlFor="date">Tarih</label>
          <input name="date" id="date" type="date" value={data.date} onChange={handleChange} aria-invalid={invalid("date")} aria-describedby={errors.date ? "date-error" : undefined} />{err("date")}</div>
        <div className="form-grup"><label htmlFor="time">Saat</label>
          <input name="time" id="time" type="time" value={data.time} onChange={handleChange} aria-invalid={invalid("time")} aria-describedby={errors.time ? "time-error" : undefined} />{err("time")}</div>
      </div>
      <div className="form-grup"><label htmlFor="location">Yer</label>
        <input name="location" id="location" type="text" value={data.location} onChange={handleChange} placeholder="Örn. A Blok Konferans Salonu" aria-invalid={invalid("location")} aria-describedby={errors.location ? "location-error" : undefined} />{err("location")}</div>
      <div className="form-grup"><label htmlFor="capacity">Kontenjan</label>
        <input name="capacity" id="capacity" type="number" min={1} max={1000} step={1} placeholder="Örn. 120" value={data.capacity} onChange={handleChange} aria-invalid={invalid("capacity")} aria-describedby={errors.capacity ? "capacity-error" : undefined} />{err("capacity")}</div>
      <div className="form-grup"><label htmlFor="description">Açıklama</label>
        <textarea name="description" id="description" rows={5} placeholder="Etkinlik hakkında en az 10 karakter yazın..." value={data.description} onChange={handleChange} aria-invalid={invalid("description")} aria-describedby={errors.description ? "description-error" : undefined} />{err("description")}</div>
      <div className="form-dugme-satiri"><button type="submit" className="ana-buton">{submitText}</button><p className="form-bilgilendirme">* Tüm alanları geçerli doldurun. Kayıt bu oturumda diğer sayfalara yansır.</p></div>
    </form>
  );
}
