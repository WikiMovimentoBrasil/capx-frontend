"use client"
import { useState, useEffect } from 'react';

export default function CapacitySearchBar({ capacityList, setSelectedCapacity, searchBarQuery, setSearchBarQuery, pageContent }) {
  const [filteredCapacityNameList, setFilteredCapacityNameList] = useState([]);

  useEffect(() => {
    setFilteredCapacityNameList(capacityList.names);
  }, [capacityList]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchBarQuery(value);

    // Filtering options based on the query
    const filtered = capacityList.names.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCapacityNameList(filtered);
  };

  const handleOptionClick = (option) => {
    const index = capacityList.names.indexOf(option);
    const code = capacityList.codes[index];
    const name = capacityList.names[index];
    setSelectedCapacity({ code: code, name: name })
    setSearchBarQuery(option);
    setFilteredCapacityNameList([]);
  };

  const handleClearSearch = () => {
    setSearchBarQuery("");
    setSelectedCapacity({ code: "", name: "" })
    setFilteredCapacityNameList(capacityList.names);
  };

  if (capacityList.codes === undefined || capacityList.names === undefined) {
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
          className="w-full h-12 text-capx-dark-bg pl-4 border-2 rounded-md"
          placeholder={pageContent["body-capacity-searchbar-placeholder"]}
        />
        {searchBarQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute text-base font-extrabold text-capx-secondary-purple hover:text-gray-400 right-6 top-1/2 transform -translate-y-1/2"
          >
            x
          </button>
        )}
      </div>
      {searchBarQuery && filteredCapacityNameList.length > 0 && (
        <ul className="absolute w-full max-h-40 bg-white mt-2 border border-gray-200 rounded overflow-y-auto">
          {filteredCapacityNameList.map((option) => (
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