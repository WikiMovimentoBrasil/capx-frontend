"use client";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { useApp } from "@/contexts/AppContext";

export default function Navbar() {
  const {
    isMobile,
    language,
    setLanguage,
    pageContent,
    setPageContent,
    darkMode,
    setDarkMode,
  } = useApp();

  return isMobile ? (
    <MobileNavbar
      language={language}
      setLanguage={setLanguage}
      pageContent={pageContent}
      setPageContent={setPageContent}
    />
  ) : (
    <DesktopNavbar
      pageContent={pageContent}
      language={language}
      setLanguage={setLanguage}
      setPageContent={setPageContent}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />
  );
}
