import React from "react";
import { Search } from "lucide-react";

/**
 * SearchBar component renders a search input field with an icon,
 * allowing the user to filter content based on a search term.
 *
 * @param {Object} props - The props for the SearchBar component.
 * @param {string} props.searchTerm - The current search term entered by the user.
 * @param {Function} props.setSearchTerm - A function to update the search term when the user types.
 *
 * @returns {JSX.Element} A form element containing an input field and a search icon.
 */
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <form>
      <label className="input shadow-md flex items-center gap-2">
        <Search size={"24"} />
        <input
          type="text"
          placeholder="Search by recipe or ingredient"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </label>
    </form>
  );
};

export default SearchBar;
