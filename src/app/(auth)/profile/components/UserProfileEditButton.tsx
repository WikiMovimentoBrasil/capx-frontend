import { useState } from "react";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";

interface ProfileEditButtonProps {
  children: React.ReactNode;
  to: string;
  darkMode?: boolean;
  pageContent?: Record<string, string>;
}

export default function ProfileEditButton({
  children,
  to,
  darkMode = false,
}: ProfileEditButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const buttonClasses = [
    "absolute end-0 left-1/2",
    "transform -translate-x-1/2 -translate-y-8",
    "w-fit min-h-12",
    "bg-capx-secondary-purple hover:bg-capx-primary-green",
    "text-[#F6F6F6] hover:text-capx-dark-bg",
    "text-base px-4 sm:px-8 py-3",
    "rounded-full",
    "transition-colors duration-200",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ].join(" ");

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <Link href={to}>
      <button
        type="button"
        disabled={isLoading}
        onClick={handleClick}
        className={buttonClasses}
        aria-busy={isLoading}
      >
        {isLoading ? <LoadingSpinner /> : <span>{children}</span>}
      </button>
    </Link>
  );
}
