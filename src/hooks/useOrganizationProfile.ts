import { useState, useCallback } from "react";
import { organizationService } from "@/services/organizationProfileService";
import { Organization } from "@/types/organization";

export const useOrganization = (token?: string) => {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrganization = useCallback(
    async (id: number) => {
      if (!token) return;

      setIsLoading(true);
      setError(null);

      try {
        const data = await organizationService.fetchOrganization(id, token);
        setOrganization(data);
      } catch (err) {
        setError("Failed to load organization");
        console.error("Error fetching organization:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  const updateOrganization = useCallback(
    async (id: number, data: Partial<Organization>) => {
      if (!token) return;

      setIsLoading(true);
      setError(null);

      try {
        const updatedData = await organizationService.updateOrganization(
          id,
          data,
          token
        );
        setOrganization(updatedData);
        return updatedData;
      } catch (err) {
        setError("Failed to update organization");
        console.error("Error updating organization:", err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  return {
    organization,
    isLoading,
    error,
    fetchOrganization,
    updateOrganization,
  };
};
