import { RateLimiterRedis, RateLimiterRes } from "rate-limiter-flexible";
import { redis } from "../lib/redis";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";

const rateLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: "rate-limit",
  points: 100,
  duration: 60,
});

export const rateLimiting = async (req: NextRequest):Promise<NextResponse | null> => {
  try {
    const ip = req.headers.get("x-forwarded-for");

    if (!ip) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid IP",
        },
        { status: 400 },
      );
    }

    const rateLimitResponse = await rateLimiter.consume(ip);

    return null

    // return NextResponse.json(
    //   {
    //     success: true,
    //     message: "Request Allowed",
    //     remainingPoints: rateLimitResponse.remainingPoints,
    //     timeUntilReset: rateLimitResponse.msBeforeNext,
    //   },
    //   { status: 200 },
    // );
  } catch (error: unknown) {
    if (error instanceof RateLimiterRes) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests",
          remainingPoints: error.remainingPoints,
          timeUntilReset: error.msBeforeNext,
        },
        { status: 429 },
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: "Service Unavailable",
      },
      { status: 503 },
    );
  }
};
