import { territoryService } from "@/services/territoryService";
import { useSession } from "next-auth/react";

export function useTerritories() {
  const { data: session } = useSession();
  const token = session?.user?.token;

  const fetchTerritories = async () => {
    const territories = await territoryService.fetchTerritories({
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return territories;
  };

  return { fetchTerritories };
}
