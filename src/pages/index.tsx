import { useEffect } from "react";
import { useRouter } from "next/router";
import { Pages } from "../utils/routers/consts";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(Pages.ADMIN_PAGE);
  }, []);

  return <></>;
};

export default Index;
