"use client";
import { Meal } from "@/types/models";
import { getMeals } from "@/utils/api";
import Link from "next/link";
import React from "react";

// TODO: calories is from the summation of all internal Ingredient calories
// TODO: cookTime is new

// const meals: mealTypes[] = [
//   {
//     id: 0,
//     name: "Creamy Garlic Chicken and Rice",
//     calories: 373,
//     cookTime: 30,
//   },
//   { id: 1, name: "Protein Shake", calories: 360, cookTime: 3 },
//   { id: 2, name: "Chicken Fried Rice", calories: 189, cookTime: 25 },
//   { id: 3, name: "Creamy Garlic Beef Pasta", calories: 353, cookTime: 34 },
//   { id: 4, name: "Creamy Fettucine Alfredo", calories: 389, cookTime: 43 },
//   { id: 5, name: "Cheesy Beef Burrito", calories: 290, cookTime: 29 },
// ];

const Meals = () => {
  const [recipes, setRecipes] = React.useState<Meal[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchMeals = async () => {
      try {
        const data = await getMeals();
        setRecipes(data);
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to fetch meals.");
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-[2rem]">
      <h1 className="text-2xl font-bold mb-4">Meals</h1>
      <Link href="/meals/recipes/create" className="p-2 bg-blue-500 rounded">
        Create New Meal
      </Link>
      <div className="p-[2rem] flex flex-col gap-4 sm:gap-y-16 sm:flex-row max-w-[80rem] flex-wrap">
        {recipes.length === 0 ? (
          <p>No meals found.</p>
        ) : (
          <div>
            {recipes.map((recipe) => (
              <Link href={`/meals/recipes/${recipe.id}`} key={recipe.id}>
                <div className="rounded-md hover:bg-neutral-800 cursor-pointer flex sm:flex-col gap-4 h-[4.5rem] sm:w-[14rem] sm:h-[16rem]">
                  <div className="border h-full sm:max-h-[9rem] max-sm:w-[6rem] rounded-md"></div>
                  <div className="px-2">
                    <p className="text-blue-400 font-bold">{recipe.name}</p>
                    <p className="text-sm">{recipe.calories} Calories</p>
                    {/* <p className="text-sm">{recipe.cookTime} minutes</p> */}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Meals;
