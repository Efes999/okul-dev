import type { FormEvent } from "react";

interface EventFormProps {
  mode: "add" | "update";
  onSubmit: () => void;
}

/** Sprint 5 yalnızca formu ayırır; veri kaydı Sprint 6'da yapılacak. */
function EventForm({ mode, onSubmit }: EventFormProps) {
  const isAdd = mode === "add";
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit();
  }
  return (
    <section className="icerik-bolumu form-sayfasi" aria-labelledby="form-baslik">
      <div className="bolum-baslik">
        <div>
          <p className="bolum-ust-etiket">Etkinlik yönetimi</p>
          <h2 id="form-baslik">{isAdd ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
          <p>Bu sprintte yalnızca formun görünümü hazırlanır. Kaydet butonu sayfayı yenilemez.</p>
        </div>
      </div>
      <form className="form etkinlik-formu" onSubmit={handleSubmit} noValidate
        aria-label={isAdd ? "Etkinlik ekleme formu" : "Etkinlik güncelleme formu"}>
        <div className="form-grup">
          <label htmlFor="title">Etkinlik Adı</label>
          <input id="title" name="title" type="text" maxLength={80} placeholder="Örn. Kariyer Günleri 2026" />
        </div>
        <div className="form-grup">
          <label htmlFor="event-category">Kategori</label>
          <select id="event-category" name="category" defaultValue="">
            <option value="">Seçiniz</option>
            <option value="Seminer">Seminer</option>
            <option value="Atölye">Atölye</option>
            <option value="Konferans">Konferans</option>
            <option value="Spor">Spor</option>
          </select>
        </div>
        <div className="form-iki-sutun">
          <div className="form-grup"><label htmlFor="date">Tarih</label><input id="date" name="date" type="date" /></div>
          <div className="form-grup"><label htmlFor="time">Saat</label><input id="time" name="time" type="time" /></div>
        </div>
        <div className="form-grup">
          <label htmlFor="location">Yer</label>
          <input id="location" name="location" type="text" placeholder="Örn. A Blok Konferans Salonu" />
        </div>
        <div className="form-grup">
          <label htmlFor="capacity">Kontenjan</label>
          <input id="capacity" name="capacity" type="number" min={1} step={1} placeholder="Örn. 120" />
        </div>
        <div className="form-grup">
          <label htmlFor="description">Açıklama</label>
          <textarea id="description" name="description" rows={6} placeholder="Etkinlik açıklaması..." />
        </div>
        <div className="form-dugme-satiri">
          <button type="submit" className="ana-buton">{mode === "update" ? "Güncelle" : "Kaydet"}</button>
          <span className="form-bilgilendirme">Sprint 4: kayıt işlemi yapılmaz.</span>
        </div>
      </form>
    </section>
  );
}

export default EventForm;
