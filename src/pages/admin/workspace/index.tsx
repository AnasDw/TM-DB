import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { Pages } from "../../../utils/routes";

const WorkspaceIndex = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(Pages.WORKSPACE());
  }, [router]);

  return <></>;
};

export default WorkspaceIndex;
