import { useQuery } from "react-query";
import { ParsedCriteriaFilter } from "../../project-creation/settings-tab/Recruitment/types";
import apiInstance from "../api";
import { Routes } from "./consts";

type CriteriaFilters = {
  results: ParsedCriteriaFilter[];
};

type CriteriaFiltersQueryPayload = {
  filters: ParsedCriteriaFilter[];
  isLoadingFilters: boolean;
};

export const useCriteriaFiltersQuery = (
  caseId: string
): CriteriaFiltersQueryPayload => {
  const { data: filters, isLoading: isLoadingFilters } = useQuery(
    Routes.MAIN.GET_RECRUITMENT_FILTERS,
    async () => {
      return (await apiInstance.get(Routes.MAIN.GET_RECRUITMENT_FILTERS))
        .data as CriteriaFilters;
    },
    {
      enabled: Boolean(caseId),
      refetchOnWindowFocus: false,
    }
  );

  return {
    filters: filters?.results || [],
    isLoadingFilters,
  };
};
