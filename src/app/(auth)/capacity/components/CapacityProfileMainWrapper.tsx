"use client";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import CapacitySection from "./CapacitySection";
import BaseWrapper from "@/components/BaseWrapper";
import CapacityProfileView from "./CapacityProfileView";
import LoadingSection from "@/components/LoadingSection";

interface CapacityProfileMainWrapperProps {
  session: boolean;
  language: string;
  darkMode: { value: string };
  pageContent: Record<string, string>;
  selectedCapacityId: string;
}

interface CapacityData {
  code: string;
  wd_code: string;
  name: string;
  description?: string;
  users: Array<{
    id: number;
    username: string;
    email: string;
  }>;
}

export default function CapacityProfileMainWrapper({
  session,
  language: initialLanguage,
  darkMode: initialDarkMode,
  pageContent: initialPageContent,
  selectedCapacityId,
}: CapacityProfileMainWrapperProps) {
  const { status, data: sessionData } = useSession();
  const [language, setLanguage] = useState(initialLanguage);
  const [darkMode, setDarkMode] = useState(initialDarkMode.value === "true");
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [pageContent, setPageContent] = useState(initialPageContent);
  const [capacityData, setCapacityData] = useState<CapacityData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCapacityData = useCallback(async () => {
    if (!sessionData?.user?.token) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/capacity/${selectedCapacityId}?language=${language}`,
        {
          headers: {
            Authorization: `Token ${sessionData.user.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch capacity data");
      }

      const data = await response.json();
      setCapacityData(data);
    } catch (error) {
      console.error("Error fetching capacity data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCapacityId, language, sessionData?.user?.token]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchCapacityData();
    }
  }, [status, fetchCapacityData]);

  if (status === "loading" || isLoading) {
    return <LoadingSection darkMode={darkMode} message="CAPACITY DATA" />;
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
      <CapacitySection>
        {capacityData && (
          <CapacityProfileView
            darkMode={darkMode}
            selectedCapacityData={capacityData}
            pageContent={pageContent}
            userId={sessionData?.user?.id}
          />
        )}
      </CapacitySection>
    </BaseWrapper>
  );
}
