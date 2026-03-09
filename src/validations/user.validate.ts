import zod from "zod";

export const deleteAccountSchema = zod.object({
  password: zod.string().min(8, "Password must be at least 8 characters long"),
});
