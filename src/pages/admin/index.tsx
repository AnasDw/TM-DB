import { useEffect } from "react";

import { useRouter } from "next/router";

import { withCustomAuthenticationRequired } from "../../authentication/WithCustomAuthenticationRequired";
import { AdminSideNavigationLayout } from "../../layout/admin-layout/AdminSideNavigationLayout";

const AdminIndex = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/workspace");
  }, [router]);

  return <AdminSideNavigationLayout></AdminSideNavigationLayout>;
};

export default withCustomAuthenticationRequired(AdminIndex);
