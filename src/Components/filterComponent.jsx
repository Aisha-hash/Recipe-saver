/**
 * FilterComponent renders a dropdown menu for selecting a category filter.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.filter - The current selected filter value.
 * @param {Function} props.setFilter - Callback to update the filter value.
 * @param {string[]} props.categories - Array of available category options.
 * @returns {JSX.Element} The FilterComponent.
 */
const FilterComponent = ({ filter, setFilter, categories }) => {
  return (
    <div className="rounded-md shadow-md">
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)} // Updates filter value on selection change.
        className="border p-2 rounded-md w-full"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterComponent;
