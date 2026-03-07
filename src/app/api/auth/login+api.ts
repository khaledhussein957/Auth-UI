import connectDB from "@/config/db";
import { loginUser } from "@/services/auth.service";
import { loginSchema } from "@/validations/auth.validate";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const { email, password } = loginSchema.parse(body);

    const { token, user } = await loginUser(email, password);

    return new Response(JSON.stringify({ token, user }), { status: 200 });
  } catch (error: any) {
    console.error(error);

    if (error instanceof ZodError) {
      return Response.json({ errors: error.message }, { status: 400 });
    }

    return Response.json({ error: error.message }, { status: 400 });
  }
}
