export enum LanguageIso639Set1 {
  en = "en",
  fr = "fr",
  de = "de",
  es = "es",
  it = "it",
  ar = "ar",
  ru = "ru",
}

export const VALID_LANGUAGES = new Set(Object.values(LanguageIso639Set1));

export const LANGUAGE_TO_NATIVE_NAME: Record<LanguageIso639Set1, string> = {
  [LanguageIso639Set1.en]: "English",
  [LanguageIso639Set1.fr]: "Français",
  [LanguageIso639Set1.de]: "Deutsch",
  [LanguageIso639Set1.es]: "Español",
  [LanguageIso639Set1.it]: "Italiano",
  [LanguageIso639Set1.ar]: "اَلْعَرَبِيَّةُ",
  [LanguageIso639Set1.ru]: "Русский",
};
