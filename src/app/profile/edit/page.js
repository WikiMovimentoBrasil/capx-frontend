import { cookies } from "next/headers";
import { getServerSession } from "next-auth/next";

export default async function ProfilePage() {
  const cookieStore = cookies();
  const session = await getServerSession();
  const darkMode = cookieStore.get("dark_mode") === undefined ? "false" : cookieStore.get("dark_mode");
}