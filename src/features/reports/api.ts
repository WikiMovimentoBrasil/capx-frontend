import axios from "axios";
import { Report } from "@/types/report";

export const reportApi = {
  async getAll(token: string): Promise<Report[]> {
    const response = await axios.get("/api/report", {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  },

  async getById(id: string, token: string): Promise<Report> {
    const response = await axios.get(`/api/report`, {
      params: { reportId: id },
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  },

  async update(
    id: string,
    data: Partial<Report>,
    token: string
  ): Promise<Report> {
    const response = await axios.post(
      "/api/report",
      { report: id, ...data },
      { headers: { Authorization: `Token ${token}` } }
    );
    return response.data;
  },
};
