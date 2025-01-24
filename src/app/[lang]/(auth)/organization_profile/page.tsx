// app/[lang]/(auth)/organization_profile/page.tsx
import { getServerSession } from "next-auth";
import { getDictionary } from "@/lib/dictionaries";
import { authOptions } from "@/lib/auth";
import { Metadata } from "next";
import OrganizationProfileContent from "./components/OrganizationProfileContent";

export const metadata: Metadata = {
  title: "Organization Profile - CapX",
  description: "Organization Profile",
};

export default async function OrganizationProfilePage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const session = await getServerSession(authOptions);
  const dict = await getDictionary(lang);

  return (
    <OrganizationProfileContent pageContent={dict} initialSession={session} />
  );
}
