import axios from "axios";
import { Organization } from "@/types/organization";

export const organizationProfileService = {
  async getOrganizations(token: string, limit?: number, offset?: number) {
    const response = await axios.get("/api/organizations/", {
      params: {
        limit,
        offset,
      },
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
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
