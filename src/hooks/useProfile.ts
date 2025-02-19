import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Profile } from "@/types/profile";
import { profileService } from "@/services/profileService";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

export function useProfile(token: string | undefined, userId: number) {
  const { data, isLoading, error, refetch, ...rest } = useQuery({
    queryKey: ["profile", token, userId],
    queryFn: async () => {
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

      return response;
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
      return updatedProfile;
    } catch (err) {
      throw err;
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
