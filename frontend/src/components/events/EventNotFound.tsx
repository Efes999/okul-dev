/** Dokuzuncu küçük bileşen: Sprint 4'teki geçersiz detay ekranı. */
interface EventNotFoundProps {
  onBack: () => void;
}

function EventNotFound({ onBack }: EventNotFoundProps) {
  return (
    <section className="icerik-bolumu hata-mesaji" role="alert">
      <h2>Etkinlik bulunamadı</h2>
      <p>Seçtiğin etkinlik silinmiş veya geçersiz olabilir.</p>
      <button type="button" className="ana-buton" onClick={onBack}>Listeye dön</button>
    </section>
  );
}

export default EventNotFound;
