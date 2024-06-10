import Link from "next/link";
import LoadingSpinner from "./LoadingSpinner";
import { useState } from "react";

export default function ButtonRedirectToPage({ children, to }) {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const buttonStyle = "w-fit h-fit bg-capx-secondary-purple text-[#F6F6F6] tracking-widest font-extrabold text-sm px-4 sm:px-5 py-2 -mt-2 rounded-full";

  const handleButtonClick = (e) => {
    setIsButtonLoading(true);
  }

  return (
    <Link href={to}>
      <button
        disabled={isButtonLoading}
        onClick={(e) => handleButtonClick()}
        className={buttonStyle + " mb-10"}
      >
        {isButtonLoading ? (<LoadingSpinner />) : (<span>{children}</span>)}
      </button>
    </Link>
  )
}