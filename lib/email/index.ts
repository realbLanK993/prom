import nodemailer from "nodemailer"
import { getPartnerInvitationEmailTemplate, getRegistrationConfirmationEmailTemplate } from "./template"

if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
  throw new Error("GMAIL_USER and GMAIL_APP_PASSWORD environment variables are required")
}

// Create transporter using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function sendPartnerInvitationEmail(partnerEmail: string, confirmationUrl: string, studentName: string) {
  try {
    const template = getPartnerInvitationEmailTemplate({
      studentName,
      confirmationUrl,
    })

    const mailOptions = {
      from: `"Celestial Ball" <${process.env.GMAIL_USER}>`,
      to: partnerEmail,
      subject: template.subject,
      html: template.html,
      text: template.text,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log("Partner invitation email sent:", info.messageId)
    return info
  } catch (error) {
    console.error("Failed to send partner invitation email:", error)
    throw new Error("Failed to send invitation email")
  }
}

export async function sendRegistrationConfirmationEmails(
  studentEmail: string,
  partnerEmail: string,
  studentName: string,
  partnerName: string,
  registrationId: string,
) {
  try {
    const template = getRegistrationConfirmationEmailTemplate({
      studentName,
      partnerName,
      registrationId,
    })

    const mailOptions = {
      from: `"Celestial Ball" <${process.env.GMAIL_USER}>`,
      to: [studentEmail, partnerEmail],
      subject: template.subject,
      html: template.html,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log("Registration confirmation emails sent:", info.messageId)
    return info
  } catch (error) {
    console.error("Failed to send confirmation emails:", error)
    throw new Error("Failed to send confirmation emails")
  }
}

// Test email connection
export async function testEmailConnection() {
  try {
    await transporter.verify()
    console.log("Gmail connection verified successfully")
    return true
  } catch (error) {
    console.error("Gmail connection failed:", error)
    return false
  }
}
