"use client";

import { Ingredient } from "@/types/models";
import { deleteIngredient, getIngredient } from "@/utils/api";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";

// TODO: back button

// TODO: add picture
// TODO: add pie chart
// TODO: add serving logic

const IngredientPage = () => {
  const params = useParams();
  const [ingredientData, setIngredientData] = React.useState<Ingredient | null>(
    null
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const ingredientId = params.ingredient;
  const router = useRouter();

  React.useEffect(() => {
    const getIngredientData = async () => {
      try {
        const data = await getIngredient(ingredientId);
        setIngredientData(data);
      } catch (error) {
        console.error("Error fetching ingredient data:", error);
      }
    };
    getIngredientData();
  }, [ingredientId]);

  if (!ingredientData) {
    return <div>Loading...</div>;
  }

  // Delete ingredient
  const removeIngredient = async (id: string | string[]) => {
    setLoading(true);
    setError(null);

    try {
      await deleteIngredient(id);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to delete ingredient. Please try again.");
    } finally {
      setLoading(false);
      router.push("/meals/ingredients");
    }
  };

  const {
    name,
    defaultUnit,
    defaultAmount,
    servings,
    calories,
    carbohydrates,
    fat,
    protein,
    price,
  } = ingredientData;

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
        href={`/meals/ingredients/${ingredientId}/update`}
        className="p-2 bg-neutral-500 rounded mr-4"
      >
        Update User
      </Link>
      <button
        className="p-2 bg-red-500 rounded mb-4"
        onClick={() => removeIngredient(ingredientId)}
        disabled={loading}
      >
        Delete User
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
            <h3>{`For ${defaultAmount} ${defaultUnit}`}</h3>
            <div>
              <div className="flex justify-between">
                <span>Price</span>
                <span>${price}</span>
              </div>
              <div className="flex justify-between">
                <span>Calories</span>
                <span>{calories}</span>
              </div>
              <div className="flex justify-between">
                <span>Carbs</span>
                <span>{`${carbohydrates}g`}</span>
              </div>
              <div className="flex justify-between">
                <span>Fat</span>
                <span>{`${fat}g`}</span>
              </div>
              <div className="flex justify-between">
                <span>Protein</span>
                <span>{`${protein}g`}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Details */}
        <div className="w-1/2 max-w-[30rem] h-full px-[2rem] flex flex-col gap-10">
          <div>
            <h2 className="text-xl font-semibold">Scale Ingredient</h2>
            <input
              className="w-[3rem] mr-2 text-black"
              placeholder={`${defaultAmount}`}
            />
            <select value={defaultUnit} className="text-black">
              <option className="text-black">{defaultUnit}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientPage;
