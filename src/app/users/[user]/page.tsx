"use client";

// TODO: Eventually have a daily macro calculator for user to find their daily intake

import { getUser, deleteUser } from "@/utils/api";
import React from "react";
import { User } from "@/types/models";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const UserPage = () => {
  const params = useParams();
  const [userData, setUserData] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const userId = params.user;
  const router = useRouter();

  React.useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUserData();
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  // Delete user
  const removeUser = async (id: string | string[]) => {
    setLoading(true);
    setError(null);

    try {
      await deleteUser(id);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to delete user. Please try again.");
    } finally {
      setLoading(false);
      router.push("/users");
    }
  };

  const { name, calories, carbohydrates, fat, protein, price } = userData;

  return (
    <div className="p-[2rem]">
      <h1 className="text-xl font-semibold text-blue-400 mb-4">
        {name}&#39;s Target Daily Nutrition
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      <Link
        href={`/users/${userId}/update`}
        className="p-2 bg-neutral-500 rounded mr-4"
      >
        Update User
      </Link>
      <button
        className="p-2 bg-red-500 rounded mb-4"
        onClick={() => removeUser(userId)}
        disabled={loading}
      >
        Delete User
      </button>

      <div>
        <p>{calories} Calories</p>
        <div className="mt-2">
          <p>{carbohydrates}g Carbs</p>
          <p>{fat}g Fat</p>
          <p>{protein}g Protein</p>
          <p>${price}</p>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
