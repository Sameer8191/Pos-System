import "server-only";

import { type NextRequest, NextResponse } from "next/server";

import { requireAuth } from "../auth/guard";
import type { JWTPayload } from "../auth/jwt";

export type AuthenticationHandler = (
  request: NextRequest,
  user: JWTPayload,
) => Promise<NextResponse>;

export const withAuth = (auth: AuthenticationHandler) => {
  return async (request: NextRequest): Promise<NextResponse> => {
    const user = await requireAuth();

    return auth(request, user);
  };
};
