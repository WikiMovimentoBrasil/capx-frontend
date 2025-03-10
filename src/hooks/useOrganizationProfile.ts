"use client";

import { useState, useCallback, useEffect } from "react";
import { organizationProfileService } from "@/services/organizationProfileService";
import { Organization } from "@/types/organization";

export function useOrganization(token?: string, specificOrgId?: number) {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [managedOrganizationIds, setManagedOrganizationIds] = useState<
    number[]
  >([]);

  const fetchData = useCallback(async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      if (specificOrgId) {
        // Se temos um ID específico, buscamos apenas essa organização
        const orgData = await organizationProfileService.getOrganizationById(
          token,
          specificOrgId
        );
        setOrganizations([orgData]);
        setManagedOrganizationIds([specificOrgId]);
      } else {
        // Caso contrário, buscamos todas as organizações gerenciadas
        const userProfile = await organizationProfileService.getUserProfile(
          token
        );
        const managedIds = userProfile.flatMap((profile) =>
          profile.is_manager && profile.is_manager.length > 0
            ? profile.is_manager
            : []
        );

        setManagedOrganizationIds(managedIds);

        if (managedIds.length > 0) {
          const orgsData = await Promise.all(
            managedIds.map((id) =>
              organizationProfileService.getOrganizationById(token, id)
            )
          );
          setOrganizations(orgsData);
        }
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch user profile"
      );
      setOrganizations([]);
      setManagedOrganizationIds([]);
    } finally {
      setIsLoading(false);
    }
  }, [token, specificOrgId]);

  // Função refetch exposta para componentes
  const refetch = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    organization: organizations[0],
    organizations,
    isLoading,
    error,
    isOrgManager: managedOrganizationIds.length > 0,
    managedOrganizationIds,
    refetch,
    updateOrganization: async (data: Partial<Organization>) => {
      if (!token || !specificOrgId) return;
      try {
        const updatedOrg =
          await organizationProfileService.updateOrganizationProfile(
            token,
            specificOrgId,
            data
          );
        setOrganizations([updatedOrg]);
        return updatedOrg;
      } catch (error) {
        console.error("Error updating organization:", error);
        throw error;
      }
    },
  };
}
