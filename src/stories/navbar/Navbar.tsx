import Link from "next/link";

const Navbar = () => {
  return (
    <nav className='w-full p-[2rem] bg-neutral-950 flex items-center sm:w-[15rem] sm:h-screen sm:flex-col sm:items-start sm:justify-center sm:p-[3rem] font-bold'>
      <ul className='w-full h-[2rem] items-center flex sm:gap-4 justify-between text-sm sm:w-[15rem] sm:h-full sm:flex-col sm:items-start sm:text-base sm:justify-normal'>
        <Link href='/meals'>
          <li>Meals</li>
        </Link>
        <Link href='/mealplans'>
          <li>Mealplans</li>
        </Link>
        <Link href='/users'>
          <li>Users</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar