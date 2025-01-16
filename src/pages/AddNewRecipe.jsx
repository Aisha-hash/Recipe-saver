import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

/**
 * RecipeForm Component
 * A form to create and submit a recipe, including its name, image, category,
 * ingredients, and instructions.
 *
 * @component
 * @returns {JSX.Element} The rendered RecipeForm component.
 */
const RecipeForm = () => {
  const [recipeName, setRecipeName] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);

  /**
   * Handle changes in the ingredients fields.
   * @param {number} index - Index of the ingredient to update.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
   */
  const handleIngredientChange = (index, event) => {
    // Handle changes in input fields
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value;
    setIngredients(newIngredients);
  };

  /**
   * Handle changes in the instructions fields.
   * @param {number} index - Index of the instruction to update.
   * @param {React.ChangeEvent<HTMLTextAreaElement>} event - The change event.
   */
  const handleInstructionChange = (index, event) => {
    const newInstructions = [...instructions];
    newInstructions[index] = event.target.value;
    setInstructions(newInstructions);
  };

  /**
   * Add a new empty ingredient field.
   */
  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  /**
   * Add a new empty instruction field.
   */
  const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  /**
   * Remove a specific ingredient field.
   * @param {number} index - Index of the ingredient to remove.
   */
  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  /**
   * Remove a specific instruction field.
   * @param {number} index - Index of the instruction to remove.
   */
  const removeInstruction = (index) => {
    const newInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(newInstructions);
  };

  /**
   * Handle form submission to send recipe data to the backend.
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the recipe data object
    const recipeData = {
      name: recipeName,
      ingredients,
      instructions,
      category,
    };

    try {
      // Send a POST request to the backend
      const response = await fetch("http://localhost:3001/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      if (!response.ok) {
        // Handle server errors
        const errorData = await response.json();
        console.error("Error saving recipe:", errorData.error);
        alert("Error saving recipe: " + errorData.error);
        return;
      }

      // Parse the response
      const newRecipe = await response.json();
      console.log("Recipe submitted successfully:", newRecipe);
      alert("Recipe submitted successfully!");

      // Reset the form after submission
      setRecipeName("");
      setRecipeImage("");
      setCategory("");
      setIngredients([""]);
      setInstructions([""]);
    } catch (error) {
      // Handle network or other errors
      console.error("Error during recipe submission:", error);
      alert("Error submitting recipe. Please try again.");
    }
  };

  return (
    <div className="w-[80vw] mx-auto bg-orange-50 p-6 rounded shadow-md my-10 sm:w-[60vw] md:w-[50vw]">
      <h1 className="text-2xl font-bold mb-4 text-center text-[#34002b]">
        Add a Recipe
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Recipe Name */}
        <div className="mb-5">
          <label
            htmlFor="recipeName"
            className="block text-md my-1 font-medium text-gray-700"
          >
            Recipe Name
          </label>
          <input
            type="text"
            id="recipeName"
            name="recipeName"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Recipe Image */}
        <div className="mb-5">
          <label
            htmlFor="recipeImage"
            className="block text-md my-1 font-medium text-gray-700"
          >
            Recipe Image URL
          </label>
          <input
            type="text"
            id="recipeImage"
            name="recipeImage"
            value={recipeImage}
            onChange={(e) => setRecipeImage(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Ingredients Repeater */}
        <div className="mb-5">
          <label className="block text-md  my-1 font-medium text-gray-700">
            Ingredients
          </label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e)}
                className="p-2 w-full border border-gray-300 rounded-md"
                placeholder="Ingredient"
                required
              />
              <Minus
                size={32}
                onClick={() => removeIngredient(index)}
                className="p-2 bg-white text-red-400 hover:bg-red-400 hover:text-white rounded-md border border-red-400"
              />
            </div>
          ))}
          <Plus
            size={32}
            onClick={addIngredient}
            className="mt-2 p-2 bg-white text-cyan-400 rounded-md border border-cyan-300 cursor-pointer hover:bg-cyan-300 hover:text-white"
          />
        </div>

        {/* Instructions Repeater */}
        <div className="mb-5">
          <label className="block text-md my-1 font-medium text-gray-700">
            Instructions
          </label>
          {instructions.map((instruction, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <textarea
                type="text"
                value={instruction}
                onChange={(e) => handleInstructionChange(index, e)}
                className="p-2 w-full border border-gray-300 rounded-md"
                placeholder="Instruction"
                required
              />
              <Minus
                size={32}
                onClick={() => removeInstruction(index)}
                className="p-2 bg-white text-red-400 hover:bg-red-400 hover:text-white rounded-md border border-red-400"
              />
            </div>
          ))}
          <Plus
            size={32}
            onClick={addInstruction}
            className="mt-2 p-2 bg-white text-cyan-400 rounded-md border border-cyan-300 cursor-pointer hover:bg-cyan-300 hover:text-white"
          />
        </div>

        {/* Category */}
        <div className="mb-5">
          <label
            htmlFor="category"
            className="block text-md my-1 font-medium text-gray-700"
          >
            Category
          </label>
          <input
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          ></input>
        </div>

        {/* Submit Button */}
        <div className="my-10 flex justify-center">
          <button
            type="submit"
            className="p-3 bg-[#825f56] text-white rounded shadow-md hover:bg-[#bfada9] hover:text-black hover:border-2 hover:border-black"
          >
            Submit Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
