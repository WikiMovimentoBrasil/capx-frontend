export interface User {
  id: string;
  username: string;
  token: string;
}

export interface Session {
  sessionStatus: string;
  sessionData: {
    user: User;
  };
}

export interface PageContent {
  [key: string]: string;
}

export interface BaseWrapperProps {
  children: React.ReactNode;
  session: boolean;
  language: string;
  setLanguage: (lang: string) => void;
  pageContent: PageContent;
  setPageContent: (content: PageContent) => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  mobileMenuStatus: boolean;
  setMobileMenuStatus: (status: boolean) => void;
}
