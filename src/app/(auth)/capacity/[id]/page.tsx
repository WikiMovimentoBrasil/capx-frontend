import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { loadLocale } from "@/lib/utils/loadLocal";
import CapacityProfileMainWrapper from "../components/CapacityProfileMainWrapper";

export default async function CapacityPage() {
  const cookieStore = cookies();
  const session = await getServerSession();
  const language = cookieStore.get("language")?.value ?? "en";

  if (!session) {
    redirect("/");
  }

  // Capacity ID
  const pathname = headers().get("x-pathname") || "";
  const selectedCapacityId = pathname.split("/").slice(-1)[0];

  return (
    <CapacityProfileMainWrapper
      session={session !== null}
      language={language}
      darkMode={cookieStore.get("dark_mode") ?? "false"}
      pageContent={loadLocale(language)}
      selectedCapacityId={selectedCapacityId}
    />
  );
}
