import { cookies } from "next/headers";
import { getServerSession } from "next-auth/next";
import ApplicationWrapper from "@/components/ApplicationWrapper";

export default async function Home() {
  const cookieStore = cookies();
  const session = await getServerSession();
  const darkMode = cookieStore.get("dark_mode");

  return (
    <ApplicationWrapper session={session !== null} darkMode={darkMode}></ApplicationWrapper>
  );
}
