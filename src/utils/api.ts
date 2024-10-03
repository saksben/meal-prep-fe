import {
  Ingredient,
  User,
  Meal,
  Filter,
  Goal,
  MealPlan,
  GroceryList,
} from "@/types/models";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Helper function to handle requests
async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
}

// CRUD for User
export async function getUsers() {
  return await request<User[]>("/users");
}

export async function getUser(id: number) {
  return await request<User>(`/users/${id}`);
}

export async function createUser(data: Partial<User>) {
  return await request<User>("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateUser(id: number, data: Partial<User>) {
  return (
    await request<User>(`/users/${id}`),
    {
      method: "PATCH",
      body: JSON.stringify(data),
    }
  );
}

export async function deleteUser(id: number) {
  return await request<void>(`/users/${id}`, {
    method: "DELETE",
  });
}

// CRUD for Ingredient
export async function getIngredients() {
  return await request<Ingredient[]>("/ingredients");
}

export async function getIngredient(id: number) {
  return await request<Ingredient>(`/ingredients/${id}`);
}

export async function createIngredient(data: Partial<Ingredient>) {
  return await request<Ingredient>("ingredients", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateIngredient(id: number, data: Partial<Ingredient>) {
  return await request<Ingredient>(`/ingredients/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteIngredient(id: number) {
  return await request<void>(`/ingredients/${id}`, {
    method: "DELETE",
  });
}

// CRUD for Meal
export async function getMeals() {
  return await request<Meal[]>("/meals");
}

export async function getMeal(id: number) {
  return await request<Meal>(`/meals/${id}`);
}

export async function createMeal(data: Partial<Meal>) {
  return await request<Meal>("/meals", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateMeal(id: number, data: Partial<Meal>) {
  return await request<Meal>(`/meals/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteMeal(id: number) {
  return await request<void>(`/meals/${id}`, {
    method: "DELETE",
  });
}

// CRUD for Filter
export async function getFilters() {
  return await request<Filter[]>("/filters");
}

export async function getFilter(id: number) {
  return await request<Filter>(`/filters/${id}`);
}

export async function createFilter(data: Partial<Filter>) {
  return await request<Filter>("/filters", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateFilter(id: number, data: Partial<Filter>) {
  return await request<Filter>(`/filters/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteFilter(id: number) {
  return await request<void>(`/filters/${id}`, {
    method: "DELETE",
  });
}

// CRUD for Goal
export async function getGoals() {
  return await request<Goal[]>("/goals");
}

export async function getGoal(id: number) {
  return await request<Goal>(`/goals/${id}`);
}

export async function createGoal(data: Partial<Goal>) {
  return await request<Goal>("/goals", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateGoal(id: number, data: Partial<Goal>) {
  return await request<Goal>(`/goals/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteGoal(id: number) {
  return await request<Goal>(`/goals/${id}`, {
    method: "DELETE",
  });
}

// CRUD for MealPlan
export async function getMealPlans() {
  return await request<MealPlan[]>("/mealplans");
}

export async function getMealPlan(id: number) {
  return await request<MealPlan>(`/mealplans/${id}`);
}

export async function createMealPlan(data: Partial<MealPlan>) {
  return await request<MealPlan>("/mealplans", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateMealPlan(id: number, data: Partial<MealPlan>) {
  return await request<MealPlan>(`/mealplans/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteMealPlan(id: number) {
  return await request<void>(`/mealplans/${id}`, {
    method: "DELETE",
  });
}

// CRUD for GroceryList
export async function getGroceryLists() {
  return await request<GroceryList[]>("/grocerylists");
}

export async function getGroceryList(id: number) {
  return await request<GroceryList>(`/grocerylists/${id}`);
}

export async function createGroceryList(data: Partial<GroceryList>) {
  return await request<GroceryList>("/grocerylists", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateGroceryList(
  id: number,
  data: Partial<GroceryList>
) {
  return await request<GroceryList>(`/grocerylists/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteGroceryList(id: number) {
  return await request<void>(`/grocerylists/${id}`, {
    method: "DELETE",
  });
}
