"use client";

import { useState, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useApp } from "@/contexts/AppContext";
import axios from "axios";
import BaseInput from "@/components/BaseInput";
import { CapacityCard } from "./CapacityCard";
import { getCapacityColor, getCapacityIcon } from "@/lib/utils/capacitiesUtils";
import SearchIcon from "@/public/static/images/search.svg";
import { useCapacityList } from "@/hooks/useCapacityList";
import { debounce } from "lodash";
import { Capacity } from "@/types/capacity";

export function CapacitySearch() {
  const { data: session } = useSession();
  const { language } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { searchResults, setSearchResults, fetchCapacitySearch } =
    useCapacityList(session?.user?.token, language);
  const debouncedSearch = useCallback(
    debounce(async (term: string) => {
      if (!term || term.length < 3) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        await fetchCapacitySearch(term);

        const formattedResults = searchResults.map(
          (item: any): Capacity => ({
            code: item.code,
            name: item.name,
            color: getCapacityColor(Number(item.code)),
            icon: getCapacityIcon(Number(item.code)),
            description: item.description || "",
            wd_code: item.wd_code || "",
            hasChildren: false,
            skill_type: [],
            skill_wikidata_item: "",
          })
        );

        setSearchResults(formattedResults);
      } catch (error) {
        console.error("Failed to search capacities:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [session?.user?.token, language]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
  }, [searchTerm, debouncedSearch]);

  return (
    <div className="w-full max-w-[992px] mx-auto">
      <BaseInput
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search capacities"
        className="w-full py-6 px-3 text-[24px] text-[#829BA4] rounded-[16px] border border-[2px] border-capx-dark-box-bg"
        icon={SearchIcon}
        iconPosition="right"
      />

      <div className="grid gap-4 mt-4">
        {isLoading ? (
          <div className="text-center">Searching...</div>
        ) : (
          searchResults.map((capacity) => (
            <div key={capacity.code} className="max-w-[992px]">
              <CapacityCard
                {...capacity}
                isExpanded={false}
                onExpand={() => {}}
                hasChildren={capacity.hasChildren}
                isRoot={false}
                code={capacity.code}
                name={capacity.name || ""}
                color={capacity.color || ""}
                icon={capacity.icon || ""}
                description={capacity.description || ""}
                wd_code={capacity.wd_code || ""}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
