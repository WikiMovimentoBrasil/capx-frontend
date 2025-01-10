import { useCapacityDetails } from "@/hooks/useCapacityDetails";
import Image from "next/image";
import { useEffect } from "react";

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
  console.log("CapacitiesList mounting with items:", items);

  const { getCapacityName, capacityNames } = useCapacityDetails(items);

  console.log("Hook returned:", { capacityNames, items });

  useEffect(() => {
    console.log("CapacitiesList capacityNames changed:", capacityNames);
  }, [capacityNames]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <div className="relative h-[20px] w-[20px]">
          <Image src={icon} alt={title} fill objectFit="contain" />
        </div>
        <p className={customClass}>{title}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => {
          const name = getCapacityName(item);
          console.log(`Rendering item ${index}:`, { item, name });
          return (
            <div
              key={index}
              className="rounded-[4px] inline-flex px-[4px] py-[6px] items-center gap-[8px] bg-[#EFEFEF]"
            >
              <p className={customClass}>{name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
