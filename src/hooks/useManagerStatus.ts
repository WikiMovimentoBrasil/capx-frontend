import { useState, useEffect } from "react";
import { organizationService } from "@/services/organizationProfileService";

export function useManagerStatus(token: string | undefined) {
  const [isManager, setIsManager] = useState(false);
  const [managedOrganizations, setManagedOrganizations] = useState<
    Array<{ id: number; name: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      organizationService
        .checkManagerStatus(token)
        .then((data) => {
          setIsManager(data.is_manager);
          setManagedOrganizations(data.organizations);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [token]);

  return { isManager, managedOrganizations, isLoading, error };
}
