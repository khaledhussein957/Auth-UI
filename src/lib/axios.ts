import axios from "axios";
import { Platform } from "react-native";

const getBaseUrl = () => {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }
  if (Platform.OS === "web") {
    return "/api";
  }
  // Android Emulator
  if (Platform.OS === "android") {
    return "http://10.0.2.2:8081/api";
  }
  // iOS Simulator
  return "http://localhost:8081/api";
};

const api = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
});

export default api;
