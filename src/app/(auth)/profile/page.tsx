import { cookies } from "next/headers";
import UserProfileMainWrapper from "./components/UserProfileMainWrapper";
import { Metadata } from "next";
import { loadLocale } from "@/lib/utils/loadLocale";

export const metadata: Metadata = {
  title: "Profile - CapX",
  description: "User profile page",
};

export default async function ProfilePage() {
  const cookieStore = cookies();
  const darkMode = cookieStore.get("dark_mode")?.value ?? "false";
  const language = cookieStore.get("language")?.value ?? "en";

  // Loading page content based on selected language
  const pageContent = loadLocale(language);

  return (
    <UserProfileMainWrapper
      session={true}
      language={language}
      darkMode={{ value: darkMode }}
      pageContent={pageContent}
      userId={undefined}
    />
  );
}
