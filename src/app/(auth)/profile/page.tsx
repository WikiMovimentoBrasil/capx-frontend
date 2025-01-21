import { cookies } from "next/headers";
import { loadLocale } from "@/lib/utils/loadLocale";
import ProfileContent from "./components/ProfileContent";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }

  const cookieStore = cookies();
  const language = cookieStore.get("language")?.value ?? "en";

  const pageContent = loadLocale(language);

  return <ProfileContent pageContent={pageContent} />;
}
