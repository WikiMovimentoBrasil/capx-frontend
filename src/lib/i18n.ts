// lib/i18n.ts
import { cache } from "react";
import { cookies } from "next/headers";

export const getTranslations = cache(async () => {
  const cookieStore = cookies();
  const lang = cookieStore.get("language")?.value ?? "en";

  const translations = await import(`@/locales/${lang}.json`);
  return translations.default;
});
