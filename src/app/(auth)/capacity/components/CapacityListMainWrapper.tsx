"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useApp } from "@/contexts/AppContext";
import { useTheme } from "@/contexts/ThemeContext";
import { LoadingSection } from "./LoadingSection";
import { CapacityCard } from "./CapacityCard";
import axios from "axios";
import { getCapacityColor, getCapacityIcon } from "@/lib/utils/colorUtils";
import { CapacityBanner } from "./CapacityBanner";
import { CapacitySearch } from "./CapacitySearch";

import { useCapacityList } from "@/hooks/useCapacityList";

interface CapacityItem {
  code: string;
  name: string;
  icon: string;
  color: string;
  parentCode?: string;
  description?: string;
  wdCode?: string;
  parentCapacity?: CapacityItem;
  hasChildren: boolean;
}

export default function CapacityListMainWrapper() {
  const { pageContent, language } = useApp();
  const { status, data: session } = useSession();
  const { darkMode } = useTheme();

  const {
    rootCapacities,
    childrenCapacities,
    descriptions,
    wdCodes,
    isLoading,
    error,
    fetchRootCapacities,
    fetchCapacitiesByParent,
    fetchCapacityDescription,
  } = useCapacityList(session?.user?.token, language);

  const [expandedCapacities, setExpandedCapacities] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    if (status === "authenticated") {
      fetchRootCapacities();
    }
  }, [status, fetchRootCapacities]);

  const toggleChildCapacities = useCallback(
    async (parentCode: string) => {
      if (expandedCapacities[parentCode]) {
        setExpandedCapacities((prev) => ({ ...prev, [parentCode]: false }));
        return;
      }

      const children = await fetchCapacitiesByParent(parentCode);
      for (const child of children) {
        fetchCapacityDescription(child.code);
      }

      setExpandedCapacities((prev) => ({ ...prev, [parentCode]: true }));
    },
    [expandedCapacities, fetchCapacitiesByParent, fetchCapacityDescription]
  );

  if (status === "loading") {
    return <LoadingSection darkMode={darkMode} message="Capacities" />;
  }

  return (
    <section className="max-w-[1024px] mx-auto py-8 px-4">
      <CapacityBanner />
      <CapacitySearch />
      <div className="grid gap-4">
        {rootCapacities.map((capacity) => (
          <div key={capacity.code}>
            <div className="max-w-[992px]">
              <CapacityCard
                {...capacity}
                isExpanded={!!expandedCapacities[capacity.code]}
                onExpand={() => toggleChildCapacities(capacity.code)}
                hasChildren={true}
                isRoot={true}
              />
            </div>

            {expandedCapacities[capacity.code] && (
              <div className="mt-4 max-w-[992px] overflow-x-auto scrollbar-hide">
                <div className="flex gap-4 pb-4">
                  {childrenCapacities[capacity.code].map((child) => (
                    <div key={child.code} className="flex-shrink-0">
                      <CapacityCard
                        {...child}
                        isExpanded={!!expandedCapacities[child.code]}
                        onExpand={() => toggleChildCapacities(child.code)}
                        hasChildren={child.hasChildren}
                        parentCapacity={capacity}
                        color={getCapacityColor(capacity.code)}
                        description={descriptions[child.code] || ""}
                        wdCode={wdCodes[child.code] || ""}
                        isRoot={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
