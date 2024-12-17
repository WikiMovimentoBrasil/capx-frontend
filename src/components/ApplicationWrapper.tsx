"use client";
import { useState } from "react";
import BaseWrapper from "./BaseWrapper";
import Section01 from "@/components/Section01";
import Section02 from "./Section02";

export default function ApplicationWrapper(props) {
  const [darkMode, setDarkMode] = useState(props.darkMode.value === "true");
  const [language, setLanguage] = useState(props.language);
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [pageContent, setPageContent] = useState(props.pageContent);

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
      <Section01 pageContent={pageContent}></Section01>
      <Section02 darkMode={darkMode}></Section02>
    </BaseWrapper>
  )
}