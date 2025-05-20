import RecipeCard from "../Components/RecipeCard";
import SearchBar from "../Components/SearchBar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import FilterComponent from "../Components/filterComponent";

/**
 * HomePage component fetches and displays a list of recipes. It includes a search bar
 * to filter recipes by name or ingredients, as well as a category filter dropdown.
 *
 * @returns {JSX.Element} A page displaying the list of recipes with search and filter functionality.
 */
const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // Fetch recipes from the backend when the component mounts
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          "https://recipe-finder-l0py.onrender.com/recipes"
        );
        if (!response.ok) {
          throw new Error("Error fetching recipes");
        }
        setLoading(false);
        const data = await response.json();
        setRecipes(data); // Set the fetched recipes into state
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchRecipes();
  }, []);

  // Get unique recipe categories for the filter dropdown (including 'All' option)
  const categories = [
    "All",
    ...new Set(recipes.map((recipe) => recipe.category)), // Ensure unique categories
  ];

  // Filter recipes by search term (name or ingredients)
  const filteredBySearchTerm = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Apply category filter
  const filteredByCategory = filteredBySearchTerm.filter(
    (recipe) =>
      filter === "All" || recipe.category.toLowerCase() === filter.toLowerCase()
  );

  return (
    <div className="bg-[#faf9fb] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto">
        {/* Search and filter */}
        <div className="flex items-center gap-4 mb-5">
          <div className="flex-grow">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <div className="w-1/6">
            <FilterComponent
              filter={filter}
              setFilter={setFilter}
              categories={categories}
            />
          </div>
        </div>
        <p className="font-bold text-3xl md:text-5xl my-5">Recipes</p>

        {/* Display the filtered recipes in a grid */}

        {loading ? (
          <p className="col-span-full text-center text-lg text-gray-500">
            Loading the recipes...
          </p>
        ) : (
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredByCategory.length > 0 ? (
              filteredByCategory.map((recipe) => (
                <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
                  <RecipeCard recipe={recipe} />
                </Link>
              ))
            ) : (
              <p className="col-span-full text-center text-lg text-gray-500">
                No recipes found matching your search and filter.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
