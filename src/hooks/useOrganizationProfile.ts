"use client";

import { useState, useCallback, useEffect } from "react";
import { organizationProfileService } from "@/services/organizationProfileService";
import { Organization } from "@/types/organization";
import { fetchFromApi } from "@/lib/utils/apiClient";
import { signOut } from "next-auth/react";

export function useOrganization(token?: string, forceManager = false) {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOrgManager, setIsOrgManager] = useState(forceManager);
  const [organizationId, setOrganizationId] = useState<number | null>(null);

  const handleInvalidToken = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const fetchUserProfile = useCallback(async () => {
    if (!token) return;

    try {
      setIsLoading(true);
      const response = await organizationProfileService.getUserProfile(token);
      const data = await fetchFromApi(response);

      const isManager = data.some(
        (profile) => profile.is_manager && profile.is_manager.length > 0
      );

      if (isManager) {
        const managedOrgId = data.find(
          (profile) => profile.is_manager && profile.is_manager.length > 0
        )?.is_manager[0];
        setOrganizationId(managedOrgId);
        setIsOrgManager(true);
      } else {
        setIsOrgManager(false);
        setOrganizationId(null);
      }
    } catch (err: any) {
      if (err?.response?.status === 401) {
        await handleInvalidToken();
        return;
      }
      setError(
        err instanceof Error ? err.message : "Failed to fetch user profile"
      );
      setOrganizationId(null);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const fetchOrganizationById = useCallback(async () => {
    if (!token || !organizationId) return;

    try {
      setIsLoading(true);
      const response = await organizationProfileService.getOrganizationById(
        token,
        organizationId
      );
      const data = await fetchFromApi(response);
      setOrganization(data);
    } catch (err: any) {
      if (err?.response?.status === 401) {
        await handleInvalidToken();
        return;
      }
      setError(
        err instanceof Error ? err.message : "Failed to fetch organization"
      );
    } finally {
      setIsLoading(false);
    }
  }, [token, organizationId]);

  const updateOrganization = useCallback(
    async (data: Partial<Organization>) => {
      if (!token || !organizationId) {
        throw new Error("Missing token or organization ID");
      }

      try {
        setIsLoading(true);
        const updateResponse =
          await organizationProfileService.updateOrganizationProfile(
            token,
            organizationId,
            data
          );
        const updatedOrg = await fetchFromApi(updateResponse);

        const refreshResponse =
          await organizationProfileService.getOrganizationById(
            token,
            organizationId
          );
        const refreshedOrg = await fetchFromApi(refreshResponse);

        setOrganization(refreshedOrg);
        return refreshedOrg;
      } catch (err: any) {
        if (err?.response?.status === 401) {
          await handleInvalidToken();
          return null;
        }
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

  return {
    organization,
    isLoading,
    error,
    refetch: fetchOrganizationById,
    isOrgManager,
    organizationId,
    updateOrganization,
    fetchOrganizationById,
    fetchUserProfile,
  };
}
