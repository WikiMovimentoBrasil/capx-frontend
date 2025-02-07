import { useState, useCallback, useEffect, useRef } from "react";
import { capacityService } from "@/services/capacityService";
import { Capacity } from "@/types/capacity";

export function useCapacityList(token?: string, language: string = "pt-br") {
  const [rootCapacities, setRootCapacities] = useState<Capacity[]>([]);
  const [capacityHierarchy, setCapacityHierarchy] = useState<
    Record<number, Capacity[]>
  >({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isFetchingRef = useRef(false);

  const formatCapacityResponse = useCallback(
    (response: any, parentId?: string): Capacity[] => {
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
        children: [],
      }));
    },
    []
  );

  const fetchRootCapacities = useCallback(async () => {
    if (!token || isFetchingRef.current) return;

    try {
      isFetchingRef.current = true;
      setIsLoading(true);

      const response = await capacityService.fetchCapacities({
        params: { language },
        headers: { Authorization: `Token ${token}` },
      });

      const formattedResponse = formatCapacityResponse(response);
      setRootCapacities((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(formattedResponse)) {
          return prev;
        }
        return formattedResponse;
      });
    } catch (err) {
      console.error("Error in fetchRootCapacities:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch root capacities"
      );
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, [token, language, formatCapacityResponse]);

  const fetchCapacitiesByParent = useCallback(
    async (parentId: number | string) => {
      if (
        !token ||
        isFetchingRef.current ||
        capacityHierarchy[parentId]?.length > 0
      )
        return;

      try {
        isFetchingRef.current = true;
        setIsLoading(true);

        const response = await capacityService.fetchCapacityByType(
          String(parentId),
          {
            params: { language },
            headers: { Authorization: `Token ${token}` },
          }
        );

        if (!response || typeof response !== "object") return [];

        const formattedChildren = Object.entries(response).map(
          ([code, name]) => ({
            id: Number(code),
            code: Number(code),
            name: String(name),
            skill_type: [String(parentId)],
            skill_wikidata_item: "",
            children: [],
          })
        );

        setCapacityHierarchy((prev) => ({
          ...prev,
          [parentId]: formattedChildren,
        }));

        return formattedChildren;
      } catch (err) {
        console.error("Error fetching capacities:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch capacities"
        );
        return [];
      } finally {
        setIsLoading(false);
        isFetchingRef.current = false;
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
