export default function CapacityList({ capacityList, setSelectedCapacity, setSearchBarQuery, setSearchBarResultList }) {
  const handleOptionClick = (option) => {
    setSelectedCapacity(option);
    setSearchBarQuery(option.name);
    setSearchBarResultList([]);
  };

  if (Object.keys(capacityList).length > 0) {
    return (
      <ul className="w-full text-sm space-y-2">
        {capacityList.map((capacity, index) => (
          <li
            key={"capacity-" + index.toString()}
            onClick={() => handleOptionClick(capacity)}
            className="w-fit py-1 px-3 cursor-pointer hover:bg-capx-secondary-purple hover:text-white">
            {capacity.name}
          </li>
        ))}
      </ul>
    )
  }
}