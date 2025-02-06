import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ProfileContent from "./components/ProfileContent";
import { Session } from "next-auth";

export default async function ProfilePage() {
  const session = (await getServerSession(authOptions)) as Session;

  return <ProfileContent session={session} />;
}
