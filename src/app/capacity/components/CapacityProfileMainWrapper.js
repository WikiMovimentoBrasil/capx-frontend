"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import CapacitySection from "./CapacitySection";
import BaseWrapper from "@/components/BaseWrapper";
import CapacityProfileView from "./CapacityProfileView";
import LoadingSection from "@/components/LoadingSection";

export default function CapacityProfileMainWrapper(props) {
  const { status, data } = useSession();
  const [language, setLanguage] = useState(props.language);
  const [darkMode, setDarkMode] = useState(props.darkMode.value === "true");
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [pageContent, setPageContent] = useState(props.pageContent);
  const [selectedCapacityData, setSelectedCapacityData] = useState(undefined);

  useEffect(() => {
    if (status === "authenticated") {
      const fetchCapacityData = async (queryData) => {
        const queryResponse = await axios.get("/api/capacity/" + props.selectedCapacityId, queryData);
        setSelectedCapacityData(queryResponse.data);
      };
      const queryData = {
        params: { language: props.language },
        headers: {
          'Authorization': `Token ${data.user.token}`,
        }
      }
      fetchCapacityData(queryData);
    }
  }, [status]);

  const fetchUserData = async (userId, setCustomState) => {
    try {
      const queryData = {
        params: { userId: userId },
        headers: { 'Authorization': `Token ${data.user.token}` }
      }
      const queryResponse = await axios.get("/api/users", queryData);
      setCustomState(queryResponse.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

  if (status === "loading") {
    return <LoadingSection darkMode={darkMode} message="CAPACITIES" />
  }

  return (
    <BaseWrapper
      session={props.session}
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
        <CapacityProfileView
          darkMode={darkMode}
          selectedCapacityData={selectedCapacityData}
          pageContent={pageContent}
          fetchUserData={fetchUserData}
        />
      </CapacitySection>
    </BaseWrapper>
  )
}