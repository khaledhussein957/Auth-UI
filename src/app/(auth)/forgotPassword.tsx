import { createAuthStyles } from "@/assets/styles/auth.style";
import { colors } from "@/constant/colors";
import { useForgotPassword } from "@/hooks/useAuth";
import {
  ForgotPasswordInput,
  forgotPasswordSchema,
} from "@/validations/auth.validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
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

const forgotPassword = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? colors.dark : colors.light;
  const style = createAuthStyles(theme);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const forgotPassword = useForgotPassword();

  const onSubmit = (data: ForgotPasswordInput) => {
    forgotPassword.mutate(data);
  };
  return (
    <View style={style.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={style.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Image container */}
          <View style={style.imageContainer}>
            <Image
              source={require("@/assets/images/forgot-password.png")}
              style={style.image}
              contentFit="cover"
            />
          </View>

          {/* Title */}
          <Text style={style.title}>Forgot Password</Text>

          {/* Subtitle */}
          <Text style={style.subtitle}>
            Enter your email to receive a Code to reset your password
          </Text>

          {/* Card */}
          <View style={{ flex: 1 }}>
            <View style={style.inputContainer}>
              <Text style={style.label}>Email</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={style.inputStandalone}
                    autoFocus
                    keyboardType="email-address"
                    placeholder="Enter your email"
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />

              {errors.email && (
                <Text style={style.errorText}>{errors.email.message}</Text>
              )}
            </View>

            {/* Card button */}
            <View>
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                style={style.button}
                disabled={forgotPassword.isPending}
              >
                {forgotPassword.isPending ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={style.buttonText}>Send Code</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Card footer */}
            <View style={style.linkContainer}>
              <Text style={style.linkText}>
                I remember my password?{" "}
                <Link href="/(auth)" style={style.link}>
                  Login
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default forgotPassword;
