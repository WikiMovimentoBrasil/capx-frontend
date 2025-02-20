"use client";
import { useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import { useTheme } from "@/contexts/ThemeContext";
import BaseWrapper from "@/components/BaseWrapper";
import CapacityProfileView from "./CapacityProfileView";
import LoadingSection from "@/components/LoadingSection";
import { useCapacityProfile } from "@/hooks/useCapacityProfile";
import { useSession } from "next-auth/react";
export default function CapacityProfileMainWrapper(props) {
  const { pageContent, language } = useApp();
  const { darkMode } = useTheme();
  const { status, data: session } = useSession();
  const { selectedCapacityData, refreshCapacityData, isLoading } =
    useCapacityProfile(props.selectedCapacityId);

  useEffect(() => {
    refreshCapacityData(props.language);
  }, [props.language, refreshCapacityData]);

  useEffect(() => {
    refreshCapacityData(language);
  }, [language, refreshCapacityData]);

  if (isLoading) {
    return <LoadingSection darkMode={darkMode} message="CAPACITY DATA" />;
  }

  return (
    <section className="grid grid-cols-1 place-content-start w-10/12 sm:w-8/12 min-h-screen py-32 mx-auto space-y-8">
      <CapacityProfileView
        darkMode={darkMode}
        selectedCapacityData={selectedCapacityData}
        pageContent={pageContent}
        userId={session?.user?.id || ""}
      />
    </section>
  );
}
