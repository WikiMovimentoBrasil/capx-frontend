import Image from "next/image";
import ArrowDropDownIcon from "@/public/static/images/arrow_drop_down_circle.svg";
import ArrowDropDownIconWhite from "@/public/static/images/arrow_drop_down_circle_white.svg";
import { useApp } from "@/contexts/AppContext";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface CapacitiesListProps {
  icon: string;
  title: string;
  customClass?: string;
  items?: string[];
}

const capacitiesList = [
  {
    category: "Known capacities",
    title: "communication",
  },
  {
    category: "Known capacities",
    title: "leadership",
  },
  {
    category: "Known capacities",
    title: "problem solving",
  },
  {
    category: "Known capacities",
    title: "critical thinking",
  },
  {
    category: "Available capacities",
    title: "teamwork",
  },
  {
    category: "Available capacities",
    title: "time management",
  },
  {
    category: "Available capacities",
    title: "adaptability",
  },
  {
    category: "Wanted capacities",
    title: "creativity",
  },
  {
    category: "Wanted capacities",
    title: "critical thinking",
  },
  {
    category: "Wanted capacities",
    title: "problem solving",
  },
];

const CapacitiesListComponent = ({ category }: { category: string }) => {
  const { isMobile } = useApp();
  const [showOverlay, setShowOverlay] = useState(false);
  const { darkMode } = useTheme();
  const filteredCapacities = capacitiesList.filter(
    (capacity) => capacity.category === category
  );

  const visibleCapacities = isMobile
    ? filteredCapacities.slice(0, 2)
    : filteredCapacities;
  const hasMore = isMobile && filteredCapacities.length > 2;

  return (
    <>
      <div
        className={`inline-flex px-[4px] py-[6px] items-center gap-[12px] rounded-[8px]  relative ${
          darkMode ? "bg-capx-dark-bg" : "bg-[#EFEFEF]"
        }`}
      >
        <div className="flex items-center gap-[12px]">
          {visibleCapacities.map((capacity, index) => (
            <div
              key={`${category}-${index}`}
              className={`flex p-[4px] items-center gap-[8px] rounded-[8px] border-[1.5px] border-[solid] ${
                category === "Known capacities"
                  ? "border-[var(--Links-light-link,#0070B9)] bg-[var(--Links-light-link,#0070B9)]"
                  : category === "Available capacities"
                  ? "border-[var(--Links-light-link,#05A300)] bg-[var(--Links-light-link,#05A300)]"
                  : category === "Wanted capacities"
                  ? "border-[var(--Links-light-link,#D43831)] bg-[var(--Links-light-link,#D43831)]"
                  : ""
              } text-white whitespace-nowrap`}
            >
              {capacity.title}
            </div>
          ))}
        </div>
        {hasMore && (
          <Image
            src={darkMode ? ArrowDropDownIconWhite : ArrowDropDownIcon}
            alt="More items"
            width={24}
            height={24}
            className="absolute right-3 cursor-pointer"
            onClick={() => setShowOverlay(true)}
          />
        )}
      </div>

      {showOverlay && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={() => setShowOverlay(false)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-[90%] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-wrap gap-3">
              {filteredCapacities.map((capacity, index) => (
                <div
                  key={`overlay-${category}-${index}`}
                  className={`flex h-[42px] p-[8px] items-center gap-[8px] rounded-[8px] border-[1.5px] border-[solid] ${
                    category === "Known capacities"
                      ? "border-[var(--Links-light-link,#0070B9)] bg-[var(--Links-light-link,#0070B9)]"
                      : category === "Available capacities"
                      ? "border-[var(--Links-light-link,#05A300)] bg-[var(--Links-light-link,#05A300)]"
                      : category === "Wanted capacities"
                      ? "border-[var(--Links-light-link,#D43831)] bg-[var(--Links-light-link,#D43831)]"
                      : ""
                  } text-white whitespace-nowrap`}
                >
                  {capacity.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const CapacitiesList = ({
  icon,
  title,
  customClass,
  items,
}: CapacitiesListProps) => {
  const { isMobile } = useApp();

  return (
    <section className={`flex flex-col gap-4`}>
      <div className="flex justify-start items-center gap-1">
        <div className="relative w-[32px] h-[32px]">
          <Image
            src={icon}
            alt={title}
            fill
            style={{ objectFit: "contain" }}
            className="p-1"
          />
        </div>
        <h2 className={`${customClass}`}>{title}</h2>
      </div>
      <CapacitiesListComponent category={title} />
    </section>
  );
};
