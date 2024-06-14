"use client"
import axios from "axios";
import { useState, useEffect } from 'react';

export default function CapacitySearchBar({ session, pageContent }) {
  const [query, setQuery] = useState('');
  const [capacityNameList, setCapacityNameList] = useState([]);
  const [capacityCodeList, setCapacityCodeList] = useState([]);
  const [filteredCapacityNameList, setFilteredCapacityNameList] = useState([]);

  useEffect(() => {
    try {
      if (session.status === "authenticated") {
        const fetchCapacityList = async (queryData) => {
          const queryResponse = await axios.get('/api/capacity', queryData);
          setCapacityCodeList(queryResponse.data.codes);
          setCapacityNameList(queryResponse.data.names);
          setFilteredCapacityNameList(queryResponse.data.names);
        };
        const queryData = {
          headers: { 'Authorization': `Token ${session.data.user.token}` }
        }
        fetchCapacityList(queryData);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Filtering options based on the query
    const filtered = capacityNameList.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCapacityNameList(filtered);
  };

  const handleOptionClick = (option) => {
    const index = capacityNameList.indexOf(option);
    const code = capacityCodeList[index];
    setQuery(option);
    setFilteredCapacityNameList([]);
  };

  const handleClearSearch = () => {
    setQuery('');
    setFilteredCapacityNameList(capacityNameList);
  };

  return (
    <div className="w-full text-capx-dark-bg">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          className="w-full h-12 text-capx-dark-bg pl-4 border-2 rounded-md"
          placeholder={pageContent["body-capacity-searchbar-placeholder"]}
        />
        {query && (
          <button
            onClick={handleClearSearch}
            className="absolute text-base font-extrabold text-capx-secondary-purple hover:text-gray-400 right-6 top-1/2 transform -translate-y-1/2"
          >
            x
          </button>
        )}
      </div>
      {query && filteredCapacityNameList.length > 0 && (
        <ul className="max-h-40 bg-white mt-2 border border-gray-200 rounded overflow-y-auto">
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