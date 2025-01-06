import Image from "next/image";
import ArrowDropDownIcon from "@/public/static/images/arrow_drop_down_circle.svg";
import { useApp } from "@/contexts/AppContext";
import { useEffect, useRef, useState } from "react";

interface CapacitiesListProps {
  icon: string;
  title: string;
  customClass?: string;
}

const capacitiesList = [
  {
    category: "Known capacities",
    title: "Communication",
  },
  {
    category: "Known capacities",
    title: "Leadership",
  },
  {
    category: "Known capacities",
    title: "Problem Solving",
  },
  {
    category: "Known capacities",
    title: "Critical Thinking",
  },
  {
    category: "Available capacities",
    title: "Teamwork",
  },
  {
    category: "Available capacities",
    title: "Time Management",
  },
  {
    category: "Available capacities",
    title: "Adaptability",
  },
  {
    category: "Wanted capacities",
    title: "Creativity",
  },
  {
    category: "Wanted capacities",
    title: "Critical Thinking",
  },
  {
    category: "Wanted capacities",
    title: "Problem Solving",
  },
];

const CapacitiesListComponent = ({ category }: { category: string }) => {
  const { isMobile } = useApp();
  const [showOverlay, setShowOverlay] = useState(false);

  const filteredCapacities = capacitiesList.filter(
    (capacity) => capacity.category === category
  );

  const visibleCapacities = isMobile
    ? filteredCapacities.slice(0, 2)
    : filteredCapacities;
  const hasMore = isMobile && filteredCapacities.length > 2;

  return (
    <>
      <div className="inline-flex px-[12px] py-[24px] items-center gap-[12px] rounded-[8px] bg-[#EFEFEF] relative">
        <div className="flex items-center gap-[12px]">
          {visibleCapacities.map((capacity, index) => (
            <div
              key={`${category}-${index}`}
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
        {hasMore && (
          <Image
            src={ArrowDropDownIcon}
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
}: CapacitiesListProps) => {
  const { isMobile } = useApp();

  return (
    <section className={`flex flex-col gap-4 ${isMobile ? "mt-0" : "mt-24"}`}>
      <div className="flex justify-start items-center gap-4">
        <Image src={icon} alt={title} width={48} height={48} />
        <h2 className={`${customClass}`}>{title}</h2>
      </div>
      <CapacitiesListComponent category={title} />
    </section>
  );
};
