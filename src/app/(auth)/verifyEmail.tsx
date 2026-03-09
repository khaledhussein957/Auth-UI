import { createAuthStyles } from "@/assets/styles/auth.style";
import { colors } from "@/constant/colors";
import { useResendCode, useVerifyEmail } from "@/hooks/useAuth";
import { useThemeStore } from "@/store/themeStore";
import { formatTime } from "@/utils/date-format";
import {
  VerifyEmailInput,
  verifyEmailSchema,
} from "@/validations/auth.validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

const VerifyEmail = () => {
  const colorScheme = useColorScheme();
  const { theme: currentTheme } = useThemeStore();
  const isDark = currentTheme === "dark";
  const theme = isDark ? colors.dark : colors.light;
  const style = createAuthStyles(theme);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  const { email } = useLocalSearchParams<{ email: string }>();

  const [timeLeft, setTimeLeft] = useState(60 * 60); // 1 hour

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
    formState: { errors },
    setValue,
    watch,
  } = useForm<VerifyEmailInput>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: email || "",
      code: "",
    },
  });

  const verifyEmail = useVerifyEmail();
  const resendCode = useResendCode();

  const codeValue = watch("code");

  const onSubmit = (data: VerifyEmailInput) => {
    verifyEmail.mutate(data);
  };

  const handleChange = (value: string, index: number) => {
    const codeArray = codeValue.split("");

    if (value === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    codeArray[index] = value;
    const newCode = codeArray.join("");
    setValue("code", newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleResendCode = () => {
    resendCode.mutate({ email: watch("email"), type: "verification" });
    setTimeLeft(60 * 60); // restart 1 hour timer
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
            source={require("@/assets/images/verify_account.png")}
            style={style.image}
            contentFit="cover"
          />
        </View>

        <Text style={style.title}>Verify Email</Text>

        <Text style={style.subtitle}>Enter the verification code sent to</Text>

        <Text style={style.emailText}>{watch("email")}</Text>

        <View style={{ flex: 1 }}>
          {/* OTP Inputs */}
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
            style={style.button}
            onPress={handleSubmit(onSubmit)}
            disabled={timeLeft === 0}
          >
            {verifyEmail.isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={style.buttonText}>
                {timeLeft === 0 ? "Code Expired" : "Verify"}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleResendCode}
            style={{ marginTop: 10 }}
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
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default VerifyEmail;
