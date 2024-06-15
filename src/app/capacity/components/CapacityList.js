export default function CapacityList({ capacityList }) {
  if (Object.keys(capacityList).length > 0) {
    return (
      <ul className="w-full text-sm space-y-2">
        {capacityList.names.map((capacityName, index) => (
          <li key={"capacity-" + index.toString()} className="w-fit py-1 px-3 cursor-pointer hover:bg-capx-secondary-purple hover:text-white">
            {capacityName}
          </li>
        ))}
      </ul>
    )
  }
}