import { useState, useCallback } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

interface CapacityData {
  description: string;
  name: string;
  code: string;
  color: string;
  icon: string;
  parentCode: string;
}

export function useCapacityProfile(selectedCapacityId: string) {
  const [selectedCapacityData, setSelectedCapacityData] =
    useState<CapacityData | null>(null);

  const { status, data: session } = useSession();

  const getCapacityData = useCallback(
    async (queryData) => {
      const queryResponse = await axios.get(
        "/api/capacity/" + selectedCapacityId,
        queryData
      );
      setSelectedCapacityData(queryResponse.data);
    },
    [selectedCapacityId]
  );

  const refreshCapacityData = useCallback(
    (language: string) => {
      if (status === "authenticated") {
        const queryData = {
          params: { language },
          headers: {
            Authorization: `Token ${session?.user?.token}`,
          },
        };
        getCapacityData(queryData);
      }
    },
    [status, session?.user?.token, getCapacityData]
  );

  return {
    selectedCapacityData,
    refreshCapacityData,
    isLoading: status === "loading",
  };
}
