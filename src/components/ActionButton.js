import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useState } from "react";

export default function ActionButton({ children, to, customClass, onClick }) {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const buttonStyle = customClass
    ? customClass
    : "bg-capx-secondary-purple hover:bg-capx-primary-green text-[#F6F6F6] hover:text-capx-dark-bg absolute end-0 left-1/2 transform -translate-x-1/2 -translate-y-8 w-fit min-h-12 text-base px-4 sm:px-8 py-3 rounded-full";

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
