"use client"

import { getIngredient, updateIngredient } from "@/utils/api";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const UpdateIngredientPage = () => {
  const params = useParams();
  const ingredientId = params.ingredient;
  const [name, setName] = React.useState<string>("");
  const [defaultAmount, setDefaultAmount] = React.useState<number>(0);
  const [defaultUnit, setDefaultUnit] = React.useState<string>("");
  const [servings, setServings] = React.useState({ amount: 0, unit: "" });
  const [calories, setCalories] = React.useState<number>(0);
  const [carbohydrates, setCarbohydrates] = React.useState<number>(0);
  const [fat, setFat] = React.useState<number>(0);
  const [protein, setProtein] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number | undefined>(0);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();

  React.useEffect(() => {
    const fetchIngredient = async () => {
      try {
        const res = await getIngredient(ingredientId);
        setName(res.name);
        setDefaultAmount(res.defaultAmount);
        setDefaultUnit(res.defaultUnit);
        setCalories(res.calories);
        setCarbohydrates(res.carbohydrates);
        setFat(res.fat);
        setProtein(res.protein);
        setPrice(res.price);
      } catch (err) {
        console.log("Error:", err);
        setError("Failed to load ingredient data.");
      }
    };
    fetchIngredient();
  }, [ingredientId]);

  const editIngredient = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log("Updating ingredient:", ingredientId, name);
      await updateIngredient(ingredientId, {
        name,
        defaultAmount,
        defaultUnit,
        servings,
        calories,
        carbohydrates,
        fat,
        protein,
        price,
      });
      console.log("Ingredient updated successfully!");
      router.push("/meals/ingredients");
    } catch (err) {
      console.error("failed to update ingredient:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Update Ingredient</h1>
      {error && <p className="text-red-500">{error}</p>}
      {ingredientId ? (
        <form
          onSubmit={editIngredient}
          className="space-y-4 [&_input]:text-black"
        >
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
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
            />
          </div>

          <div>
            <label
              htmlFor="defaultAmount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <input
              type="number"
              id="defaultAmount"
              name="defaultAmount"
              value={defaultAmount}
              onChange={(e) => setDefaultAmount(parseInt(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
            />
          </div>

          <div>
            <label
              htmlFor="defaultUnit"
              className="block text-sm font-medium text-gray-700"
            >
              Unit
            </label>
            <input
              type="text"
              id="defaultUnit"
              name="defaultUnit"
              value={defaultUnit}
              onChange={(e) => setDefaultUnit(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
            />
          </div>

          <div>
            <label
              htmlFor="calories"
              className="block text-sm font-medium text-gray-700"
            >
              Calories
            </label>
            <input
              type="number"
              id="calories"
              name="calories"
              value={calories}
              onChange={(e) => setCalories(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
            />
          </div>

          <div>
            <label
              htmlFor="carbohydrates"
              className="block text-sm font-medium text-gray-700"
            >
              Carbohydrates
            </label>
            <input
              type="number"
              id="carbohydrates"
              name="carbohydrates"
              value={carbohydrates}
              onChange={(e) => setCarbohydrates(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
            />
          </div>

          <div>
            <label
              htmlFor="fat"
              className="block text-sm font-medium text-gray-700"
            >
              Fat
            </label>
            <input
              type="number"
              id="fat"
              name="fat"
              value={fat}
              onChange={(e) => setFat(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
            />
          </div>

          <div>
            <label
              htmlFor="protein"
              className="block text-sm font-medium text-gray-700"
            >
              Protein
            </label>
            <input
              type="number"
              id="protein"
              name="protein"
              value={protein}
              onChange={(e) => setProtein(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
            />
          </div>

          <div>
            <label
              htmlFor="protein"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md"
          >
            {loading ? "Creating..." : "Create Ingredient"}
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UpdateIngredientPage;
