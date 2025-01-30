import axios from "axios";
import { tagDiff } from "@/types/tagDiff";

export const tagDiffService = {
  async fetchSingleNews(token: string, id: number): Promise<tagDiff> {
    const response = await axios.get<tagDiff>(`/api/tag_diff/${id}/`, {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  },
  async fetchAllNews(token: string): Promise<tagDiff[]> {
    const response = await axios.get<tagDiff[]>("/api/tag_diff/", {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  },
  async createTag(tag: Partial<tagDiff>, token: string): Promise<tagDiff> {
    try {
      console.log("TagDiffService - Creating news with data:", tag);
      const response = await axios.post("/api/tag_diff/", tag, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.data) {
        throw new Error("Empty response from server");
      }
      console.log("TagDiffService - Received response:", response.data);
      return response.data;
    } catch (error) {
      console.error("TagDiffService - Error creating news:", error);
      throw error;
    }
  },
  async deleteNews(token: string, id: number): Promise<void> {
    await axios.delete(`/api/tag_diff/${id}/`, {
      headers: { Authorization: `Token ${token}` },
    });
  },
};
