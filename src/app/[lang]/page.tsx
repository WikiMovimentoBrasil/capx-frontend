import { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import ApplicationWrapper from "@/components/ApplicationWrapper";

type Props = {
  params: { lang: string };
};

export const metadata: Metadata = {
  title: "CapX - Capacity Exchange",
  description: "Exchange your capacities with other users",
};

export default async function Home({ params: { lang } }: Props) {
  const dict = await getDictionary(lang);

  return <ApplicationWrapper pageContent={dict} initialLang={lang} />;
}

export async function generateStaticParams() {
  const locales = [
    "ar",
    "ce",
    "cy",
    "de",
    "diq",
    "en",
    "es",
    "fr",
    "gl",
    "he",
    "id",
    "ja",
    "kaa",
    "ko",
    "lb",
    "lt",
    "mk",
    "nl",
    "pms",
    "pt-br",
    "pt",
    "qqq",
    "ru",
    "sh-cyrl",
    "sh-latn",
    "sh-cyrl",
    "sh-latn",
    "sk",
    "skr-arab",
    "sl",
    "sq",
    "sv",
    "tr",
    "zh-hans",
    "zh-hant",
  ];
  return locales.map((locale) => ({ lang: locale }));
}
