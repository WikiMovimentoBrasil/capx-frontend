import fs from "fs";
import path from "path";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import ReportMainWrapper from "@/app/[lang]/(auth)/reports/components/ReportMainWrapper";

export default async function ReportPage() {
  const cookieStore = cookies();
  const session = await getServerSession();
  const darkMode =
    cookieStore.get("dark_mode") === undefined
      ? "false"
      : cookieStore.get("dark_mode");
  const language =
    cookieStore.get("language") === undefined
      ? "en"
      : cookieStore.get("language").value;

  // Loading page content based on selected language
  const filePath = path.join(process.cwd(), "locales", `${language}.json`);
  const pageContent = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // Report ID
  const pathname = headers().get("x-pathname") || "";
  const reportId = pathname.split("/").slice(-2)[0];

  if (session) {
    return (
      <ReportMainWrapper
        session={session !== null}
        language={language}
        pageContent={pageContent}
        darkMode={darkMode}
        reportId={reportId}
      />
    );
  } else {
    redirect("/");
  }
}
