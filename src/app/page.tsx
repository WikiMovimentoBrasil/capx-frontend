import fs from "fs";
import path from "path";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import ApplicationWrapper from "@/components/ApplicationWrapper";

export const metadata: Metadata = {
  title: "CapX - Capacity Exchange",
  description: "Exchange your capacities with other users",
};

export default async function Home() {
  const cookieStore = cookies();
  const session = await getServerSession();
  const language = cookieStore.get("language")?.value ?? "en";

  // Loading page content based on selected language
  const filePath = path.join(process.cwd(), "locales", `${language}.json`);
  const pageContent: Record<string, any> = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  );

  return (
    <ApplicationWrapper
      session={session !== null}
      language={language}
      pageContent={pageContent}
    />
  );
}
