import zod from "zod";

export const registerSchema = zod.object({
  name: zod.string().min(2, "Name must be at least 2 characters long"),
  email: zod.string().email("Invalid email address"),
  password: zod
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});

export const verifyEmailSchema = zod.object({
  email: zod.string().email("Invalid email address"),
  code: zod.string().length(6, "Code must be exactly 6 characters long"),
});

export const loginSchema = zod.object({
  email: zod.string().email("Invalid email address"),
  password: zod.string().min(8, "Password must be at least 8 characters long"),
});

export const forgotPasswordSchema = zod.object({
  email: zod.string().email("Invalid email address"),
});

export const resetPasswordSchema = zod
  .object({
    email: zod.string().email("Invalid email address"),
    code: zod.string().length(6, "Code must be exactly 6 characters long"),
    password: zod
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&]/,
        "Password must contain at least one special character",
      ),

    confirmPassword: zod
      .string()
      .min(8, "Confirm Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

import { z } from "zod";

export const resendCodeSchema = z.object({
  email: z.string().email("Invalid email address"),
  type: z.enum(["verification", "resetPassword"], {
    message: "Type must be either 'verification' or 'resetPassword'",
  }),
});

export type RegisterInput = zod.infer<typeof registerSchema>;
export type VerifyEmailInput = zod.infer<typeof verifyEmailSchema>;
export type LoginInput = zod.infer<typeof loginSchema>;
export type ForgotPasswordInput = zod.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = zod.infer<typeof resetPasswordSchema>;
export type ResendCodeInput = zod.infer<typeof resendCodeSchema>;
