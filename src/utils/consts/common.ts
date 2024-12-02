import { LanguageIso639Set1 } from "../enums/language";

export const HTTP_STATUS_CODE = {
  UNAUTHORIZED: 403,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
  OK: 200,
  NO_CONTENT: 204,
};

export const LANGUAGE_CODE_TO_AZURE_STT_LANGUAGE: Record<
  LanguageIso639Set1,
  string
> = {
  [LanguageIso639Set1.en]: "en-US",
  [LanguageIso639Set1.fr]: "fr-FR",
  [LanguageIso639Set1.de]: "de-DE",
  [LanguageIso639Set1.es]: "es-ES",
  [LanguageIso639Set1.it]: "it-IT",
  [LanguageIso639Set1.ar]: "ar-AE",
  [LanguageIso639Set1.ru]: "ru-RU",
};
