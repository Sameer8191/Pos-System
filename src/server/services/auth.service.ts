import "server-only";

import { verifyPassword } from "../auth/password";
import AppError from "../utils/error";
import { createSession, deleteSession, getSession } from "../auth/session";
import {
  findUserByEmail,
  findUserById,
  incrementFailedLoginAttempts,
  updateLastLogin,
} from "../repositories/user.repo";
import type { JWTPayload } from "../auth/jwt";

export type LoginInput = {
  email: string;
  password: string;
};

export const loginUser = async (data: LoginInput) => {
  const email = data.email.trim().toLowerCase();

  const user = await findUserByEmail(email);

  if (!user || !user.isActive) {
    throw new AppError("Invalid email or password", 401);
  }

  if (user.lockedUntil && user.lockedUntil > new Date()) {
    throw new AppError("Account temporarily locked", 423);
  }

  let isPasswordValid = false;

  try {
    isPasswordValid = await verifyPassword(data.password, user.passwordHash);
  } catch {
    throw new AppError("Invalid email or password", 401);
  }

  if (!isPasswordValid) {
    await incrementFailedLoginAttempts(user.id);
    throw new AppError("Invalid email or password", 401);
  }

  await updateLastLogin(user.id);

  const payload: JWTPayload = {
    userId: user.id,
    organizationId: user.tenantId,
    role: user.role,
  };

  await createSession(payload);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    tenantId: user.tenantId,
  };
};

export const logoutUser = async (): Promise<void> => {
  await deleteSession();
};

export const getCurrentUser = async () => {
  const session = await getSession();

  if (!session) {
    throw new AppError("Authentication required", 401);
  }

  const user = await findUserById(session.userId);

  if (!user || !user.isActive || user.tenantId !== session.organizationId) {
    await deleteSession();
    throw new AppError("Authentication required", 401);
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    tenantId: user.tenantId,
  };
};
