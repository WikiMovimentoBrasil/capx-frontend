"use client";
import { useEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";
import { useApp } from "@/contexts/AppContext";

export default function ResponsiveNavbar() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const {
    language,
    setLanguage,
    pageContent,
    setPageContent,
    darkMode,
    setDarkMode,
    setMobileMenuStatus,
  } = useApp();

  // Reset mobile menu when screen size changes
  useEffect(() => {
    if (!isMobile) {
      setMobileMenuStatus(false);
    }
  }, [isMobile, setMobileMenuStatus]);

  if (isMobile) {
    return (
      <MobileNavbar
        language={language}
        setLanguage={setLanguage}
        pageContent={pageContent}
        setPageContent={setPageContent}
      />
    );
  }

  return (
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
