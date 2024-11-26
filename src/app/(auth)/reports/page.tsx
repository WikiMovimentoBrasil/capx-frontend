import React from "react";
import { cookies } from "next/headers";
import ReportListMainWrapper from "./components/ReportListMainWrapper";
import { Metadata } from "next";
import { loadLocale } from "@/lib/utils/loadLocale";

export const metadata: Metadata = {
  title: "Reports - CapX",
  description: "List of all reports in the Capacity Exchange platform",
};

export default async function ReportPage() {
  const cookieStore = cookies();
  const darkMode = cookieStore.get("dark_mode")?.value ?? "false";
  const language = cookieStore.get("language")?.value ?? "en";

  // Loading page content based on selected language
  const pageContent = loadLocale(language);
  return (
    <ReportListMainWrapper
      session={true}
      language={language}
      darkMode={darkMode}
      pageContent={pageContent}
    />
  );
}
