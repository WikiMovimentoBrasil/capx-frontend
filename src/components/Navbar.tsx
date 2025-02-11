"use client";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { useApp } from "@/contexts/AppContext";

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
}: Omit<
  NavbarProps,
  | "darkMode"
  | "setDarkMode"
  | "mobileMenuStatus"
  | "setMobileMenuStatus"
  | "isMobile"
>) {
  const {
    isMobile,
    darkMode,
    setDarkMode,
    mobileMenuStatus,
    setMobileMenuStatus,
  } = useApp();

  return isMobile ? (
    <MobileNavbar
      language={language}
      setLanguage={setLanguage}
      setPageContent={setPageContent}
      session={session}
      pageContent={pageContent}
    />
  ) : (
    <DesktopNavbar
      pageContent={pageContent}
      language={language}
      setLanguage={setLanguage}
      setPageContent={setPageContent}
      session={session}
    />
  );
}
