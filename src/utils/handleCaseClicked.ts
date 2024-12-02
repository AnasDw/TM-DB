import router from "next/router";

import { CaseStatus } from "./CaseStatus";
import { Pages } from "./routes";

export const handleCaseClicked = async (
  caseId: string,
  status: CaseStatus = CaseStatus.ACTIVE
) => {
  if (status === CaseStatus.DRAFT) {
    router.push(Pages.PROJECT_CREATION(caseId));
  } else {
    router.push(`/admin/case/${caseId}/overview`);
  }
};
