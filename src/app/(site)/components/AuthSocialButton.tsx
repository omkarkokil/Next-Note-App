import React, { FC } from "react";
import { IconType } from "react-icons";

interface AuthButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: FC<AuthButtonProps> = ({ icon: Icon, onClick }) => {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className="inline-flex w-full
         justify-center items-center rounded-md
          bg-white dark:bg-slate-900 px-4 py-2 text-gray-500 dark:text-gray-50 
          shadow-sm ring-1 ring-inset focus:outline-offset-0 ring-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <Icon />
      </button>
    </>
  );
};

export default AuthSocialButton;
