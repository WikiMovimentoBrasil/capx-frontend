"use client"
import Link from "next/link";
import { useState, useEffect } from 'react';
import { capitalizeFirstLetter } from "@/lib/utils/stringUtils";

export default function CapacityListSearchBar({ darkMode, capacityList, pageContent }) {
  const [searchBarQuery, setSearchBarQuery] = useState("");
  const [searchBarResultList, setSearchBarResultList] = useState([]);

  useEffect(() => {
    if (capacityList !== undefined) {
      setSearchBarResultList(capacityList);
    }
  }, [capacityList]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchBarQuery(value);

    // Filtering options based on the query
    const filtered = capacityList.filter((capacity) =>
      capacity.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchBarResultList(filtered);
  };

  const handleClearSearch = () => {
    setSearchBarQuery("");
    setSearchBarResultList(capacityList);
  };

  if (capacityList === undefined) {
    return (
      <div className="w-full text-capx-dark-bg">
        <div className="relative">
          <input
            value={""}
            type="text"
            className="w-full h-12 text-capx-dark-bg pl-4 rounded-md"
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
          className={"w-full h-12 text-capx-dark-bg pl-4 rounded-md"}
          placeholder={pageContent["body-capacity-searchbar-placeholder"]}
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
          {searchBarResultList.map((option, index) => (
            <Link key={index} href={"/capacity/" + option.code}>
              <li className="p-2 cursor-pointer hover:bg-blue-200">
                {capitalizeFirstLetter(option.name)}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  )
}