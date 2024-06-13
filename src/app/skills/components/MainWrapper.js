"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
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

  return <div></div>
}