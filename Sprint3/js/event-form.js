import { events } from "./data.js";

const form = document.getElementById("event-form");

if (form) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id) {
        const selectedEvent = events.find(event => event.id === id);

        if (selectedEvent) {
            const title = form.querySelector('[name="title"]');
            const category = form.querySelector('[name="category"]');
            const date = form.querySelector('[name="date"]');
            const time = form.querySelector('[name="time"]');
            const location = form.querySelector('[name="location"]');
            const description = form.querySelector('[name="description"]');
            const capacity = form.querySelector('[name="capacity"]');

            if (title) title.value = selectedEvent.title;
            if (category) category.value = selectedEvent.category;
            if (date) {
                const parts = selectedEvent.date.split("-");
                date.value = `${parts[2]}-${parts[1]}-${parts[0]}`;
            }
            if (time) time.value = selectedEvent.time;
            if (location) location.value = selectedEvent.location;
            if (description) description.value = selectedEvent.description;
            if (capacity) capacity.value = selectedEvent.capacity;
        }
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const capacity = form.querySelector('[name="capacity"]');

        if (capacity && Number(capacity.value) <= 0) {
            alert("Kontenjan 0'dan büyük olmalıdır.");
            return;
        }

        if (id) {
            alert("Etkinlik başarıyla güncellendi!");
        } else {
            alert("Etkinlik başarıyla kaydedildi!");
            form.reset();
        }
    });
}