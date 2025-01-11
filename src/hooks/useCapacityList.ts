import { useState, useCallback } from "react";
import { capacityService } from "@/services/capacityService";
import { Capacity } from "@/types/capacity";

export function useCapacityList(token?: string, language: string = "pt-br") {
  const [rootCapacities, setRootCapacities] = useState<Capacity[]>([]);
  const [capacityHierarchy, setCapacityHierarchy] = useState<
    Record<number, Capacity[]>
  >({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatCapacityResponse = (
    response: any,
    parentId?: string
  ): Capacity[] => {
    return (response || []).map((cap: any) => ({
      id: Number(cap?.code),
      code: Number(cap?.code),
      name: String(cap?.name || ""),
      skill_type: parentId
        ? [String(parentId)]
        : Array.isArray(cap?.skill_type)
        ? cap.skill_type
        : [],
      skill_wikidata_item: String(cap?.skill_wikidata_item || ""),
    }));
  };

  const fetchCapacitiesByParent = useCallback(
    async (parentId: number | string) => {
      if (!token) return;

      console.log("Fetching capacities for parent:", parentId);

      try {
        setIsLoading(true);
        const response = await capacityService.fetchCapacityByType(
          String(parentId),
          {
            params: { language },
            headers: { Authorization: `Token ${token}` },
          }
        );

        console.log("API Response:", response);

        if (!response || typeof response !== "object") {
          console.log("Invalid response");
          return [];
        }

        // Transformar o objeto em array de capacidades
        const formattedChildren = Object.entries(response).map(
          ([code, name]) => {
            console.log("Formatting entry:", { code, name });
            return {
              id: Number(code),
              code: Number(code),
              name: String(name),
              skill_type: [String(parentId)],
              skill_wikidata_item: "",
              children: [], // Adicionado para manter consistência com a interface Capacity
            };
          }
        );

        console.log("Formatted children before setting:", formattedChildren);

        // Atualizar o estado de forma síncrona para garantir que os dados estejam disponíveis
        setCapacityHierarchy((prev) => {
          const newHierarchy = {
            ...prev,
            [parentId]: formattedChildren,
          };
          console.log("New hierarchy state:", newHierarchy);
          return newHierarchy;
        });

        return formattedChildren;
      } catch (err) {
        console.error("Error fetching capacities:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch capacities"
        );
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [token, language]
  );

  const fetchCapacityTree = useCallback(
    async (
      parentId: number | string,
      depth: number = 0,
      maxDepth: number = 3
    ) => {
      if (depth >= maxDepth) return;

      const children = await fetchCapacitiesByParent(parentId);

      for (const child of children || []) {
        await fetchCapacityTree(child.id, depth + 1, maxDepth);
      }
    },
    [fetchCapacitiesByParent]
  );

  const fetchRootCapacities = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const response = await capacityService.fetchCapacities({
        params: { language },
        headers: { Authorization: `Token ${token}` },
      });

      const formattedResponse = formatCapacityResponse(response);
      setRootCapacities(formattedResponse);
    } catch (err) {
      console.error("Error in fetchRootCapacities:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch root capacities"
      );
    } finally {
      setIsLoading(false);
    }
  }, [token, language]);

  return {
    rootCapacities,
    capacityHierarchy,
    isLoading,
    error,
    fetchRootCapacities,
    fetchCapacitiesByParent,
    fetchCapacityTree,
  };
}
