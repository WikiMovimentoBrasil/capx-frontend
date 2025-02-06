import { useState, useEffect } from "react";
import { Territory } from "@/types/territory";
import { fetchTerritories } from "@/services/territoryService";

export const useTerritories = (token: string | undefined) => {
  const [territories, setTerritories] = useState<Territory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTerritories = async () => {
      if (!token) return;

      try {
        const data = await fetchTerritories(token);
        setTerritories(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load territories"
        );
      } finally {
        setLoading(false);
      }
    };

    loadTerritories();
  }, [token]);

  return {
    territories,
    loading,
    error,
  };
};
