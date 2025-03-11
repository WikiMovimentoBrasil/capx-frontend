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
  const [isPermissionsLoaded, setIsPermissionsLoaded] = useState(false);

  const fetchData = useCallback(async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setIsPermissionsLoaded(false);

      try {
        const userProfile = await organizationProfileService.getUserProfile(
          token
        );
        const managedIds = userProfile.flatMap((profile) =>
          profile.is_manager && profile.is_manager.length > 0
            ? profile.is_manager
            : []
        );

        setManagedOrganizationIds(managedIds);
        setIsPermissionsLoaded(true);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setManagedOrganizationIds([]);
        setIsPermissionsLoaded(true);
      }

      if (specificOrgId) {
        try {
          const orgData = await organizationProfileService.getOrganizationById(
            token,
            specificOrgId
          );
          setOrganizations([orgData]);
        } catch (err) {
          console.error(`Error fetching organization ${specificOrgId}:`, err);
          setOrganizations([]);
          setError(
            `Error fetching organization: ${err.message || "Unknown error"}`
          );
        }
      } else if (managedOrganizationIds.length > 0) {
        const orgsData = await Promise.all(
          managedOrganizationIds.map((id) =>
            organizationProfileService.getOrganizationById(token, id)
          )
        );
        setOrganizations(orgsData);
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

  const refetch = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Check if the user is a manager of the specific organization
  const isOrgManager =
    isPermissionsLoaded && specificOrgId
      ? managedOrganizationIds.includes(Number(specificOrgId))
      : false;

  return {
    organization: organizations[0],
    organizations,
    isLoading,
    isPermissionsLoaded,
    error,
    isOrgManager,
    managedOrganizationIds,
    refetch,
    updateOrganization: async (data: Partial<Organization>) => {
      if (!token || !specificOrgId || !isOrgManager) return;
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
