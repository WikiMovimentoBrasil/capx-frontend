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
  const [cachedCapacities, setCachedCapacities] = useState<
    Record<string, CapacityItem[]>
  >({});

  const getCapacityList = async (queryData) => {
    const queryResponse = await axios.get("/api/capacity", queryData);
    const formattedCapacities = queryResponse.data.map((item) => ({
      code: item.code,
      name: item.name,
      color: item.code.toString().startsWith("10")
        ? "organizational"
        : item.code.toString().startsWith("36")
        ? "communication"
        : item.code.toString().startsWith("50")
        ? "learning"
        : item.code.toString().startsWith("56")
        ? "community"
        : item.code.toString().startsWith("65")
        ? "social"
        : item.code.toString().startsWith("74")
        ? "strategic"
        : item.code.toString().startsWith("106")
        ? "technology"
        : "gray-200",
      icon: getCapacityIcon(item.code),
    }));
    setRootCapacities(formattedCapacities);
  };

  const toggleChildCapacities = useCallback(
    async (parentCode: string) => {
      // Se já está expandido, apenas recolhe
      if (expandedCapacities[parentCode]) {
        setExpandedCapacities((prev) => {
          const newState = { ...prev };
          delete newState[parentCode];
          return newState;
        });
        return;
      }

      // Se já tem em cache, usa os dados do cache sem fazer nova requisição
      if (cachedCapacities[parentCode]) {
        setExpandedCapacities((prev) => ({
          ...prev,
          [parentCode]: cachedCapacities[parentCode],
        }));
        return;
      }

      // Se não tem em cache, carrega os dados
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

        // Armazena no cache
        setCachedCapacities((prev) => ({
          ...prev,
          [parentCode]: formattedChildren,
        }));

        // Expande com os dados novos
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
    [session?.user?.token, cachedCapacities, expandedCapacities]
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
    <section className="max-w-[1024px] mx-auto py-8 px-4">
      <div className="grid gap-4 max-w-[1024px]">
        {rootCapacities.map((capacity) => (
          <div key={capacity.code} className="max-w-[1024px]">
            <div className="max-w-[1024px]">
              <CapacityCard
                {...capacity}
                isExpanded={!!expandedCapacities[capacity.code]}
                onExpand={() => toggleChildCapacities(capacity.code)}
              />
            </div>

            {expandedCapacities[capacity.code] && (
              <div
                className="max-w-[1024px] mt-4 overflow-x-auto scrollbar-hide
              "
              >
                <div className="flex gap-4 pb-4">
                  {expandedCapacities[capacity.code].map((child) => (
                    <div key={child.code} className="w-[280px] flex-shrink-0">
                      <CapacityCard
                        {...child}
                        isExpanded={!!expandedCapacities[child.code]}
                        onExpand={() => toggleChildCapacities(child.code)}
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
