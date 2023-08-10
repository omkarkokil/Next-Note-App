"use client";

import clsx from "clsx";
import React, { FC, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  type?: "submit" | "button" | "reset" | undefined;
  fullwidth?: boolean;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  children,
  type = "button",
  fullwidth,
  danger,
  disabled,
  secondary,
  onClick,
}) => {
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        data-te-modal-dismiss
        aria-label="Close"
        className={clsx(
          `
        flex 
        justify-center 
        rounded-md 
        px-3 
        py-2 
        text-sm 
        font-semibold 
        focus-visible:outline 
          focus-visible:outline-2 
        focus-visible:outline-offset-2 
        `,
          danger &&
            "hover:text-white  hover:bg-rose-600 focus-visible:outline-rose-600",
          disabled && "opacity-50 cursor-default",
          fullwidth && "w-full",
          secondary ? "text-gray-900 dark:text-white" : "text-white",
          !secondary &&
            !danger &&
            "bg-sky-400  hover:bg-sky-600 focus-visible:outline-sky-600"
        )}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
