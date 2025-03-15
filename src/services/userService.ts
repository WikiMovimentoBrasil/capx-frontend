import axios from "axios";

export interface UserFilters {
  language?: string[];
  territory?: string[];
  known_capacities?: string[];
  available_capacities?: string[];
  wanted_capacities?: string[];
  has_skills_wanted?: boolean;
  has_skills_available?: boolean;
  limit?: number;
  offset?: number;
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
  async fetchAllUsers(token: string, search: string | undefined, limit: number | undefined, offset: number | undefined, filters: UserFilters) {
    if (!token) return { count: 0, results: [] };

    const cleanedFilters = {
      ...filters,
      territory: filters.territory?.length ? filters.territory.join(',') : undefined,
      known_capacities: filters.known_capacities?.length ? filters.known_capacities.join(',') : undefined,
      available_capacities: filters.available_capacities?.length ? filters.available_capacities.join(',') : undefined,
      wanted_capacities: filters.wanted_capacities?.length ? filters.wanted_capacities.join(',') : undefined,
      has_skills_available: filters.has_skills_available === true ? true : undefined,
      has_skills_wanted: filters.has_skills_wanted === true ? true : undefined,
    };

    const params = Object.fromEntries(
      Object.entries(cleanedFilters).filter(([_, value]) => value !== undefined)
    );

    try {
      const response = await axios.get(`/api/users/`, {
        params,
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return { count: 0, results: [] };
    }
  },
};
