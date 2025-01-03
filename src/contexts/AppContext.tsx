"use client";
import { createContext, useContext, useState, useEffect } from "react";

interface AppContextType {
  isMobile: boolean;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  mobileMenuStatus: boolean;
  setMobileMenuStatus: (value: boolean) => void;
  language: string;
  setLanguage: (value: string) => void;
  pageContent: any;
  setPageContent: (value: any) => void;
  session: any;
  setSession: (value: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [language, setLanguage] = useState("en");
  const [pageContent, setPageContent] = useState({});
  const [session, setSession] = useState(null);

  // Handle initial mobile detection and window resize
  useEffect(() => {
    const checkIsMobile = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);
      if (!isMobileView) {
        setMobileMenuStatus(false);
      }
    };

    // Check on mount
    checkIsMobile();
    setMounted(true);

    // Add resize listener
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  // Don't render anything until after mount to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        isMobile,
        darkMode,
        setDarkMode,
        mobileMenuStatus,
        setMobileMenuStatus,
        language,
        setLanguage,
        pageContent,
        setPageContent,
        session,
        setSession,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
