import { createAuthStyles } from "@/assets/styles/auth.style";
import { colors } from "@/constant/colors";
import { useRegister } from "@/hooks/useAuth";
import { RegisterInput, registerSchema } from "@/validations/auth.validate";
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

const register = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? colors.dark : colors.light;
  const style = createAuthStyles(theme);

  const [showPassword, setShowPassword] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const register = useRegister();

  const onSubmit = (data: RegisterInput) => {
    register.mutate(data);
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
              source={require("@/assets/images/register.png")}
              style={style.image}
              contentFit="cover"
            />
          </View>

          {/* Title */}
          <Text style={style.title}>Create an account</Text>

          {/* Subtitle */}
          <Text style={style.subtitle}></Text>

          {/* Card */}
          <View style={{ flex: 1 }}>
            <View style={style.inputContainer}>
              <Text style={style.label}>Full Name</Text>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={style.inputStandalone}
                    placeholder="Enter your full name"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />

              {errors.name && (
                <Text style={style.errorText}>{errors.name.message}</Text>
              )}
            </View>

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

            {/* Card button */}
            <View>
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                style={style.button}
                disabled={register.isPending}
              >
                {register.isPending ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={style.buttonText}>Create an account</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Card footer */}
            <View style={style.linkContainer}>
              <Text style={style.linkText}>
                Don't have an account?{" "}
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

export default register;
