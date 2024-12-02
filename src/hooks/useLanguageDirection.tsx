import { useMemo } from "react";
import { CssDirection } from "../types/css";
import {
  LANGUAGE_TO_NATIVE_NAME,
  LanguageIso639Set1,
} from "../utils/enums/language";
import { getTextDirection } from "../utils/text";

export default function useLanugageDirection(
  language: LanguageIso639Set1
): CssDirection {
  const languageNativeName = LANGUAGE_TO_NATIVE_NAME[language];

  return useMemo(
    () => getTextDirection(languageNativeName),
    [languageNativeName]
  );
}
