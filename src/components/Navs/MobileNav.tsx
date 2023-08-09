"use client";

import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";
import { BiLogOut } from "react-icons/bi";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

const MobileNav = () => {
  const { setTheme, theme } = useTheme();
  const session = useSession();
  return (
    <div
      className="  fixed 
        justify-center 
        w-full 
        bottom-0 
        z-40 
        flex 
        items-center 
        bg-white dark:bg-slate-700
        border-gray-800/30
        border-t-[1px] 
        sm:hidden
        py-2
        gap-10
        "
    >
      <div
        onClick={() => signOut()}
        className="px-2  rounded-md cursor-pointer py-2 text-4xl  dark:text-gray-200 dark:hover:bg-gray-600 text-gray-700 hover:bg-gray-100  "
      >
        <BiLogOut />
      </div>
      <div
        onClick={() => {
          theme === "light" ? setTheme("dark") : setTheme("light");
        }}
        className="px-2 transition-all  rounded-md  cursor-pointer py-2 text-4xl  dark:text-gray-200 dark:hover:bg-gray-600 text-gray-700 hover:bg-gray-100  "
      >
        {theme === "light" ? <BsFillSunFill /> : <BsFillMoonFill />}
      </div>
      <Image
        alt="Image of user"
        className=" rounded-full"
        height={40}
        width={40}
        src={session.data?.user?.image || "/images/placeholder.jpg"}
      />
    </div>
  );
};

export default MobileNav;
