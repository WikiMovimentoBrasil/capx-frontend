import Link from "next/link";
import TreeView from '@primer/react'

export default function CapacityListView({ darkMode, capacityList }) {
  if (capacityList === undefined) {
    const skeletonItems = Array.from({ length: 10 });
    return (
      <div className="grid grid-cols-2 gap-8 w-full">
        <ul className="space-y-3">
          {skeletonItems.map((_, index) => (
            <li key={index}>
              <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-full h-8 rounded-lg animate-pulse"}></div>
            </li>
          ))}
        </ul>
        <ul className="space-y-3">
          {skeletonItems.map((_, index) => (
            <li key={index}>
              <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-full h-8 rounded-lg animate-pulse"}></div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  if (Object.keys(capacityList).length > 0) {
    return (
      <ul className="w-full text-sm space-y-2">
        {capacityList.map((capacity, index) => (
          <li
            key={"capacity-" + index.toString()}
            className="w-fit py-2 px-4 cursor-pointer hover:bg-capx-secondary-purple hover:rounded-lg hover:text-white"
          >
            <Link href={"/capacity/" + capacity.code}>
              {capacity.name}
            </Link>
          </li>
        ))}
      </ul>
    )
  }
}