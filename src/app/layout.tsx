import { cookies } from "next/headers";
import { getServerSession } from "next-auth/next";
import { BaseLayout } from "@/components/BaseLayout";
import { loadLocale } from "@/lib/utils/loadLocal";
import { redirect } from "next/navigation";

export async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const session = await getServerSession();
  const language = cookieStore.get("language")?.value ?? "en";

  const initialSettings = {
    darkMode: cookieStore.get("dark_mode")?.value ?? "false",
    language,
    pageContent: loadLocale(language),
    session: session !== null,
  };

  return (
    <html lang={language}>
      <body>
        <BaseLayout initialSettings={initialSettings}>{children}</BaseLayout>
      </body>
    </html>
  );
}

export async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  const cookieStore = cookies();

  if (!session) {
    redirect("/");
  }

  const initialSettings = {
    darkMode: cookieStore.get("dark_mode")?.value ?? "false",
    language: cookieStore.get("language")?.value ?? "en",
    session: true,
  };

  return <div className="auth-layout">{children}</div>;
}
