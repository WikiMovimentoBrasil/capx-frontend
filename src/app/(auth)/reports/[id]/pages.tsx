import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { loadLocale } from "@/lib/utils/loadLocal";
import ReportViewMainWrapper from "../components/ReportViewMainWrapper";

export default async function ReportPage() {
  const cookieStore = cookies();
  const session = await getServerSession();
  const language = cookieStore.get("language")?.value ?? "en";

  if (!session) {
    redirect("/");
  }

  const pathname = headers().get("x-pathname") || "";
  const reportId = pathname.split("/").slice(-1)[0];

  return (
    <ReportViewMainWrapper
      session={session !== null}
      language={language}
      darkMode={cookieStore.get("dark_mode")?.value ?? "false"}
      pageContent={loadLocale(language)}
      reportId={reportId}
    />
  );
}
