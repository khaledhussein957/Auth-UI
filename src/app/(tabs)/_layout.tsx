import { colors } from "@/constant/colors";
import { useAuthStore } from "@/store/authStore";
import { useThemeStore } from "@/store/themeStore";
import { Redirect } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  const { isAuthenticated } = useAuthStore();
  const { theme } = useThemeStore();

  if (!isAuthenticated) return <Redirect href="/(auth)" />;

  const isDark = theme === "dark";
  const currentTheme = isDark ? colors.dark : colors.light;

  return (
    <NativeTabs
      tintColor={currentTheme.primary}
      backgroundColor={currentTheme.background}
      labelStyle={{ fontSize: 12, fontWeight: "600" }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Icon sf="person.fill" md="person" />
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
