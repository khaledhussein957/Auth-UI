import { useAuthStore } from "@/store/authStore";
import { Redirect } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Redirect href={"/(auth)/index"} />;

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
