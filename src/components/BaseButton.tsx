"use client";
import Image from "next/image";

interface BaseButtonProps {
  label: string | React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  customClass?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
}

export default function BaseButton({
  label,
  onClick,
  disabled = false,
  customClass = "",
  imageUrl,
  imageAlt = "Button icon",
  imageWidth = 24,
  imageHeight = 24,
}: BaseButtonProps) {
  const defaultClass =
    "flex justify-center items-center gap-2 px-8 py-4 rounded-lg bg-capx-secondary-purple hover:bg-capx-primary-green text-[#F6F6F6] hover:text-capx-dark-bg font-extrabold text-3.5 sm:text-3.5 rounded-lg text-center text-2xl not-italic leading-[normal]";

  const buttonClass = customClass || defaultClass;
  const justifyClass = imageUrl
    ? "justify-between mb-4 pb-4"
    : "justify-center";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${buttonClass} ${justifyClass}`}
    >
      <span>{label}</span>
      {imageUrl && (
        <div
          className="relative"
          style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      )}
    </button>
  );
}
