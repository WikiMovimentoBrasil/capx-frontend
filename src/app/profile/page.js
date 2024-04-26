import { cookies } from "next/headers";
import { getServerSession } from "next-auth/next";
import MainWrapper from "./components/MainWrapper";

export default async function ProfilePage() {
  const cookieStore = cookies();
  const session = await getServerSession();
  const darkMode = cookieStore.get("dark_mode");

  return (
    <MainWrapper session={session !== null} darkMode={darkMode} />
  )
}