import { createAuthStyles } from "@/assets/styles/auth.style";
import { colors } from "@/constant/colors";
import { useLogin } from "@/hooks/useAuth";
import { LoginInput, loginSchema } from "@/validations/auth.validate";
import { Ionicons } from "@expo/vector-icons";
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

const LoginScreen = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? colors.dark : colors.light;
  const style = createAuthStyles(theme);

  const [showPassword, setShowPassword] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = useLogin();

  const onSubmit = (data: LoginInput) => {
    login.mutate(data);
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
              source={require("@/assets/images/login.png")}
              style={style.image}
              contentFit="cover"
            />
          </View>

          {/* Title */}
          <Text style={style.title}>Login</Text>

          {/* Subtitle */}
          <Text style={style.subtitle}>
            Please enter your email and password to continue to your account
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

            <View style={style.inputContainer}>
              <Text style={style.label}>Password</Text>
              <View style={style.inputRow}>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={style.input}
                      placeholder="Enter your password"
                      placeholderTextColor="#999"
                      secureTextEntry={!showPassword}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
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
                    color={colorScheme === "dark" ? "white" : "black"}
                  />
                </TouchableOpacity>
              </View>

              {errors.password && (
                <Text style={style.errorText}>{errors.password.message}</Text>
              )}
            </View>

            {/* Card actions */}
            <View style={style.forgotContainer}>
              <Link href="/(auth)/forgotPassword" style={style.forgotText}>
                Forgot password?
              </Link>
            </View>

            {/* Card button */}
            <View>
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                style={style.button}
                disabled={login.isPending}
              >
                {login.isPending ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={style.buttonText}>Login</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Card footer */}
            <View style={style.linkContainer}>
              <Text style={style.linkText}>
                Don't have an account?{" "}
                <Link href="/(auth)/register" style={style.link}>
                  Sign up
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
