import { useState, useEffect, useCallback } from "react";
import { capacityService } from "@/services/capacityService";
import { useSession } from "next-auth/react";
import { Capacity } from "@/types/capacity";

export function useCapacityDetails(
  capacityIds: (string | number | Capacity)[]
) {
  const [capacityNames, setCapacityNames] = useState<{ [key: string]: string }>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (!capacityIds?.length || !session?.user?.token) return;

    const uniqueIds = Array.from(
      new Set(capacityIds.map((id) => (typeof id === "object" ? id.code : id)))
    ).filter((id): id is number => typeof id === "number");

    const missingIds = uniqueIds.filter(id => !capacityNames[id.toString()]);

    if (!missingIds.length) return;

    setIsLoading(true);

    const fetchCapacities = async () => {
      try {
        const queryData = {
          headers: {
            Authorization: `Token ${session.user.token}`,
          },
        };

        const results = await Promise.all(
          missingIds.map(id => capacityService.fetchCapacityById(id.toString(), queryData))
        );

        setCapacityNames(prev => {
          const newNames = results.reduce((acc, capacity) => {
            if (capacity && typeof capacity === "object" && "name" in capacity) {
              acc[capacity.code.toString()] = capacity.name;
            }
            return acc;
          }, {} as {[key: string]: string});
          
          return { ...prev, ...newNames };
        });
      } catch (error) {
        console.error("Error fetching capacities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCapacities();
  }, [capacityIds, session?.user?.token]);

  const getCapacityName = useCallback(
    (capacity: Capacity | number | string) => {
      if (!capacity) return "Loading...";

      const id = typeof capacity === "object" ? capacity.code : capacity;
      if (!id) return "Loading...";

      const stringId = id.toString();
      return capacityNames[stringId] || `Capacity ${stringId}`;
    },
    [capacityNames]
  );

  return { capacityNames, isLoading, getCapacityName };
}
