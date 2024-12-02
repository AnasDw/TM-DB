import { useState } from "react";
import { useQuery } from "react-query";
import { CaseLeanDTO } from "../admin/case";
import { CasesTableFilterBy } from "../tab/enum";
import apiInstance from "../utils/api";
import { Routes } from "../utils/routes";

const useFilteredCases = () => {
  const [filterBy, setFilterBy] = useState(CasesTableFilterBy.All);

  const { data: filteredCases, isLoading: isLoadingFilteredCases } = useQuery(
    `getCases/${filterBy}`,
    async () => {
      const response: { data: CaseLeanDTO[] } = await apiInstance.get(
        Routes.MAIN.GET_CASES(),
        {
          params: {
            should_show: filterBy,
          },
        }
      );
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  return { filteredCases, isLoadingFilteredCases, filterBy, setFilterBy };
};

export default useFilteredCases;
