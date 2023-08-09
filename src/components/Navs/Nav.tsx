"use client";

// import { ThemeContext } from "@/context/ThemeContext";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
// import { useContext } from "react";
import { BiLogOut } from "react-icons/bi";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

const Nav = () => {
  const session = useSession();
  // const { toggleTheme, setToggle } = useContext(ThemeContext);
  const { setTheme, theme } = useTheme();
  return (
    <>
      <nav className="bg-white dark:bg-slate-800 fixed transition-all hidden   sm:flex flex-col gap-2 items-center w-20 border-r justify-between border-gray-800/30  h-screen ">
        <div>
          <div
            onClick={() => signOut()}
            className="px-2 mt-4 rounded-md cursor-pointer py-2 text-2xl flex justify-center dark:text-gray-200 dark:hover:bg-gray-600 text-gray-700 hover:bg-gray-100  "
          >
            <BiLogOut />
          </div>
          <div
            onClick={() => {
              theme === "light" ? setTheme("dark") : setTheme("light");
            }}
            className="px-2 transition-all mt-4 rounded-md cursor-pointer py-2 text-xl flex justify-center dark:text-gray-200 dark:hover:bg-gray-600 text-gray-700 hover:bg-gray-100  "
          >
            {theme === "light" ? <BsFillSunFill /> : <BsFillMoonFill />}
          </div>
        </div>
        <div className="mb-4">
          <Image
            alt="Image of user"
            className=" rounded-full"
            height={45}
            width={45}
            src={session.data?.user?.image || "/images/placeholder.jpg"}
          />
        </div>
      </nav>
    </>
  );
};

export default Nav;
