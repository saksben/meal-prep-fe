"use client";
import { User } from "@/types/models";
import { getUsers } from "@/utils/api";
import Link from "next/link";
import React from "react";

const Users = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="p-[2rem]">
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        <Link href="/users/create" className="p-2 bg-blue-500 rounded">
          Create New User
        </Link>
        <div className="mt-4">
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {users.map((user) => (
                <Link
                  href={`/users/${user.id}`}
                  key={user.id}
                  className="border p-4 rounded-md shadow-sm hover:bg-neutral-800"
                >
                  <h2 className="text-xl font-semibold text-blue-400">
                    {user.name}
                  </h2>

                  <div className="mt-2">
                    <p>Calories: {user.calories}</p>
                    <p>Carbs: {user.carbohydrates}g</p>
                    <p>Fat: {user.fat}g</p>
                    <p>Protein: {user.protein}g</p>
                    <p>Price: ${user.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Users;
