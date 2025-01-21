import axios from "axios";
import { Organization } from "@/types/organization";

export const organizationProfileService = {
  async getOrganizations(token: string) {
    const response = await axios.get("/api/organizations/", {
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
    console.log("Token being sent:", token); // Debug
    const response = await axios.put(`/api/organizations/${id}`, data, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
};
