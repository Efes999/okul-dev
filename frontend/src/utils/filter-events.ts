import type { CampusEvent, Category } from "../types/campus-event";

/** Başlıkta veya açıklamada (Türkçe harf duyarlı) metin ara. Saf fonksiyon. */
export function searchEvents(list: CampusEvent[], text: string): CampusEvent[] {
  const q = text.trim().toLocaleLowerCase("tr-TR");
  return list.filter((event) =>
    (event.title + " " + event.description).toLocaleLowerCase("tr-TR").includes(q),
  );
}

/** Boş kategori bütün kayıtları gösterir; diğer durumda tam kategori eşleşir. */
export function filterByCategory(
  list: CampusEvent[],
  category: Category | "",
): CampusEvent[] {
  if (category === "") return list;
  return list.filter((event) => event.category === category);
}

/** Bulunamazsa undefined, bulunursa tek etkinlik döndürür. */
export function findEventById(
  list: CampusEvent[],
  id: string,
): CampusEvent | undefined {
  return list.find((event) => event.id === id);
}
