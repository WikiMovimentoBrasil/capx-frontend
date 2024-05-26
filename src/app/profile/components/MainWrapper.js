"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import UserProfile from "./UserProfile";
import LoadingSection from "./LoadingSection";
import BaseWrapper from "@/components/BaseWrapper";

export default function MainWrapper(props) {
  let pageComponent;
  const { status, data } = useSession();
  const [userData, setUserData] = useState({});
  const [language, setLanguage] = useState(props.language);
  const [darkMode, setDarkMode] = useState(props.darkMode.value === "true");
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [pageContent, setPageContent] = useState(props.pageContent);

  useEffect(() => {
    if (status == "authenticated") {
      async function getUserData() {
        const queryResponse = await axios.get("/api/profile", {
          params: {
            userId: data.user.id,
          },
          headers: {
            'Authorization': `Token ${data.user.token}`,
          }
        });
        setUserData(queryResponse.data);
      }
      getUserData();
    }
  }, [status]);

  if (status === "loading") {
    pageComponent = (<LoadingSection darkMode={darkMode} message="YOUR PROFILE" />)
  }

  if (status === "authenticated") {
    if (Object.keys(userData).length > 0) {
      pageComponent = (<UserProfile darkMode={darkMode} userData={userData} />);
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