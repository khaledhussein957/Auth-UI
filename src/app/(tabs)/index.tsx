import { useLogout } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { user } = useAuthStore();
  const logut = useLogout();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`Welcome ${user?.name}`}</Text>

      {/* logout button */}
      <TouchableOpacity
        style={{
          backgroundColor: "#000000",
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
        }}
        onPress={() => {
          logut();
        }}
      >
        <Text style={{ color: "#ffffff" }}>Logout</Text>
      </TouchableOpacity>
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
    color: "#000000",
  },
});
