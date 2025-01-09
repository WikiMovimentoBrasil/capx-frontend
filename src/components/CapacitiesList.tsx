import Image from "next/image";
import ArrowDropDownIcon from "@/public/static/images/arrow_drop_down_circle.svg";
import ArrowDropDownIconWhite from "@/public/static/images/arrow_drop_down_circle_white.svg";
import { useApp } from "@/contexts/AppContext";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Capacity } from "@/types/capacity";

interface CapacitiesListProps {
  icon: string;
  title: string;
  items: Capacity[] | string[] | number[];
  customClass?: string;
}

export const CapacitiesList = ({
  icon,
  title,
  items,
  customClass,
}: CapacitiesListProps) => {
  const renderItem = (item: Capacity | string | number) => {
    if (typeof item === "object" && "name" in item) {
      return item.name || `Capacity ${item.id}`;
    }
    return String(item);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <Image src={icon} alt={title} width={20} height={20} />
        <p className={customClass}>{title}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-[4px] border-[1px] border-[solid] border-[var(--Links-light-link,#0070B9)] flex p-[4px] justify-center items-center gap-[4px]"
          >
            <p className={customClass}>{renderItem(item)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
