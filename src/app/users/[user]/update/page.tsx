"use client";

import { getUser, updateUser } from "@/utils/api";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const UpdateUserPage = () => {
  const params = useParams();
  const userId = params.user;
  const [name, setName] = React.useState<string>("");
  const [calories, setCalories] = React.useState<number>(0);
  const [carbohydrates, setCarbohydrates] = React.useState<number>(0);
  const [fat, setFat] = React.useState<number>(0);
  const [protein, setProtein] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number | undefined>(0);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUser(userId);
        setName(res.name);
        setCalories(res.calories);
        setCarbohydrates(res.carbohydrates);
        setFat(res.fat);
        setProtein(res.protein);
        setPrice(res.price);
      } catch (err) {
        console.log('Error:', err)
        setError("Failed to load user data.");
      }
    };
    fetchUser();
  }, [userId]);

  const editUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log("Updating user:", userId, name);
      await updateUser(userId, {
        name,
        calories,
        carbohydrates,
        fat,
        protein,
        price,
      });
      console.log("User updated successfully!");
      router.push("/users");
    } catch (err) {
      console.error("failed to update user:", err);
      setError("Failed to update user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Update User</h1>
      {error && <p className="text-red-500">{error}</p>}
      {userId ? (
        <form onSubmit={editUser}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded w-full text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="calories" className="block font-bold mb-2">
              Calories:
            </label>
            <input
              type="number"
              id="calories"
              value={calories}
              onChange={(e) => setCalories(parseInt(e.target.value))}
              className="border p-2 rounded w-full text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="carbohydrates" className="block font-bold mb-2">
              Carbohydrates:
            </label>
            <input
              type="number"
              id="carbohydrates"
              value={carbohydrates}
              onChange={(e) => setCarbohydrates(parseInt(e.target.value))}
              className="border p-2 rounded w-full text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fat" className="block font-bold mb-2">
              Fat:
            </label>
            <input
              type="number"
              id="fat"
              value={fat}
              onChange={(e) => setFat(parseInt(e.target.value))}
              className="border p-2 rounded w-full text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="protein" className="block font-bold mb-2">
              Protein:
            </label>
            <input
              type="number"
              id="protein"
              value={protein}
              onChange={(e) => setProtein(parseInt(e.target.value))}
              className="border p-2 rounded w-full text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block font-bold mb-2">
              Price:
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
              className="border p-2 rounded w-full text-black"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white p-2 rounded"
          >
            {loading ? "Updating..." : "Update User"}
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UpdateUserPage;
