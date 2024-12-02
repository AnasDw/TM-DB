import { NextRequest } from "next/server";
import { blockMobileAccessMiddleware } from "./middlewares/mobileAccess";

export const middleware = (request: NextRequest) => {
  return blockMobileAccessMiddleware(request);
};

export const config = {
  matcher: ["/admin/:path*"],
};
