import './FilterBar.css';

// Список фільтрів — дані, а не три окремі шматки JSX.
// Додати новий фільтр = додати один рядок сюди.
const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

function FilterBar({ activeFilter, onFilterChange }) {
  return (
    <div className="filter-bar">
      <h1 id="extensions-title" className="filter-bar__title">
        Extensions List
      </h1>

      <div className="filter-bar__buttons" role="group" aria-label="Filter extensions">
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            className="filter-button"
            aria-pressed={filter.value === activeFilter}
            onClick={() => onFilterChange(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterBar;
