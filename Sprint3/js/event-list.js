import { events } from "./data.js";

const container = document.querySelector("#etkinlik-listesi");
const searchInput = document.querySelector("#arama");
const categorySelect = document.querySelector("#kategori");

function renderEvents(list) {
    if (!container) return;

    container.innerHTML = "";

    const limit = Number(container.dataset.limit || list.length);
    const visibleEvents = list.slice(0, limit);

    visibleEvents.forEach((event) => {
        const article = document.createElement("article");
        article.className = "event-card";

        article.innerHTML = `
            <h3>${event.title}</h3>
            <p><strong>Kategori:</strong> ${event.category}</p>
            <p><strong>Tarih:</strong> ${event.date}</p>
            <p><strong>Saat:</strong> ${event.time}</p>
            <p><strong>Konum:</strong> ${event.location}</p>
            <p>${event.description}</p>
            <a href="etkinlik-detay.html?id=${event.id}">Detayları gör</a>
        `;

        container.appendChild(article);
    });
}

function applyFilters() {
    const searchText = searchInput ? searchInput.value.toLowerCase() : "";
    const selectedCategory = categorySelect ? categorySelect.value : "";

    const filteredEvents = events.filter((event) => {
        const matchesSearch =
            event.title.toLowerCase().includes(searchText) ||
            event.description.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "" ||
            event.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    renderEvents(filteredEvents);
}

renderEvents(events);

if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
}

if (categorySelect) {
    categorySelect.addEventListener("change", applyFilters);
}