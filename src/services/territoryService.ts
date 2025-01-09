import axios from "axios";

interface QueryData {
  headers: {
    Authorization: string;
  };
}

export const territoryService = {
  async fetchTerritories(queryData: QueryData) {
    try {
      const response = await axios.get(`/api/territory`, {
        headers: queryData.headers,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch territories:", error);
      throw error;
    }
  },
};
