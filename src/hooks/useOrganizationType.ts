"use client";

import { useState, useCallback, useEffect } from "react";
import { OrganizationTypeService } from "@/services/organizationTypeService";
import { OrganizationType } from "@/types/organizationType";

export function useOrganizationType(token, id) {
  const [organizationType, setOrganizationType] = useState<OrganizationType>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrganizationType = useCallback(async () => {
    if (!token) return;

    try {
      setIsLoading(true);
      const data = await OrganizationTypeService.getOrganizationType(token);
      setOrganizationType(data);
      return data;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch user profile"
      );
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const fetchOrganizationTypeById = useCallback(async () => {
    if (!token) return;

    try {
      setIsLoading(true);
      const data = await OrganizationTypeService.getOrganizationTypeById(
        token,
        id
      );
      setOrganizationType(data);
      return data;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch user profile"
      );
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  return {
    fetchOrganizationType,
    fetchOrganizationTypeById,
    isLoading,
    error,
    organizationType,
  };
}
