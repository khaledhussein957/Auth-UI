import api from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";
import {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  ResendCodePayload,
  ResendCodeResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
  VerifyEmailPayload,
  VerifyEmailResponse,
} from "@/types/auth.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["auth", "register"],
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await api.post<RegisterResponse>(
        "/auth/register",
        payload,
      );
      return data;
    },
    onSuccess: (_, variables) => {
      router.push({
        pathname: "/(auth)/verifyEmail",
        params: { email: variables.email },
      });
    },
    onError: (err) => {
      let errorMessage = err.message;
      if (err instanceof AxiosError && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err instanceof AxiosError && err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }
      Alert.alert("Registration Failed", errorMessage);
    },
  });
};

export const useVerifyEmail = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["auth", "verify-email"],
    mutationFn: async (payload: VerifyEmailPayload) => {
      const { data } = await api.post<VerifyEmailResponse>(
        "/auth/verify-email",
        payload,
      );
      return data;
    },
    onSuccess: () => {
      router.push("/(auth)");
    },
    onError: (err) => {
      let errorMessage = err.message;
      if (err instanceof AxiosError && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err instanceof AxiosError && err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }
      Alert.alert("Verify Email Filed", errorMessage);
    },
  });
};

export const useLogin = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationKey: ["auth", "login"],

    mutationFn: async (payload) => {
      const { data } = await api.post("/auth/login", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    },

    onSuccess: (data) => {
      setAuth(data.user, data.token);
      router.push("/(tabs)");
    },

    onError: (err) => {
      let errorMessage = err.message;
      if (err instanceof AxiosError && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err instanceof AxiosError && err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }
      Alert.alert("Login Failed", errorMessage);
    },
  });
};

export const useForgotPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["auth", "forgot-password"],
    mutationFn: async (payload: ForgotPasswordPayload) => {
      const { data } = await api.post<ForgotPasswordResponse>(
        "/auth/forgot-password",
        payload,
      );
      return data;
    },
    onSuccess: (_, payload) => {
      Alert.alert("check your email");
      router.push({
        pathname: "/(auth)/resetPassword",
        params: { email: payload.email },
      });
    },
    onError: (err) => {
      let errorMessage = err.message;
      if (err instanceof AxiosError && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err instanceof AxiosError && err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }
      Alert.alert("Filed to forgot the password", errorMessage);
    },
  });
};

export const useResetPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["auth", "verify-email"],
    mutationFn: async (payload: ResetPasswordPayload) => {
      const { data } = await api.post<ResetPasswordResponse>(
        "/auth/verify-email",
        payload,
      );
      return data;
    },
    onSuccess: () => {
      Alert.alert("password reset successfully");
      router.push("/(auth)");
    },
    onError: (err) => {
      let errorMessage = err.message;
      if (err instanceof AxiosError && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err instanceof AxiosError && err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }
      Alert.alert("Filed to reset password", errorMessage);
    },
  });
};

export const useResendCode = () => {
  return useMutation({
    mutationKey: ["auth", "verify-email"],
    mutationFn: async (payload: ResendCodePayload) => {
      const { data } = await api.post<ResendCodeResponse>(
        "/auth/verify-email",
        payload,
      );
      return data;
    },
    onSuccess: () => {
      Alert.alert("Code sent successfully");
    },
    onError: (err) => {
      let errorMessage = err.message;
      if (err instanceof AxiosError && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err instanceof AxiosError && err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }
      Alert.alert("FIled to sent code", errorMessage);
    },
  });
};

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();
  const router = useRouter();

  return () => {
    logout();
    queryClient.clear();
    router.push("/(auth)");
  };
};
