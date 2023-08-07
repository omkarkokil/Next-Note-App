"use client";

import clsx from "clsx";
import { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  disabled?: boolean;
  type: string;
  required?: boolean;
  register?: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
}

const Input: FC<InputProps> = ({
  label,
  id,
  type = "text",
  disabled,
  register,
  errors,
  required,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm dark:text-gray-100 text-gray-900 leading-6 font-medium"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          disabled={disabled}
          autoComplete={id}
          id={id}
          {...(register && { ...register(id, { required }) })}
          className={clsx(
            `
          form-input
            block 
            w-full 
            rounded-md 
            border-0 
            dark:bg-slate-900
            py-1.5 
            text-gray-900 
            dark:text-gray-50 
            shadow-sm 
            ring-1 
            ring-inset 
            ring-gray-300 
            dark:ring-gray-700 
            placeholder:text-gray-400 
            focus:ring-2 
            focus:ring-inset 
            focus:ring-sky-600 
            sm:text-sm 
            sm:leading-6
            outline-none
            px-2
          `,
            errors && errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50 cursor-default"
          )}
        />
      </div>
    </div>
  );
};

export default Input;
