import { getTransporter } from "@/config/nodemailer";
import {
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplate";

export const sendVerificationEmail = async (
  recipientEmail: string,
  verificationCode: string,
  expirationTime: string,
) => {
  const transporter = getTransporter();

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: recipientEmail,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationCode,
      ).replace("{expirationTime}", expirationTime),
    });

    if (info.rejected.length > 0) {
      throw new Error(
        `Failed to send email to ${recipientEmail}: ${info.rejected.join(", ")}`,
      );
    }

    return true;
  } catch (error) {
    throw new Error("Error sending verification email:" + error);
  }
};

export const sendPasswordResetRequestEmail = async (
  recipientEmail: string,
  resetCode: string,
  expirationTime: string,
) => {
  const transporter = getTransporter();

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: recipientEmail,
      subject: "Password Reset Request",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
        "{resetCode}",
        resetCode,
      ).replace("{expirationTime}", expirationTime),
    });

    if (info.rejected.length > 0) {
      throw new Error(
        `Failed to send email to ${recipientEmail}: ${info.rejected.join(", ")}`,
      );
    }

    return true;
  } catch (error) {
    throw new Error("Error sending password reset request email:" + error);
  }
};

export const sendPasswordResetSuccessEmail = async (recipientEmail: string) => {
  const transporter = getTransporter();

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: recipientEmail,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });

    if (info.rejected.length > 0) {
      throw new Error(
        `Failed to send email to ${recipientEmail}: ${info.rejected.join(", ")}`,
      );
    }

    return true;
  } catch (error) {
    throw new Error("Error sending password reset success email:" + error);
  }
};
