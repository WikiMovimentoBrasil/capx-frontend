import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { loadLocale } from "@/lib/utils/loadLocal";
import CapacityListMainWrapper from "./components/CapacityListMainWrapper";

export default async function CapacityPage() {
  const cookieStore = cookies();
  const session = await getServerSession();
  const language = cookieStore.get("language")?.value ?? "en";

  if (!session) {
    redirect("/");
  }

  return (
    <CapacityListMainWrapper
      session={session !== null}
      language={language}
      darkMode={cookieStore.get("dark_mode") ?? "false"}
      pageContent={loadLocale(language)}
    />
  );
}
