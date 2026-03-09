import User from "@/models/user.model";
import { comparePassword, verifyToken } from "@/utils/auth";

export const deleteAccount = async (token: string, password: string) => {
  if (!token || !password) {
    throw new Error("All fields are required");
  }

  const payload = (await verifyToken(token, process.env.JWT_SECRET!)) as {
    id: string;
  };
  const userId = payload.id;

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) {
    throw new Error("Failed to delete user");
  }

  return {
    message: "Account deleted successfully",
  };
};
