import { colors } from "@/constant/colors";
import { useLogout } from "@/hooks/useAuth";
import { useDeleteAccount } from "@/hooks/useUser";
import { useAuthStore } from "@/store/authStore";
import { useThemeStore } from "@/store/themeStore";
import { formatLastLogin } from "@/utils/date-format";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileTab = () => {
  const logout = useLogout();
  const deleteAccount = useDeleteAccount();
  const { user } = useAuthStore();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { theme: currentTheme, toggleTheme } = useThemeStore();

  const isDark = currentTheme === "dark";
  const theme = isDark ? colors.dark : colors.light;

  const handleDeleteAccount = () => {
    deleteAccount.mutate(
      { password },
      {
        onSuccess: () => {
          setPassword("");
          setShowDeleteModal(false);
        },
      },
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase()}
            </Text>
          </View>

          <Text style={[styles.name, { color: theme.text }]}>{user?.name}</Text>

          <Text style={[styles.email, { color: theme.textSecondary }]}>
            {user?.email}
          </Text>

          <Text style={[styles.lastLogin, { color: theme.textSecondary }]}>
            Last login: {formatLastLogin(user?.lastLogin!)}
          </Text>
        </View>

        {/* APPEARANCE */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            Appearance
          </Text>

          <View
            style={[
              styles.sectionCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            <View style={styles.sectionItem}>
              <View
                style={[
                  styles.sectionIconWrapper,
                  { backgroundColor: `${theme.primary}20` },
                ]}
              >
                <Ionicons name="moon-outline" size={20} color={theme.primary} />
              </View>

              <Text style={[styles.sectionLabel, { color: theme.text }]}>
                Dark Mode
              </Text>

              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: "#767577", true: theme.primary }}
                thumbColor={isDark ? "#ffffff" : "#f4f3f4"}
              />
            </View>
          </View>
        </View>

        {/* LOGOUT */}
        <Pressable style={styles.logoutButton} onPress={() => logout()}>
          <Ionicons name="log-out-outline" size={20} color={theme.error} />
          <Text style={[styles.logoutText, { color: theme.error }]}>
            Log Out
          </Text>
        </Pressable>

        {/* DELETE ACCOUNT */}
        <Pressable
          style={styles.logoutButton}
          onPress={() => setShowDeleteModal(true)}
        >
          <Ionicons name="trash-outline" size={20} color={theme.error} />
          <Text style={[styles.logoutText, { color: theme.error }]}>
            Delete Account
          </Text>
        </Pressable>
      </ScrollView>

      {/* DELETE ACCOUNT MODAL */}
      <Modal visible={showDeleteModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View
            style={[styles.modalContainer, { backgroundColor: theme.card }]}
          >
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Delete Account
            </Text>

            <Text
              style={[styles.modalSubtitle, { color: theme.textSecondary }]}
            >
              Enter your password to permanently delete your account.
            </Text>

            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.modalInput,
                  { borderColor: theme.border, color: theme.text },
                ]}
                placeholder="Enter password"
                placeholderTextColor={theme.textSecondary}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={theme.textSecondary}
                />
              </TouchableOpacity>
            </View>

            {/* DELETE ACCOUNT */}
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: `${theme.error}15` },
              ]}
              activeOpacity={0.7}
              onPress={handleDeleteAccount}
            >
              <Ionicons name="trash-outline" size={20} color={theme.error} />
              <Text style={[styles.actionText, { color: theme.error }]}>
                {deleteAccount.isPending ? "Deleting..." : "Delete Account"}
              </Text>
            </TouchableOpacity>

            {/* CANCEL */}
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: `${theme.primary}15` },
              ]}
              activeOpacity={0.7}
              onPress={() => setShowDeleteModal(false)}
            >
              <Ionicons name="close-outline" size={20} color={theme.primary} />
              <Text style={[styles.actionText, { color: theme.primary }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },

  header: {
    alignItems: "center",
    marginBottom: 35,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    elevation: 3,
  },

  avatarText: {
    fontSize: 44,
    color: "white",
    fontWeight: "700",
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },

  email: {
    fontSize: 14,
    marginBottom: 4,
  },

  lastLogin: {
    fontSize: 12,
    opacity: 0.8,
  },

  sectionContainer: {
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },

  sectionCard: {
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
  },

  sectionItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  sectionIconWrapper: {
    padding: 10,
    borderRadius: 10,
    marginRight: 12,
  },

  sectionLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginTop: 14,
  },

  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 16,
  },

  actionText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
  },

  /* Modal styles remain unchanged */

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "85%",
    borderRadius: 12,
    padding: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  modalSubtitle: {
    fontSize: 14,
    marginBottom: 20,
  },

  modalInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },

  inputWrapper: {
    position: "relative",
  },

  eyeButton: {
    position: "absolute",
    right: 12,
    top: 12,
  },

  deleteConfirmButton: {
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  deleteConfirmText: {
    color: "#fff",
    fontWeight: "600",
  },

  modalCancel: {
    marginTop: 15,
    alignItems: "center",
  },

  modalCancelText: {
    fontSize: 14,
  },
});
