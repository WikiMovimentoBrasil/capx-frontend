import { getServerSession } from "next-auth";
import { getDictionary } from "@/lib/dictionaries";
import { authOptions } from "@/lib/auth";
import { Metadata } from "next";
import EditOrganizationContent from "./components/EditOrganizationContent";

export const metadata: Metadata = {
  title: "Edit Organization - CapX",
  description: "Edit Organization Profile",
};

export default async function EditOrganizationPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const session = await getServerSession(authOptions);
  const dict = await getDictionary(lang);

  return (
    <EditOrganizationContent pageContent={dict} initialSession={session} />
  );
}
