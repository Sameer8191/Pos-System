import { NextResponse } from "next/server";
import AppError from "../utils/error";

const errorHandler = (error: unknown): NextResponse => {
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        status: error.status
      },
      {
        status: error.statusCode,
      },
    );
  }
  console.error(error);
  return NextResponse.json(
    {
      success: false,
      message: "Internal Server Error",
    },
    {
      status: 500,
    },
  );
};

export {errorHandler};
