import { Profile } from "@/types/profile";
import { profileService } from "@/services/profileService";
import { useQuery } from "@tanstack/react-query";
import { fetchFromApi } from "@/lib/utils/apiClient";
import { signOut } from "next-auth/react";

export function useProfile(token: string | undefined, userId: number) {
  const handleInvalidToken = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const { data, isLoading, error, refetch, ...rest } = useQuery({
    queryKey: ["profile", token, userId],
    queryFn: async () => {
      try {
        const response = await profileService.fetchUserProfile({
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (Array.isArray(response)) {
          let profile = response.find(
            (p) => p.user.id === userId && p.avatar !== null
          );

          if (!profile) {
            profile = response.find((p) => p.user.id === userId);
          }

          return profile;
        }

        const data = await fetchFromApi(response);
        return data;
      } catch (error) {
        if (error?.response?.status === 401) {
          await handleInvalidToken();
          return null;
        }
        throw error;
      }
    },
    enabled: !!token && !!userId,
  });

  const updateProfile = async (profileData: Partial<Profile>) => {
    if (!token || !userId) {
      throw new Error("No token or userId available");
    }

    try {
      const response = await profileService.updateProfile(userId, profileData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const updatedProfile = Array.isArray(response)
        ? response[response.length - 1]
        : response;
      return fetchFromApi(updatedProfile);
    } catch (error) {
      if (error?.response?.status === 401) {
        await handleInvalidToken();
        return null;
      }
      throw error;
    }
  };

  return {
    profile: data,
    isLoading,
    error,
    refetch,
    ...rest,
    updateProfile,
  };
}
