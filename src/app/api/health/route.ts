import { db } from "@/src/server/prisma/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const healthQuery = db.raw.sql`
      SELECT 1 AS ok
    `
      .returnsRow({ ok: "pg/int4@1" })
      .build();

    await db.query(healthQuery);

    return NextResponse.json({
      success: true,
      message: "Service is healthy",
      data: {
        api: "healthy",
        database: "connected",
      },
    });
  } catch (error) {
    console.error("Health check failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Service is unhealthy",
        data: {
          api: "healthy",
          database: "disconnected",
        },
      },
      { status: 503 },
    );
  }
}
