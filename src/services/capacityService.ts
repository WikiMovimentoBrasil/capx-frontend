import axios from "axios";

interface QueryData {
  params: {
    userId: string;
    username: string;
    language: string;
  };
  headers: {
    Authorization: string;
  };
}

interface CapacityData {
  skills_known?: string[];
  skills_available?: string[];
  skills_wanted?: string[];
}

export const capacityService = {
  async fetchCapacities(queryData: QueryData) {
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

  async updateCapacities(userId: string, data: CapacityData, token: string) {
    try {
      const response = await axios.put(`/api/capacity`, data, {
        params: { userId },
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to update capacities:", error);
      throw error;
    }
  },

  async searchCapacities(query: string) {
    try {
      const response = await axios.get(
        `/api/capacity/search?query=${encodeURIComponent(query)}`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to search capacities:", error);
      throw error;
    }
  },

  async getCapacityDetails(capacityId: string, token: string) {
    try {
      const response = await axios.get(`/api/capacity/${capacityId}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch capacity details:", error);
      throw error;
    }
  },
};
