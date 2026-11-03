import type { Category } from "./campus-event";

export interface EventFormData {
  title: string;
  category: Category | "";
  date: string;
  time: string;
  location: string;
  capacity: string;
  description: string;
}
export type EventFormErrors = Partial<Record<keyof EventFormData, string>>;
export const emptyEventForm: EventFormData = {
  title: "", category: "", date: "", time: "", location: "", capacity: "", description: "",
};
export const CATEGORIES: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];
