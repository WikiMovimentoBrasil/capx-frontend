"use client"
import { useState } from 'react';

export default function CapacitySearchBar() {
  const [query, setQuery] = useState('');
  const [capacityNameList, setCapacityNameList] = useState([]);
  const [capacityCodeList, setCapacityCodeList] = useState([]);
  const [filteredCapacityList, setFilteredCapacityList] = useState([]);
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Filtering options based on the query
    const filtered = capacityNameList.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCapacityList(filtered);
  };

  const handleOptionClick = (option) => {
    const index = capacityNameList.indexOf(option);
    const code = capacityCodeList[index];
    setQuery(option);
    setFilteredCapacityList([]);
  };
  
  return <div></div>
}