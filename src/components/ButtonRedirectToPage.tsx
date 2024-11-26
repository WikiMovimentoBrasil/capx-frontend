import Link from "next/link";
import LoadingSpinner from "./LoadingSpinner";
import { useState } from "react";

interface ButtonRedirectToPageProps {
  children: React.ReactNode;
  to: string;
  style?: string;
}

export default function ButtonRedirectToPage({
  children,
  to,
  style,
}: ButtonRedirectToPageProps) {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const buttonStyle = style
    ? style
    : "w-fit h-fit bg-capx-secondary-grey hover:bg-capx-secondary-dark-grey text-[#F6F6F6] tracking-widest font-extrabold text-sm px-4 sm:px-5 py-2 rounded-full";

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsButtonLoading(true);
  };

  return (
    <Link href={to}>
      <button
        disabled={isButtonLoading}
        onClick={(e) => handleButtonClick(e)}
        className={buttonStyle}
      >
        {isButtonLoading ? <LoadingSpinner /> : <span>{children}</span>}
      </button>
    </Link>
  );
}
