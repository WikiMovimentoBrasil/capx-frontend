import { Metadata } from "next";
import AuthenticatedHomeWrapper from "./components/AuthenticatedHomeWrapper";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";

export const metadata: Metadata = {
  title: "Home - CapX",
  description: "Capacity Exchange Platform",
};

export default async function AuthenticatedHomePage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }

  const dict = await getDictionary(lang);
  // @ts-ignore - Adicionando first_login do session
  const isFirstLogin = session?.user?.first_login || false;

  return (
    <AuthenticatedHomeWrapper pageContent={dict} isFirstLogin={isFirstLogin} />
  );
}
