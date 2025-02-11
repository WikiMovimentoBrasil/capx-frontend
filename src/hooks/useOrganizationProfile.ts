"use client";

import { useState, useCallback, useEffect } from "react";
import { organizationProfileService } from "@/services/organizationProfileService";
import { Organization } from "@/types/organization";

export function useOrganization(token?: string, forceManager = false) {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Iniciar como true
  const [error, setError] = useState<string | null>(null);
  const [isOrgManager, setIsOrgManager] = useState(forceManager);
  const [organizationId, setOrganizationId] = useState<number | null>(null);

  const fetchUserProfile = useCallback(async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const userProfile = await organizationProfileService.getUserProfile(
        token
      );

      const isManager = userProfile.some(
        (profile) => profile.is_manager && profile.is_manager.length > 0
      );

      if (isManager) {
        const managedOrgId = userProfile.find(
          (profile) => profile.is_manager && profile.is_manager.length > 0
        )?.is_manager[0];
        setOrganizationId(managedOrgId);
        setIsOrgManager(true);

        if (managedOrgId) {
          const orgData = await organizationProfileService.getOrganizationById(
            token,
            managedOrgId
          );
          setOrganization(orgData);
        }
      } else {
        setIsOrgManager(false);
        setOrganizationId(null);
        setOrganization(null);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch user profile"
      );
      setIsOrgManager(false);
      setOrganizationId(null);
      setOrganization(null);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const fetchOrganizationById = useCallback(async () => {
    if (!token || !organizationId) return;

    try {
      setIsLoading(true);
      const data = await organizationProfileService.getOrganizationById(
        token,
        organizationId
      );
      setOrganization(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch organization"
      );
    } finally {
      setIsLoading(false);
    }
  }, [token, organizationId]);

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [token, fetchUserProfile]);

  useEffect(() => {
    if (token && organizationId) {
      fetchOrganizationById();
    }
  }, [token, organizationId, fetchOrganizationById]);

  const updateOrganization = useCallback(
    async (data: Partial<Organization>) => {
      if (!token || !organizationId) {
        throw new Error("Missing token or organization ID");
      }

      try {
        setIsLoading(true);
        const updatedOrg =
          await organizationProfileService.updateOrganizationProfile(
            token,
            organizationId,
            data
          );

        const refreshedOrg =
          await organizationProfileService.getOrganizationById(
            token,
            organizationId
          );

        setOrganization(refreshedOrg);
        return refreshedOrg;
      } catch (err: any) {
        console.error("Full error:", err);
        const errorMessage =
          err.response?.data?.detail ||
          err.message ||
          "Failed to update organization";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [token, organizationId]
  );
  /*   const refetch = useCallback(() => {
    setIsLoading(true); // Garantir que loading seja true ao refetch
    return fetchUserProfile();
  }, [fetchUserProfile]); */

  return {
    organization,
    isLoading,
    error,
    refetch: fetchOrganizationById,
    isOrgManager,
    organizationId,
    fetchUserProfile,
    updateOrganization,
    fetchOrganizationById,
  };
}
