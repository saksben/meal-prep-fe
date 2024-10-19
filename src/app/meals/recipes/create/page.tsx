"use client";

import { Filter, Ingredient } from "@/types/models";
import { createMeal, getIngredients, updateMeal } from "@/utils/api";
import { useRouter } from "next/navigation";
import React from "react";

// TODO: change Ingredient select to a modal with filter and pagination
// TODO: add inputs for Ingredient servings
// TODO: back button

const CreateRecipePage = () => {
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [recipe, setRecipe] = React.useState<string>("");
  const [servings, setServings] = React.useState<number>(0);
  const [recipeLink, setRecipeLink] = React.useState<string | undefined>("");
  const [dbIngredients, setDbIngredients] = React.useState<Ingredient[]>([]);
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = React.useState<
    { mealId: number; ingredientId: number }[]
  >([]);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();

  let mealId = "";

  React.useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const ingredientData = await getIngredients();
        setDbIngredients(ingredientData);
        const data = await getIngredients();
        setIngredients(data);
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to fetch ingredients.");
      } finally {
        setLoading(false);
      }
    };
    fetchIngredients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      setError("Name is required");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const meal = await createMeal({
        name,
        description,
        recipe,
        servings,
        recipeLink,
        ingredients: [],
      });

      mealId = String(meal.id);

      const mealIngredients = selectedIngredients.map((ingredient) => ({
        mealId: Number(mealId),
        ingredientId: ingredient.ingredientId,
      }));

      await updateMeal(mealId, { ...meal, ingredients: mealIngredients });

      router.push("/meals");
    } catch (err) {
      console.error("Error creating meal:", err);
      setError("Failed to create meal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleIngredients = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIngredientId = Number(e.target.value);
    const selectedIngredient = ingredients.find(
      (i) => i.id === selectedIngredientId
    );
    if (selectedIngredient) {
      setSelectedIngredients([
        ...selectedIngredients,
        { mealId: +mealId, ingredientId: selectedIngredient.id },
      ]),
        setIngredients(
          ingredients.filter((i) => i.id !== selectedIngredientId)
        );
    }
  };

  const handleIngredientDelete = (ingredientId: number) => {
    const selectedIngredientToRemove = selectedIngredients.find(
      (i) => i.ingredientId === ingredientId
    );
    const ingredientToRemove = dbIngredients.find(
      (i) => i.id === selectedIngredientToRemove?.ingredientId
    );
    if (selectedIngredientToRemove && ingredientToRemove) {
      setIngredients([...ingredients, ingredientToRemove]);
      setSelectedIngredients(
        selectedIngredients.filter((i) => i.ingredientId !== ingredientId)
      );
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Ingredient</h1>
      <form onSubmit={handleSubmit} className="space-y-4 [&_input]:text-black">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
          />
        </div>

        <div>
          <label
            htmlFor="recipe"
            className="block text-sm font-medium text-gray-700"
          >
            Recipe
          </label>
          <input
            type="text"
            id="recipe"
            value={recipe}
            onChange={(e) => setRecipe(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
          />
        </div>

        <div>
          <label
            htmlFor="servings"
            className="block text-sm font-medium text-gray-700"
          >
            Servings
          </label>
          <input
            type="number"
            id="servings"
            value={servings}
            onChange={(e) => setServings(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
          />
        </div>

        <div>
          <label
            htmlFor="recipeLink"
            className="block text-sm font-medium text-gray-700"
          >
            Recipe Link
          </label>
          <input
            type="text"
            id="recipeLink"
            value={recipeLink}
            onChange={(e) => setRecipeLink(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
          />
        </div>

        <div>
          <label
            htmlFor="ingredients"
            className="block text-sm font-medium text-gray-700"
          >
            Ingredients
          </label>
          <select
            id="ingredients"
            name="ingredients"
            onChange={handleIngredients}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm text-black"
          >
            <option key="-1" value="" hidden></option>
            {ingredients.map((i) => (
              <option key={i.id} value={i && i.id}>
                {i.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p>Ingredients:</p>
          {selectedIngredients.map(({ ingredientId: selectedIngredient }) => {
            const ingredient = dbIngredients.find(
              (i) => i.id === selectedIngredient
            );
            return (
              <div key={selectedIngredient} className="flex gap-4 items-center">
                <p>{ingredient?.name}</p>
                <button
                  onClick={() => handleIngredientDelete(selectedIngredient)}
                  className="bg-red-600 p-1 rounded"
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md"
        >
          {loading ? "Creating..." : "Create Recipe"}
        </button>
      </form>
    </div>
  );
};

export default CreateRecipePage;
