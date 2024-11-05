import { ReactNode } from "react";
import { useSession } from "next-auth/react";

interface BaseWrapperProps {
  children: ReactNode;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  language: string;
  setLanguage: (value: string) => void;
  pageContent: Record<string, string>;
  setPageContent: (value: Record<string, string>) => void;
  mobileMenuStatus: boolean;
  setMobileMenuStatus: (value: boolean) => void;
  session: boolean;
}

export default function BaseWrapper({
  children,
  darkMode,
  language,
  pageContent,
}: BaseWrapperProps) {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
