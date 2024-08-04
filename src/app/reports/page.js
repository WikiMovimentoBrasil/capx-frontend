import fs from 'fs';
import path from 'path';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import ReportListMainWrapper from "@/app/reports/components/ReportListMainWrapper";

export default async function ReportPage() {
  const cookieStore = cookies();
  const session = await getServerSession();
  const darkMode = cookieStore.get("dark_mode") === undefined ? "false" : cookieStore.get("dark_mode");
  const language = cookieStore.get("language") === undefined ? "en" : cookieStore.get("language").value;

  // Loading page content based on selected language
  const filePath = path.join(process.cwd(), 'locales', `${language}.json`);
  const pageContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (session) {
    return (
      <ReportListMainWrapper
        session={session !== null}
        language={language}
        darkMode={darkMode}
        pageContent={pageContent}
      />
    )
  } else {
    redirect('/');
  }
}