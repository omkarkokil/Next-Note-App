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
        hover:text-white
        dark:text-white
        font-semibold
      `,
          disabled && "opacity-50 cursor-default",
          fullwidth && "w-full",
          danger && "hover:bg-danger focus-visible:outline-rose-600",
          secondary && "text-gray-900 dark:bg-slate-50",
          !secondary && !danger && "bg-primary text-white"
        )}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
