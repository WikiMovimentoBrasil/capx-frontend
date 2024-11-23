import axios from "axios";
import { Capacity, CapacityResponse, QueryData } from "@/types/capacity";

export const capacityService = {
  async fetchCapacities(queryData: QueryData): Promise<Record<string, string>> {
    try {
      const response = await axios.get("/api/capacity", {
        params: queryData.params,
        headers: queryData.headers,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch capacities:", error);
      throw error;
    }
  },

  async fetchCapacityByType(
    type: string,
    queryData: QueryData
  ): Promise<Record<string, string>> {
    try {
      const response = await axios.get(`/api/capacity/type/${type}`, {
        params: queryData.params,
        headers: queryData.headers,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch capacity types:", error);
      throw error;
    }
  },

  async fetchCapacityById(
    id: string,
    queryData: QueryData
  ): Promise<CapacityResponse> {
    try {
      const response = await axios.get(`/api/capacity/${id}`, {
        params: queryData.params,
        headers: queryData.headers,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch capacity:", error);
      throw error;
    }
  },

  async updateCapacities(
    userId: string,
    data: Partial<Capacity>,
    token: string
  ): Promise<void> {
    try {
      await axios.put(`/api/capacity`, data, {
        headers: { Authorization: `Token ${token}` },
        params: { userId },
      });
    } catch (error) {
      console.error("Failed to update capacities:", error);
      throw error;
    }
  },
};
