interface BaseButtonProps {
  label: string;
  onClick?: () => void;
  to?: string;
  disabled?: boolean;
  customClass?: string;
  isLoading?: boolean;
}

export default function BaseButton({
  label,
  onClick,
  to,
  disabled = false,
  customClass,
  isLoading = false,
}: BaseButtonProps) {
  const defaultClass =
    "bg-capx-secondary-purple px-[32px] py-[16px] tracking-wider font-extrabold text-center rounded-lg text-2xl hover:bg-capx-primary-green text-[#F6F6F6] hover:text-capx-dark-bg";

  const buttonClass = customClass || defaultClass;

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`flex items-center justify-center ${buttonClass}`}
    >
      <span className="flex items-center">{label}</span>
    </button>
  );
}
