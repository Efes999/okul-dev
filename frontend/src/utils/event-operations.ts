import type { CampusEvent, Category } from "../types/campus-event";
import type { EventFormData } from "../types/event-form";
import { toStoredDate } from "./format-date.ts";

/** Bütün sayfaların kullandığı güncelleme işlemlerinin saf (pure) çekirdeği. */
export function formToEvent(id: string, data: EventFormData): CampusEvent {
  return {
    id,
    title: data.title.trim(),
    category: data.category as Category,
    date: toStoredDate(data.date),
    time: data.time,
    location: data.location.trim(),
    description: data.description.trim(),
    capacity: Number(data.capacity),
  };
}

export function appendEvent(previous: CampusEvent[], id: string, data: EventFormData): CampusEvent[] {
  return [...previous, formToEvent(id, data)];
}
export function replaceEvent(previous: CampusEvent[], id: string, data: EventFormData): CampusEvent[] {
  return previous.map((event) => event.id === id ? { ...event, ...formToEvent(id, data) } : event);
}
export function removeEvent(previous: CampusEvent[], id: string): CampusEvent[] {
  return previous.filter((event) => event.id !== id);
}
