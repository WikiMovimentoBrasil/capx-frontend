"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  customClass?: string;
}

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ label, error, className = "", customClass = "", ...props }, ref) => {
    return (
      <div className="flex flex-col w-full">
        {label && (
          <label className="mb-2 text-sm font-medium text-capx-dark-box-bg">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            px-4 
            py-2 
            text-[20px]
            bg-capx-light-box-bg 
            border 
            border-capx-gray-200
            rounded-lg 
            focus:outline-none 
            focus:ring-2 
            focus:ring-capx-primary-green 
            focus:border-transparent
            placeholder:text-capx-gray-400
            ${error ? "border-red-500" : ""}
            ${className}
            ${customClass}
          `}
          {...props}
        />
        {error && <span className="mt-1 text-sm text-red-500">{error}</span>}
      </div>
    );
  }
);

BaseInput.displayName = "BaseInput";

export default BaseInput;
