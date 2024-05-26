import fs from 'fs';
import path from 'path';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import ApplicationWrapper from "@/components/ApplicationWrapper";

export default async function Home() {
  const cookieStore = cookies();
  const session = await getServerSession();
  const darkMode = cookieStore.get("dark_mode") === undefined ? "false" : cookieStore.get("dark_mode");
  const language = cookieStore.get("language") === undefined ? "en-us" : cookieStore.get("language").value;

  // Loading page content based on selected language
  const filePath = path.join(process.cwd(), 'locales', `${language}.json`);
  const pageContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (session) {
    redirect('/profile');
  } else {
    return (
      <ApplicationWrapper session={session !== null} language={language} pageContent={pageContent} darkMode={darkMode} />
    )
  }
}
