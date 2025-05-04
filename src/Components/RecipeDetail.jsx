import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/actions/favoriteActions";
import { toggleFavorite } from "../utils/toggleFavorite";
import FavoriteButton from "./FavoriteButton";

/**
 * RecipeDetail Component
 * Displays the details of a specific recipe, including its name, image, ingredients, instructions, and favorite status.
 *
 * @component
 * @returns {JSX.Element} The rendered RecipeDetail component.
 *
 * @example
 * // Example usage:
 * <RecipeDetail />
 */
const RecipeDetail = () => {
  // Extract the recipe ID from the URL
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // Get the current list of favorite recipes from the Redux store
  const favorites = useSelector((state) => state.favorites.favorites);

  // Get the dispatch function to dispatch Redux actions
  const dispatch = useDispatch();

  /**
   * Fetch the recipe data from the backend API when the component mounts or the ID changes.
   */
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`https://recipe-finder-l0py.onrender.com/recipes/${id}`); // Fetch recipe by ID
        if (!response.ok) {
          throw new Error("Recipe not found");
        }
        const recipeData = await response.json();
        setRecipe(recipeData);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setRecipe(null); // Handle error case
      }
    };

    fetchRecipe();
  }, [id]);

  /**
   * Update the isFavorite state when the recipe or favorites list changes.
   */
  useEffect(() => {
    if (recipe) {
      setIsFavorite(favorites.some((fav) => fav && fav.id === recipe.id));
    }
  }, [favorites, recipe]);

  /**
   * Handle toggling the favorite state for the current recipe.
   * Dispatches the appropriate Redux action using the toggleFavorite utility.
   */
  const handleToggleFavorite = () => {
    toggleFavorite(recipe, isFavorite, dispatch, addFavorite, removeFavorite);
  };

  // Display a fallback message if the recipe is not found
  if (!recipe) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold">Recipe not found</h1>
        <Link to="/" className="text-blue-500 underline">
          Go back to the overview
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-orange-50 rounded shadow flex flex-col">
      {/* Header Section with Recipe Name and Favorite Button */}
      <div className="flex flex-row justify-between items-center relative">
        <h1 className="text-2xl font-bold mb-4 mx-auto">{recipe.name}</h1>
        <div className="absolute right-0 bg-white rounded-full p-1 cursor-pointer">
          <FavoriteButton
            isFavorite={isFavorite}
            toggleFavorite={handleToggleFavorite}
          />
        </div>
      </div>

      {/* Recipe Image */}
      <img
        src={recipe.img}
        alt={`${recipe.name} image`}
        className="rounded-md h-64 sm:h-80 md:h-82 lg:h-80 w-64 sm:w-80 md:w-82 lg:w-1/2 mx-auto"
      />

      {/* Recipe Details Section */}
      <div className="mx-auto my-10 p-5">
        {/* Recipe Category */}
        <p className="text-gray-700 mb-2">
          <span className="text-lg font-bold">Category:</span> {recipe.category}
        </p>

        {/* Ingredients List */}
        <div>
          <p className="text-lg font-bold">Ingredients</p>
          <ul className="text-gray-700 mb-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        {/* Instructions List */}
        <div>
          <p className="text-lg font-bold">Directions</p>
          <ul className="text-gray-700 my-2">
            {recipe.instructions.map((instruction, index) => (
              <li className="my-2" key={index}>
                <p className="font-bold">Step {index + 1}:</p>
                <p>{instruction}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Back to Homepage Link */}
      <div className="mt-auto flex justify-center">
        <Link
          to="/"
          className="bg-teal-400 text-white px-4 py-2 rounded shadow hover:bg-teal-500 hover:text-yellow-100"
        >
          Go back to homepage
        </Link>
      </div>
    </div>
  );
};

export default RecipeDetail;
