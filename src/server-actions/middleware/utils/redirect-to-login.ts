import type { NextRequest } from "next/server";
import { nextRedirect } from "./next-redirect";
import { PUBLIC_PAGE } from "@/config/public-page.config";

export const redirectToLogin = (request: NextRequest) => {
  return nextRedirect(PUBLIC_PAGE.AUTH, request.url);
}