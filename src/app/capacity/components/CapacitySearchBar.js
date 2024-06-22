"use client"
import { useState, useEffect } from 'react';

export default function CapacitySearchBar({ darkMode, capacityList, selectedCapacity, setSelectedCapacity, searchBarQuery, setSearchBarQuery, searchBarResultList, setSearchBarResultList, pageContent }) {
  const [capacityNames, setCapacityNames] = useState([]);

  useEffect(() => {
    if (capacityList !== undefined) {
      const names = capacityList.map((capacity) => capacity.name)
      setCapacityNames(names);
      setSearchBarResultList(names);
    }
  }, [capacityList]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchBarQuery(value);

    // Filtering options based on the query
    const filtered = capacityNames.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setSearchBarResultList(filtered);
  };

  const handleOptionClick = (option) => {
    const clickedCapacity = capacityList.filter((capacity) =>
      capacity.name.toLowerCase() === option.toLowerCase()
    );
    setSelectedCapacity(clickedCapacity)
    setSearchBarQuery(option);
    setSearchBarResultList([]);
  };

  const handleClearSearch = () => {
    setSearchBarQuery("");
    setSelectedCapacity({ code: "", wd_code: "", name: "" })
    setSearchBarResultList(capacityNames);
  };

  if (capacityList === undefined) {
    return (
      <div className="w-full text-capx-dark-bg">
        <div className="relative">
          <input
            value={""}
            type="text"
            className="w-full h-12 text-capx-dark-bg pl-4 border-2 rounded-md"
            placeholder={pageContent["body-capacity-searchbar-placeholder"]}
            disabled={true}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full text-capx-dark-bg">
      <div className="relative">
        <input
          type="text"
          value={searchBarQuery}
          onChange={handleInputChange}
          className={(darkMode ? "text-capx-light-box-bg " : "text-capx-dark-box-bg ") + "w-full h-12 text-capx-dark-bg pl-4 border-2 rounded-md"}
          placeholder={pageContent["body-capacity-searchbar-placeholder"]}
          disabled={selectedCapacity.code === "" ? false : true}
        />
        {searchBarQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute text-base font-extrabold text-capx-secondary-purple hover:text-gray-400 right-4 top-1/2 transform -translate-y-1/2"
          >
            <svg className={"w-6 h-6 " + (darkMode ? "text-capx-primary-yellow" : "text-capx-primary-red")} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
            </svg>
          </button>
        )}
      </div>
      {searchBarQuery && searchBarResultList.length > 0 && (
        <ul className="absolute w-full max-h-40 bg-gray-50 mt-2 border border-gray-200 rounded overflow-y-auto">
          {searchBarResultList.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className="p-2 cursor-pointer hover:bg-blue-200"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}