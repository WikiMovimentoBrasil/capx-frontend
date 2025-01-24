import "server-only";

const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  ar: () => import("../dictionaries/ar.json").then((module) => module.default),
  ce: () => import("../dictionaries/ce.json").then((module) => module.default),
  cy: () => import("../dictionaries/cy.json").then((module) => module.default),
  de: () => import("../dictionaries/de.json").then((module) => module.default),
  diq: () =>
    import("../dictionaries/diq.json").then((module) => module.default),
  es: () => import("../dictionaries/es.json").then((module) => module.default),
  fr: () => import("../dictionaries/fr.json").then((module) => module.default),
  gl: () => import("../dictionaries/gl.json").then((module) => module.default),
  he: () => import("../dictionaries/he.json").then((module) => module.default),
  id: () => import("../dictionaries/id.json").then((module) => module.default),
  ja: () => import("../dictionaries/ja.json").then((module) => module.default),
  kaa: () =>
    import("../dictionaries/kaa.json").then((module) => module.default),
  ko: () => import("../dictionaries/ko.json").then((module) => module.default),
  lb: () => import("../dictionaries/lb.json").then((module) => module.default),
  lt: () => import("../dictionaries/lt.json").then((module) => module.default),
  mk: () => import("../dictionaries/mk.json").then((module) => module.default),
  nl: () => import("../dictionaries/nl.json").then((module) => module.default),
  pms: () =>
    import("../dictionaries/pms.json").then((module) => module.default),
  pt: () => import("../dictionaries/pt.json").then((module) => module.default),
  "pt-br": () =>
    import("../dictionaries/pt-br.json").then((module) => module.default),
  qqq: () =>
    import("../dictionaries/qqq.json").then((module) => module.default),
  ru: () => import("../dictionaries/ru.json").then((module) => module.default),
  "sh-cyrl": () =>
    import("../dictionaries/sh-cyrl.json").then((module) => module.default),
  "sh-latn": () =>
    import("../dictionaries/sh-latn.json").then((module) => module.default),
  sk: () => import("../dictionaries/sk.json").then((module) => module.default),
  "skr-arab": () =>
    import("../dictionaries/skr-arab.json").then((module) => module.default),
  sl: () => import("../dictionaries/sl.json").then((module) => module.default),
  sq: () => import("../dictionaries/sq.json").then((module) => module.default),
  sv: () => import("../dictionaries/sv.json").then((module) => module.default),
  tr: () => import("../dictionaries/tr.json").then((module) => module.default),
  "zh-hans": () =>
    import("../dictionaries/zh-hans.json").then((module) => module.default),
  "zh-hant": () =>
    import("../dictionaries/zh-hant.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  try {
    // @ts-ignore - Ignorando erro de tipo para o locale
    const dictionary = await dictionaries[locale]();

    return dictionary;
  } catch (error) {
    return await dictionaries["en"]();
  }
};
