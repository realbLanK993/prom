import { type NextRequest, NextResponse } from "next/server"
import { db, registrations } from "@/lib/db"
import { desc, eq, count } from "drizzle-orm"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")

    const offset = (page - 1) * limit

    // Build where clause
    const whereClause = status ? eq(registrations.status, status as any) : undefined

    // Get registrations with pagination
    const registrationsList = await db
      .select()
      .from(registrations)
      .where(whereClause)
      .orderBy(desc(registrations.createdAt))
      .limit(limit)
      .offset(offset)

    // Get total count
    const [{ totalCount }] = await db.select({ totalCount: count() }).from(registrations).where(whereClause)

    return NextResponse.json({
      success: true,
      data: registrationsList,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    })
  } catch (error) {
    console.error("Failed to fetch registrations:", error)
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 })
  }
}
