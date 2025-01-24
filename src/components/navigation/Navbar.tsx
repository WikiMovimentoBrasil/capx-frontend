import DesktopNavbar from "@/components/navigation/DesktopNavbar";
import MobileNavbar from "@/components/navigation/MobileNavbar";
import { getDictionary } from "@/lib/dictionaries";
import { useApp } from "@/providers/AppProvider";
import { getServerSession } from "next-auth";

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
      session={session}
      currentLanguage={language}
      pageContent={pageContent}
    />
  ) : (
    <DesktopNavbar
      pageContent={pageContent}
      currentLanguage={language}
      session={session}
    />
  );
}
