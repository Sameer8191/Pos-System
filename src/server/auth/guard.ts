import "server-only";

import { getSession } from "./session";
import { hasPermission, hasAnyPermission } from "./rbac";
import type { Permission, Role } from "./rbac";
import AppError from "../utils/error";
import type { JWTPayload } from "./jwt";

export const requireAuth = async (): Promise<JWTPayload> => {
  const session = await getSession();
  if (!session) {
    throw new AppError("Authentication required", 401);
  }
  return session;
};

export const requireRole = async (
  allowedRoles: readonly Role[],
): Promise<JWTPayload> => {
  const session = await requireAuth();

  if (!allowedRoles.includes(session.role)) {
    throw new AppError("Insufficient permissions", 403);
  }

  return session;
};

export const requirePermission = async (
  permission: Permission,
): Promise<JWTPayload> => {
  const session = await requireAuth();

  if (!hasPermission(session.role, permission)) {
    throw new AppError("Insufficient permissions", 403);
  }

  return session;
};

export const requireAnyPermission = async (
  permissions: readonly Permission[],
): Promise<JWTPayload> => {
  const session = await requireAuth();

  if (!hasAnyPermission(session.role, permissions)) {
    throw new AppError("Insufficient permissions", 403);
  }

  return session;
};
