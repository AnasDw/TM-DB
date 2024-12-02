import { useQuery } from "react-query";
import { meetingServiceInstance } from "../utils/api";
import { Routes } from "../utils/routes";

export default function useInterviewWarmUp(caseId: string) {
  return useQuery<void, unknown, void, string>(
    Routes.MAIN.POST_WARM_UP_INTERVIEW(caseId),
    async ({ queryKey }) => {
      await meetingServiceInstance.post(queryKey[0]);
    },
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
}
