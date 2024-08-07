"use client";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import UserProfileView from "./UserProfileView";
import BaseWrapper from "@/components/BaseWrapper";
import LoadingSection from "@/components/LoadingSection";

export default function UserProfileMainWrapper(props) {

  const { status, data } = useSession();
  const [language, setLanguage] = useState(props.language);
  const [darkMode, setDarkMode] = useState(props.darkMode.value === "true");
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [pageContent, setPageContent] = useState(props.pageContent);
  const [userProfileData, setUserProfileData] = useState(undefined);

  const getUserData = useCallback(async (queryData) => {
    try {
      const [userData, territoryData, languageData, affiliationData, wikiProjectData, skillData] = await Promise.all([
        axios.get("/api/profile", queryData),
        axios.get('/api/list/territory', queryData),
        axios.get('/api/list/language', queryData),
        axios.get('/api/list/affiliation', queryData),
        axios.get('/api/list/wikimedia_project', queryData),
        axios.get('/api/capacity', queryData)
      ]);

      setUserProfileData({
        userData: userData.data,
        territoryData: territoryData.data,
        languageData: languageData.data,
        affiliationData: affiliationData.data,
        wikiProjectData: wikiProjectData.data,
        skillData: skillData.data
      });
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      const queryData = {
        params: {
          userId: props.userId === undefined ? data.user.username : props.userId,
          language: props.language
        },
        headers: { 'Authorization': `Token ${data.user.token}` }
      }
      getUserData(queryData);
    }
  }, [status, data?.user?.token, data?.user?.username, getUserData, props.language, props.userId]);
  //
  // // If the language is changed
  // useEffect(() => {
  //   setUserProfileData(undefined);
  //   if (status === "authenticated") {
  //     const queryData = {
  //       params: {
  //         userId: props.userId === undefined ? data.user.id : props.userId,
  //         language: language
  //       },
  //       headers: { 'Authorization': `Token ${data.user.token}` }
  //     }
  //     getUserData(queryData);
  //   }
  // }, [language]);

  if (status === "loading") {
    return <LoadingSection darkMode={darkMode} message="PROFILE DATA" />
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
        <UserProfileView
            darkMode={darkMode}
            userProfileData={userProfileData}
            showEditButton={props.userId === undefined ? true : false}
            pageContent={pageContent}
        />
      </BaseWrapper>
  );
}