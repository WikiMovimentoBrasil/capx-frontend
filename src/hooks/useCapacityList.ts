import { useState, useCallback } from "react";
import { capacityService } from "@/services/capacityService";
import { Capacity } from "@/types/capacity";

export function useCapacityList(token?: string, language: string = "pt-br") {
  const [rootCapacities, setRootCapacities] = useState<Capacity[]>([]);
  const [childCapacities, setChildCapacities] = useState<
    Record<number, Capacity[]>
  >({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRootCapacities = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const response = await capacityService.fetchCapacities({
        params: { language },
        headers: { Authorization: `Token ${token}` },
      });

      const formattedResponse = (response || []).map((cap) => ({
        id: Number(cap?.code),
        code: Number(cap?.code),
        name: String(cap?.name || ""),
        skill_type: Array.isArray(cap?.skill_type) ? cap.skill_type : [],
        skill_wikidata_item: String(cap?.skill_wikidata_item || ""),
      }));

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

  const fetchChildCapacities = useCallback(
    async (parentId: number) => {
      if (!token || !parentId) return;
      try {
        const response = await capacityService.fetchCapacityByType(
          String(parentId),
          {
            params: { language },
            headers: { Authorization: `Token ${token}` },
          }
        );

        if (!response || typeof response !== "object") {
          return;
        }

        const formattedChildren = Object.entries(response).map(
          ([id, name]) => ({
            id: Number(id || 0),
            code: Number(id || 0),
            name: String(name || ""),
            skill_type: [String(parentId)],
            skill_wikidata_item: "",
          })
        );

        setChildCapacities((prev) => ({
          ...prev,
          [parentId]: formattedChildren,
        }));
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch child capacities"
        );
      }
    },
    [token, language]
  );

  return {
    rootCapacities,
    childCapacities,
    isLoading,
    error,
    fetchRootCapacities,
    fetchChildCapacities,
  };
}
