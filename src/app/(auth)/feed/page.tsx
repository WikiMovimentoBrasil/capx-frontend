"use client";

import { useEffect, useMemo, useState } from "react";
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
import { useOrganizations } from "@/hooks/useOrganizationProfile";
import { Organization } from "@/types/organization";
import { UserProfile } from "@/types/user";
import { useAllUsers } from "@/hooks/useUserProfile";
import { PaginationButtons } from "./components/PaginationButtons";

export interface FilterState {
  capacities: string[];
  profileCapacityTypes: ProfileCapacityType[];
  territories: string[];
  languages: string[];
  profileFilter: ProfileFilterType;
}

const createProfilesFromOrganizations = (organizations: Organization[]) => {
  const profiles: any[] = [];

  organizations.forEach(org => {
    // Create card for available capacities (Sharer)
    if (org.available_capacities && org.available_capacities.length > 0) {
      profiles.push({
        id: org.id,
        username: org.display_name,
        capacities: org.available_capacities,
        type: ProfileCapacityType.Sharer,
        territory: org.territory?.[0], // Assuming we want to show the first territory only
        avatar: org.profile_image || undefined,
        isOrganization: true
      });
    }

    // Create card for desired capacities (Learner)
    if (org.wanted_capacities && org.wanted_capacities.length > 0) {
      profiles.push({
        id: org.id,
        username: org.display_name,
        capacities: org.wanted_capacities,
        type: ProfileCapacityType.Learner,
        territory: org.territory?.[0],
        avatar: org.profile_image || undefined,
        isOrganization: true
      });
    }
  });

  return profiles;
};

const createProfilesFromUsers = (users: UserProfile[]) => {
  const profiles: any[] = [];

  users.forEach(user => {
    // Create card for available capacities (Sharer)
    if (user.skills_available?.length > 0) {
      profiles.push({
        id: user.user.id,
        username: user.display_name,
        capacities: user.skills_available,
        type: ProfileCapacityType.Sharer,
        territory: user.territory?.[0],
        avatar: user.avatar,
        isOrganization: false
      });
    }

    // Create card for desired capacities (Learner)
    if (user.skills_wanted?.length > 0) {
      profiles.push({
        id: user.user.id,
        username: user.display_name,
        capacities: user.skills_wanted,
        type: ProfileCapacityType.Learner,
        territory: user.territory?.[0],
        avatar: user.avatar,
        isOrganization: false
      });
    }
  });

  return profiles;
};

export default function FeedPage() {
  const { darkMode } = useTheme();
  const { pageContent } = useApp();

  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    capacities: [] as string[],
    profileCapacityTypes: [] as ProfileCapacityType[],
    territories: [] as string[],
    languages: [] as string[],
    profileFilter: ProfileFilterType.Both
  });
  const [searchCapacity, setSearchCapacity] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerList = 5; // Divide between organizations and users
  const offset = (currentPage - 1) * itemsPerList; // Offset for both lists

  // Get data with limits and offsets
  const { organizations } = useOrganizations(itemsPerList, offset);
  const { allUsers } = useAllUsers(itemsPerList, offset);

  // Create profiles from organizations and users
  const filteredProfiles = useMemo(() => {
    const organizationProfiles = createProfilesFromOrganizations(organizations || []);
    const userProfiles = createProfilesFromUsers(allUsers || []);

    // Filter based on activeFilters.profileFilter
    switch (activeFilters.profileFilter) {
      case ProfileFilterType.User:
        return userProfiles;
      case ProfileFilterType.Organization:
       return organizationProfiles;
      case ProfileFilterType.Both:
      default:
       return [...organizationProfiles, ...userProfiles];
    }
  }, [organizations, allUsers, activeFilters]);

  // Calculate total of pages based on total profiles
  const totalRecords = filteredProfiles.length;
  const numberOfPages = Math.ceil(totalRecords / itemsPerList);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilters]);

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

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= numberOfPages) {
      setCurrentPage(newPage);
      // Scroll to top of the page
      window.scrollTo(0, 0);
    }
  };

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

          {filteredProfiles.length > 0 ? (
          <div className="w-full mx-auto space-y-6">
            {filteredProfiles.map((profile, index) => (
              <ProfileCard 
                id={profile.id}
                key={index}
                username={profile.username}
                type={profile.type}
                capacities={profile.capacities}
                avatar={profile.avatar}
                languages={profile.languages}
                territory={profile.territory}
                isOrganization={profile.isOrganization}
              />
            ))}
          </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
            <p className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
              {pageContent["feed-no-data-message"]}
            </p>
            <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {pageContent["feed-no-data-description"]}
            </p>
          </div>
          )}
        </div>
      </div>
      
      {/* Pagination buttons */}
      <PaginationButtons
        currentPage={currentPage}
        totalPages={numberOfPages || 1}
        onPageChange={handlePageChange}
      />

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
