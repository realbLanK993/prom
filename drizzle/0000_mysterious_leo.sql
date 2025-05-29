DO $$ BEGIN
 CREATE TYPE "public"."academic_year" AS ENUM('freshman', 'sophomore', 'junior', 'senior', 'graduate');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."registration_status" AS ENUM('pending_partner_confirmation', 'completed', 'cancelled');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "registrations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"student_name" text NOT NULL,
	"student_email" text NOT NULL,
	"student_id" text NOT NULL,
	"student_year" "academic_year" NOT NULL,
	"student_department" text NOT NULL,
	"student_emergency_contact" text NOT NULL,
	"partner_email" text NOT NULL,
	"partner_name" text,
	"partner_student_id" text,
	"partner_year" "academic_year",
	"partner_department" text,
	"partner_emergency_contact" text,
	"partner_token" text NOT NULL,
	"status" "registration_status" DEFAULT 'pending_partner_confirmation' NOT NULL,
	"dietary_restrictions" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "registrations_partner_token_unique" UNIQUE("partner_token")
);
