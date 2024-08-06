"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import TagProfileView from "./TagProfileView";
import BaseWrapper from "@/components/BaseWrapper";
import LoadingSection from "@/components/LoadingSection";

export default function TagProfileMainWrapper(props) {
  const router = useRouter();
  const { status, data } = useSession();
  const [language, setLanguage] = useState(props.language);
  const [darkMode, setDarkMode] = useState(props.darkMode.value === "true");
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [pageContent, setPageContent] = useState(props.pageContent);
  const [selectedTagData, setSelectedTagData] = useState(undefined);

  const getTagData = async (queryData) => {
    try {
      const queryResponse = await axios.get(`/api/tag/${props.selectedTagId}`, queryData);
      setSelectedTagData(queryResponse.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      router.push("/profile");
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      const queryData = {
        params: {
          category: props.selectedTagCategory
        },
        headers: {
          'Authorization': `Token ${data.user.token}`,
        }
      }
      getTagData(queryData);
    }
  }, [data?.user?.token, getTagData, props.selectedTagCategory, status]);

  if (status === "loading") {
    return <LoadingSection darkMode={darkMode} message="TAG DATA" />
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
      <TagProfileView
        darkMode={darkMode}
        selectedTagData={selectedTagData}
        pageContent={pageContent}
        userId={data.user.id}
      />
    </BaseWrapper>
  )
}