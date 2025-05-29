import { NextResponse } from "next/server"
import { testEmailConnection } from "@/lib/email"

export async function GET() {
  try {
    const isConnected = await testEmailConnection()

    if (isConnected) {
      return NextResponse.json({
        success: true,
        message: "Gmail connection successful",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Gmail connection failed",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to test email connection",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
