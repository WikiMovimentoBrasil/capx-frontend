interface ChevronIconProps {
  fill?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const ChevronIcon = ({
  fill = "currentColor",
  width = 20,
  height = 20,
  className,
}: ChevronIconProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
