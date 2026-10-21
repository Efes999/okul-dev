/** Sprint 3 tarihlerini sıralama ve HTML dateTime için ISO biçimine çevirir. */
export function toISODate(sprint3Date: string): string {
  const [day, month, year] = sprint3Date.split("-");
  return `${year}-${month}-${day}`;
}

/** Kullanıcının gördüğü tarihi Sprint 4'teki gibi Türkçe yazar. */
export function formatDate(sprint3Date: string): string {
  const isoDate = toISODate(sprint3Date);
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString("tr-TR", {
    day: "numeric", month: "long", year: "numeric",
  });
}
