import type { Category } from "../../types/campus-event";
interface Props {
  searchText: string; category: Category | ""; categories: Category[];
  onSearchChange: (value: string) => void; onCategoryChange: (value: Category | "") => void;
}
export default function EventFilter({ searchText, category, categories, onSearchChange, onCategoryChange }: Props) {
  return <div className="filtre-paneli" role="search">
    <div className="form-grup"><label htmlFor="search-events">Etkinlik Ara</label>
      <input id="search-events" type="search" placeholder="Örn. atölye, kariyer..." value={searchText} onChange={(event) => onSearchChange(event.target.value)} />
    </div>
    <div className="form-grup"><label htmlFor="category-filter">Kategori</label>
      <select id="category-filter" value={category} onChange={(event) => onCategoryChange(event.target.value as Category | "")}>
        <option value="">Tümü</option>
        {categories.map((value) => <option value={value} key={value}>{value}</option>)}
      </select>
    </div>
  </div>;
}
