import { isEqual, isObject, isUndefined } from "lodash";

export const EMPTY_VALUE = "N/A";
export const isObjectEmpty = (obj: object) => Object.keys(obj).length === 0;
const QUERY_PARAM = "show-proto-sidebar";
const SPACE_REGEX = /\s+/g;

export const difference = (
  object: Record<string, unknown>,
  base: Record<string, unknown>,
  isRoot: boolean = true
) => {
  return Object.entries(object).reduce((result, [key, value]) => {
    let updatedResult = { ...result };
    if (!isEqual(value, base[key])) {
      const updatedValue =
        isObject(value) && isObject(base[key])
          ? difference(
              value as Record<string, unknown>,
              base[key] as Record<string, unknown>,
              false
            )
          : value;
      if (!isUndefined(updatedValue)) {
        if (isObject(updatedValue) || isRoot) {
          updatedResult[key] = updatedValue;
        } else {
          updatedResult = {
            ...object,
            ...updatedResult,
            [key]: updatedValue,
          };
        }
      }
    }
    return updatedResult;
  }, {} as Record<string, unknown>);
};

export const isValidUrl = (urlString: string) => {
  try {
    // eslint-disable-next-line no-new
    new URL(urlString);
    return true;
  } catch (_) {
    return false;
  }
};

const removeQueryParam = (url: string, param: string): string => {
  const urlObj = new URL(url);
  const params = urlObj.searchParams;

  params.forEach((_value, key) => {
    if (key === param) {
      params.delete(key);
    }
  });

  return urlObj.toString();
};

export const removeAllSpaces = (value: string): string => {
  return value.replace(SPACE_REGEX, "");
};

export const preProcessInput = (value: string): string => {
  let cleanedValue = removeQueryParam(value, QUERY_PARAM);
  cleanedValue = removeAllSpaces(cleanedValue);
  return cleanedValue;
};
