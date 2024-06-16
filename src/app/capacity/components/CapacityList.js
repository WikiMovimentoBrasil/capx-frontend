export default function CapacityList({ capacityList, setSelectedCapacity, setSearchBarQuery, setSearchBarResultList }) {
  const handleOptionClick = (option) => {
    const index = capacityList.names.indexOf(option);
    const code = capacityList.codes[index];
    const name = capacityList.names[index];
    setSelectedCapacity({ code: code, name: name });
    setSearchBarQuery(option);
    setSearchBarResultList([]);
  };

  if (Object.keys(capacityList).length > 0) {
    return (
      <ul className="w-full text-sm space-y-2">
        {capacityList.names.map((capacityName, index) => (
          <li
            key={"capacity-" + index.toString()}
            onClick={() => handleOptionClick(capacityName)}
            className="w-fit py-1 px-3 cursor-pointer hover:bg-capx-secondary-purple hover:text-white">
            {capacityName}
          </li>
        ))}
      </ul>
    )
  }
}