"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { organizationProfileService } from "@/services/organizationProfileService";
import { Organization } from "@/types/organization";

export function useOrganization(
  token?: string,
  specificOrgId?: number,
  limit?: number,
  offset?: number
) {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [managedOrganizationIds, setManagedOrganizationIds] = useState<
    number[]
  >([]);
  const [isPermissionsLoaded, setIsPermissionsLoaded] = useState(false);

  const fetchUserProfile = useCallback(async (token: string) => {
    try {
      const userProfile = await organizationProfileService.getUserProfile(
        token
      );
      const managedIds = userProfile.flatMap((profile) =>
        profile.is_manager && profile.is_manager.length > 0
          ? profile.is_manager
          : []
      );
      return managedIds;
    } catch (err) {
      console.error("Error fetching user profile:", err);
      return [];
    }
  }, []);

  const fetchOrganizations = useCallback(
    async (token: string, orgIds: number[]) => {
      try {
        const orgsData = await Promise.all(
          orgIds.map((id) =>
            organizationProfileService.getOrganizationById(token, id)
          )
        );
        return orgsData.filter(Boolean); // Remove any null values
      } catch (err) {
        console.error("Error fetching organizations:", err);
        return [];
      }
    },
    []
  );

  const fetchData = useCallback(async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setIsPermissionsLoaded(false);

    try {
      // First, fetch the IDs of the managed organizations
      const managedIds = await fetchUserProfile(token);
      setManagedOrganizationIds(managedIds);
      setIsPermissionsLoaded(true);

      // Then, fetch the organizations
      if (specificOrgId) {
        try {
          const orgData = await organizationProfileService.getOrganizationById(
            token,
            specificOrgId
          );
          if (orgData) {
            setOrganizations([orgData]);
          }
        } catch (err) {
          console.error(`Error fetching organization ${specificOrgId}:`, err);
          setOrganizations([]);
        }
      } else if (managedIds.length > 0) {
        const orgsData = await fetchOrganizations(token, managedIds);
        setOrganizations(orgsData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
      setOrganizations([]);
      setManagedOrganizationIds([]);
    } finally {
      setIsLoading(false);
    }
  }, [token, specificOrgId, fetchUserProfile, fetchOrganizations]);

  const isOrgManager = useMemo(() => {
    if (!isPermissionsLoaded) return false;
    if (specificOrgId) {
      return managedOrganizationIds.includes(Number(specificOrgId));
    }
    return managedOrganizationIds.length > 0;
  }, [isPermissionsLoaded, specificOrgId, managedOrganizationIds]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    organization: organizations[0],
    organizations,
    isLoading,
    isPermissionsLoaded,
    error,
    isOrgManager,
    managedOrganizationIds,
    refetch: fetchData,
    updateOrganization: async (data: Partial<Organization>) => {
      if (!token || !specificOrgId || !isOrgManager) return;
      try {
        const updatedOrg =
          await organizationProfileService.updateOrganizationProfile(
            token,
            specificOrgId,
            data
          );
        setOrganizations((prev) =>
          prev.map((org) => (org.id === specificOrgId ? updatedOrg : org))
        );
        return updatedOrg;
      } catch (error) {
        console.error("Error updating organization:", error);
        throw error;
      }
    },
  };
}
