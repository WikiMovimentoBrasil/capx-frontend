"use client";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import BaseWrapper from "@/components/BaseWrapper";
import LoadingSection from "@/components/LoadingSection";
import CapacitySection from "./CapacitySection";
import CapacityProfileView from "./CapacityProfileView";
import type { DarkModeCookie } from "@/types/cookie";

interface CapacityProfileMainWrapperProps {
  session: boolean;
  language: string;
  darkMode: DarkModeCookie;
  pageContent: Record<string, string>;
  selectedCapacityId: string;
}

export default function CapacityProfileMainWrapper({
  session,
  language: initialLanguage,
  darkMode: initialDarkMode,
  pageContent: initialPageContent,
  selectedCapacityId,
}: CapacityProfileMainWrapperProps) {
  const { status, data: sessionData } = useSession();

  // State management
  const [language, setLanguage] = useState(initialLanguage);
  const [darkMode, setDarkMode] = useState(initialDarkMode === "true");
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [pageContent, setPageContent] = useState(initialPageContent);
  const [selectedCapacityData, setSelectedCapacityData] =
    useState<any>(undefined);
  const getCapacityData = useCallback(async () => {
    if (!sessionData?.user) return;

    try {
      const response = await axios.get(`/api/capacity/${selectedCapacityId}`, {
        params: { language },
        headers: {
          Authorization: `Token ${sessionData.user.token}`,
        },
      });
      setSelectedCapacityData(response.data);
    } catch (error) {
      console.error("Failed to fetch capacity data:", error);
      // TODO: Add error handling
    }
  }, [selectedCapacityId, language, sessionData?.user?.token]);

  // Initial data fetch
  useEffect(() => {
    if (status === "authenticated") {
      getCapacityData();
    }
  }, [status, getCapacityData]);

  // Language change handler
  useEffect(() => {
    if (status === "authenticated") {
      setSelectedCapacityData(undefined);
      getCapacityData();
    }
  }, [language, status, getCapacityData]);

  if (status === "loading") {
    return <LoadingSection darkMode={darkMode} message="CAPACITY DATA" />;
  }

  const baseWrapperProps = {
    session,
    language,
    setLanguage,
    pageContent,
    setPageContent,
    darkMode,
    setDarkMode,
    mobileMenuStatus,
    setMobileMenuStatus,
  };

  return (
    <BaseWrapper {...baseWrapperProps}>
      <CapacitySection>
        <CapacityProfileView
          darkMode={darkMode}
          selectedCapacityData={selectedCapacityData}
          pageContent={pageContent}
          userId={sessionData?.user?.id}
        />
      </CapacitySection>
    </BaseWrapper>
  );
}
