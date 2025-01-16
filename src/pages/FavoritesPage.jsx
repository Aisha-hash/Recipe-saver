import RecipeCard from "../Components/RecipeCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

/**
 * FavoritesPage component renders the list of favorite recipes.
 * If no favorites are present, it displays a "No favorites" message.
 * If favorites are present, it maps over the favorite recipes
 * and displays them using the RecipeCard component.
 *
 * @returns {JSX.Element} The page displaying user's favorite recipes.
 */
const FavoritesPage = () => {
  // Accessing the 'favorites' state from Redux store
  const favorites = useSelector((state) => state.favorites.favorites);

  const fav = true;
  return (
    <div className="bg-[#faf9fb] flex-1 p-10 min-h-screen">
      <div className="max-w-screen-lg mx-auto">
        <p className="font-bold text-3xl md:text-5xl my-4">My Favorites</p>

        {/* Conditional rendering if no favorites exist */}
        {favorites.length === 0 && (
          <div className="h-[80vh] flex flex-col items-center gap-4">
            <p className="col-span-full text-center text-lg text-gray-500">
              No favorite Recipes found. Mark Recipes as favorite in the
              Homepage.
            </p>
          </div>
        )}

        {/* Conditional rendering when there are favorite recipes */}
        {favorites.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((recipe) => (
              <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
                {/* Passing the recipe object to RecipeCard component */}
                <RecipeCard recipe={recipe} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
