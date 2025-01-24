// components/navigation/NavigationWrapper.tsx
import { getServerSession } from "next-auth";
import { getDictionary } from "@/lib/dictionaries";
import { cookies } from "next/headers";
import ClientNavigation from "./ClientNavigation";

export default async function NavigationWrapper({ lang }: { lang: string }) {
  const session = await getServerSession();
  const dict = await getDictionary(lang);
  const cookieStore = cookies();
  const language = cookieStore.get("language")?.value ?? "en";

  return (
    <ClientNavigation
      initialSession={session}
      pageContent={dict}
      initialLang={language}
    />
  );
}
