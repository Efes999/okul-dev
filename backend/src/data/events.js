// Önceki Kampüs Etkinlikleri projesindeki kullanıcıya ait 6 etkinlik.
// Tarihler REST API için YYYY-MM-DD biçimine dönüştürülmüştür.
// Sprint 7'de veritabanı yoktur: POST ile eklenen kayıtlar RAM'de tutulur.
export const events = [
  {
    "id": "event-1",
    "title": "Kariyer Günleri",
    "category": "Seminer",
    "date": "2026-10-12",
    "time": "14:00",
    "location": "A Blok Konferans Salonu",
    "description": "Mezunlarla kariyer ve sektör üzerine söyleşiler.",
    "capacity": 120,
    "image": "/afis.svg"
  },
  {
    "id": "event-2",
    "title": "Robotik Atölyesi",
    "category": "Atölye",
    "date": "2026-10-20",
    "time": "13:00",
    "location": "Mühendislik Laboratuvarı",
    "description": "Robotik sistemler üzerine uygulamalı atölye.",
    "capacity": 40
  },
  {
    "id": "event-3",
    "title": "Siber Güvenlik Söyleşisi",
    "category": "Seminer",
    "date": "2026-10-25",
    "time": "15:00",
    "location": "B Blok Konferans Salonu",
    "description": "Siber güvenlik alanındaki güncel gelişmeler konuşulacak.",
    "capacity": 100
  },
  {
    "id": "event-4",
    "title": "Web Tasarım Atölyesi",
    "category": "Atölye",
    "date": "2026-10-28",
    "time": "11:00",
    "location": "Bilgisayar Laboratuvarı",
    "description": "HTML ve CSS kullanarak web tasarımı uygulamaları.",
    "capacity": 35
  },
  {
    "id": "event-5",
    "title": "Yapay Zeka Semineri",
    "category": "Seminer",
    "date": "2026-11-05",
    "time": "14:30",
    "location": "C Blok Konferans Salonu",
    "description": "Yapay zeka teknolojileri ve kullanım alanları.",
    "capacity": 150
  },
  {
    "id": "event-6",
    "title": "Mobil Uygulama Atölyesi",
    "category": "Atölye",
    "date": "2026-11-10",
    "time": "10:00",
    "location": "Yazılım Laboratuvarı",
    "description": "Mobil uygulama geliştirmeye giriş atölyesi.",
    "capacity": 30
  }
];
