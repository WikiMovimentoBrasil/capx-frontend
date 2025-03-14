import { useState, useEffect, useCallback } from "react";
import { capacityService } from "@/services/capacityService";
import { useSession } from "next-auth/react";
import { Capacity } from "@/types/capacity";
import { useApp } from "@/contexts/AppContext";

export function useCapacityDetails(
  capacityIds: (string | number | Capacity)[]
) {
  const [capacityNames, setCapacityNames] = useState<{ [key: string]: string }>(
    {}
  );
  const { data: session } = useSession();
  const { pageContent } = useApp();

  useEffect(() => {
    if (!session?.user?.token || !capacityIds?.length) return;

    const uniqueIds = Array.from(
      new Set(capacityIds.map((id) => (typeof id === "object" ? id.code : id)))
    ).filter((id): id is number => typeof id === "number");

    const fetchCapacities = async () => {
      try {
        const queryData = {
          headers: { Authorization: `Token ${session.user.token}` },
        };

        const results = await Promise.all(
          uniqueIds.map((id) =>
            capacityService.fetchCapacityById(id.toString(), queryData)
          )
        );

        const newNames = results.reduce((acc, capacity) => {
          if (capacity && typeof capacity === "object" && "name" in capacity) {
            acc[capacity.code.toString()] = capacity.name;
          }
          return acc;
        }, {} as { [key: string]: string });

        setCapacityNames(newNames);
      } catch (error) {
        console.error("Error fetching capacities:", error);
      }
    };

    fetchCapacities();
  }, [capacityIds, session?.user?.token]);

  return {
    capacityNames,
    getCapacityName: useCallback(
      (capacity: Capacity | number | string) => {
        if (!capacity) return pageContent["loading"];
        const id =
          typeof capacity === "object"
            ? Number(capacity.code)
            : Number(capacity);
        return capacityNames[id.toString()] || '';
      },
      [capacityNames]
    ),
  };
}
