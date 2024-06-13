"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import BaseWrapper from "@/components/BaseWrapper";
import LoadingSection from "@/components/LoadingSection";

export default function MainWrapper(props) {
  const { status, data } = useSession();
  const [language, setLanguage] = useState(props.language);
  const [darkMode, setDarkMode] = useState(props.darkMode.value === "true");
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [pageContent, setPageContent] = useState(props.pageContent);

  if (status === "loading") {
    return <LoadingSection darkMode={darkMode} message="SKILLS" />
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
      <div className="grid place-content-center min-w-full min-h-screen"></div>
    </BaseWrapper>
  )
}