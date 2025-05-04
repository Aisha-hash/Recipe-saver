import express from "express";
import fs from "node:fs/promises";
import path from "path";

/**
 * Asynchronously loads recipes from a JSON file.
 * @returns {Promise<Object[]>} A promise that resolves to an array of recipe objects.
 */
async function loadRecipes() {
  try {
    const recipesData = await fs.readFile("./data/recipes.json", "utf-8");
    return JSON.parse(recipesData);
  } catch (error) {
    console.error("Error reading recipes file:", error);
    return [];
  }
}

/**
 * Asynchronously saves a new recipe to the JSON file.
 * @param {Object} recipe - The recipe object to save.
 * @param {string} recipe.name - The name of the recipe.
 * @param {string[]} recipe.ingredients - List of ingredients.
 * @param {string} recipe.instructions - Preparation instructions.
 * @param {string} recipe.category - The category of the recipe.
 * @returns {Promise<Object>} A promise that resolves to the newly saved recipe.
 */
async function saveRecipe(recipe) {
  const recipes = await loadRecipes();
  recipe.id = new Date().getTime(); // Generate unique ID based on timestamp
  recipes.push(recipe);

  await fs.writeFile(
    "./data/recipes.json",
    JSON.stringify(recipes, null, 2),
    "utf-8"
  );
  return recipe;
}

const app = express();
const PORT = 3001;

// Middleware to parse incoming JSON requests
app.use(express.json());

// CORS middleware for allowing cross-origin requests
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader("Access-Control-Allow-Methods", "GET, POST"); // Allowed HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allowed headers
  next();
});

/**
 * GET /recipes
 * Fetches all recipes.
 * @returns {Object[]} An array of recipe objects.
 */
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await loadRecipes();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Error loading recipes." });
  }
});

/**
 * GET /recipes/:id
 * Fetches a single recipe by its ID.
 * @param {string} id - The ID of the recipe to fetch.
 * @returns {Object} The recipe object if found, or an error message if not.
 */
app.get("/recipes/:id", async (req, res) => {
  const { id } = req.params; // Get the ID from the URL parameter
  try {
    const recipes = await loadRecipes(); // Load all recipes from the JSON file
    const recipe = recipes.find((recipe) => recipe.id === Number(id)); // Find the recipe by ID

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" }); // Return an error if the recipe is not found
    }

    res.json(recipe); // Return the recipe data as JSON
  } catch (error) {
    res.status(500).json({ error: "Error fetching recipe." }); // Return an error if something goes wrong
  }
});

/**
 * POST /recipes
 * Adds a new recipe to the collection.
 * @param {Object} req.body - The request body containing recipe details.
 * @param {string} req.body.name - The name of the recipe.
 * @param {string[]} req.body.ingredients - List of ingredients.
 * @param {string} req.body.instructions - Preparation instructions.
 * @param {string} req.body.category - The category of the recipe.
 * @returns {Object} The newly created recipe object.
 */
app.post("/recipes", async (req, res) => {
  const { name, ingredients, instructions, category } = req.body;

  if (!name || !ingredients || !instructions || !category) {
    return res.status(400).json({
      error: "Name, ingredients, instructions, and category are required.",
    });
  }

  try {
    const newRecipe = await saveRecipe({
      name,
      ingredients,
      instructions,
      category,
    });
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ error: "Error saving recipe." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
