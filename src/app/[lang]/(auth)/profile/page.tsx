import { getServerSession } from "next-auth";
import { getDictionary } from "@/lib/dictionaries";
import ProfileContent from "./components/ProfileContent";
import { Metadata } from "next";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Profile - CapX",
  description: "User Profile",
};

export default async function ProfilePage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const session = await getServerSession(authOptions);
  const dict = await getDictionary(lang);

  return <ProfileContent pageContent={dict} initialSession={session} />;
}
