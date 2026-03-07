import connectDB from "@/config/db";
import { verifyEmail } from "@/services/auth.service";
import { verifyEmailSchema } from "@/validations/auth.validate";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const { email, code } = verifyEmailSchema.parse(body);

    await verifyEmail(email, code);

    return new Response(
      JSON.stringify({ message: "Email verified successfully" }),
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
