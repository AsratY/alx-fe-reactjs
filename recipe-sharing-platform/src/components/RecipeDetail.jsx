import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const selectedRecipe = data.find((r) => r.id === parseInt(id, 10));
        setRecipe(selectedRecipe);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold mt-2 mb-4 text-center">
        {recipe.title}
      </h2>

      <div className="flex flex-col items-center max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={recipe.imageURL}
          alt={recipe.title}
          className="h-56 w-full object-cover"
        />

        <div className="flex flex-col md:flex-row w-full">
          <div className="p-4 md:w-1/2 border-r">
            <h2 className="text-2xl font-semibold mb-2 text-red-600">
              Ingredients
            </h2>
            <ul className="list-disc pl-5">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 md:w-1/2  bg-gray-600 text-white">
            <h2 className="text-2xl font-semibold mb-2 text-red-600">
              Cooking Steps
            </h2>
            <ol className="list-decimal pl-5 ">
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
