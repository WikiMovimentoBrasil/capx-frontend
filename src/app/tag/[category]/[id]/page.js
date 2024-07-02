import fs from 'fs';
import path from 'path';
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import TagProfileMainWrapper from "../../components/TagProfileMainWrapper";

export default async function TagPage() {
  const cookieStore = cookies();
  const session = await getServerSession();
  const darkMode = cookieStore.get("dark_mode") === undefined ? "false" : cookieStore.get("dark_mode");
  const language = cookieStore.get("language") === undefined ? "en" : cookieStore.get("language").value;

  // Loading page content based on selected language
  const filePath = path.join(process.cwd(), 'locales', `${language}.json`);
  const pageContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Tag ID
  const pathname = headers().get("x-pathname") || "";
  const selectedTagId = pathname.split("/").slice(-1)[0];

  if (session) {
    return (
      <TagProfileMainWrapper
        session={session !== null}
        language={language}
        darkMode={darkMode}
        pageContent={pageContent}
        selectedTagId={selectedTagId}
      />
    )
  } else {
    redirect('/');
  }
}