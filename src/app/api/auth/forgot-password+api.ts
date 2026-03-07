import connectDB from "@/config/db";
import { forgotPassword } from "@/services/auth.service";
import { forgotPasswordSchema } from "@/validations/auth.validate";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const { email } = forgotPasswordSchema.parse(body);

    await forgotPassword(email);

    return new Response(
      JSON.stringify({
        message:
          "Password reset code generated. Please check your email for the code.",
      }),
      { status: 200 },
    );
  } catch (error: any) {
    console.error(error);

    if (error instanceof ZodError) {
      return Response.json({ errors: error.message }, { status: 400 });
    }

    return Response.json({ error: error.message }, { status: 400 });
  }
}
