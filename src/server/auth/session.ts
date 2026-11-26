import "server-only";

import { cookies } from "next/headers";
import { generateToken, verifyToken } from "./jwt";
import type { JWTPayload } from "./jwt";

const SESSION_COOKIE_NAME = "session";

const SESSION_MAX_AGE = 7 * 24 * 60 * 60;

export const createSession = async (payload: JWTPayload): Promise<void> => {
  const token = await generateToken(payload);

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
};

export const getSession = async (): Promise<JWTPayload | null> => {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);

  if (!session?.value) {
    return null;
  }

  try {
    const payload = await verifyToken(session.value);
    return payload;
  } catch {
    return null;
  }
};

export const deleteSession = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
};
