import React, { useState } from "react";

const AddRecipeForm = ({ onRecipeAdded }) => {
  const [recipeTitle, setRecipeTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch("/data.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: recipeTitle,
            instructions: ingredients,
            steps,
          }),
        });

        if (response.ok) {
          const newRecipe = await response.json();
          console.log("Recipe added:", newRecipe);
          setRecipeTitle("");
          setIngredients("");
          setSteps("");
          setErrors({});
          if (onRecipeAdded) {
            onRecipeAdded(newRecipe); // Notify the parent component of the new recipe
          }
        } else {
          console.error("Failed to add recipe");
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!recipeTitle) newErrors.recipeTitle = "Recipe Title is required";
    if (!ingredients) newErrors.ingredients = "Ingredients are required";
    if (!steps) newErrors.steps = "Preparation steps are required";
    else if (ingredients.split("\n").length < 2)
      newErrors.ingredients = "Please list at least two ingredients";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto py-6 bg-white text-black max-w-md mt-4 p-6 rounded-md shadow-lg"
    >
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-black mb-2"
        >
          Recipe Title
        </label>
        <input
          type="text"
          id="title"
          value={recipeTitle}
          onChange={(e) => setRecipeTitle(e.target.value)}
          placeholder="Enter recipe title"
          className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm ${
            errors.recipeTitle ? "border-red-500" : ""
          }`}
        />
        {errors.recipeTitle && (
          <p className="text-red-500 text-sm mt-1">{errors.recipeTitle}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="ingredients"
          className="block text-sm font-medium text-black mb-2"
        >
          Ingredients
        </label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          rows="4"
          placeholder="Enter ingredients, one per line"
          className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm ${
            errors.ingredients ? "border-red-500" : ""
          }`}
        />
        {errors.ingredients && (
          <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="steps"
          className="block text-sm font-medium text-black mb-2"
        >
          Preparation Steps
        </label>
        <textarea
          id="steps"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          rows="6"
          placeholder="Enter preparation steps"
          className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm ${
            errors.steps ? "border-red-500" : ""
          }`}
        />
        {errors.steps && (
          <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
};

export default AddRecipeForm;
