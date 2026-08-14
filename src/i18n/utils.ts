import { languages, defaultLang, ui } from "./ui";

type Lang = keyof typeof languages;

export function getLang(locale: string | undefined): Lang {
  if (locale && locale in languages) return locale as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}
