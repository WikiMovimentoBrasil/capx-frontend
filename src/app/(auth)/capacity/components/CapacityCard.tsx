import Image from "next/image";
import Link from "next/link";
import ChevronRightIcon from "@/public/static/images/arrow_drop_down_circle_white.svg";

interface CapacityCardProps {
  code: string;
  name: string;
  icon?: string;
  color: string;
  onExpand: () => void;
  isExpanded: boolean;
}

export function CapacityCard({
  code,
  name,
  icon,
  color,
  onExpand,
  isExpanded,
}: CapacityCardProps) {
  return (
    <div
      className={`flex h-[326px] justify-between items-center p-4 rounded-lg w-[1024px] bg-${color} shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="flex items-center gap-8 min-w-0">
        {icon && (
          <div className="relative w-[135px] h-[135px] ml-12">
            <Image src={icon} alt={name} fill />
          </div>
        )}
        <div className="flex w-[378px] h-[118px]">
          <Link
            href={`/capacity/${code}`}
            className="w-[378px] h-[118px] flex items-center"
          >
            <h3
              className={`text-[48px] font-extrabold text-white leading-normal`}
            >
              {name}
            </h3>
          </Link>
        </div>
      </div>

      <button onClick={onExpand} className="p-2 rounded-full flex-shrink-0">
        <div
          className={`relative w-[68px] h-[68px] mr-12 transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          <Image src={ChevronRightIcon} alt="Expand" fill />
        </div>
      </button>
    </div>
  );
}
