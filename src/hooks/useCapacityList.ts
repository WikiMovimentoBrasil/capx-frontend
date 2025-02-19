import { useState, useCallback } from "react";
import { capacityService } from "@/services/capacityService";
import { getCapacityColor, getCapacityIcon } from "@/lib/utils/colorUtils";
import { AxiosRequestConfig } from "axios";
import { CapacityResponse } from "@/types/capacity";

interface Capacity {
  code: string;
  name: string;
  icon: string;
  color: string;
  parentCode?: string;
  description?: string;
  wdCode?: string;
  parentCapacity?: Capacity;
  hasChildren: boolean;
}

export function useCapacityList(token?: string, language: string = "pt-br") {
  const [rootCapacities, setRootCapacities] = useState<Capacity[]>([]);
  const [childrenCapacities, setChildrenCapacities] = useState<Capacity[]>([]);
  const [descriptions, setDescriptions] = useState<Record<string, string>>({});
  const [capacityById, setCapacityById] = useState<CapacityResponse>();
  const [wdCodes, setWdCodes] = useState<Record<string, string>>({});
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
          hasChildren: true, // Capacidades root sempre têm filhos
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

        console.log(response);

        const formattedCapacities = Object.entries(response).map(
          ([code, name]): Capacity => {
            const baseCode = code.toString().split(".")[0];
            return {
              code,
              name: String(name),
              color: getCapacityColor(baseCode),
              icon: getCapacityIcon(baseCode),
              hasChildren: false, // Será atualizado depois se necessário
            };
          }
        );

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
    async (code: string) => {
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

  return {
    rootCapacities,
    childrenCapacities,
    descriptions,
    capacityById,
    wdCodes,
    isLoading,
    error,
    fetchRootCapacities,
    fetchCapacitiesByParent,
    fetchCapacityDescription,
    fetchCapacityById,
  };
}
