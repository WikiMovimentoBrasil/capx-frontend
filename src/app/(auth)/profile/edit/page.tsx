import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import EditProfileContent from "./components/EditProfileContent";
import { Session } from "next-auth";

export default async function EditProfilePage() {
  const session = (await getServerSession(authOptions)) as Session;

  return <EditProfileContent session={session} />;
}
