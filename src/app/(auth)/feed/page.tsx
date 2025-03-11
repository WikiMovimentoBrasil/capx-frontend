"use client";

import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";
import ProfileCard from "./components/Card";
import FilterIcon from "@/public/static/images/filter_icon.svg";
import FilterIconWhite from "@/public/static/images/filter_icon_white.svg";
import SearchIcon from "@/public/static/images/search_icon.svg";
import SearchIconWhite from "@/public/static/images/search_icon_white.svg";
import CloseIcon from "@/public/static/images/close_mobile_menu_icon_light_mode.svg";
import CloseIconWhite from "@/public/static/images/close_mobile_menu_icon_dark_mode.svg";
import { Filters } from "./components/Filters";
import { useApp } from "@/contexts/AppContext";
import { ProfileCapacityType, ProfileFilterType } from "./types";

export interface FilterState {
  capacities: string[];
  profileCapacityTypes: ProfileCapacityType[];
  territories: string[];
  languages: string[];
  profileFilter: ProfileFilterType;
}


export default function FeedPage() {
  const [showFilters, setShowFilters] = useState(false);
  const { darkMode } = useTheme();
  const { pageContent } = useApp();
  const [activeFilters, setActiveFilters] = useState({
    capacities: [] as string[],
    profileCapacityTypes: [] as ProfileCapacityType[],
    territories: [] as string[],
    languages: [] as string[],
    profileFilter: ProfileFilterType.Both
  });
  const [searchCapacity, setSearchCapacity] = useState('');

  const handleAddCapacity = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchCapacity.trim()) {
      const trimmedCapacity = searchCapacity.trim();
      if (!activeFilters.capacities.includes(trimmedCapacity)) {
        setActiveFilters(prev => ({
          ...prev,
          capacities: [...prev.capacities, trimmedCapacity]
        }));
      }
      setSearchCapacity('');
    }
  };

  const handleRemoveCapacity = (capacity: string) => {
    setActiveFilters(prev => ({
      ...prev,
      capacities: prev.capacities.filter(cap => cap !== capacity)
    }));
  };

  const handleApplyFilters = (newFilters: FilterState) => {
    setActiveFilters(newFilters);
    setShowFilters(false);
  };

  // TODO: Its a temp mock here. Get actual data from API
  const profiles = [
    { username: "Learner 1", capacities: [], type: ProfileCapacityType.Learner, territory: "Brazil" },
    { username: "Sharer 1", type: ProfileCapacityType.Sharer, capacities: [61] },
    { username: "Org Sharer 2", capacities: [], type: ProfileCapacityType.Sharer, languages: ["português"], avatar: "https://upload.wikimedia.org/wikipedia/commons/4/45/Wiki_Movimento_Brasil_logo.svg" },
    { username: "Sharer 3", capacities: [41, 43, 59, 61, 135], type: ProfileCapacityType.Sharer, territory: "Brazil", languages: ["português", "inglês", "espanhol", "japonês", "francês"], avatar: "https://commons.wikimedia.org/wiki/Special:Redirect/file/CapX_-_Avatar_-_3.svg" },
    { username: "Sharer With A Huge Name To Test On Device 4", capacities: [41, 43, 59, 61, 135], type: ProfileCapacityType.Sharer, territory: "Brazil", languages: ["português", "inglês", "espanhol", "japonês", "francês"], avatar: "https://commons.wikimedia.org/wiki/Special:Redirect/file/CapX_-_Avatar_-_3.svg" }
  ];

  return (
    <div className="w-full flex flex-col items-center pt-24 md:pt-8">
      <div className="container mx-auto px-4">
        <div className="md:max-w-[1200px] w-full max-w-sm mx-auto space-y-6">
          {/* SearchBar and Filters Button */}
          <div className="flex gap-2 mb-6">
            {/* Search Field Container */}
            <div className="flex-1 relative">
              <div className={`
                flex flex-col rounded-lg border
                ${darkMode 
                  ? 'bg-capx-dark-box-bg border-gray-700 text-white' 
                  : 'bg-white border-gray-300'
                }
              `}>
                {/* Search Icon */}
                <div className="absolute right-3 top-4">
                  <Image
                    src={darkMode ? SearchIconWhite : SearchIcon}
                    alt="Search"
                    width={20}
                    height={20}
                  />
                </div>

                {/* Container for the selected capacities and the input */}
                <div className={`
                  flex flex-wrap items-start gap-2 p-3 pr-12
                  ${darkMode ? 'bg-capx-dark-box-bg' : 'bg-white'}
                `}>
                  {/* Selected Capacities */}
                  {activeFilters.capacities.map((capacity, index) => (
                    <span
                      key={index}
                      className={`
                        inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm max-w-[200px]
                        ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}
                      `}
                    >
                      <span className="truncate">{capacity}</span>
                      <button
                        onClick={() => handleRemoveCapacity(capacity)}
                        className="hover:opacity-80 flex-shrink-0"
                      >
                        <Image
                          src={darkMode ? CloseIconWhite : CloseIcon}
                          alt={pageContent["filters-remove-item-alt-icon"]}
                          width={16}
                          height={16}
                        />
                      </button>
                    </span>
                  ))}

                  {/* Search Input */}
                  <div className="flex-1 min-w-[120px]">
                    <input
                      type="text"
                      value={searchCapacity}
                      onChange={(e) => setSearchCapacity(e.target.value)}
                      onKeyDown={handleAddCapacity}
                      placeholder={activeFilters.capacities.length === 0 ? pageContent["filters-search-by-capacities"] : ''}
                      className={`
                        w-full outline-none overflow-ellipsis bg-transparent
                        ${darkMode ? 'text-white placeholder:text-gray-400' : 'text-gray-900 placeholder:text-gray-500'}
                      `}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Filters Button */}
            <button
              onClick={() => setShowFilters(true)}
              className={`
                w-12 h-12 flex-shrink-0 rounded-lg flex items-center justify-center
                ${darkMode 
                  ? 'bg-capx-dark-box-bg text-white hover:bg-gray-700' 
                  : 'bg-white border border-gray-300 hover:bg-gray-50'
                }
              `}
              aria-label="Open filters"
            >
              <Image
                src={darkMode ? FilterIconWhite : FilterIcon}
                alt={pageContent["filters-icon"]}
                width={24}
                height={24}
              />
            </button>
          </div>

          <div className="w-full mx-auto space-y-6">
            {profiles.map((profile, index) => (
              <ProfileCard 
                key={index}
                username={profile.username}
                type={profile.type}
                capacities={profile.capacities}
                avatar={profile.avatar}
                languages={profile.languages}
                territory={profile.territory}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Filters Modal */}
      {showFilters && (
        <Filters
          onClose={() => setShowFilters(false)}
          onApplyFilters={handleApplyFilters}
          initialFilters={activeFilters}
        />
      )}
    </div>
  );
}
