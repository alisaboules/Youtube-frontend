import { EnumTokens } from "@/constants/auth.constants";
import { authService } from "@/services/auth.services";
import { AxiosError } from "axios";
import type { NextRequest } from "next/server";


export async function getTokensFromRequest(request: NextRequest) {
  const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value;
  let accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value;

  if (!refreshToken) {
    request.cookies.delete(EnumTokens.ACCESS_TOKEN);
    return null;
  }

  if (!accessToken) {
    try {
      const data = await authService.getNewTokensByRefresh(refreshToken);
      accessToken = data.accessToken;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.message == 'invalid token') {
          console.log('Невалидный токен');
          request.cookies.delete(EnumTokens.ACCESS_TOKEN);
          return null;
        }
      }
      return null;
    }
  }
  return { accessToken, refreshToken };
}