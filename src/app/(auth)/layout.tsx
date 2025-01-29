import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import BaseWrapper from "@/components/BaseWrapper";
import { authOptions } from "@/lib/auth";
import axiosInstance from "@/services/axiosInstance";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return <BaseWrapper>{children}</BaseWrapper>;
}
