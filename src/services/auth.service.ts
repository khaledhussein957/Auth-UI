import User from "@/models/user.model";
import {
    codeExpiration,
    comparePassword,
    generateResetPasswordCode,
    generateToken,
    generateVerificationCode,
    hashPassword,
    isCodeExpired,
    isResetPasswordCodeExpired,
    resetPasswordCodeExpiration,
} from "@/utils/auth";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email is already registered");
    }

    const hashedPassword = await hashPassword(password);

    const verificationCode = await generateVerificationCode();

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verificationCode,
      verificationCodeExpiration: codeExpiration(1), // code expires in 1 hour
    });

    await newUser.save();

    //TODO: Send verification email with the code

    return {
      message:
        "Registration successful. Please check your email to verify your account.",
    };
  } catch (error: any) {
    throw new Error("Registration failed: " + error.message);
  }
};

export const verifyEmail = async (email: string, code: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  if (user.isVerified) {
    throw new Error("Email is already verified");
  }

  // TODO: check if verification code is already generated and not expired, if so, resend the same code instead of generating a new one

  const isCodeValid = user.verificationCode === code;
  const isUserCodeExpired = user.verificationCodeExpiration
    ? isCodeExpired(user.verificationCodeExpiration)
    : true;

  if (!isCodeValid || isUserCodeExpired) {
    throw new Error("Invalid or expired verification code");
  }

  user.isVerified = true;
  user.verificationCode = undefined;
  user.verificationCodeExpiration = undefined;

  await user.save();

  return {
    message: "Email verified successfully. You can now log in.",
  };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  if (!user.isVerified) {
    throw new Error("Please verify your email before logging in");
  }

  user.lastLogin = new Date();

  await user.save();

  const token = await generateToken(user._id, process.env.JWT_SECRET!, "1h");

  return {
    message: "Login successful",
    token,
  };
};

export const forgotPassword = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  //TODO: check if reset password code is already generated and not expired, if so, resend the same code instead of generating a new one

  const resetCode = await generateResetPasswordCode();

  user.resetPasswordCode = resetCode;
  user.resetPasswordCodeExpiration = resetPasswordCodeExpiration(15); // code expires in 15 minutes

  await user.save();

  // TODO: Send reset password email with the code

  return {
    message:
      "Password reset code generated. Please check your email for the code.",
  };
};

export const resetPassword = async (
  email: string,
  code: string,
  newPassword: string,
  confirmPassword: string,
) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const isCodeValid = user.resetPasswordCode === code;
  const isUserCodeExpired = user.resetPasswordCodeExpiration
    ? isResetPasswordCodeExpired(user.resetPasswordCodeExpiration)
    : true;

  if (!isCodeValid || isUserCodeExpired) {
    throw new Error("Invalid or expired reset code");
  }

  if (newPassword !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  user.password = await hashPassword(newPassword);
  user.resetPasswordCode = undefined;
  user.resetPasswordCodeExpiration = undefined;

  await user.save();

  // TODO: Send confirmation email about password reset

  return {
    message:
      "Password reset successful. You can now log in with your new password.",
  };
};

export const resendVerificationCode = async (email: string, type: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  if (user.isVerified) {
    throw new Error("Email is already verified");
  }

  //   type can be "verification" or "resetPassword"
  try {
    if (type === "verification") {
      if (
        user.verificationCode &&
        user.verificationCodeExpiration &&
        !isCodeExpired(user.verificationCodeExpiration)
      ) {
        throw new Error(
          "Verification code already sent. Please check your email for the code.",
        );
      }
      const verificationCode = await generateVerificationCode();
      user.verificationCode = verificationCode;
      user.verificationCodeExpiration = codeExpiration(1); // code expires in 1 hour

      //   TODO: Send verification email with the code
    } else if (type === "resetPassword") {
      if (
        user.resetPasswordCode &&
        user.resetPasswordCodeExpiration &&
        !isResetPasswordCodeExpired(user.resetPasswordCodeExpiration)
      ) {
        throw new Error(
          "Reset password code already sent. Please check your email for the code.",
        );
      }
      const resetCode = await generateResetPasswordCode();
      user.resetPasswordCode = resetCode;
      user.resetPasswordCodeExpiration = resetPasswordCodeExpiration(15); // code expires in 15 minutes

      //   TODO: Send reset password email with the code
    } else {
      throw new Error("Invalid code type");
    }

    await user.save();

    return {
      message: `${
        type === "verification" ? "Verification" : "Reset password"
      } code resent. Please check your email for the code.`,
    };
  } catch (error: any) {
    throw new Error("Failed to resend verification code: " + error.message);
  }
};
