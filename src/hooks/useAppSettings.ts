import { useState } from "react";

interface AppSettings {
  language: string;
  darkMode: boolean;
  mobileMenuStatus: boolean;
  pageContent: Record<string, string>;
}

export function useAppSettings(initialSettings: Partial<AppSettings>) {
  const [language, setLanguage] = useState(initialSettings.language || "en");
  const [darkMode, setDarkMode] = useState(initialSettings.darkMode || false);
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [pageContent, setPageContent] = useState(
    initialSettings.pageContent || {}
  );

  return {
    language,
    setLanguage,
    darkMode,
    setDarkMode,
    mobileMenuStatus,
    setMobileMenuStatus,
    pageContent,
    setPageContent,
  };
}
