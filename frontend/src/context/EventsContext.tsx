import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { events as initialEvents } from "../data/events";
import type { CampusEvent } from "../types/campus-event";
import type { EventFormData } from "../types/event-form";
import { appendEvent, replaceEvent, removeEvent } from "../utils/event-operations";

interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => void;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
}
const EventsContext = createContext<EventsContextValue | null>(null);

/** Sprint 6: Tüm sayfalarda ortak React state'i. F5 sonrası başlangıç listesi geri gelir. */
export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(() => [...initialEvents]);
  function addEvent(data: EventFormData) {
    const id = `event-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
    setEvents((previous) => appendEvent(previous, id, data));
  }
  function updateEvent(id: string, data: EventFormData) {
    setEvents((previous) => replaceEvent(previous, id, data));
  }
  function deleteEvent(id: string) {
    setEvents((previous) => removeEvent(previous, id));
  }
  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}
export function useEvents(): EventsContextValue {
  const context = useContext(EventsContext);
  if (context === null) throw new Error("EventsProvider bulunamadı.");
  return context;
}
