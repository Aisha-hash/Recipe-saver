import { createStore } from "redux";
import favoriteReducer from "./reducers/favoriteReducer";

/**
 * Redux store configuration to manage the application state.
 * This store uses a custom reducer for managing the "favorites" state.
 *
 * @returns {Object} The Redux store.
 */
const store = createStore((state = {}, action) => ({
  // Use the favoriteReducer to handle the favorites part of the state
  favorites: favoriteReducer(state.favorites, action),
}));

export default store;
