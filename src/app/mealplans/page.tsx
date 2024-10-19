// TODO: Have a calendar of a full month (or just a week). Select what meals are wanted and the servings of days. Show the meals per day and the calories, carb, fat, protein intakes per day.
// TODO: Needs a search function for Meals with an input for servings.

// TODO: Eventually, you can click+drag to determine servings, and it automatically calculates servings.

import Link from "next/link";

const MealPlans = () => {
  return (
    <div className="p-[2rem]">
      <Link
        href="/mealplans/grocerylist"
        className="hover:bg-neutral-800 cursor-pointer p-2 rounded-lg"
      >
        Grocery List
      </Link>
    </div>
  );
};

export default MealPlans;
