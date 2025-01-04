import Image from "next/image";

interface CapacitiesListProps {
  icon: string;
  title: string;
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
  // Filter capacities by category
  const filteredCapacities = capacitiesList.filter(
    (capacity) => capacity.category === category
  );

  return (
    <div className="inline-flex px-[12px] py-[24px] items-center gap-[12px] rounded-[16px] bg-[#EFEFEF]">
      {filteredCapacities.map((capacity, index) => {
        return (
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
            } text-white`}
          >
            {capacity.title}
          </div>
        );
      })}
    </div>
  );
};

export const CapacitiesList = ({ icon, title }: CapacitiesListProps) => {
  return (
    <section className="flex flex-col gap-4 mt-24">
      <div className="flex justify-start items-center gap-4">
        <Image src={icon} alt={title} width={48} height={48} />
        <h2 className="text-[#003649] text-center text-[24px] not-italic font-extrabold leading-[29px] font-[Montserrat]">
          {title}
        </h2>
      </div>
      <CapacitiesListComponent category={title} />
    </section>
  );
};
