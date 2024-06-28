import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useState } from "react";

export default function UserProfileEditButton({ children, to }) {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const buttonStyle = "absolute end-0 left-1/2 transform -translate-x-1/2 -translate-y-8 w-full min-h-12 bg-capx-secondary-purple hover:bg-capx-primary-green text-[#F6F6F6] text-sm px-4 sm:px-2 py-3 rounded-full";

  const handleButtonClick = (e) => {
    setIsButtonLoading(true);
  }

  return (
    <Link href={to}>
      <button
        disabled={isButtonLoading}
        onClick={(e) => handleButtonClick()}
        className={buttonStyle}
      >
        {isButtonLoading ? (<LoadingSpinner />) : (<span>{children}</span>)}
      </button>
    </Link>
  )
}