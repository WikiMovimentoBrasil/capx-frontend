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
  initialExpanded?: string;
}

export const useCapacityList = ({
  token,
  language,
  initialExpanded,
}: CapacityListHook) => {
  const [capacityList, setCapacityList] = useState<Record<string, string>>();
  const [asyncItems, setAsyncItems] = useState<AsyncItems>({});
  const [expandedItems, setExpandedItems] = useState<ExpandedItems>(
    initialExpanded ? { [initialExpanded]: true } : {}
  );
  const [loadingStates, setLoadingStates] = useState<LoadingStates>(
    initialExpanded ? { [initialExpanded]: true } : {}
  );

  const handleExpandedChange = useCallback(
    async (itemId: string, isExpanded: boolean) => {
      if (asyncItems[itemId] || !isExpanded) {
        setExpandedItems((prev) => ({ ...prev, [itemId]: isExpanded }));
        return;
      }

      try {
        setLoadingStates((prev) => ({ ...prev, [itemId]: true }));
        const items = await capacityService.fetchCapacityByType(itemId, {
          params: { language },
          headers: { Authorization: `Token ${token}` },
        });

        if (items && Object.keys(items).length > 0) {
          setAsyncItems((prev) => ({ ...prev, [itemId]: items }));
        }
      } catch (error) {
        console.error("Failed to load items:", error);
      } finally {
        setLoadingStates((prev) => ({ ...prev, [itemId]: false }));
        setExpandedItems((prev) => ({ ...prev, [itemId]: isExpanded }));
      }
    },
    [asyncItems, token, language]
  );

  const fetchCapacityList = useCallback(async () => {
    if (!token) return;
    try {
      const response = await capacityService.fetchCapacities({
        params: { language },
        headers: { Authorization: `Token ${token}` },
      });

      const rootItems = response.reduce(
        (acc, item) => {
          acc[item.code] = item.name;
          return acc;
        },
        {} as Record<string, string>
      );

      setCapacityList(rootItems);
      setAsyncItems((prev) => ({ ...prev, "0": rootItems }));
      setLoadingStates((prev) => ({ ...prev, "0": false }));
    } catch (error) {
      console.error("Failed to load capacity list:", error);
    }
  }, [token, language]);

  const loadCapacityItems = useCallback(
    async (type: string) => {
      if (!token) return {};
      try {
        const response = await fetch(`/api/capacity/type/${type}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch capacity items: ${response.statusText}`
          );
        }

        return await response.json();
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
    expandedItems,
    loadingStates,
    fetchCapacityList,
    handleExpandedChange,
    loadCapacityItems,
  };
};
