import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@primer/octicons-react";
import { useTheme } from "@/contexts/ThemeContext";

interface CapacityCardProps {
  code: string;
  name: string;
  icon?: string;
  color: string;
  onExpand: () => void;
}

export function CapacityCard({
  code,
  name,
  icon,
  color,
  onExpand,
}: CapacityCardProps) {
  const { darkMode } = useTheme();

  return (
    <div
      className={`flex justify-between items-center p-4 rounded-lg w-full
        ${darkMode ? "bg-capx-dark-box-bg" : "bg-white"} 
        shadow-sm hover:shadow-md transition-shadow`}
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <div className="flex items-center gap-4 min-w-0">
        {icon && (
          <div className="w-8 h-8 flex-shrink-0">
            <Image src={icon} alt={name} width={32} height={32} />
          </div>
        )}
        <Link href={`/capacity/${code}`} className="min-w-0">
          <h3
            className={`text-lg font-medium truncate ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {name}
          </h3>
        </Link>
      </div>

      <button
        onClick={onExpand}
        className={`p-2 rounded-full hover:bg-gray-100 flex-shrink-0
          ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
      >
        <ChevronRightIcon size={24} />
      </button>
    </div>
  );
}
