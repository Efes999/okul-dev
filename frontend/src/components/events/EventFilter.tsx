import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  category: Category | "";
  categories: Category[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: Category | "") => void;
}

/** Input yalnızca değeri ve callback'i alır; state App'te kalır (lifting state). */
function EventFilter({ searchText, category, categories, onSearchChange, onCategoryChange }: EventFilterProps) {
  return (
    <div className="filtre-paneli">
      <div className="form-grup">
        <label htmlFor="search-events">Etkinlik Ara</label>
        <input
          id="search-events"
          type="search"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Etkinlik adı ya da açıklama..."
          autoComplete="off"
        />
      </div>
      <div className="form-grup">
        <label htmlFor="category-filter">Kategori</label>
        <select
          id="category-filter"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as Category | "")}
        >
          <option value="">Tümü</option>
          {categories.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </div>
    </div>
  );
}

export default EventFilter;
