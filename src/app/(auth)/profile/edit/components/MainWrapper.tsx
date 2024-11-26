"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { profileService } from "@/services/profileService";
import EditProfileForm from "./EditProfileForm";
import BaseWrapper from "@/components/BaseWrapper";
import LoadingSection from "@/components/LoadingSection";

interface MainWrapperProps {
  language: string;
  darkMode: {
    value: string;
  };
  pageContent: any;
  session: boolean;
}

export default function MainWrapper({
  language: initialLanguage,
  darkMode: initialDarkMode,
  pageContent: initialPageContent,
  session,
}: MainWrapperProps) {
  const { status, data: sessionData } = useSession();
  const [language, setLanguage] = useState(initialLanguage);
  const [darkMode, setDarkMode] = useState(initialDarkMode.value === "true");
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [pageContent, setPageContent] = useState(initialPageContent);

  const queryClient = useQueryClient();

  const { data: formData, isLoading } = useQuery({
    queryKey: ["profileData", sessionData?.user?.id, language],
    queryFn: () =>
      profileService.fetchProfileData({
        params: {
          userId: sessionData?.user?.id ?? "",
          username: sessionData?.user?.username ?? "",
          language,
        },
        headers: {
          Authorization: `Token ${sessionData?.user?.token}`,
        },
      }),
    enabled: status === "authenticated" && Boolean(sessionData?.user?.id),
  });

  const updateProfileMutation = useMutation({
    mutationFn: (updatedData: any) =>
      profileService.updateProfile(updatedData, sessionData?.user?.token ?? ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profileData"] });
    },
  });

  const deleteProfileMutation = useMutation({
    mutationFn: (userId: string) =>
      profileService.deleteProfile(userId, sessionData?.user?.token ?? ""),
  });

  let pageComponent;

  if (status === "loading" || isLoading) {
    pageComponent = (
      <LoadingSection
        darkMode={darkMode}
        message="YOUR PROFILE DATA FOR EDITING"
      />
    );
  } else if (status === "authenticated" && formData?.userData) {
    pageComponent = (
      <EditProfileForm
        darkMode={darkMode}
        session={{ sessionStatus: status, sessionData: sessionData }}
        formData={formData}
        pageContent={pageContent}
      />
    );
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
      {pageComponent}
    </BaseWrapper>
  );
}
