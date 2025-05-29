import { type NextRequest, NextResponse } from "next/server"
import { db, registrations } from "@/lib/db"
import { sendRegistrationConfirmationEmails } from "@/lib/email"
import { isTokenExpired } from "@/lib/utils/token"
import { eq } from "drizzle-orm"

export async function GET(request: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  try {
    const { token } = await params

    // Find registration by token
    const [registration] = await db.select().from(registrations).where(eq(registrations.partnerToken, token)).limit(1)

    if (!registration) {
      return NextResponse.json({ error: "Invalid or expired invitation" }, { status: 404 })
    }

    // Check if token is expired (7 days)
    if (isTokenExpired(registration.createdAt, 7)) {
      return NextResponse.json({ error: "Invitation has expired" }, { status: 410 })
    }

    // Check if already completed
    if (registration.status === "completed") {
      return NextResponse.json({ error: "Registration already completed" }, { status: 409 })
    }

    return NextResponse.json({
      success: true,
      registration: {
        id: registration.id,
        studentName: registration.studentName,
        studentEmail: registration.studentEmail,
        partnerEmail: registration.partnerEmail,
      },
    })
  } catch (error) {
    console.error("Token validation error:", error)
    return NextResponse.json({ error: "Failed to validate invitation" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  try {
    const { token } = await params
    const body = await request.json()

    const { name, email, studentId, year, department, emergencyContact } = body

    // Validate required fields
    if (!name || !email || !studentId || !year || !department || !emergencyContact) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Find registration by token
    const [registration] = await db.select().from(registrations).where(eq(registrations.partnerToken, token)).limit(1)

    if (!registration) {
      return NextResponse.json({ error: "Invalid or expired invitation" }, { status: 404 })
    }

    // Check if token is expired
    if (isTokenExpired(registration.createdAt, 7)) {
      return NextResponse.json({ error: "Invitation has expired" }, { status: 410 })
    }

    // Check if already completed
    if (registration.status === "completed") {
      return NextResponse.json({ error: "Registration already completed" }, { status: 409 })
    }

    // Verify partner email matches
    if (registration.partnerEmail !== email) {
      return NextResponse.json({ error: "Email does not match the invitation" }, { status: 400 })
    }

    // Update registration with partner information
    const [updatedRegistration] = await db
      .update(registrations)
      .set({
        partnerName: name,
        partnerStudentId: studentId,
        partnerYear: year,
        partnerDepartment: department,
        partnerEmergencyContact: emergencyContact,
        status: "completed",
        completedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(registrations.partnerToken, token))
      .returning()

    // Send confirmation emails to both partners
    await sendRegistrationConfirmationEmails(
      registration.studentEmail,
      registration.partnerEmail,
      registration.studentName,
      name,
      updatedRegistration.id,
    )

    return NextResponse.json({
      success: true,
      message: "Registration completed successfully!",
      registrationId: updatedRegistration.id,
    })
  } catch (error) {
    console.error("Partner confirmation error:", error)
    return NextResponse.json({ error: "Failed to complete registration. Please try again." }, { status: 500 })
  }
}
