import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { cookies } from "next/headers";
import React from "react";
import { loadLocale } from "@/lib/utils/loadLocale";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  const cookieStore = cookies();
  const darkMode = cookieStore.get("dark_mode")?.value ?? "false";
  const language = cookieStore.get("language")?.value ?? "en";
  const pageContent = loadLocale(language);

  // Inject common props into all child pages
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        session: true,
        language,
        darkMode,
        pageContent,
      } as any);
    }
    return child;
  });

  return <>{childrenWithProps}</>;
}
