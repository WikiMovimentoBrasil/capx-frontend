"use client";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

interface NavbarProps {
  session: any;
  language: string;
  setLanguage: (language: string) => void;
  pageContent: any;
  setPageContent: (pageContent: any) => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  mobileMenuStatus: boolean;
  setMobileMenuStatus: (mobileMenuStatus: boolean) => void;
  isMobile: boolean;
}

export default function Navbar({
  session,
  language,
  setLanguage,
  pageContent,
  setPageContent,
  darkMode,
  setDarkMode,
  mobileMenuStatus,
  setMobileMenuStatus,
  isMobile,
}: NavbarProps) {
  return isMobile ? (
    <MobileNavbar
      isMobile={isMobile}
      mobileMenuStatus={mobileMenuStatus}
      language={language}
      setLanguage={setLanguage}
      setPageContent={setPageContent}
      session={session}
      pageContent={pageContent}
      darkMode={darkMode}
      setMobileMenuStatus={setMobileMenuStatus}
    />
  ) : (
    <DesktopNavbar
      pageContent={pageContent}
      language={language}
      setLanguage={setLanguage}
      setPageContent={setPageContent}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      session={session}
    />
  );
}
