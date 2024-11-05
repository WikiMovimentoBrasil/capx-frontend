import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { loadLocale } from "@/lib/utils/loadLocal";
import UserProfileMainWrapper from "../components/UserProfileMainWrapper";

export default async function ProfilePage() {
  const cookieStore = cookies();
  const session = await getServerSession();
  const language = cookieStore.get("language")?.value ?? "en";

  if (!session) {
    redirect("/");
  }

  // User ID
  const pathname = headers().get("x-pathname") || "";
  const userId = pathname.split("/").slice(-1)[0];

  return (
    <UserProfileMainWrapper
      session={session !== null}
      language={language}
      darkMode={cookieStore.get("dark_mode")?.value ?? "false"}
      pageContent={loadLocale(language)}
      userId={userId}
    />
  );
}
