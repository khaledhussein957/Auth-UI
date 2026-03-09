import { colors } from "@/constant/colors";
import { useLogout } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { useThemeStore } from "@/store/themeStore";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

export default function Index() {
  const colorScheme = useColorScheme();
  const { theme: currentTheme } = useThemeStore();
  const isDark = currentTheme === "dark";
  const theme = isDark ? colors.dark : colors.light;

  const { user } = useAuthStore();
  const logut = useLogout();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text
        style={[styles.text, { color: theme.text }]}
      >{`Welcome ${user?.name}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
});
