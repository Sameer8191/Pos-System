import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

const validatePasswordLength = (password: string): void => {
  if (Buffer.byteLength(password, "utf8") > 72) {
    throw new Error("Password cannot exceed 72 bytes");
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  validatePasswordLength(password);

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  return hashedPassword;
};

export const verifyPassword = (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  validatePasswordLength(password);

  return bcrypt.compare(password, hashedPassword);
};
