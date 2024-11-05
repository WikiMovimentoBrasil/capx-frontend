import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { profileApi } from "../api";
import { UserProfile } from "../types";
import { SessionUser } from "@/types/session";

export function useProfile(userId?: string) {
  const { status, data: sessionData } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = useCallback(async () => {
    if (status === "authenticated" && userId) {
      try {
        setIsLoading(true);
        const data = await profileApi.getById(
          userId,
          (sessionData?.user as SessionUser).token
        );
        setProfile(data);
      } catch (err) {
        setError(err as Error);
        console.error("Failed to fetch profile:", err);
      } finally {
        setIsLoading(false);
      }
    }
  }, [userId, status, sessionData?.user]);

  const updateProfile = useCallback(
    async (data: Partial<UserProfile>) => {
      if (status === "authenticated" && userId) {
        try {
          setIsLoading(true);
          const updatedProfile = await profileApi.update(
            userId,
            data,
            (sessionData?.user as SessionUser).token
          );
          setProfile(updatedProfile);
          return updatedProfile;
        } catch (err) {
          setError(err as Error);
          console.error("Failed to update profile:", err);
          throw err;
        } finally {
          setIsLoading(false);
        }
      }
    },
    [userId, status, sessionData?.user]
  );

  const deleteProfile = useCallback(async () => {
    if (status === "authenticated" && userId) {
      try {
        setIsLoading(true);
        await profileApi.delete(
          userId,
          (sessionData?.user as SessionUser).token
        );
        setProfile(null);
      } catch (err) {
        setError(err as Error);
        console.error("Failed to delete profile:", err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    }
  }, [userId, status, sessionData?.user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    isLoading,
    error,
    updateProfile,
    deleteProfile,
    refetch: fetchProfile,
  };
}
