"use client";

// TODO: make scale Ingredient work

import { Ingredient } from "@/types/models";
import { getIngredients } from "@/utils/api";
import Link from "next/link";
import React from "react";

const Ingredients = () => {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchIngredients = async () => {
      try {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-[2rem]">
      <h1 className="text-2xl font-bold mb-4">Ingredients</h1>
      <Link
        href="/meals/ingredients/create"
        className="p-2 bg-blue-500 rounded"
      >
        Create New Ingredient
      </Link>
      <div className="p-[2rem] flex flex-col gap-4 sm:gap-y-16 sm:flex-row max-w-[80rem] flex-wrap">
        <div className="mt-4">
          {ingredients.length === 0 ? (
            <p>No ingredients found.</p>
          ) : (
            <div>
              {ingredients.map((ingredient) => (
                <Link
                  href={`/meals/ingredients/${ingredient.id}`}
                  key={ingredient.id}
                >
                  <div className="rounded-md hover:bg-neutral-800 cursor-pointer flex sm:flex-col gap-4 h-[4.5rem] sm:w-[14rem] sm:h-[16rem]">
                    <div className="border h-full sm:max-h-[9rem] max-sm:w-[6rem] rounded-md"></div>
                    <div className="px-2">
                      <p className="text-blue-400 font-bold">
                        {ingredient.name}
                      </p>
                      <p className="text-sm">{`${ingredient.defaultAmount} ${ingredient.defaultUnit}`}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ingredients;
