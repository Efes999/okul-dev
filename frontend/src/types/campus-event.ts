/** Sprint 4 sunumunun birebir istediği union: yalnızca dört olası kategori. */
export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma";

/** Sprint 3 verileri GG-AA-YYYY tarih biçiminde saklanır. */
export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  date: string;
  time: string;
  location: string;
  description: string;
  capacity: number;
  image?: string;
}
