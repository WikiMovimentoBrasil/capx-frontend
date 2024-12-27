import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import BaseWrapper from "@/components/BaseWrapper";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return <BaseWrapper>{children}</BaseWrapper>;
}
