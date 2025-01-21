import { Project } from "@/types/project";
import axios from "axios";

export const projectsService = {
  async getProjectById(projectId: number, token: string): Promise<Project> {
    try {
      const response = await axios.get(`/api/projects/${projectId}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching project:", error);
      throw error;
    }
  },
};
