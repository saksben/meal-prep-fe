"use client";
import { deleteMeal, getMeal } from "@/utils/api";
import Link from "next/link";
// TODO: add time to db schema
// TODO: back button
// TODO: directions are just textareas with a "Add a step" button, then a for loop that makes each textarea an <li> in the directions
// TODO: add interface to get rid of errors on Recipe and ingredient

import { useParams, useRouter } from "next/navigation";
import React from "react";

// TODO: add picture
// TODO: add pie chart
// TODO: add serving logic

const Recipe = () => {
  const params = useParams();
  const [recipeData, setRecipeData] = React.useState<Recipe | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const recipeId = params.recipe;
  const router = useRouter();

  React.useEffect(() => {
    const getRecipeData = async () => {
      try {
        const data = await getMeal(recipeId);
        setRecipeData(data);
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      }
    };
    getRecipeData();
  }, [recipeId]);

  if (!recipeData) {
    return <div>Loading...</div>;
  }

  // Delete recipe
  const removeRecipe = async (id: string | string[]) => {
    setLoading(true);
    setError(null);

    try {
      await deleteMeal(id);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to delete recipe. Please try again.");
    } finally {
      setLoading(false);
      router.push("/meals");
    }
  };

  const {
    name,
    description,
    recipe,
    servings,
    recipeLink,
    filters,
    mealPlans,
    ingredients,
  } = recipeData;
  console.log("ingredients:", ingredients);
  return (
    <div className="flex-col w-full">
      {/* Header */}
      <div>
        <div className="flex gap-8 h-[5rem]">
          <div>{"<-"}</div>
          <h1 className="text-3xl font-semibold">{name}</h1>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Link
        href={`/meals/recipes/${recipeId}/update`}
        className="p-2 bg-neutral-500 rounded mr-4"
      >
        Update Recipe
      </Link>
      <button
        className="p-2 bg-red-500 rounded mb-4"
        onClick={() => removeRecipe(recipeId)}
        disabled={loading}
      >
        Delete Recipe
      </button>
      {/* Main */}
      <div className="flex gap-[4rem] h-full w-full">
        {/* Overview */}
        <div className="w-1/2 max-w-[30rem] h-full px-[2rem]">
          {/* Picture */}
          <div className="border w-full h-3/5 max-h-[20rem]"></div>
          <h2 className="text-xl font-semibold mt-[2rem]">Nutrition</h2>
          {/* Macro pie chart */}
          <div className="rounded-full size-[15rem] border"></div>
          <div className="text-sm flex flex-col gap-4">
            <h3>For {servings} serving</h3>
            <div>
              <div className="flex justify-between">
                <span>Calories</span>
                <span>373</span>
              </div>
              <div className="flex justify-between">
                <span>Carbs</span>
                <span>373g</span>
              </div>
              <div className="flex justify-between">
                <span>Fat</span>
                <span>373g</span>
              </div>
              <div className="flex justify-between">
                <span>Protein</span>
                <span>373g</span>
              </div>
            </div>
          </div>
        </div>
        {/* Details */}
        <div className="w-1/2 max-w-[30rem] h-full px-[2rem] flex flex-col gap-10">
          <div>
            <div className="flex gap-4">
              <span>Prep Time</span>
              <span>15 minutes</span>
            </div>
            <div className="flex gap-4">
              <span>Cook Time</span>
              <span>15 minutes</span>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Scale Recipe</h2>
            <input
              className="w-[3rem] mr-2 text-black placeholder:text-black"
              placeholder={servings}
            />
            <span>serving</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Ingredients</h2>
            {ingredients.map((ingredient) => (
              <p key={ingredient.ingredient.id}>
                {ingredient.ingredient.name} -{" "}
                {ingredient.ingredient.defaultAmount}{" "}
                {ingredient.ingredient.defaultUnit}
              </p>
            ))}
            {console.log(ingredients)}
          </div>
          <h2 className="text-xl font-semibold">Directions</h2>
          <p>{recipe}</p>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
