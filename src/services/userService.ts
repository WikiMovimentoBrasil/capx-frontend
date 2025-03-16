import axios from "axios";

export interface UserFilters {
  username?: string;
  language?: string[];
  territory?: string[];
  skills_available?: number[];
  skills_wanted?: number[];
  has_skills_wanted?: boolean;
  has_skills_available?: boolean;
}

export interface FetchAllUsersParams {
  token: string;
  limit?: number;
  offset?: number;
  filters?: UserFilters;
}

export const userService = {
  async fetchUserProfile(userId: string, token: string) {
    const response = await axios.get(`/api/users/${userId}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  },
  async fetchAllUsers(queryParams: FetchAllUsersParams) {
    if (!queryParams.token) return { count: 0, results: [] };

    const params = new URLSearchParams();

    if (queryParams?.filters?.territory?.length) {
      queryParams.filters.territory.forEach(t => params.append('territory', t));
    }

    if (queryParams?.filters?.language?.length) {
      queryParams.filters.language.forEach(t => params.append('language', t));
    }

    if (queryParams?.filters?.skills_available?.length) {
      queryParams.filters.skills_available.forEach(c => params.append('skills_available', c.toString()));
    }

    if (queryParams?.filters?.skills_wanted?.length) {
      queryParams.filters.skills_wanted.forEach(c => params.append('skills_wanted', c.toString()));
    }

    if (queryParams?.filters?.has_skills_available === true) {
      params.append('has_skills_available', 'true');
    }

    if (queryParams?.filters?.has_skills_wanted === true) {
      params.append('has_skills_wanted', 'true');
    }

    if (queryParams?.limit) {
      params.append('limit', queryParams.limit.toString());
    }

    if (queryParams?.offset) {
      params.append('offset', queryParams.offset.toString());
    }1

    if (queryParams?.filters?.username) {
      params.append('username', queryParams.filters.username);
    }

    try {
      const response = await axios.get(`/api/users/`, {
        params,
        headers: {
          Authorization: `Token ${queryParams.token}`,
        },
        paramsSerializer: {
          indexes: null // Ensure arrays are serialized correctly
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return { count: 0, results: [] };
    }
  },
};
