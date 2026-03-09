import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");

export const createAuthStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: "center",
      padding: 20,
    },

    imageContainer: {
      height: height * 0.3,
      marginBottom: 30,
      justifyContent: "center",
      alignItems: "center",
    },

    image: {
      width: 200,
      height: 200,
      alignSelf: "center",
      marginBottom: 30,
      resizeMode: "contain",
    },

    title: {
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
      color: theme.text,
    },

    subtitle: {
      fontSize: 16,
      textAlign: "center",
      marginBottom: 30,
      color: theme.text,
    },

    inputContainer: {
      marginBottom: 20,
    },

    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.primary,
      borderRadius: 10,
      backgroundColor: theme.background,
      overflow: "hidden",
    },

    label: {
      color: theme.text,
      fontSize: 14,
      marginBottom: 6,
      fontWeight: "500",
    },

    input: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 14,
      color: theme.text,
      fontSize: 16,
    },

    inputStandalone: {
      borderWidth: 1,
      borderColor: theme.primary,
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 14,
      color: theme.text,
      fontSize: 16,
      backgroundColor: theme.background,
    },

    otpContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },

    otpInput: {
      width: 48,
      height: 56,
      borderWidth: 2,
      borderRadius: 10,
      textAlign: "center",
      fontSize: 20,
      fontWeight: "600",
      color: theme.text,
      backgroundColor: theme.background,
    },

    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.65)",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },

    modalContainer: {
      width: "100%",
      backgroundColor: theme.card,
      borderRadius: 24,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: theme.cardBorder,
      shadowColor: theme.primary,
      shadowOpacity: 0.2,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 6 },
      elevation: 14,
    },

    modalHeaderBg: {
      width: "100%",
      paddingTop: 28,
      paddingBottom: 22,
      paddingHorizontal: 24,
      backgroundColor: theme.primary,
      alignItems: "center",
    },

    modalBody: {
      paddingHorizontal: 24,
      paddingBottom: 28,
      paddingTop: 8,
    },

    modalTitle: {
      fontSize: 22,
      fontWeight: "800",
      textAlign: "center",
      marginBottom: 4,
      color: "#ffffff",
      letterSpacing: 0.3,
    },

    modalSubtitle: {
      fontSize: 14,
      textAlign: "center",
      color: "rgba(255,255,255,0.8)",
    },

    modalInputLabel: {
      fontSize: 13,
      fontWeight: "600",
      color: theme.textSecondary,
      marginBottom: 6,
    },

    modalCancel: {
      marginTop: 16,
      alignItems: "center",
      paddingVertical: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
    },

    modalCancelText: {
      color: theme.textSecondary,
      fontSize: 15,
      fontWeight: "600",
    },

    emailText: {
      textAlign: "center",
      fontWeight: "600",
      marginBottom: 20,
      color: theme.textSecondary,
    },

    button: {
      backgroundColor: theme.primary,
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 10,
    },

    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },

    eyeButton: {
      paddingHorizontal: 12,
      paddingVertical: 12,
    },

    linkContainer: {
      marginTop: 18,
      flexDirection: "row",
      justifyContent: "center",
    },

    linkText: {
      color: theme.text,
      fontSize: 14,
    },

    link: {
      color: theme.primary,
      fontWeight: "600",
      marginLeft: 5,
    },

    // New: forgot password link container (right aligned)
    forgotContainer: {
      alignSelf: "flex-end",
      marginTop: 4,
    },

    forgotText: {
      color: theme.primary,
      fontWeight: "600",
      fontSize: 14,
    },

    errorText: {
      color: "red",
      fontSize: 14,
      marginTop: 8,
    },

    // New: ScrollView content style
    scrollContainer: {
      flexGrow: 1,
      justifyContent: "center",
    },
  });
