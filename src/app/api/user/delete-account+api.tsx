import connectDB from "@/config/db";
import { deleteAccount } from "@/services/user.service";
import { deleteAccountSchema } from "@/validations/user.validate";
import { ZodError } from "zod";

export async function DELETE(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { password } = deleteAccountSchema.parse(body);

    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader!;

    const result = await deleteAccount(token, password);

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
