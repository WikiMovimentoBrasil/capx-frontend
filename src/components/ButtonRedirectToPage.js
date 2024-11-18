import Link from "next/link";
import LoadingSpinner from "./LoadingSpinner";
import { useState } from "react";

export default function ButtonRedirectToPage({ children, to, style, onClick }) {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const buttonStyle = style
    ? style
    : "w-fit h-fit bg-capx-secondary-grey hover:bg-capx-secondary-dark-grey text-[#F6F6F6] tracking-widest font-extrabold text-sm px-4 sm:px-5 py-2 rounded-full";

  const handleButtonClick = async (e) => {
    setIsButtonLoading(true);
    if (onClick) {
      await onClick(e);
    }
    setIsButtonLoading(false);
  };

  const ButtonContent = () =>
    isButtonLoading ? <LoadingSpinner /> : <span>{children}</span>;

  if (to) {
    return (
      <Link href={to}>
        <button className={buttonStyle} disabled={isButtonLoading}>
          <ButtonContent />
        </button>
      </Link>
    );
  }

  return (
    <button
      className={buttonStyle}
      disabled={isButtonLoading}
      onClick={handleButtonClick}
    >
      <ButtonContent />
    </button>
  );
}
