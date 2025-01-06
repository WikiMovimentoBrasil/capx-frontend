import axios from "axios";
import { Organization, OrganizationType } from "@/types/organization";

export const organizationService = {
  // List all organizations
  fetchOrganizations: async (token: string) => {
    const response = await axios.get<Organization[]>("/api/organizations", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  },

  // Fetch a specific organization
  fetchOrganization: async (id: number, token: string) => {
    const response = await axios.get<Organization>(`/api/organizations/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  },

  // Update an organization (only for staff and managers)
  updateOrganization: async (
    id: number,
    data: Partial<Organization>,
    token: string
  ) => {
    const response = await axios.put<Organization>(
      `/api/organizations/${id}`,
      data,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  },

  // List all organization types
  fetchOrganizationTypes: async (config?: any) => {
    const response = await axios.get<OrganizationType[]>(
      "/api/organization_types/",
      config
    );
    return response.data;
  },

  // Check if user is manager
  checkManagerStatus: async (token: string) => {
    const response = await axios.get<{
      is_manager: boolean;
      organizations: Array<{ id: number; name: string }>;
    }>("/api/organizations/check_manager/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  },
};
