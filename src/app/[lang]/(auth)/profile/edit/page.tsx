import { getServerSession } from "next-auth";
import { getDictionary } from "@/lib/dictionaries";
import { authOptions } from "@/lib/auth";
import { Metadata } from "next";
import EditProfileContent from "./components/EditProfileContent";

export const metadata: Metadata = {
  title: "Edit Profile - CapX",
  description: "Edit your profile",
};

export default async function EditProfilePage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const session = await getServerSession(authOptions);
  const dict = await getDictionary(lang);

  return <EditProfileContent pageContent={dict} initialSession={session} />;
}
