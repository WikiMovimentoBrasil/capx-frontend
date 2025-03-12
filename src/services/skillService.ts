import axios from "axios";

interface QueryData {
  headers: {
    Authorization: string;
  };
  limit?: number;
  offset?: number;
}

export const skillService = {
  async fetchSkills(queryData: QueryData) {
    try {
      // Construir URL com parâmetros de paginação
      let url = `/api/skill`;
      const params = new URLSearchParams();

      if (queryData.limit !== undefined) {
        params.append("limit", queryData.limit.toString());
      }

      if (queryData.offset !== undefined) {
        params.append("offset", queryData.offset.toString());
      }

      // Adicionar parâmetros à URL se existirem
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await axios.get(url, {
        headers: queryData.headers,
      });

      return response.data;
    } catch (error) {
      console.error("Failed to fetch skills:", error);
      throw error;
    }
  },
  async fetchSkillById(id: string, queryData: QueryData) {
    try {
      const response = await axios.get(`/api/skill/${id}`, {
        headers: queryData.headers,
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch skill ${id}:`, error);
      throw error;
    }
  },
};
