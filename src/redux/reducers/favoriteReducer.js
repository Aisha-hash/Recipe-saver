// Initial state for favorites, retrieving from localStorage (or defaulting to an empty array)
const initialState = {
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
};

/**
 * Reducer function to manage the favorites state in Redux.
 * It handles adding and removing favorites from the state and updates localStorage.
 *
 * @param {Object} state - The current state of the reducer.
 * @param {Object} action - The action dispatched to the reducer.
 * @returns {Object} The updated state after handling the action.
 */
const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      if (!action.payload || !action.payload.id) {
        console.error("Invalid payload for ADD_FAVORITE:", action.payload);
        return state;
      }

      // Add the new recipe to the favorites array
      const updatedFavoritesAdd = [...state.favorites, action.payload];
      console.log("Updated Favorites (ADD):", updatedFavoritesAdd);

      // Update localStorage with the new favorites list
      localStorage.setItem("favorites", JSON.stringify(updatedFavoritesAdd));

      return { ...state, favorites: updatedFavoritesAdd };

    case "REMOVE_FAVORITE":
      // Filter out the recipe with the given id from the favorites array
      const updatedFavoritesRemove = state.favorites.filter(
        (recipe) => recipe.id !== action.payload
      );
      console.log("Updated favorites after REMOVE:", updatedFavoritesRemove);
      // Update localStorage with the updated favorites list
      localStorage.setItem("favorites", JSON.stringify(updatedFavoritesRemove));

      return { ...state, favorites: updatedFavoritesRemove };

    default:
      // Return the current state if no action type matches
      return state;
  }
};

export default favoriteReducer;
