import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Profile } from "@/types/profile";
import { profileService } from "@/services/profileService";
import { useSession } from "next-auth/react";

export function useProfile(token: string | undefined, userId: number) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!token || !userId) return;

    try {
      setIsLoading(true);
      const response = await profileService.fetchUserProfile({
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {
          userId: userId,
        },
      });
      const latestProfile = Array.isArray(response)
        ? response[response.length - 1]
        : response;
      setProfile(latestProfile);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [token, userId]);

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
      setProfile(updatedProfile);
      return updatedProfile;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, isLoading, error, fetchProfile, updateProfile };
}
