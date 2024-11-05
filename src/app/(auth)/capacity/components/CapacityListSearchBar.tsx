"use client";
import { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import capitalizeFirstLetter from "@/lib/utils/string";

interface Capacity {
  code: string;
  name: string;
}

interface CapacityListSearchBarProps {
  darkMode: boolean;
  capacityList?: Capacity[];
  pageContent: Record<string, string>;
}

export default function CapacityListSearchBar({
  darkMode,
  capacityList,
  pageContent,
}: CapacityListSearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCapacities, setFilteredCapacities] = useState<Capacity[]>([]);

  useEffect(() => {
    if (!capacityList) return;

    const filtered = capacityList.filter((capacity) =>
      capacity.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCapacities(filtered);
  }, [searchTerm, capacityList]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="w-full space-y-8">
      <input
        type="text"
        placeholder={pageContent["body-capacity-searchbar-placeholder"]}
        value={searchTerm}
        onChange={handleSearch}
        className={`w-full px-8 py-4 rounded-lg ${
          darkMode ? "bg-capx-dark-box-bg" : "bg-capx-light-box-bg"
        }`}
      />
      {searchTerm && (
        <div
          className={`w-full px-8 py-4 rounded-lg ${
            darkMode ? "bg-capx-dark-box-bg" : "bg-capx-light-box-bg"
          }`}
        >
          <ul className="space-y-4">
            {filteredCapacities.map((capacity, index) => (
              <li key={index}>
                <Link
                  href={`/capacity/${capacity.code}`}
                  className="hover:text-capx-primary-green"
                >
                  {capitalizeFirstLetter(capacity.name)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
