"use client";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import UserProfileView from "./UserProfileView";
import BaseWrapper from "@/components/BaseWrapper";
import LoadingSection from "@/components/LoadingSection";
import { SessionUser } from "@/types/session";

interface UserProfileMainWrapperProps {
  language: string;
  darkMode: { value: string };
  pageContent: Record<string, string>;
  userId?: string;
  session: any; // TODO: Type this properly once session type is defined
}

interface ProfileData {
  userData: any; // TODO: Define proper user data type
  territoryData: Array<{ code: string; name: string }>;
  languageData: Array<{ code: string; name: string }>;
  affiliationData: Array<{ code: string; name: string }>;
  wikiProjectData: Array<{ code: string; name: string }>;
  skillData: Array<{ code: string; name: string; description?: string }>;
}

interface QueryConfig {
  params: {
    // TODO: Define userId type
    userId: string | undefined | null;
    language: string;
  };
  headers: {
    Authorization: string;
  };
}

export default function UserProfileMainWrapper({
  language: initialLanguage,
  darkMode: initialDarkMode,
  pageContent: initialPageContent,
  userId,
  session,
}: UserProfileMainWrapperProps) {
  const { status, data } = useSession();
  const [language, setLanguage] = useState(initialLanguage);
  const [darkMode, setDarkMode] = useState(initialDarkMode.value === "true");
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [pageContent, setPageContent] = useState(initialPageContent);
  const [userProfileData, setUserProfileData] = useState<
    ProfileData | undefined
  >();

  const getUserData = useCallback(async (queryConfig: QueryConfig) => {
    try {
      const [
        userData,
        territoryData,
        languageData,
        affiliationData,
        wikiProjectData,
        skillData,
      ] = await Promise.all([
        axios.get("/api/profile", queryConfig),
        axios.get("/api/list/territory", queryConfig),
        axios.get("/api/list/language", queryConfig),
        axios.get("/api/list/affiliation", queryConfig),
        axios.get("/api/list/wikimedia_project", queryConfig),
        axios.get("/api/capacity", queryConfig),
      ]);

      setUserProfileData({
        userData: userData.data,
        territoryData: territoryData.data,
        languageData: languageData.data,
        affiliationData: affiliationData.data,
        wikiProjectData: wikiProjectData.data,
        skillData: skillData.data,
      });
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated" && data?.user) {
      const user = data.user as SessionUser;
      const queryConfig: QueryConfig = {
        params: {
          userId: userId ?? user.username,
          language: initialLanguage,
        },
        headers: {
          Authorization: `Token ${user.token}`,
        },
      };
      getUserData(queryConfig);
    }
  }, [status, data?.user, getUserData, initialLanguage, userId]);

  if (status === "loading") {
    return <LoadingSection darkMode={darkMode} message="PROFILE DATA" />;
  }

  return (
    <BaseWrapper
      session={session}
      language={language}
      setLanguage={setLanguage}
      pageContent={pageContent}
      setPageContent={setPageContent}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      mobileMenuStatus={mobileMenuStatus}
      setMobileMenuStatus={setMobileMenuStatus}
    >
      <UserProfileView
        darkMode={darkMode}
        userProfileData={userProfileData}
        showEditButton={!userId}
        pageContent={pageContent}
      />
    </BaseWrapper>
  );
}
