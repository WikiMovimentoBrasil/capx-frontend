import { useState, useEffect, useCallback, useRef } from "react";
import { capacityService } from "@/services/capacityService";
import { useSession } from "next-auth/react";
import { Capacity } from "@/types/capacity";

export function useCapacityDetails(
  capacityIds: (string | number | Capacity)[]
) {
  const [capacityNames, setCapacityNames] = useState<{ [key: string]: string }>(
    {}
  );
  const { data: session } = useSession();
  const isFetchingRef = useRef(false);
  const previousIdsRef = useRef<string>("");

  useEffect(() => {
    if (!session?.user?.token || !capacityIds?.length) return;

    const uniqueIds = Array.from(
      new Set(capacityIds.map((id) => (typeof id === "object" ? id.code : id)))
    ).filter((id): id is number => typeof id === "number");

    // Evita refetch se os IDs não mudaram
    const currentIdsString = JSON.stringify(uniqueIds.sort());
    if (currentIdsString === previousIdsRef.current || isFetchingRef.current) {
      return;
    }

    const fetchCapacities = async () => {
      try {
        isFetchingRef.current = true;
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

        previousIdsRef.current = currentIdsString;
        setCapacityNames(newNames);
      } catch (error) {
        console.error("Error fetching capacities:", error);
      } finally {
        isFetchingRef.current = false;
      }
    };

    fetchCapacities();
  }, [capacityIds, session?.user?.token]);

  return {
    capacityNames,
    getCapacityName: useCallback(
      (capacity: Capacity | number | string) => {
        if (!capacity) return "Loading...";
        const id =
          typeof capacity === "object"
            ? Number(capacity.code)
            : Number(capacity);
        return capacityNames[id.toString()] || `Loading capacity ${id}...`;
      },
      [capacityNames]
    ),
  };
}
