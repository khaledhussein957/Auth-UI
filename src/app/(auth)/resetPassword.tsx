import { createAuthStyles } from "@/assets/styles/auth.style";
import { colors } from "@/constant/colors";
import { useResendCode, useResetPassword } from "@/hooks/useAuth";
import { useThemeStore } from "@/store/themeStore";
import { formatTime } from "@/utils/date-format";
import {
  ResetPasswordInput,
  resetPasswordSchema,
} from "@/validations/auth.validate";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

const ResetPassword = () => {
  const colorScheme = useColorScheme();
  const { theme: currentTheme } = useThemeStore();
  const isDark = currentTheme === "dark";
  const theme = isDark ? colors.dark : colors.light;
  const style = createAuthStyles(theme);

  const { email } = useLocalSearchParams<{ email: string }>();

  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email || "",
      code: "",
      password: "",
      confirmPassword: "",
    },
  });

  const resetPassword = useResetPassword();
  const resendCode = useResendCode();

  const codeValue = watch("code");

  const handleChange = (value: string, index: number) => {
    const codeArray = (codeValue || "").padEnd(6, " ").split("");

    codeArray[index] = value;

    const newCode = codeArray.join("").trim();
    setValue("code", newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendCode = () => {
    resendCode.mutate({ email: watch("email"), type: "resetPassword" });
    setTimeLeft(15 * 60); // restart timer
  };

  const onVerifyCode = async () => {
    const isValid = await trigger("code");

    if (isValid) {
      setShowPasswordModal(true);
    }
  };

  const onCreatePassword = (data: ResetPasswordInput) => {
    resetPassword.mutate({
      email: watch("email"),
      code: watch("code"),
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={style.container}
    >
      <ScrollView
        contentContainerStyle={style.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={style.imageContainer}>
          <Image
            source={require("@/assets/images/reset_password.png")}
            style={style.image}
            contentFit="cover"
          />
        </View>
        <Text style={style.title}>Reset Password</Text>

        <Text style={style.subtitle}>Enter the verification code sent to</Text>

        <Text style={style.emailText}>{watch("email")}</Text>

        <View style={{ flex: 1 }}>
          {/* OTP */}
          <Controller
            control={control}
            name="code"
            render={() => (
              <View style={style.otpContainer}>
                {[...Array(6)].map((_, index) => {
                  const digit = codeValue?.[index] || "";

                  const borderColor = errors.code
                    ? theme.error
                    : digit
                      ? theme.success
                      : theme.border;

                  return (
                    <TextInput
                      key={index}
                      ref={(ref) => {
                        inputRefs.current[index] = ref;
                      }}
                      style={[style.otpInput, { borderColor }]}
                      keyboardType="number-pad"
                      maxLength={1}
                      value={digit}
                      onChangeText={(text) => handleChange(text, index)}
                    />
                  );
                })}
              </View>
            )}
          />

          {errors.code && (
            <Text style={style.errorText}>{errors.code.message}</Text>
          )}

          <TouchableOpacity
            onPress={handleResendCode}
            style={{ marginBottom: 16 }}
            disabled={resendCode.isPending}
          >
            {resendCode.isPending ? (
              <ActivityIndicator color={theme.primary} />
            ) : (
              <Text style={{ color: theme.primary, textAlign: "center" }}>
                Resend Code
              </Text>
            )}
          </TouchableOpacity>

          <Text style={{ textAlign: "center", marginBottom: 10 }}>
            Code expires in {formatTime(timeLeft)}
          </Text>

          <TouchableOpacity
            style={style.button}
            onPress={onVerifyCode}
            disabled={timeLeft === 0}
          >
            <Text style={style.buttonText}>
              {timeLeft === 0 ? "Code Expired" : "Verify Code"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* PASSWORD MODAL */}

      <Modal visible={showPasswordModal} transparent animationType="slide">
        <View style={style.modalOverlay}>
          <View style={style.modalContainer}>
            {/* Colored header background */}
            <View style={style.modalHeaderBg}>
              <Text style={style.modalTitle}>Create New Password</Text>
              <Text style={style.modalSubtitle}>
                Choose a strong password for your account
              </Text>
            </View>

            {/* Form body */}
            <View style={style.modalBody}>
              {/* Password */}
              <View style={style.inputContainer}>
                <Text style={style.modalInputLabel}>New Password</Text>
                <View style={style.inputRow}>
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        style={style.input}
                        placeholder="Enter new password"
                        secureTextEntry={!showPassword}
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                  />
                  <TouchableOpacity
                    style={style.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color={colorScheme === "dark" ? theme.text : theme.text}
                    />
                  </TouchableOpacity>
                </View>

                {errors.password && (
                  <Text style={style.errorText}>{errors.password.message}</Text>
                )}
              </View>

              {/* Confirm Password */}
              <View style={style.inputContainer}>
                <Text style={style.modalInputLabel}>Confirm Password</Text>
                <View style={style.inputRow}>
                  <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        style={style.input}
                        placeholder="Re-enter new password"
                        secureTextEntry={!showPassword}
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                  />
                  <TouchableOpacity
                    style={style.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color={colorScheme === "dark" ? theme.text : theme.text}
                    />
                  </TouchableOpacity>
                </View>

                {errors.confirmPassword && (
                  <Text style={style.errorText}>
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                style={style.button}
                onPress={handleSubmit(onCreatePassword)}
              >
                <Text style={style.buttonText}>
                  {resetPassword.isPending ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={style.buttonText}>Create Password</Text>
                  )}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={style.modalCancel}
                onPress={() => setShowPasswordModal(false)}
              >
                <Text style={style.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default ResetPassword;
