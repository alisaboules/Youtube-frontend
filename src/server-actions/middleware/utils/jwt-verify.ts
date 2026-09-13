'use server'

import { jwtVerify } from 'jose';

interface ITokenInside {
  id: string;
  iat: number;
  exp: number;
}

export async function jwtVerifyServer(accessToken: string) {
  try {
    const { payload }: { payload: ITokenInside } = await jwtVerify(
      accessToken,
      new TextEncoder().encode(`${process.env.JWT_SECRET}`)
    )
    return payload;
  } catch (error) {
    if (error instanceof Error) {
      console.log('JWT verify error:', error.message)
    }

    return null
  }
}