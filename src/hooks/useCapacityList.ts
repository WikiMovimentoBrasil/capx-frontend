import { useState, useCallback } from "react";
import { capacityService } from "@/services/capacityService";
import { getCapacityColor, getCapacityIcon } from "@/lib/utils/capacitiesUtils";
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

        console.log(formattedCapacities);

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
      console.log("Procurando parent para capacidade:", childCapacity);
      console.log("skill_type:", childCapacity.skill_type);

      if (!childCapacity.skill_type || childCapacity.skill_type.length === 0) {
        console.log("Sem skill_type definido");
        return undefined;
      }

      const parentId = childCapacity.skill_type[0];
      console.log("ParentId:", parentId);

      // Primeiro procura nas root capacities
      const rootParent = rootCapacities.find(
        (root) => root.code.toString() === parentId.toString()
      );
      console.log("Root capacities:", rootCapacities);
      console.log("Encontrou nas roots?", rootParent);

      if (rootParent) {
        return rootParent;
      }

      // Se não encontrou nas roots, procura em todos os filhos
      console.log("Children capacities:", childrenCapacities);
      for (const rootCode in childrenCapacities) {
        console.log("Verificando filhos da root:", rootCode);
        const children = childrenCapacities[rootCode];
        const parent = children?.find(
          (child) => child.code.toString() === parentId.toString()
        );
        console.log("Encontrou nos filhos?", parent);

        if (parent) {
          const grandparent = rootCapacities.find(
            (root) => root.code.toString() === rootCode.toString()
          );
          console.log("Grandparent encontrado:", grandparent);

          return {
            ...parent,
            parentCapacity: grandparent,
            color: grandparent?.color || parent.color,
            icon: getCapacityIcon(Number(rootCode)),
          };
        }
      }

      // Se ainda não encontrou, pode ser uma capacidade neta
      console.log("Procurando entre os netos...");
      for (const rootCode in childrenCapacities) {
        const children = childrenCapacities[rootCode];
        for (const child of children || []) {
          console.log("Verificando filhos de:", child.code);
          const grandChildren = childrenCapacities[child.code];
          console.log("Netos encontrados:", grandChildren);
          const grandChild = grandChildren?.find(
            (gc) => gc.code.toString() === childCapacity.code.toString()
          );
          console.log("É este neto?", grandChild);

          if (grandChild) {
            const grandparent = rootCapacities.find(
              (root) => root.code.toString() === rootCode.toString()
            );
            console.log("Encontrou avô:", grandparent);

            return {
              ...child,
              parentCapacity: grandparent,
              color: grandparent?.color || child.color,
              icon: getCapacityIcon(Number(rootCode)),
            };
          }
        }
      }

      console.log("Nenhum parent encontrado");
      return undefined;
    },
    [rootCapacities, childrenCapacities]
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
