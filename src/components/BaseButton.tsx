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
    "flex w-fit h-fit my-auto px-[32px] py-[16px] bg-capx-secondary-purple hover:bg-capx-primary-green text-[#F6F6F6] hover:text-capx-dark-bg tracking-wider font-extrabold text-center rounded-lg";

  const buttonClass = customClass || defaultClass;

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={buttonClass}
    >
      {isLoading ? (
        <div className="w-8 h-8 border-8 animate-spin ease-linear rounded-full border-l-white border-r-white border-b-white border-t-capx-primary-green"></div>
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
}
