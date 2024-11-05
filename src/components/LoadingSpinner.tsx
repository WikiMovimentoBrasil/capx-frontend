import React from "react";

interface LoadingSpinnerProps {
  customClass?: string;
}

export default function LoadingSpinner({ customClass }: LoadingSpinnerProps) {
  return (
    <div
      className={
        customClass ||
        "animate-spin ease-linear h-6 w-6 rounded-full mx-auto border-4 border-l-white border-r-white border-b-white border-t-capx-primary-green"
      }
    />
  );
}
