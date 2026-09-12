import { NextRequest, NextResponse } from "next/server";
import { redirectToLogin } from "./utils/redirect-to-login";
import { getTokensFromRequest } from "./utils/get-tokens-from-request";
import { jwtVerifyServer } from "./utils/jwt-verify";

export async function protectStudio(request: NextRequest) {
  const tokens = await getTokensFromRequest(request);
  if (!tokens) return redirectToLogin(request);

  const verifiedData = await jwtVerifyServer(tokens.accessToken);
  if (!verifiedData) return redirectToLogin(request);

  return NextResponse.next();
}