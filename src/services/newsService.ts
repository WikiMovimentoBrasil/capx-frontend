import axios from "axios";
import { News } from "@/types/news";

export const newsService = {
  async fetchSingleNews(token: string, id: number): Promise<News> {
    const response = await axios.get<News>(`/api/news/${id}/`, {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  },
  async fetchAllNews(token: string): Promise<News[]> {
    const response = await axios.get<News[]>("/api/news/", {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  },
  async createNews(token: string, news: Partial<News>): Promise<News> {
    const response = await axios.post<News>("/api/news/", news, {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  },
  async deleteNews(token: string, id: number): Promise<void> {
    await axios.delete(`/api/news/${id}/`, {
      headers: { Authorization: `Token ${token}` },
    });
  },
};
