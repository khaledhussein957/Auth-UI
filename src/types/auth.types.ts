import { IUser } from ".";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}

export interface VerifyEmailPayload {
  email: string;
  code: string;
}

export interface VerifyEmailResponse {
  message: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: IUser;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordPayload {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface ResendCodePayload {
  email: string;
  type: string;
}

export interface ResendCodeResponse {
  message: string;
}
