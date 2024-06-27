"use client";
import axios from "axios";
import CapacityListView from "./CapacityListView";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import CapacitySection from "./CapacitySection";
import BaseWrapper from "@/components/BaseWrapper";
import CapacitySearchBar from "./CapacitySearchBar";
import LoadingSection from "@/components/LoadingSection";

export default function CapacityListMainWrapper(props) {
  const { status, data } = useSession();
  const [language, setLanguage] = useState(props.language);
  const [darkMode, setDarkMode] = useState(props.darkMode.value === "true");
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [pageContent, setPageContent] = useState(props.pageContent);
  const [capacityList, setCapacityList] = useState(undefined);

  useEffect(() => {
    try {
      if (status === "authenticated") {
        const getCapacityList = async (queryData) => {
          const queryResponse = await axios.get('/api/capacity', queryData);
          setCapacityList(queryResponse.data);
        };
        const queryData = {
          params: { language: props.language },
          headers: {
            'Authorization': `Token ${data.user.token}`,
          }
        }
        getCapacityList(queryData);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }, [status]);

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
        <CapacitySearchBar
          darkMode={darkMode}
          capacityList={capacityList}
          pageContent={pageContent}
        />
        <CapacityListView
          darkMode={darkMode}
          capacityList={capacityList}
        />
      </CapacitySection>
    </BaseWrapper>
  )
}