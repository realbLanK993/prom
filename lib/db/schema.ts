import { pgTable, text, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core"

export const academicYearEnum = pgEnum("academic_year", ["freshman", "sophomore", "junior", "senior", "graduate"])

export const registrationStatusEnum = pgEnum("registration_status", [
  "pending_partner_confirmation",
  "completed",
  "cancelled",
])

export const registrations = pgTable("registrations", {
  id: uuid("id").primaryKey().defaultRandom(),

  // Student information
  studentName: text("student_name").notNull(),
  studentEmail: text("student_email").notNull(),
  studentId: text("student_id").notNull(),
  studentYear: academicYearEnum("student_year").notNull(),
  studentDepartment: text("student_department").notNull(),
  studentEmergencyContact: text("student_emergency_contact").notNull(),

  // Partner information
  partnerEmail: text("partner_email").notNull(),
  partnerName: text("partner_name"),
  partnerStudentId: text("partner_student_id"),
  partnerYear: academicYearEnum("partner_year"),
  partnerDepartment: text("partner_department"),
  partnerEmergencyContact: text("partner_emergency_contact"),

  // Registration details
  partnerToken: text("partner_token").notNull().unique(),
  status: registrationStatusEnum("status").notNull().default("pending_partner_confirmation"),
  dietaryRestrictions: text("dietary_restrictions"),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export type Registration = typeof registrations.$inferSelect
export type NewRegistration = typeof registrations.$inferInsert
