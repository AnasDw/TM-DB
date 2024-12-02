import { uniq } from "lodash";
import { LanguageIso639Set1, VALID_LANGUAGES } from "./enums/language";

export function getUserLocaleLanguages(): LanguageIso639Set1[] {
  const userLocales = [];

  if (navigator.language) {
    userLocales.push(navigator.language);
  }

  if (navigator.languages) {
    userLocales.push(...navigator.languages);
  }

  const localeLanguageCodes = uniq(
    userLocales.map(
      (locale) => locale.substring(0, 2).toLowerCase() as LanguageIso639Set1
    )
  );

  return localeLanguageCodes.filter((localeLanguage) =>
    VALID_LANGUAGES.has(localeLanguage)
  );
}
