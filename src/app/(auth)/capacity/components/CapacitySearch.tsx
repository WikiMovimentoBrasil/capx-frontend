"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useApp } from "@/contexts/AppContext";
import BaseInput from "@/components/BaseInput";
import { CapacityCard } from "./CapacityCard";
import SearchIcon from "@/public/static/images/search.svg";
import { useCapacityList } from "@/hooks/useCapacityList";
import LoadingState from "@/components/LoadingState";

interface CapacitySearchProps {
  onSearchStart?: () => void;
  onSearchEnd?: () => void;
}

// simple debounce
function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFunction = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  // Function to cancel the debounce
  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Clear the timeout when the component is unmounted
  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  return { debouncedFunction, cancel };
}

export function CapacitySearch({
  onSearchStart,
  onSearchEnd,
}: CapacitySearchProps) {
  const { data: session } = useSession();
  const { language, isMobile, pageContent } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [expandedCapacities, setExpandedCapacities] = useState<
    Record<string, boolean>
  >({});
  const {
    searchResults,
    descriptions,
    setSearchResults,
    fetchRootCapacities,
    fetchCapacitiesByParent,
    fetchCapacitySearch,
    fetchCapacityDescription,
    wdCodes,
  } = useCapacityList(session?.user?.token, language);

  // Store the last search term to avoid duplicate requests
  const lastSearchRef = useRef<string>("");

  useEffect(() => {
    if (session?.user?.token) {
      fetchRootCapacities();
    }
  }, [session?.user?.token, fetchRootCapacities]);

  // Search function
  const search = useCallback(
    async (term: string) => {
      // If the search term is the same as the last search, do nothing
      if (term === lastSearchRef.current) {
        return;
      }

      if (term) {
        setIsLoading(true);
        onSearchStart?.();
        await fetchCapacitySearch(term);
        // Store the current search term
        lastSearchRef.current = term;
        setIsLoading(false);
      } else {
        setSearchResults([]);
        onSearchEnd?.();
        // Clear the last search
        lastSearchRef.current = "";
      }
    },
    [fetchCapacitySearch, onSearchStart, onSearchEnd, setSearchResults]
  );

  // Use the custom debounce hook
  const { debouncedFunction: debouncedSearch, cancel } = useDebounce(
    search,
    300
  );

  // Effect to call the debounce function when the search term changes
  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const toggleCapacity = useCallback(
    async (parentCode: string) => {
      if (expandedCapacities[parentCode]) {
        setExpandedCapacities((prev) => ({ ...prev, [parentCode]: false }));
        return;
      }

      const children = await fetchCapacitiesByParent(parentCode);
      for (const child of children) {
        if (child.code) {
          fetchCapacityDescription(child.code);
        }
      }

      setExpandedCapacities((prev) => ({ ...prev, [parentCode]: true }));
    },
    [expandedCapacities, fetchCapacitiesByParent, fetchCapacityDescription]
  );

  return (
    <div className="w-full">
      <BaseInput
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={pageContent["capacity-search-placeholder"]}
        className={`w-full py-6 px-3 text-capx-dark-box-bg rounded-[16px] opacity-50 border border-capx-dark-box-bg ${
          isMobile ? "text-[12px]" : "text-[24px]"
        }`}
        icon={SearchIcon}
        iconPosition="right"
      />

      <div className="grid gap-4 mt-4">
        {isLoading ? (
          <LoadingState />
        ) : (
          searchResults.map((capacity) => {
            return (
              <div key={capacity.code} className="w-full">
                <CapacityCard
                  {...capacity}
                  isExpanded={!!expandedCapacities[capacity.code]}
                  onExpand={() => toggleCapacity(capacity.code.toString())}
                  isRoot={!capacity.parentCapacity}
                  color={capacity.color}
                  icon={capacity.icon}
                  parentCapacity={capacity.parentCapacity}
                  description={descriptions[capacity.code] || ""}
                  wd_code={wdCodes[capacity.code] || ""}
                  onInfoClick={fetchCapacityDescription}
                  isSearch={true}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
