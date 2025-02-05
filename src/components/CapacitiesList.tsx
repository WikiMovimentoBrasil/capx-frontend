import { useCapacityDetails } from "@/hooks/useCapacityDetails";
import Image from "next/image";
import { useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useApp } from "@/contexts/AppContext";

interface CapacitiesListProps {
  icon: string;
  title: string;
  items: (number | string)[];
  customClass?: string;
}

export function CapacitiesList({
  icon,
  title,
  items,
  customClass,
}: CapacitiesListProps) {
  const { getCapacityName, capacityNames } = useCapacityDetails(items);
  const { darkMode } = useTheme();
  const { isMobile, pageContent } = useApp();

  if (isMobile) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 items-center">
          <div className="relative h-[20px] w-[20px]">
            <Image src={icon} alt={title} className="object-contain" />
          </div>
          <h2
            className={
              customClass +
              " font-extrabold" +
              (darkMode ? " text-capx-light-bg" : " text-capx-dark-box-bg")
            }
          >
            {title}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => {
            const name = getCapacityName(item);
            return (
              <div
                key={index}
                className={`rounded-[4px] inline-flex px-[4px] py-[6px] items-center gap-[8px] ${
                  title === pageContent["body-profile-known-capacities-title"]
                    ? "bg-[#0070B9] text-white"
                    : title === pageContent["body-profile-available-capacities-title"]
                    ? "bg-[#05A300] text-white"
                    : title === pageContent["body-profile-wanted-capacities-title"]
                    ? "bg-[#D43831] text-white"
                    : "bg-[#EFEFEF]"
                }`}
              >
                <p className={customClass + " font-normal"}>{name}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[62px] mb-4">
      <div className="flex flex-row gap-2 items-center">
        <div className="relative h-[42px] w-[42px] items-center">
          <Image src={icon} alt={title} className="object-contain" fill />
        </div>
        <h2
          className={
            customClass +
            "font-extrabold text-[24px]" +
            (darkMode ? " text-capx-light-bg" : " text-capx-dark-box-bg")
          }
        >
          {title}
        </h2>
      </div>
      <div
        className={`flex flex-wrap gap-2 ${
          darkMode ? "bg-capx-dark-bg py-6 px-3 mb-[62px] rounded-[16px]" : ""
        }`}
      >
        {items.map((item, index) => {
          const name = getCapacityName(item);
          return (
            <div
              key={index}
              className={`rounded-[4px] inline-flex px-[4px] py-[6px] items-center gap-[8px] ${
                title === pageContent["body-profile-known-capacities-title"]
                  ? "bg-[#0070B9] text-[24px] text-white"
                  : title === pageContent["body-profile-available-capacities-title"]
                  ? "bg-[#05A300] text-[24px] text-white"
                  : title === pageContent["body-profile-wanted-capacities-title"]
                  ? "bg-[#D43831] text-[24px] text-white"
                  : "bg-[#EFEFEF]"
              }`}
            >
              <p className={customClass + " !text-[24px] font-normal"}>
                {name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
