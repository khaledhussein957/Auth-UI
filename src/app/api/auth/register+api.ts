import connectDB from "@/config/db";
import { registerUser } from "@/services/auth.service";
import { registerSchema } from "@/validations/auth.validate";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const { name, email, password } = registerSchema.parse(body);

    const result = await registerUser(name, email, password);

    return Response.json(result, { status: 201 });
  } catch (error: any) {
    console.error(error);

    if (error instanceof ZodError) {
      return Response.json({ errors: error.message }, { status: 400 });
    }

    return Response.json({ error: error.message }, { status: 400 });
  }
}
