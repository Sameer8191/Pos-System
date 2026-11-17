import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type ValidationSchema = z.ZodType;

type ValidationHandler<T> = (
  request: NextRequest,
  data: T,
) => Promise<Response>;

export const withValidation = <T extends ValidationSchema>(
  schema: T,
  handler: ValidationHandler<z.infer<T>>,
) => {
  return async (request: NextRequest) => {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid JSON body",
        },
        {
          status: 400,
        },
      );
    }

    const result = schema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: result.error.issues,
        },
        {
          status: 400,
        },
      );
    }

    return handler(request, result.data);
  };
};
