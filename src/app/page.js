import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import ApplicationWrapper from "@/components/ApplicationWrapper";

export default async function Home() {
  const cookieStore = cookies();
  const session = await getServerSession();
  const darkMode = cookieStore.get("dark_mode") === undefined ? "false" : cookieStore.get("dark_mode");

  if (session) {
    redirect('/profile');
  } else {
    return (
      <ApplicationWrapper session={session !== null} darkMode={darkMode} />
    )
  }
}
