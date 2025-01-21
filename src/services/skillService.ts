import axios from "axios";

interface QueryData {
  headers: {
    Authorization: string;
  };
}

export const skillService = {
  async fetchSkills(queryData: QueryData) {
    try {
      const response = await axios.get(`/api/skill`, {
        headers: queryData.headers,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch skills:", error);
      throw error;
    }
  },
};
