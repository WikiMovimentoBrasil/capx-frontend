import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { getPageContent } from "@/lib/utils/content";
import { BaseLayout } from "@/components/BaseLayout";
import Section01 from "@/components/Section01";
import Section02 from "@/components/Section02";
import Section03 from "@/components/Section03";

export default async function Home() {
  const cookieStore = cookies();
  const session = await getServerSession();

  const darkMode = cookieStore.get("dark_mode")?.value ?? "false";
  const language = cookieStore.get("language")?.value ?? "en";

  const pageContent = await getPageContent(language);

  const initialSettings = {
    darkMode,
    language,
    pageContent,
    session: session !== null,
  };

  return (
    <BaseLayout initialSettings={initialSettings}>
      <Section01 pageContent={pageContent} />
      <Section02 darkMode={darkMode === "true"} />
      <Section03 darkMode={darkMode === "true"} pageContent={pageContent} />
    </BaseLayout>
  );
}
