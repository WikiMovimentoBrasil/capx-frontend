import React from "react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { loadLocale } from "@/lib/utils/loadLocale";
import CapacityProfileMainWrapper from "../components/CapacityProfileMainWrapper";

interface CapacityPageProps {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: "Capacity Details - CapX",
  description: "View capacity details in the Capacity Exchange platform",
};

export default async function CapacityPage({ params }: CapacityPageProps) {
  const cookieStore = cookies();
  const darkMode = cookieStore.get("dark_mode")?.value ?? "false";
  const language = cookieStore.get("language")?.value ?? "en";

  // Loading page content based on selected language
  const pageContent = loadLocale(language);

  // Capacity ID
  const selectedCapacityId = params.id;

  return (
    <CapacityProfileMainWrapper
      session={true}
      language={language}
      darkMode={darkMode}
      pageContent={pageContent}
      selectedCapacityId={selectedCapacityId}
    />
  );
}
