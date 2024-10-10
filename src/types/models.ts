export type User = {
  id: number;
  name: string;
  mealPlans: MealPlan[];
  groceryList: GroceryList[];
  goal?: Goal;
};

export type Ingredient = {
  id: number;
  name: string;
  unit: string;
  amount: number;
  calories: number;
  carbohydrates: number;
  fat: number;
  protein: number;
  price?: number;
//   meals: MealIngredient[];
};

export type Meal = {
  id: number;
  name: string;
  description: string;
  recipe: string;
  servings: number;
  recipeLink: string;
  filters: Filter[];
  mealPlans: MealPlan[];
  ingredients: Ingredient[];
};

export type Filter = {
  id: number;
  name: string;
  meals: Meal[];
};

export type Goal = {
  id: number;
  name: string;
  calories: number;
  carbohydrates: number;
  fat: number;
  protein: number;
  price?: number;
  user?: User;
  userId?: User;
  meals: Meal[];
};

export type MealPlan = {
  id: number;
  name: string;
  user: User;
  userId: number;
  frequency: string;
  goal?: Goal;
  goalId?: number;
  meals: Meal[];
  groceryLists: GroceryList[];
};

export type GroceryList = {
  id: number;
  user: User;
  userId: number;
  mealPlans: MealPlan[];
};
