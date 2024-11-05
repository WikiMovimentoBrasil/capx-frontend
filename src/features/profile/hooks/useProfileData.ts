import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { ProfileData } from "../types";
import { SessionUser } from "@/types/session";

interface UseProfileDataProps {
  userId?: string;
  language: string;
}

export function useProfileData({ userId, language }: UseProfileDataProps) {
  const { status, data: sessionData } = useSession();
  const [profileData, setProfileData] = useState<ProfileData>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfileData = useCallback(async () => {
    if (status === "authenticated") {
      try {
        const queryData = {
          params: {
            userId: userId || (sessionData?.user as SessionUser).name,
            language,
          },
          headers: {
            Authorization: `Token ${(sessionData?.user as SessionUser).token}`,
          },
        };

        const [
          userData,
          territoryData,
          languageData,
          affiliationData,
          wikiProjectData,
          skillData,
        ] = await Promise.all([
          axios.get("/api/profile", queryData),
          axios.get("/api/list/territory", queryData),
          axios.get("/api/list/language", queryData),
          axios.get("/api/list/affiliation", queryData),
          axios.get("/api/list/wikimedia_project", queryData),
          axios.get("/api/capacity", queryData),
        ]);

        setProfileData({
          userData: userData.data,
          territoryData: territoryData.data,
          languageData: languageData.data,
          affiliationData: affiliationData.data,
          wikiProjectData: wikiProjectData.data,
          skillData: skillData.data,
        });
      } catch (err) {
        setError(err as Error);
        console.error("Failed to fetch data:", err);
      } finally {
        setIsLoading(false);
      }
    }
  }, [userId, language, status, sessionData?.user]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  return {
    profileData,
    isLoading,
    error,
    refetch: fetchProfileData,
  };
}
