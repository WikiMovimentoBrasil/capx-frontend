import { cookies } from "next/headers";
import { getServerSession } from "next-auth/next";

export default async function ProfilePage() {
  const cookieStore = cookies();
  const session = await getServerSession();
}