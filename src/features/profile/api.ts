import axios from "axios";
import { UserProfile } from "./types";

export const profileApi = {
  async getById(userId: string, token: string): Promise<UserProfile> {
    const response = await axios.get("/api/profile", {
      params: { userId },
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  },

  async update(
    userId: string,
    data: Partial<UserProfile>,
    token: string
  ): Promise<UserProfile> {
    const response = await axios.post(
      "/api/profile",
      { user: { id: userId }, ...data },
      { headers: { Authorization: `Token ${token}` } }
    );
    return response.data;
  },

  async delete(userId: string, token: string): Promise<void> {
    await axios.delete("/api/profile", {
      data: { userId },
      headers: { Authorization: `Token ${token}` },
    });
  },
};
