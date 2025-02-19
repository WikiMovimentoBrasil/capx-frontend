"use client";

import { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useApp } from "@/contexts/AppContext";
import axios from "axios";
import BaseInput from "@/components/BaseInput";
import { CapacityCard } from "./CapacityCard";
import { getCapacityColor, getCapacityIcon } from "@/lib/utils/colorUtils";

interface CapacitySearchItem {
  code: string;
  name: string;
  icon: string;
  color: string;
  parentCode?: string;
  description?: string;
  wdCode?: string;
  parentCapacity?: CapacitySearchItem;
  hasChildren: boolean;
}

export function CapacitySearch() {
  const { data: session } = useSession();
  const { language } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<CapacitySearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchCapacities = useCallback(
    async (term: string) => {
      if (!term || term.length < 3) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get(`/api/capacity/search`, {
          params: {
            q: term,
            language,
          },
          headers: {
            Authorization: `Token ${session?.user?.token}`,
          },
        });

        const formattedResults = response.data.map(
          (item: any): CapacitySearchItem => {
            const baseCode = item.code.toString().split(".")[0];
            return {
              code: item.code,
              name: item.name,
              color: getCapacityColor(baseCode),
              icon: getCapacityIcon(baseCode),
              description: item.description || "",
              wdCode: item.wd_code || "",
              hasChildren: false, // Será atualizado após verificação
            };
          }
        );

        setSearchResults(formattedResults);
      } catch (error) {
        console.error("Failed to search capacities:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [session?.user?.token, language]
  );

  return (
    <div className="w-full max-w-[992px] mx-auto">
      <BaseInput
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          searchCapacities(e.target.value);
        }}
        placeholder="Search capacities..."
        className="w-full mb-4 p-2 rounded-lg border border-gray-300"
      />

      {isLoading ? (
        <div className="text-center">Searching...</div>
      ) : (
        <div className="grid gap-4">
          {searchResults.map((capacity) => (
            <div key={capacity.code} className="max-w-[992px]">
              <CapacityCard
                {...capacity}
                isExpanded={false}
                onExpand={() => {}}
                hasChildren={capacity.hasChildren}
                isRoot={false}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
