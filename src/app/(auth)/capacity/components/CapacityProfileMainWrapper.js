"use client";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
// import CapacitySection from "./CapacitySection";
import BaseWrapper from "@/components/BaseWrapper";
import CapacityProfileView from "./CapacityProfileView";
import LoadingSection from "@/components/LoadingSection";
import { useApp } from "@/contexts/AppContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function CapacityProfileMainWrapper(props) {
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [selectedCapacityData, setSelectedCapacityData] = useState(undefined);

  const { pageContent, language } = useApp();
  const { status, data: session } = useSession();
  const { darkMode } = useTheme();

  const getCapacityData = useCallback(async (queryData) => {
    const queryResponse = await axios.get("/api/capacity/" + props.selectedCapacityId, queryData);
    setSelectedCapacityData(queryResponse.data);
  }, [props.selectedCapacityId]);

  useEffect(() => {
    if (status === "authenticated") {
      const queryData = {
        params: { language: props.language },
        headers: {
          'Authorization': `Token ${session?.user?.token}`,
        }
      }
      getCapacityData(queryData);
    }
  }, [session?.user?.token, getCapacityData, props.language, status]);

  useEffect(() => {
    setSelectedCapacityData(undefined);
    if (status === "authenticated") {
      const queryData = {
        params: { language: language },
        headers: {
          'Authorization': `Token ${session?.user?.token}`,
        }
      }
      getCapacityData(queryData);
    }
  }, [session?.user?.token, getCapacityData, language, status]);

  if (status === "loading") {
    return <LoadingSection darkMode={darkMode} message="CAPACITY DATA" />
  }

  return (
    <section className="grid grid-cols-1 place-content-start w-10/12 sm:w-8/12 min-h-screen py-32 mx-auto space-y-8">
      <CapacityProfileView
        darkMode={darkMode}
        selectedCapacityData={selectedCapacityData}
        pageContent={pageContent}
        userId={session?.user?.id}
      />
    </section>
  )
}