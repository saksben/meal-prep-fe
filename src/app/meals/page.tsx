import Link from "next/link";

interface mealTypes {
  id: number;
  name: string;
  calories: number;
  cookTime: number;
}

const meals: mealTypes[] = [
  {
    id: 0,
    name: "Creamy Garlic Chicken and Rice",
    calories: 373,
    cookTime: 30,
  },
  { id: 1, name: "Protein Shake", calories: 360, cookTime: 3 },
  { id: 2, name: "Chicken Fried Rice", calories: 189, cookTime: 25 },
  { id: 3, name: "Creamy Garlic Beef Pasta", calories: 353, cookTime: 34 },
  { id: 4, name: "Creamy Fettucine Alfredo", calories: 389, cookTime: 43 },
  { id: 5, name: "Cheesy Beef Burrito", calories: 290, cookTime: 29 },
];

const Meal: React.FC<mealTypes> = ({ name, calories, cookTime }) => {
  return (
    <div className='rounded-md hover:bg-neutral-800 cursor-pointer flex sm:flex-col gap-4 h-[4.5rem] sm:w-[14rem] sm:h-[16rem]'>
      <div className="border h-full sm:max-h-[9rem] max-sm:w-[6rem] rounded-md"></div>
      <div className='px-2'>
        <p className='text-blue-400 font-bold'>{name}</p>
        <p className='text-sm'>{calories} Calories</p>
        <p className='text-sm'>{cookTime} minutes</p>
      </div>
    </div>
  );
};

const Meals = () => {
  return (
    <div className='p-[2rem] flex flex-col gap-4 sm:gap-y-16 sm:flex-row max-w-[80rem] flex-wrap'>
      {meals.map((meal) => (
        <Link href={`/meals/recipes/${meal.id}`} className=''>
          <Meal
            key={meal.id}
            {...meal}
          />
        </Link>
      ))}
    </div>
  );
};

export default Meals;
