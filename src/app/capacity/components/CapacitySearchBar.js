"use client"
import { useState, useEffect } from 'react';

export default function CapacitySearchBar({ capacityList, selectedCapacity, setSelectedCapacity, searchBarQuery, setSearchBarQuery, searchBarResultList, setSearchBarResultList, pageContent }) {
  useEffect(() => {
    setSearchBarResultList(capacityList.names);
  }, [capacityList]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchBarQuery(value);

    // Filtering options based on the query
    const filtered = capacityList.names.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setSearchBarResultList(filtered);
  };

  const handleOptionClick = (option) => {
    const index = capacityList.names.indexOf(option);
    const code = capacityList.codes[index];
    const name = capacityList.names[index];
    setSelectedCapacity({ code: code, name: name })
    setSearchBarQuery(option);
    setSearchBarResultList([]);
  };

  const handleClearSearch = () => {
    setSearchBarQuery("");
    setSelectedCapacity({ code: "", name: "" })
    setSearchBarResultList(capacityList.names);
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
          disabled={selectedCapacity.code === "" ? false : true}
        />
        {searchBarQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute text-base font-extrabold text-capx-secondary-purple hover:text-gray-400 right-4 top-1/2 transform -translate-y-1/2"
          >
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
            </svg>
          </button>
        )}
      </div>
      {searchBarQuery && searchBarResultList.length > 0 && (
        <ul className="absolute w-full max-h-40 bg-white mt-2 border border-gray-200 rounded overflow-y-auto">
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