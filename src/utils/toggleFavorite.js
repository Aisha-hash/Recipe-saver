/**
 * Toggles the favorite status of a recipe.
 *
 * @param {Object} recipe - The recipe object to toggle.
 * @param {string} recipe.id - Unique identifier for the recipe.
 * @param {boolean} isFavorite - Current favorite status of the recipe.
 * @param {Function} dispatch - Redux dispatch function to trigger actions.
 * @param {Function} addFavorite - Redux action to add a recipe to favorites.
 * @param {Function} removeFavorite - Redux action to remove a recipe from favorites.
 */

export const toggleFavorite = (
  recipe,
  isFavorite,
  dispatch,
  addFavorite,
  removeFavorite
) => {
  if (isFavorite) {
    // If the recipe is currently a favorite, remove it from the favorites list
    dispatch(removeFavorite(recipe.id));
    console.log("Removing recipe with id:", recipe.id);
  } else {
    // If the recipe is not a favorite, add it to the favorites list
    dispatch(addFavorite(recipe));
    console.log("Adding recipe with id:", recipe.id);
  }
};
