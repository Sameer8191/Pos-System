import "server-only";

import { db } from "../prisma/db";

const MAX_FAILED_LOGIN_ATTEMPTS = 5;
const LOCK_DURATION_MINUTES = 15;

export const findUserById = async (id: string) => {
  return db.orm.public.User.whereUnique({ id }).first();
};

export const findUserByEmail = async (email: string) => {
  return db.orm.public.User.whereUnique({ email }).first();
};

export const createUser = async (data: {
  name: string;
  email: string;
  passwordHash: string;
  tenantId: string;
  role?: "ADMIN" | "MANAGER" | "CASHIER";
}) => {
  return db.orm.public.User.create({
    ...data,
    isActive: true,
    failedLoginAttempts: 0,
  });
};

export const updateUser = async (
  id: string,
  data: {
    name?: string;
    email?: string;
    isActive?: boolean;
    emailVerifiedAt?: Date | null;
    passwordHash?: string;
    role?: "ADMIN" | "MANAGER" | "CASHIER";
  },
) => {
  return db.orm.public.User.whereUnique({ id }).update(data);
};

export const updateLastLogin = async (id: string) => {
  return db.orm.public.User.whereUnique({ id }).update({
    lastLoginAt: new Date(),
    failedLoginAttempts: 0,
    lockedUntil: null,
  });
};

export const incrementFailedLoginAttempts = async (id: string) => {
  const query = db.sql.public.User.update((f, fns) => ({
    failedLoginAttempts: fns.raw`
      ${f.failedLoginAttempts} + 1
    `.returns("pg/int4@1"),

    lockedUntil: fns.raw`
      CASE
        WHEN ${f.failedLoginAttempts} + 1 >= ${MAX_FAILED_LOGIN_ATTEMPTS}
        THEN CURRENT_TIMESTAMP + make_interval(mins => ${LOCK_DURATION_MINUTES})
        ELSE ${f.lockedUntil}
      END
    `.returns("pg/timestamptz-date@1"),
  }))
    .where((f, fns) => fns.eq(f.id, id))
    .returning("id", "failedLoginAttempts", "lockedUntil")
    .build();

  const [user] = await db.query(query);

  return user ?? null;
};
