"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { profileService } from "@/services/profileService";
import UserProfileView from "./UserProfileView";
import BaseWrapper from "@/components/BaseWrapper";
import LoadingSection from "@/components/LoadingSection";

interface UserProfileProps {
  language: string;
  darkMode: {
    value: string;
  };
  pageContent: any;
  userId?: string;
  username?: string;
  session: boolean;
}

export default function UserProfileMainWrapper({
  language: initialLanguage,
  darkMode: initialDarkMode,
  pageContent: initialPageContent,
  userId,
  username,
  session,
}: UserProfileProps) {
  const { status, data: sessionData } = useSession();
  const [language, setLanguage] = useState(initialLanguage);
  const [darkMode, setDarkMode] = useState(initialDarkMode.value === "true");
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [pageContent, setPageContent] = useState(initialPageContent);

  const {
    data: profileData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profileData", userId ?? sessionData?.user?.id, language],
    queryFn: () =>
      profileService.fetchProfileData({
        params: {
          userId: userId ?? sessionData?.user?.id ?? "",
          username: username ?? sessionData?.user?.username ?? "",
          language,
        },
        headers: {
          Authorization: `Token ${sessionData?.user?.token}`,
        },
      }),
    enabled: status === "authenticated" && Boolean(sessionData?.user?.id),
  });

  if (status === "loading" || isLoading) {
    return <LoadingSection darkMode={darkMode} message="YOUR PROFILE DATA" />;
  }

  if (error) {
    console.error("Failed to fetch profile data:", error);
    return <div>Error loading profile data</div>;
  }

  return (
    <UserProfileView
      darkMode={darkMode}
      userProfileData={profileData}
      showEditButton={true}
      pageContent={pageContent}
    />
  );
}
