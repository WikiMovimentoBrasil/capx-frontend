import axios from "axios";

export const userService = {
  async fetchUserProfile(userId: string, token: string) {
    const response = await axios.get(`/api/users/${userId}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  },
  async fetchAllUsers(token: string, search?: string) {
    const response = await axios.get(`/api/users/`, {
      params: {
        search,
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  },
};
