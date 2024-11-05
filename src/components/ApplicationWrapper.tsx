"use client";
import { useState } from "react";
import { BaseWrapper } from "./BaseWrapper";
import Section01 from "@/components/Section01";
import Section02 from "@/components/Section02";
import type { DarkModeCookie } from "@/types/cookie";
import { parseDarkMode } from "@/lib/utils/darkMode";

export default function ApplicationWrapper(props: {
  darkMode: DarkModeCookie;
  language: string;
  pageContent: Record<string, string>;
  session: boolean;
}) {
  const [darkMode, setDarkMode] = useState(parseDarkMode(props.darkMode));
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
  );
}
