import { useState, useCallback } from "react";
import { capacityService } from "@/services/capacityService";
import { getCapacityColor, getCapacityIcon } from "@/lib/utils/capacitiesUtils";
import { AxiosRequestConfig } from "axios";
import { CapacityResponse, Capacity } from "@/types/capacity";

export function useCapacityList(token?: string, language: string = "pt-br") {
  const [rootCapacities, setRootCapacities] = useState<Capacity[]>([]);
  const [childrenCapacities, setChildrenCapacities] = useState<
    Record<string, Capacity[]>
  >({});
  const [descriptions, setDescriptions] = useState<Record<string, string>>({});
  const [capacityById, setCapacityById] = useState<CapacityResponse>();
  const [wdCodes, setWdCodes] = useState<Record<string, string>>({});
  const [searchResults, setSearchResults] = useState<Capacity[]>([]);
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  const fetchRootCapacities = useCallback(async () => {
    if (!token) return;

    setIsLoading((prev) => ({ ...prev, root: true }));
    try {
      const response = await capacityService.fetchCapacities({
        params: { language },
        headers: { Authorization: `Token ${token}` },
      });

      const formattedCapacities = response.map((item: any): Capacity => {
        const baseCode = item.code.toString();
        return {
          code: baseCode,
          name: item.name,
          color: baseCode.startsWith("10")
            ? "organizational"
            : baseCode.startsWith("36")
            ? "communication"
            : baseCode.startsWith("50")
            ? "learning"
            : baseCode.startsWith("56")
            ? "community"
            : baseCode.startsWith("65")
            ? "social"
            : baseCode.startsWith("74")
            ? "strategic"
            : baseCode.startsWith("106")
            ? "technology"
            : "gray-200",
          icon: getCapacityIcon(baseCode),
          hasChildren: true,
          skill_type: [],
          skill_wikidata_item: "",
        };
      });

      setRootCapacities(formattedCapacities);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch root capacities"
      );
    } finally {
      setIsLoading((prev) => ({ ...prev, root: false }));
    }
  }, [token, language]);

  const fetchCapacitiesByParent = useCallback(
    async (parentCode: string, config?: AxiosRequestConfig) => {
      if (!token) return [];

      try {
        const response = await capacityService.fetchCapacitiesByType(
          parentCode,
          {
            headers: { Authorization: `Token ${token}` },
          }
        );

        const capacityData = Object.entries(response).map(([code, name]) => ({
          code,
          name,
        }));

        const parentCapacity = rootCapacities.find(
          (cap) => cap.code.toString() === parentCode.toString()
        );

        const formattedCapacities = capacityData.map((item: any): Capacity => {
          const baseCode = item.code.toString();
          return {
            code: baseCode,
            name: item.name,
            color: getCapacityColor(parentCapacity?.color || "gray-200"),
            icon: getCapacityIcon(Number(parentCode)),
            hasChildren: false,
            skill_type: [],
            skill_wikidata_item: "",
          };
        });

        setChildrenCapacities((prev) => ({
          ...prev,
          [parentCode]: formattedCapacities,
        }));
        return formattedCapacities;
      } catch (error) {
        console.error("Failed to fetch capacities by parent:", error);
        throw error;
      }
    },
    [token, language, rootCapacities]
  );

  const fetchCapacityDescription = useCallback(
    async (code: number) => {
      if (!token) return;

      try {
        const response = await capacityService.fetchCapacityDescription(code, {
          params: { language },
          headers: { Authorization: `Token ${token}` },
        });

        setDescriptions((prev) => ({ ...prev, [code]: response.description }));
        setWdCodes((prev) => ({ ...prev, [code]: response.wdCode }));
      } catch (error) {
        console.error("Failed to fetch capacity description:", error);
      }
    },
    [token, language]
  );

  const fetchCapacityById = useCallback(
    async (id: string) => {
      if (!token) return;

      try {
        const response = await capacityService.fetchCapacityById(id, {
          params: { language },
          headers: { Authorization: `Token ${token}` },
        });

        setCapacityById(response);
      } catch (error) {
        console.error("Failed to fetch capacity by id:", error);
      }
    },
    [token, language]
  );

  const fetchCapacitySearch = useCallback(
    async (search: string) => {
      if (!token) return;

      try {
        const response = await capacityService.searchCapacities(search, {
          params: { language },
          headers: { Authorization: `Token ${token}` },
        });

        console.log("Root Capacities:", rootCapacities);

        const formattedResults = response.map((item: any): Capacity => {
          const baseCode = item.code.toString().split(".")[0];
          const color = baseCode.startsWith("10")
            ? "organizational"
            : baseCode.startsWith("36")
            ? "communication"
            : baseCode.startsWith("50")
            ? "learning"
            : baseCode.startsWith("56")
            ? "community"
            : baseCode.startsWith("65")
            ? "social"
            : baseCode.startsWith("74")
            ? "strategic"
            : baseCode.startsWith("106")
            ? "technology"
            : "gray-200";

          const isParentCapacity = rootCapacities.some(
            (root) => root.code.toString() === item.code.toString()
          );

          const parentCapacity = !isParentCapacity
            ? rootCapacities.find((cap) => cap.code.toString() === baseCode)
            : undefined;

          console.log("Processing item:", {
            code: item.code,
            baseCode,
            isParentCapacity,
            foundParent: parentCapacity?.code,
          });

          return {
            code: item.code,
            name: item.name,
            color: isParentCapacity ? color : parentCapacity?.color || color,
            icon: isParentCapacity
              ? getCapacityIcon(Number(baseCode))
              : parentCapacity?.icon || "",
            hasChildren: isParentCapacity,
            parentCapacity: parentCapacity,
            skill_type: item.skill_type || [],
            skill_wikidata_item: item.skill_wikidata_item || "",
          };
        });

        console.log("Formatted Results:", formattedResults);
        setSearchResults(formattedResults);
      } catch (error) {
        console.error("Failed to fetch capacity search:", error);
      }
    },
    [token, language, rootCapacities]
  );

  return {
    rootCapacities,
    childrenCapacities,
    descriptions,
    searchResults,
    setSearchResults,
    capacityById,
    wdCodes,
    isLoading,
    error,
    fetchRootCapacities,
    fetchCapacitiesByParent,
    fetchCapacityDescription,
    fetchCapacityById,
    fetchCapacitySearch,
  };
}
