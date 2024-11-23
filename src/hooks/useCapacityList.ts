import { useState, useCallback } from "react";
import { capacityService } from "@/services/capacityService";

interface LoadingStates {
  [key: string]: boolean;
}
interface AsyncItems {
  [key: string]: Record<string, string>;
}
interface ExpandedItems {
  [key: string]: boolean;
}

export interface CapacityListHook {
  token: string | undefined;
  language: string;
}

export const useCapacityList = ({ token, language }: CapacityListHook) => {
  const [capacityList, setCapacityList] = useState<Record<string, string>>();
  const [asyncItems, setAsyncItems] = useState<AsyncItems>({});
  const [expandedItems, setExpandedItems] = useState<ExpandedItems>({});
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({});

  const fetchCapacityList = useCallback(async () => {
    if (!token) return;
    try {
      const response = await capacityService.fetchCapacities({
        params: { language },
        headers: { Authorization: `Token ${token}` },
      });
      setCapacityList(response);
    } catch (error) {
      console.error("Failed to load capacity list:", error);
    }
  }, [token, language]);

  const loadCapacityItems = useCallback(
    async (type: string) => {
      if (!token) return {};
      try {
        return await capacityService.fetchCapacityByType(type, {
          params: { language },
          headers: { Authorization: `Token ${token}` },
        });
      } catch (error) {
        console.error("Failed to load capacity items:", error);
        return {};
      }
    },
    [token, language]
  );

  return {
    capacityList,
    asyncItems,
    setAsyncItems,
    expandedItems,
    setExpandedItems,
    loadingStates,
    setLoadingStates,
    fetchCapacityList,
    loadCapacityItems,
  };
};
