// TODO: Have a Select of all MealPlans used in the MealPlan calendar, and add each ingredient to the list when selected
// TODO: strikethrough when checked
// TODO: reset button

// TODO: combine all of the same ingredients into one

interface IngredientTypes {
  id: number;
  name: string;
  amount: number;
  unit: string;
}

const ingredients: IngredientTypes[] = [
  {
    id: 0,
    name: "Chicken breast",
    unit: "g",
    amount: 600,
  },
  { id: 1, name: "Garlic", unit: "tsp", amount: 4 },
  { id: 2, name: "Rice", unit: "g", amount: 185 },
  { id: 3, name: "Cream cheese", unit: "g", amount: 150 },
  { id: 4, name: "Paprika", unit: "tsp", amount: 2 },
  { id: 5, name: "Chicken stock", unit: "ml", amount: 150 },
];

const Ingredient: React.FC<IngredientTypes> = ({ name, unit, amount }) => {
  return (
    <div className="">
      <div className="px-2 flex gap-2 items-center">
        <input type="checkbox" />
        <p className="text-sm">{`${amount} ${unit}`}</p>
        <p className="text-blue-400 font-semibold">{name}</p>
      </div>
    </div>
  );
};

const GroceryList = () => {
  return (
    <div className="p-[2rem] flex flex-col">
      <h1 className="text-xl font-semibold mb-5">Grocery List</h1>
      {ingredients.map((ingredient) => (
        <Ingredient key={ingredient.id} {...ingredient} />
      ))}
    </div>
  );
};

export default GroceryList;
