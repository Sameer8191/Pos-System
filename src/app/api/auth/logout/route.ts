import { errorHandler } from "@/src/server/middleware/error-handler";
import { logoutUser } from "@/src/server/services/auth.service";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    await logoutUser();

    return NextResponse.json(
      {
        success: true,
        message: "Logout successful",
      },
      { status: 200 },
    );
  } catch (error) {
    return errorHandler(error);
  }
};
