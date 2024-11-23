import React from "react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { loadLocale } from "@/lib/utils/loadLocale";
import CapacityProfileMainWrapper from "../components/CapacityProfileMainWrapper";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

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
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }

  const cookieStore = cookies();
  const darkMode = cookieStore.get("dark_mode")?.value ?? "false";
  const language = cookieStore.get("language")?.value ?? "en";
  const pageContent = loadLocale(language);

  return (
    <CapacityProfileMainWrapper
      session={true}
      language={language}
      darkMode={{ value: darkMode }}
      pageContent={pageContent}
      selectedCapacityId={params.id}
    />
  );
}
