const buildQueryParam = (key: string, value?: string): string => {
  return value ? `${key}=${value}` : "";
};

export const getBuiltLinkUrl = (
  caseId: string,
  userIdIdentifier?: string,
  isDraft: boolean = false
): string => {
  const baseUrl = `${window.location.origin}/meet/${caseId}`;

  const queryParams = [];
  if (userIdIdentifier) {
    queryParams.push(
      buildQueryParam(userIdIdentifier, `[${userIdIdentifier}]`)
    );
  }

  if (isDraft) {
    queryParams.push(buildQueryParam("isDraft", "1"));
  }

  const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";
  return baseUrl + queryString;
};
