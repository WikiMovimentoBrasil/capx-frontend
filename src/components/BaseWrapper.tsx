"use client";
import { useApp } from "@/contexts/AppContext";
import { useSession } from "next-auth/react";
import ResponsiveNavbar from "./ResponsiveNavbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";

interface BaseWrapperProps {
  children: React.ReactNode;
}

export default function BaseWrapper({ children }: BaseWrapperProps) {
  const { data: session } = useSession();
  const { darkMode, pageContent, setSession } = useApp();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSession(session);
  }, [session, setSession]);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`flex min-h-screen flex-col ${
        darkMode ? "bg-capx-dark-bg" : "bg-capx-light-bg"
      }`}
    >
      <ResponsiveNavbar />
      <main className="flex-grow pt-16">{children}</main>
      <Footer darkMode={darkMode} pageContent={pageContent} />
    </div>
  );
}
