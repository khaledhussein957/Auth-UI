import connectDB from "@/config/db";
import { resendCode } from "@/services/auth.service";
import { resendCodeSchema } from "@/validations/auth.validate";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const { email, type } = resendCodeSchema.parse(body);

    const result = await resendCode(email, type);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error(error);

    if (error instanceof ZodError) {
      return Response.json({ errors: error.message }, { status: 400 });
    }

    return Response.json({ error: error.message }, { status: 400 });
  }
}
