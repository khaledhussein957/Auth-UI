import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;

  isVerified: boolean;
  lastLogin?: Date;

  resetPasswordCode?: string;
  resetPasswordCodeExpiration?: Date;
  verificationCode?: string;
  verificationCodeExpiration?: Date;
}

const userSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },

  lastLogin: {
    type: Date,
  },
  resetPasswordCode: {
    type: String,
    maxLength: 6,
  },
  resetPasswordCodeExpiration: {
    type: Date,
  },
  verificationCode: {
    type: String,
    maxLength: 6,
  },
  verificationCodeExpiration: {
    type: Date,
  },
});

const User = mongoose.model<IUser & Document>("User", userSchema);

export default User;
