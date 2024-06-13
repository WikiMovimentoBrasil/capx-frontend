"use client"
import { useState } from 'react';

export default function CapacitySearchBar() {
  const [query, setQuery] = useState('');
  const [capacityList, setCapacityList] = useState([]);
  const [filteredCapacityList, setFilteredCapacityList] = useState([]);
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Filtering options based on the query
    const filtered = capacityList.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCapacityList(filtered);
  };
  
  return <div></div>
}