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
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`flex items-center justify-center ${customClass}`}
    >
      <span className="flex items-center">{label}</span>
    </button>
  );
}
