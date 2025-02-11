import axios from "axios";

export const userService = {
  async fetchUserProfile(userId: string, token: string) {
    const response = await axios.get(`/api/users`, {
      params: {
        userId,
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  },
};
