import Image from "next/image";
import NeurologyIcon from "@/public/static/images/neurology.svg";
import EmojiIcon from "@/public/static/images/emoji_objects.svg";
import TargetIcon from "@/public/static/images/target.svg";

const capacityTypes = {
  known: {
    icon: NeurologyIcon,
    title: "Known capacities",
    items: ["communication", "advocacy"],
    className: "bg-blue-500",
  },
  available: {
    icon: EmojiIcon,
    title: "Available capacities",
    items: ["communication", "advocacy"],
    className: "bg-green-500",
  },
  wanted: {
    icon: TargetIcon,
    title: "Wanted capacities",
    items: ["organizational behavior", "event"],
    className: "bg-red-500",
  },
};

interface CapacitiesSectionProps {
  type: keyof typeof capacityTypes;
}

export default function CapacitiesSection({ type }: CapacitiesSectionProps) {
  const { icon, title, items, className } = capacityTypes[type];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Image src={icon} alt={title} width={24} height={24} />
        <h2 className="text-[#003649] text-[16px] font-[Montserrat] font-bold">
          {title}
        </h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className={`px-3 py-1 rounded-full text-white text-sm ${className}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
