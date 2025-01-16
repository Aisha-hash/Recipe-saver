/**
 * Action creator to add a recipe to favorites.
 *
 * @param {Object} recipe - The recipe object to be added to favorites.
 * @returns {Object} The action object containing type and payload.
 */
export const addFavorite = (recipe) => {
  //Action type to signify adding a favorite and The recipe to be added as the payload
  return {
    type: "ADD_FAVORITE",
    payload: recipe,
  };
};

/**
 * Action creator to remove a recipe from favorites.
 *
 * @param {string} id - The id of the recipe to be removed from favorites.
 * @returns {Object} The action object containing type and payload.
 */
export const removeFavorite = (id) => {
  //Action type to signify removing  a favorite and The recipe to be removed as the payload
  return {
    type: "REMOVE_FAVORITE",
    payload: id,
  };
};
