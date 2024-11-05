import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
export default async function ReportsPage() {
  const session = await getServerSession();
  if (!session) redirect("/");

  const cookieStore = cookies();
  const darkMode = cookieStore.get("dark_mode")?.value === "true";
  const language = cookieStore.get("language")?.value || "en";

  const getReports = getReportsUseCase(reportRepository);
  const reports = await getReports(session.accessToken);

  return (
    <ReportListMainWrapper
      session={!!session}
      language={language}
      darkMode={darkMode}
      reports={reports}
    />
  );
}
