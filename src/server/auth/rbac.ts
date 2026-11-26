import type { Models } from "../prisma/contract.d"; // Adjust path to your contract.d.ts

export type Role = NonNullable<Models.public_User["role"]>;

export const PERMISSIONS = [
  "users:manage",
  "products:manage",
  "inventory:manage",
  "sales:create",
  "sales:read",
  "reports:read",
  "settings:manage",
] as const;

export type Permission = (typeof PERMISSIONS)[number];

export const ROLE_PERMISSIONS: Record<Role, readonly Permission[]> = {
  ADMIN: PERMISSIONS,
  MANAGER: [
    "products:manage",
    "inventory:manage",
    "sales:create",
    "sales:read",
    "reports:read",
  ],
  CASHIER: ["sales:create", "sales:read"],
};

export const VALID_ROLES = Object.keys(ROLE_PERMISSIONS) as readonly Role[];

export const hasPermission = (role: Role, permission: Permission): boolean => {
  return ROLE_PERMISSIONS[role].includes(permission);
};

export const hasAnyPermission = (
  role: Role,
  permissions: readonly Permission[],
): boolean => {
  return permissions.some((permission) => hasPermission(role, permission));
};