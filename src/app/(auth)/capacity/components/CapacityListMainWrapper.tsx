"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useApp } from "@/contexts/AppContext";
import { useTheme } from "@/contexts/ThemeContext";
import { LoadingSection } from "./LoadingSection";
import { CapacityCard } from "./CapacityCard";
import { getCapacityColor, getCapacityIcon } from "@/lib/utils/colorUtils";
import { CapacityBanner } from "./CapacityBanner";
import { CapacitySearch } from "./CapacitySearch";
import { useCapacityList } from "@/hooks/useCapacityList";

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
        if (child.code) {
          fetchCapacityDescription(child.code);
        }
      }

      setExpandedCapacities((prev) => ({ ...prev, [parentCode]: true }));
    },
    [expandedCapacities, fetchCapacitiesByParent, fetchCapacityDescription]
  );

  if (status === "loading") {
    return <LoadingSection darkMode={darkMode} message="Capacities" />;
  }

  return (
    <section className="flex flex-col max-w-[1024px] mx-auto py-8 px-4 gap-[40px]">
      <CapacityBanner />
      <CapacitySearch />
      <div className="grid gap-[40px]	">
        {rootCapacities.map((capacity) => (
          <div key={capacity.code}>
            <div className="max-w-[992px]">
              <CapacityCard
                {...capacity}
                isExpanded={!!expandedCapacities[capacity.code]}
                onExpand={() => toggleChildCapacities(capacity.code.toString())}
                hasChildren={true}
                isRoot={true}
                color={capacity.color}
              />
            </div>

            {expandedCapacities[capacity.code] && (
              <div className="mt-4 max-w-[992px] overflow-x-auto scrollbar-hide">
                <div className="flex gap-4 pb-4">
                  {(childrenCapacities[capacity.code] || []).map((child) => (
                    <div key={child.code} className="flex-shrink-0">
                      <CapacityCard
                        {...child}
                        isExpanded={!!expandedCapacities[child.code]}
                        onExpand={() =>
                          toggleChildCapacities(child.code.toString())
                        }
                        hasChildren={child.hasChildren}
                        parentCapacity={capacity}
                        color={child.color}
                        description={descriptions[child.code] || ""}
                        wd_code={wdCodes[child.code] || ""}
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
