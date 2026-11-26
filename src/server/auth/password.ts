import "server-only";

import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;
const MAX_PASSWORD_BYTES = 72;

const isPasswordTooLong = (password: string): boolean => {
  return Buffer.byteLength(password, "utf8") > MAX_PASSWORD_BYTES;
};

export const hashPassword = async (password: string): Promise<string> => {
  if (isPasswordTooLong(password)) {
    throw new Error("Password cannot exceed 72 bytes");
  }

  return bcrypt.hash(password, SALT_ROUNDS);
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  if (isPasswordTooLong(password)) {
    return false;
  }

  return bcrypt.compare(password, hashedPassword);
};