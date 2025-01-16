import React from "react";
import { Heart } from "lucide-react";

/**
 * FavoriteButton component renders a heart icon to indicate and toggle the favorite state of an item.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.isFavorite - Indicates if the item is currently marked as favorite.
 * @param {Function} props.toggleFavorite - Function to toggle the favorite state of the item.
 * @returns {JSX.Element} The FavoriteButton component.
 */
const FavoriteButton = ({ isFavorite, toggleFavorite }) => {
  return (
    <div
      onClick={(e) => {
        e.preventDefault(); // Prevent default action of the click event.
        toggleFavorite(); // Call the function to toggle the favorite state.
      }}
    >
      {/* Render the heart icon based on the favorite state */}
      {!isFavorite ? (
        <Heart size={20} className="hover:fill-red-500 hover:text-red-500" />
      ) : (
        <Heart size={20} className="fill-red-500 text-red-500" />
      )}
    </div>
  );
};

export default FavoriteButton;
