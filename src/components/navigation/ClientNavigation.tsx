// components/navigation/ClientNavigation.tsx
"use client";

import { useApp } from "@/providers/AppProvider";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { useSession } from "next-auth/react";

interface ClientNavigationProps {
  initialSession: any;
  pageContent: any;
  initialLang: string;
}

export default function ClientNavigation({
  initialSession,
  pageContent,
  initialLang,
}: ClientNavigationProps) {
  const { data: session } = useSession();
  const { isMobile } = useApp();

  return isMobile ? (
    <MobileNavbar
      session={session || initialSession}
      pageContent={pageContent}
      currentLanguage={initialLang}
    />
  ) : (
    <DesktopNavbar
      session={session || initialSession}
      pageContent={pageContent}
      currentLanguage={initialLang}
    />
  );
}
