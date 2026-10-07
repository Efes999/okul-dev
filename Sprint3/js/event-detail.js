import { events } from "./data.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const selectedEvent = events.find(function(event) {
    return event.id === id;
});

const detayAlani = document.getElementById("etkinlik-detay");

if (selectedEvent) {

    detayAlani.innerHTML = `
        <article class="event-card">
            <h2>${selectedEvent.title}</h2>

            <p><strong>Kategori:</strong> ${selectedEvent.category}</p>

            <p><strong>Tarih:</strong> ${selectedEvent.date}</p>

            <p><strong>Saat:</strong> ${selectedEvent.time}</p>

            <p><strong>Konum:</strong> ${selectedEvent.location}</p>

            <p><strong>Kontenjan:</strong> ${selectedEvent.capacity}</p>

            <p><strong>Açıklama:</strong> ${selectedEvent.description}</p>

            <a href="etkinlik-guncelle.html?id=${selectedEvent.id}">
                Bu etkinliği güncelle
            </a>
        </article>
    `;

} else {

    detayAlani.innerHTML = `
        <h2>Etkinlik bulunamadı</h2>
        <p>Geçerli bir etkinlik seçilmedi.</p>
        <a href="etkinlikler.html">Etkinliklere dön</a>
    `;
}