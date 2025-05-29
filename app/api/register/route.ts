import { type NextRequest, NextResponse } from "next/server"
import { sendPartnerInvitationEmail } from "@/lib/email"
import { generateSecureToken } from "@/lib/utils/token"
import { eq } from "drizzle-orm"
import { registrations } from "@/lib/db/schema"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      studentName,
      studentEmail,
      studentId,
      year,
      department,
      partnerEmail,
      dietaryRestrictions,
      emergencyContact,
    } = body

    // Validate required fields
    if (!studentName || !studentEmail || !studentId || !partnerEmail || !year || !department || !emergencyContact) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if student is already registered
    const existingRegistration = await db
      .select()
      .from(registrations)
      .where(eq(registrations.studentEmail, studentEmail))
      .limit(1)

    if (existingRegistration.length > 0) {
      return NextResponse.json({ error: "Student is already registered" }, { status: 409 })
    }

    // Check if partner email is already used
    const existingPartner = await db
      .select()
      .from(registrations)
      .where(eq(registrations.partnerEmail, partnerEmail))
      .limit(1)

    if (existingPartner.length > 0) {
      return NextResponse.json(
        { error: "Partner email is already associated with another registration" },
        { status: 409 },
      )
    }

    // Generate secure token for partner
    const partnerToken = generateSecureToken()

    // Create registration record
    const [newRegistration] = await db
      .insert(registrations)
      .values({
        studentName,
        studentEmail,
        studentId,
        studentYear: year,
        studentDepartment: department,
        studentEmergencyContact: emergencyContact,
        partnerEmail,
        partnerToken,
        dietaryRestrictions: dietaryRestrictions || null,
        status: "pending_partner_confirmation",
      })
      .returning()

    // Generate partner confirmation URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const partnerConfirmationUrl = `${baseUrl}/partner-confirm/${partnerToken}`

    // Send invitation email to partner
    await sendPartnerInvitationEmail(partnerEmail, partnerConfirmationUrl, studentName)

    return NextResponse.json({
      success: true,
      message: "Registration initiated successfully. Partner invitation sent.",
      registrationId: newRegistration.id,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Failed to process registration. Please try again." }, { status: 500 })
  }
}
