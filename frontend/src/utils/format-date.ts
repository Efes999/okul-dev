/** Veri kayıtları GG-AA-YYYY, HTML date input ISO biçimindedir. */
export function toISODate(value: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const [day, month, year] = value.split("-");
  return `${year}-${month}-${day}`;
}
export function toStoredDate(value: string): string {
  if (/^\d{2}-\d{2}-\d{4}$/.test(value)) return value;
  const [year, month, day] = value.split("-");
  return `${day}-${month}-${year}`;
}
export function formatDate(value: string): string {
  const isoDate = toISODate(value);
  const parsed = new Date(`${isoDate}T12:00:00`);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}
