export default function CapacityList({ darkMode, capacityList, setSelectedCapacity, setSearchBarQuery, setSearchBarResultList }) {
  const handleOptionClick = (option) => {
    setSelectedCapacity(option);
    setSearchBarQuery(option.name);
    setSearchBarResultList([]);
  };

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
            onClick={() => handleOptionClick(capacity)}
            className="w-fit py-1 px-3 cursor-pointer hover:bg-capx-secondary-purple hover:text-white">
            {capacity.name}
          </li>
        ))}
      </ul>
    )
  }
}