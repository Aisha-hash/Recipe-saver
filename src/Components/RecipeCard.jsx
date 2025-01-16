import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/actions/favoriteActions";
import { toggleFavorite } from "../utils/toggleFavorite";
import FavoriteButton from "./FavoriteButton";

/**
 * RecipeCard Component
 * Displays a recipe card with its image, name, category, and a favorite button.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.recipe - The recipe data object.
 * @param {string} props.recipe.id - Unique identifier for the recipe.
 * @param {string} props.recipe.name - Name of the recipe.
 * @param {string} props.recipe.img - URL of the recipe's image.
 * @param {string} props.recipe.category - Category of the recipe.
 * @returns {JSX.Element} The rendered RecipeCard component.
 */

const RecipeCard = ({ recipe }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Get the current list of favorite recipes from the Redux store
  const favorites = useSelector((state) => state.favorites.favorites);

  // Get the dispatch function to dispatch Redux actions
  const dispatch = useDispatch();

  /**
   * Update the isFavorite state based on whether the current recipe
   * exists in the favorites array.
   */
  useEffect(() => {
    setIsFavorite(favorites.some((fav) => fav && fav.id === recipe.id));
  }, [favorites]);

  /**
   * Handle toggling the favorite state for the current recipe.
   * Dispatches the appropriate Redux action using the toggleFavorite utility.
   */
  const handleToggleFavorite = () => {
    toggleFavorite(recipe, isFavorite, dispatch, addFavorite, removeFavorite);
  };

  return (
    <div className="flex flex-col rounded-md p-3 relative bg-[#ecf7d4]">
      <div>
        {/* Recipe Image */}
        <div className="relative h-32">
          <img
            src={recipe.img}
            alt={`${recipe.name} image`}
            className="rounded-md w-full h-full object-cover cursor-pointer"
          />
          <div className="absolute top-1 right-2 bg-white rounded-full p-1 cursor-pointer">
            {/* Favorite Button */}
            <FavoriteButton
              isFavorite={isFavorite}
              toggleFavorite={handleToggleFavorite}
            />
          </div>
        </div>

        {/* Recipe Name */}
        <p className="mt-1 font-bold tracking-wide text-center">
          {recipe.name}
        </p>

        {/* Recipe Category */}
        <p className="my-2 italic text-xs text-center">{recipe.category}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
