"use client"
import { useState, useEffect } from 'react';

export default function CapacitySearchBar() {
  const [query, setQuery] = useState('');
  const [capacityNameList, setCapacityNameList] = useState([]);
  const [capacityCodeList, setCapacityCodeList] = useState([]);
  const [filteredCapacityList, setFilteredCapacityNameList] = useState([]);

  useEffect(() => {
    const fetchCapacityList = async () => {
      try {
        const response = await fetch('/api/capacity');
        const data = await response.json();
        setCapacityCodeList(data.codes);
        setCapacityNameList(data.names);
        setFilteredCapacityNameList(data.names);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchCapacityList();
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

  return (
    <div className="w-full">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="w-full h-12 text-capx-dark-bg pl-4 border-2 rounded-md"
        placeholder="Search for a capacity."
      />
    </div>
  )
}