import axios from "axios";
import { Organization } from "@/types/organization";

export interface OrganizationFilters {
  territory?: string[];
  known_capacities?: string[];
  available_capacities?: string[];
  wanted_capacities?: string[];
  limit?: number;
  offset?: number;
  has_skills_available?: boolean;
  has_skills_wanted?: boolean;
}

export const organizationProfileService = {
  async getOrganizations(token: string, filters: OrganizationFilters) {
    if (!token) return { count: 0, results: [] };

    const cleanedFilters = {
      ...filters,
      territory: filters.territory?.length ? filters.territory.join(',') : undefined,
      known_capacities: filters.known_capacities?.length ? filters.known_capacities.join(',') : undefined,
      available_capacities: filters.available_capacities?.length ? filters.available_capacities.join(',') : undefined,
      wanted_capacities: filters.wanted_capacities?.length ? filters.wanted_capacities.join(',') : undefined,
      has_skills_available: filters.has_skills_available === true ? true : undefined,
      has_skills_wanted: filters.has_skills_wanted === true ? true : undefined,
    };

    const params = Object.fromEntries(
      Object.entries(cleanedFilters).filter(([_, value]) => value !== undefined)
    );

    try {
      const response = await axios.get("/api/organizations/", {
        params,
        headers: { Authorization: `Token ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching organizations:', error);
      return { count: 0, results: [] };
    }
  },

  async getOrganizationById(token: string, id: number) {
    const response = await axios.get(`/api/organizations/${id}/`, {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  },

  async getUserProfile(token: string) {
    const response = await axios.get("/api/profile/", {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  },

  async updateOrganizationProfile(
    token: string,
    id: number,
    data: Partial<Organization>
  ) {
    // Ensure events is included in the payload
    const payload = {
      ...data,
      events: Array.isArray(data.events)
        ? data.events.map((event: any) =>
            typeof event === "object" ? event.id : event
          )
        : [],
    };

    const response = await axios.put(`/api/organizations/${id}/`, payload, {
      headers: {
        Authorization: `Token ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return response.data;
  },
};
