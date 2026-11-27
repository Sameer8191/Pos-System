import { NextRequest, NextResponse } from "next/server";

import { loginUser } from "@/src/server/services/auth.service";

import { errorHandler } from "@/src/server/middleware/error-handler";
import { loginSchema } from "@/src/server/validators/auth.schema";

export const POST = async (request: NextRequest) => {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid JSON body",
        },
        { status: 400 },
      );
    }

    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.error.flatten(),
        },
        { status: 400 },
      );
    }

    const user = await loginUser(validation.data);

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        data: user,
      },
      { status: 200 },
    );
  } catch (error) {
    return errorHandler(error);
  }
};
