"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import UserProfile from "./UserProfile";
import LoadingSection from "./LoadingSection";
import BaseWrapper from "@/components/BaseWrapper";

const fetchData = async (queryData) => {
  try {
    const [userData, territoryData, languageData, affiliationData, wikiProjectData, skillData] = await Promise.all([
      axios.get("/api/profile", queryData),
      axios.get('/api/list/territory', queryData),
      axios.get('/api/list/language', queryData),
      axios.get('/api/list/organizations', queryData),
      axios.get('/api/list/wikimedia_project', queryData),
      axios.get('/api/list/skills', queryData)
    ]);

    return {
      userData: userData.data,
      territoryData: territoryData.data,
      languageData: languageData.data,
      affiliationData: affiliationData.data,
      wikiProjectData: wikiProjectData.data,
      skillData: skillData.data
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      userData: null,
      territoryData: null,
      languageData: null,
      affiliationData: null,
      wikiProjectData: null,
      skillData: null
    };
  }
};

export default function MainWrapper(props) {
  let pageComponent;
  const { status, data } = useSession();
  const [language, setLanguage] = useState(props.language);
  const [darkMode, setDarkMode] = useState(props.darkMode.value === "true");
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [pageContent, setPageContent] = useState(props.pageContent);
  const [profileData, setProfileData] = useState({ userData: null, territoryData: null, languageData: null, affiliationData: null, wikiProjectData: null, skillData: null });

  useEffect(() => {
    if (status === "authenticated") {
      const queryData = {
        params: { userId: data.user.id },
        headers: { 'Authorization': `Token ${data.user.token}` }
      }

      const getData = async (queryData) => {
        const fetchedData = await fetchData(queryData);
        setProfileData(fetchedData);
      };

      getData(queryData);

    }
  }, [status]);

  if (status === "loading") {
    pageComponent = (<LoadingSection darkMode={darkMode} message="YOUR PROFILE" />)
  }

  if (status === "authenticated") {
    if (profileData.userData != undefined) {
      pageComponent = (<UserProfile darkMode={darkMode} profileData={profileData} />);
    }
    else {
      pageComponent = (<LoadingSection darkMode={darkMode} message="YOUR PROFILE" />);
    }
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
      {pageComponent}
    </BaseWrapper>
  )
}