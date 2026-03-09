import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export async function generateVerificationCode(): Promise<string> {
  const code = Math.floor(100000 + Math.random() * 900000).toString(); // like 123456 or 558799
  return code;
}

export function codeExpiration(hour: number): Date {
  return new Date(Date.now() + hour * 60 * 60 * 1000); // current time + hours in milliseconds
}

export const isCodeExpired = (expirationDate: Date): boolean => {
  return new Date() > expirationDate;
};

export const generateToken = (
  payload: object,
  secret: string,
  expiresIn: SignOptions["expiresIn"],
) => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = async (token: string, secret: string) => {
  return jwt.verify(token, secret);
};

export const generateResetPasswordCode = async (): Promise<string> => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  return code;
};

export const resetPasswordCodeExpiration = (minutes: number): Date => {
  return new Date(Date.now() + minutes * 60 * 1000); // current time + minutes in milliseconds
};

export const isResetPasswordCodeExpired = (expirationDate: Date): boolean => {
  return new Date() > expirationDate;
};
