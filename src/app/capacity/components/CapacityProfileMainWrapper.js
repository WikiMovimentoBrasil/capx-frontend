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

  const getCapacityData = async (queryData) => {
    const queryResponse = await axios.get("/api/capacity/" + props.selectedCapacityId, queryData);
    setSelectedCapacityData(queryResponse.data);
  };

  useEffect(() => {
    if (status === "authenticated") {
      const queryData = {
        params: { language: props.language },
        headers: {
          'Authorization': `Token ${data.user.token}`,
        }
      }
      getCapacityData(queryData);
    }
  }, [status]);

  useEffect(() => {
    setSelectedCapacityData(undefined);
    if (status === "authenticated") {
      const queryData = {
        params: { language: language },
        headers: {
          'Authorization': `Token ${data.user.token}`,
        }
      }
      getCapacityData(queryData);
    }
  }, [language]);

  if (status === "loading") {
    return <LoadingSection darkMode={darkMode} message="CAPACITY DATA" />
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
          userId={data.user.id}
        />
      </CapacitySection>
    </BaseWrapper>
  )
}