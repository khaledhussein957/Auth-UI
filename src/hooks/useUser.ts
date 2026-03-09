import api from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";
import {
  DeleteAccountPayload,
  DeleteAccountResponse,
} from "@/types/user.types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { useShallow } from "zustand/react/shallow";

export const useDeleteAccount = () => {
  const router = useRouter();
  const { token, logout } = useAuthStore(
    useShallow((state) => ({ token: state.token, logout: state.logout })),
  );
  return useMutation({
    mutationKey: ["user", "delete-account"],
    mutationFn: async (payload: DeleteAccountPayload) => {
      const { data } = await api.delete<DeleteAccountResponse>(
        "/user/delete-account",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: payload,
        },
      );
      return data;
    },
    onSuccess: () => {
      logout();
      Alert.alert(
        "Account deleted successfully",
        "Your account has been deleted.",
      );
      router.replace("/(auth)");
    },
    onError: (err) => {
      let errorMessage = err.message;
      if (err instanceof AxiosError && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err instanceof AxiosError && err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }
      Alert.alert("Delete Account Failed", errorMessage);
    },
  });
};
