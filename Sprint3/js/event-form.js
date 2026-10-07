import { events } from "./data.js";

const form = document.getElementById("event-form");

if (form) {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const mesaj = document.getElementById("form-mesaj");

    let etkinlik = null;

    // GÜNCELLEME SAYFASI
    if (form.dataset.mode === "guncelle") {

        etkinlik = events.find((e) => e.id === id);

        // ID yoksa veya etkinlik bulunamazsa
        if (!etkinlik) {

            form.innerHTML = `
                <div class="hata-mesaji">
                    Güncellenecek etkinlik bulunamadı.
                </div>

                <p>
                    <a href="etkinlikler.html">
                        Etkinliklere git
                    </a>
                </p>
            `;

        } else {

            // Formu etkinlik bilgileriyle doldur
            form.elements.title.value = etkinlik.title;
            form.elements.category.value = etkinlik.category;

            const tarih = etkinlik.date.split("-");

            form.elements.date.value =
                `${tarih[2]}-${tarih[1]}-${tarih[0]}`;

            form.elements.time.value = etkinlik.time;
            form.elements.location.value = etkinlik.location;
            form.elements.capacity.value = etkinlik.capacity;
            form.elements.description.value = etkinlik.description;
        }
    }


    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const fd = new FormData(form);

        const data = {

            id: id || "event-7",

            title:
                (fd.get("title") || "").trim(),

            category:
                fd.get("category") || "",

            date:
                fd.get("date") || "",

            time:
                fd.get("time") || "",

            location:
                (fd.get("location") || "").trim(),

            capacity:
                fd.get("capacity")
                    ? Number(fd.get("capacity"))
                    : "",

            description:
                (fd.get("description") || "").trim()
        };


        const errors = {};


        if (data.title.length < 3) {
            errors.title =
                "En az 3 karakter olmalı.";
        }


        if (data.category === "") {
            errors.category =
                "Kategori seçiniz.";
        }


        if (data.date === "") {
            errors.date =
                "Tarih seçiniz.";
        }


        if (data.time === "") {
            errors.time =
                "Saat seçiniz.";
        }


        if (data.location === "") {
            errors.location =
                "Yer bilgisi giriniz.";
        }


        if (
            data.capacity !== "" &&
            (
                data.capacity < 1 ||
                data.capacity > 1000
            )
        ) {

            errors.capacity =
                "Kontenjan 1 ile 1000 arasında olmalı.";
        }


        // Eski hataları temizle
        const eskiHatalar =
            form.querySelectorAll(".alan-hata");

        eskiHatalar.forEach((hata) => {
            hata.remove();
        });


        const inputs =
            form.querySelectorAll(
                "input, select, textarea"
            );

        inputs.forEach((alan) => {
            alan.removeAttribute("aria-invalid");
        });


        // Yeni hataları göster
        Object.keys(errors).forEach((name) => {

            const alan =
                form.elements[name];

            if (alan) {

                alan.setAttribute(
                    "aria-invalid",
                    "true"
                );

                const hata =
                    document.createElement("span");

                hata.className =
                    "alan-hata";

                hata.textContent =
                    errors[name];

                alan.insertAdjacentElement(
                    "afterend",
                    hata
                );
            }
        });


        // Hata varsa
        if (Object.keys(errors).length > 0) {

            mesaj.className =
                "hata-mesaji";

            mesaj.textContent =
                "Formda hatalı alanlar var.";

            return;
        }


        // BAŞARILI
        mesaj.className =
            "basari-mesaji";


        if (form.dataset.mode === "guncelle") {

            mesaj.innerHTML = `
                <p>
                    Etkinlik güncellendi:
                </p>

                <pre>${JSON.stringify(data, null, 2)}</pre>
            `;

        } else {

            mesaj.innerHTML = `
                <p>
                    Etkinlik oluşturuldu:
                </p>

                <pre>${JSON.stringify(data, null, 2)}</pre>
            `;
        }


        console.log(data);

    });

}