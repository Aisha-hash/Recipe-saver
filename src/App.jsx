import { Route, Routes } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import RecipeDetail from "./Components/RecipeDetail";
import AddNewRecipe from "./pages/AddNewRecipe";

/**
 * The main App component that sets up routing for the application.
 * It renders a sidebar and defines routes for the pages.
 *
 * @returns {JSX.Element} The main layout of the app with routing and sidebar.
 */
function App() {
  return (
    <div className="flex">
      {/* Sidebar component that is visible on all pages */}
      <Sidebar />

      {/* Routes component defines all the application's routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/addrecipe" element={<AddNewRecipe />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </div>
  );
}

export default App;
