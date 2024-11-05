import Link from "next/link";
import { TreeView } from "@primer/react";
import capitalizeFirstLetter from "@/lib/utils/string";

interface CapacityItem {
  code: string;
  name: string;
}

interface CapacityListViewProps {
  darkMode: boolean;
  capacityList?: CapacityItem[];
}

export default function CapacityListView({
  darkMode,
  capacityList,
}: CapacityListViewProps) {
  if (!capacityList) {
    return <SkeletonView darkMode={darkMode} />;
  }

  if (capacityList.length === 0) {
    return null;
  }

  return (
    <ul className="w-full text-sm space-y-2">
      {capacityList.map((capacity, index) => (
        <li
          key={`capacity-${index}`}
          className="w-fit py-2 px-4 cursor-pointer hover:bg-capx-secondary-purple hover:rounded-lg hover:text-white"
        >
          <Link href={`/capacity/${capacity.code}`}>
            {capitalizeFirstLetter(capacity.name)}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function SkeletonView({ darkMode }: { darkMode: boolean }) {
  const skeletonItems = Array.from({ length: 10 });
  const skeletonClass = `${
    darkMode ? "bg-capx-dark-box-bg" : "bg-capx-light-box-bg"
  } w-full h-8 rounded-lg animate-pulse`;

  return (
    <div className="grid grid-cols-2 gap-8 w-full">
      {[0, 1].map((col) => (
        <ul key={col} className="space-y-3">
          {skeletonItems.map((_, index) => (
            <li key={index}>
              <div className={skeletonClass} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
