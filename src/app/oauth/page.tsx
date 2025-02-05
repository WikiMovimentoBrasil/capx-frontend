import { cookies } from "next/headers";
import { loadLocale } from "@/lib/utils/loadLocale";
import OAuthContent from "./components/OAuthContent";

export default async function OAuth() {
  const cookieStore = cookies();
  const lang = cookieStore.get("language")?.value ?? "en";
  const pageContent = loadLocale(lang);

  return <OAuthContent pageContent={pageContent} />;
}