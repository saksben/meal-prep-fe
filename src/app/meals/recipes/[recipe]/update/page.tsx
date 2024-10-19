"use client";

import { Filter, Ingredient } from "@/types/models";
import { createMeal, getIngredients, getMeal, updateMeal } from "@/utils/api";
import { useParams, useRouter } from "next/navigation";
import React from "react";

// TODO: add inputs for Ingredient servings
// TODO: back button

const UpdateRecipePage = () => {
  const params = useParams();
  const mealId = params.recipe;

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

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const meal = await getMeal(mealId);

        const selected = meal.ingredients.map((i) => ({
          // ingredient: i.ingredient,
          // amount: i.amount, // Make sure your API returns the correct amount
          // unit: i.ingredient.defaultUnit, // Use default unit from ingredient
          mealId: +mealId,
          ingredientId: i.ingredientId,
        }));
        setSelectedIngredients(selected);

        const ingredientData = await getIngredients();
        const selectedIngredientIds = selected.map(
          (ingredient) => ingredient.ingredientId
        );
        const ingredientList = ingredientData.filter(
          (i) => !selectedIngredientIds.includes(i.id)
        );
        setIngredients(ingredientList);
        setDbIngredients(ingredientData);

        setName(meal.name);
        setDescription(meal.description);
        setRecipe(meal.recipe);
        setServings(meal.servings);
        setRecipeLink(meal.recipeLink);
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to fetch meal data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [mealId]);
  //   console.log("selectedIngredients:", selectedIngredients);
  console.log("ingredients:", ingredients);
  console.log("dbIngredients:", dbIngredients);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ingredientsForUpdate = selectedIngredients.map((i) => ({
      mealId: +mealId,
      ingredientId: i.ingredientId,
    }));

    if (!name) {
      setError("Name is required");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await updateMeal(mealId, {
        name,
        description,
        recipe,
        servings,
        recipeLink,
        ingredients: ingredientsForUpdate,
      });
      router.push("/meals");
    } catch (err) {
      console.error("Error updating meal:", err);
      setError("Failed to update meal. Please try again.");
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
      ]);
      setIngredients(ingredients.filter((i) => i.id !== selectedIngredientId));
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

  //   const selIng = selectedIngredients.map((ingredient) => ingredients.find((i) => i.id === ingredient.ingredientId))
  const selIng = selectedIngredients;

  console.log("selectedIngredients:", selIng);

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Update Meal</h1>
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
            onChange={handleIngredients}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm text-black"
          >
            <option key="-1" value="" hidden>
              Select Ingredient
            </option>
            {ingredients.map((ingredient) => (
              <option key={ingredient.id} value={ingredient.id}>
                {ingredient.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Selected Ingredients:</h3>
          <ul>
            {selectedIngredients.map(({ ingredientId: selectedIngredient }) => {
              const ingredient = dbIngredients.find(
                (i) => i.id === selectedIngredient
              );
              console.log("ingredient:", ingredient);
              console.log("thing:", selectedIngredient);
              return (
                <li key={selectedIngredient} className="flex justify-between">
                  <span className="text-white">
                    {/* {ingredients[ingredientId]} - {amount} {ingredient.defaultUnit} */}
                    {ingredient?.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleIngredientDelete(selectedIngredient)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Meal"}
        </button>
      </form>
    </div>
  );
};

export default UpdateRecipePage;
