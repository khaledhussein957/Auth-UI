import { colors } from "@/constant/colors";
import { useThemeStore } from "@/store/themeStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

export default function RootLayout() {
  const { theme } = useThemeStore();

  const isDark = theme === "dark";
  const currentTheme = isDark ? colors.dark : colors.light;

  // Prevent recreation on rerenders
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style={isDark ? "light" : "dark"} />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: currentTheme.background },
        }}
      >
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </QueryClientProvider>
  );
}
