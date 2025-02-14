"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useApp } from "@/contexts/AppContext";
import { useTheme } from "@/contexts/ThemeContext";
import { LoadingSection } from "./LoadingSection";
import { CapacityCard } from "./CapacityCard";
import axios from "axios";
import { getCapacityColor, getCapacityIcon } from "@/lib/utils/capacityUtils";

interface CapacityItem {
  code: string;
  name: string;
  icon?: string;
  color: string;
}

export default function CapacityListMainWrapper() {
  const { pageContent, language } = useApp();
  const { status, data: session } = useSession();
  const { darkMode } = useTheme();

  const [rootCapacities, setRootCapacities] = useState<CapacityItem[]>([]);
  const [expandedCapacities, setExpandedCapacities] = useState<
    Record<string, CapacityItem[]>
  >({});
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const getCapacityList = async (queryData) => {
    const queryResponse = await axios.get("/api/capacity", queryData);
    const formattedCapacities = queryResponse.data.map((item) => ({
      code: item.code,
      name: item.name,
      color: getCapacityColor(item.code), // You'll need to implement this helper
      icon: getCapacityIcon(item.code), // You'll need to implement this helper
    }));
    setRootCapacities(formattedCapacities);
  };

  const loadChildCapacities = useCallback(
    async (parentCode: string) => {
      setLoadingStates((prev) => ({ ...prev, [parentCode]: true }));

      try {
        const queryData = {
          headers: {
            Authorization: `Token ${session?.user?.token}`,
          },
        };

        const response = await axios.get(
          `/api/capacity/type/${parentCode}`,
          queryData
        );
        const formattedChildren = Object.entries(response.data).map(
          ([code, name]) => ({
            code,
            name: String(name),
            color: getCapacityColor(code),
            icon: getCapacityIcon(code),
          })
        );

        setExpandedCapacities((prev) => ({
          ...prev,
          [parentCode]: formattedChildren,
        }));
      } catch (error) {
        console.error("Failed to load child capacities:", error);
      } finally {
        setLoadingStates((prev) => ({ ...prev, [parentCode]: false }));
      }
    },
    [session?.user?.token]
  );

  useEffect(() => {
    if (status === "authenticated") {
      const queryData = {
        params: { language },
        headers: {
          Authorization: `Token ${session?.user?.token}`,
        },
      };
      getCapacityList(queryData);
    }
  }, [status, session?.user?.token, language]);

  if (status === "loading") {
    return <LoadingSection darkMode={darkMode} message="CAPACITIES" />;
  }

  return (
    <section className="w-10/12 sm:w-8/12 mx-auto py-32 space-y-8">
      <h1
        className={`text-2xl font-bold mb-8 ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        {pageContent["navbar-link-capacities"]}
      </h1>

      <div className="grid gap-4">
        {rootCapacities.map((capacity) => (
          <div key={capacity.code} className="space-y-4">
            <CapacityCard
              {...capacity}
              onExpand={() => loadChildCapacities(capacity.code)}
            />

            {expandedCapacities[capacity.code] && (
              <div className="ml-8 flex gap-4 overflow-x-auto pb-4">
                {expandedCapacities[capacity.code].map((child) => (
                  <div key={child.code} className="min-w-[300px]">
                    <CapacityCard
                      {...child}
                      onExpand={() => loadChildCapacities(child.code)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
