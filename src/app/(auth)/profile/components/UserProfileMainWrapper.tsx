"use client";

import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import UserProfileView from "./UserProfileView";
import BaseWrapper from "@/components/BaseWrapper";
import LoadingSection from "@/components/LoadingSection";

// Define interfaces for better type safety
interface UserProfileProps {
  language: string;
  darkMode: {
    value: string;
  };
  pageContent: any; // TODO: Define proper type for pageContent
  userId?: string;
  session: boolean;
}

interface UserProfileData {
  userData: any;
  territoryData: any;
  languageData: any;
  affiliationData: any;
  wikiProjectData: any;
  skillData: any;
  darkMode: any;
}

interface QueryData {
  params: {
    userId: string;
    language: string;
  };
  headers: {
    Authorization: string;
  };
}

const fetchUserProfile = async (queryData: QueryData) => {
  try {
    const response = await axios.get("/api/profile", queryData);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw error;
  }
};

const fetchTerritoryData = async (queryData: QueryData) => {
  try {
    const response = await axios.get("/api/list/territory", queryData);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch territory data:", error);
    throw error;
  }
};

const fetchLanguageData = async (queryData: QueryData) => {
  try {
    const response = await axios.get("/api/list/language", queryData);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch language data:", error);
    throw error;
  }
};

const fetchAffiliationData = async (queryData: QueryData) => {
  try {
    const response = await axios.get("/api/list/affiliation", queryData);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch affiliation data:", error);
    throw error;
  }
};

const fetchWikiProjectData = async (queryData: QueryData) => {
  try {
    const response = await axios.get("/api/list/wikimedia_project", queryData);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch wiki project data:", error);
    throw error;
  }
};

const fetchSkillData = async (queryData: QueryData) => {
  try {
    const response = await axios.get("/api/capacity", queryData);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch skill data:", error);
    throw error;
  }
};

export default function UserProfileMainWrapper({
  language: initialLanguage,
  darkMode: initialDarkMode,
  pageContent: initialPageContent,
  userId,
  session,
}: UserProfileProps) {
  const { status, data: sessionData } = useSession();

  // State management
  const [language, setLanguage] = useState(initialLanguage);
  const [darkMode, setDarkMode] = useState(initialDarkMode.value === "true");
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [pageContent, setPageContent] = useState(initialPageContent);
  const [userProfileData, setUserProfileData] = useState<
    UserProfileData | undefined
  >();

  const fetchUserData = useCallback(
    async (queryData: QueryData): Promise<void> => {
      try {
        const [
          userData,
          territoryData,
          languageData,
          affiliationData,
          wikiProjectData,
          skillData,
        ] = await Promise.all([
          fetchUserProfile(queryData),
          fetchTerritoryData(queryData),
          fetchLanguageData(queryData),
          fetchAffiliationData(queryData),
          fetchWikiProjectData(queryData),
          fetchSkillData(queryData),
        ]);

        setUserProfileData({
          userData,
          territoryData,
          languageData,
          affiliationData,
          wikiProjectData,
          skillData,
          darkMode: darkMode,
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        // TODO: Add proper error handling UI feedback
      }
    },
    []
  );

  // Fetch data when session is authenticated
  useEffect(() => {
    if (status === "authenticated" && sessionData?.user) {
      const queryData: QueryData = {
        params: {
          userId: userId ?? sessionData.user?.id,
          language,
        },
        headers: {
          Authorization: `Token ${sessionData?.user?.token}`,
        },
      };

      fetchUserData(queryData);
    }
  }, [status, sessionData?.user, fetchUserData, language, userId]);

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
