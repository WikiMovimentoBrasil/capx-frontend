import React from "react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { loadLocale } from "@/lib/utils/loadLocale";
import CapacityListMainWrapper from "./components/CapacityListMainWrapper";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Capacities - CapX",
  description: "List of all capacities in the Capacity Exchange platform",
};

export default async function CapacitiesPage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }

  const cookieStore = cookies();
  const darkMode = cookieStore.get("dark_mode")?.value ?? "false";
  const language = cookieStore.get("language")?.value ?? "en";
  const pageContent = loadLocale(language);

  return (
    <CapacityListMainWrapper
      session={true}
      language={language}
      darkMode={{ value: darkMode }}
      pageContent={pageContent}
    />
  );
}
