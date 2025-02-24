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
    async (parentCode: string) => {
      if (!token) return [];

      try {
        const response = await capacityService.fetchCapacitiesByType(
          parentCode,
          {
            headers: { Authorization: `Token ${token}` },
          }
        );

        const capacityData = await Promise.all(
          Object.entries(response).map(async ([code, name]) => {
            const childrenResponse =
              await capacityService.fetchCapacitiesByType(code, {
                headers: { Authorization: `Token ${token}` },
              });

            return {
              code,
              name,
              hasChildren: Object.keys(childrenResponse).length > 0,
            };
          })
        );

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
            hasChildren: item.hasChildren,
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

        return response.description;
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

  const findParentCapacity = useCallback(
    (childCapacity: Capacity) => {
      if (!childCapacity.skill_type || childCapacity.skill_type.length === 0) {
        return undefined;
      }

      const parentId = childCapacity.skill_type[0];
      return rootCapacities.find(
        (root) => root.code.toString() === parentId.toString()
      );
    },
    [rootCapacities]
  );

  const fetchCapacitySearch = useCallback(
    async (search: string) => {
      if (!token) return;

      try {
        const response = await capacityService.searchCapacities(search, {
          params: { language },
          headers: { Authorization: `Token ${token}` },
        });

        const validResults = response.filter((item: any) => item !== null);

        const formattedResults = validResults.map((item: any): Capacity => {
          const isRootCapacity = rootCapacities.some(
            (root) => root.code.toString() === item.code.toString()
          );

          const effectiveSkillType = isRootCapacity
            ? [item.code.toString()]
            : item.skill_type || [];

          const parentCapacity = findParentCapacity({
            ...item,
            code: item.code,
            skill_type: effectiveSkillType,
          });

          return {
            code: item.code,
            name: item.name,
            color: isRootCapacity
              ? item.color
              : parentCapacity?.color || "gray-200",
            icon: isRootCapacity ? item.icon : parentCapacity?.icon || "",
            hasChildren: isRootCapacity,
            parentCapacity: isRootCapacity ? undefined : parentCapacity,
            skill_type: effectiveSkillType,
            skill_wikidata_item: item.skill_wikidata_item || "",
          };
        });

        setSearchResults(formattedResults);
      } catch (error) {
        console.error("Failed to fetch capacity search:", error);
      }
    },
    [token, language, rootCapacities, findParentCapacity]
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
    findParentCapacity,
    fetchRootCapacities,
    fetchCapacitiesByParent,
    fetchCapacityDescription,
    fetchCapacityById,
    fetchCapacitySearch,
  };
}
