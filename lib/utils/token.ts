import { randomBytes } from "crypto"

export function generateSecureToken(): string {
  return randomBytes(32).toString("hex")
}

export function isTokenExpired(createdAt: Date, expiryDays = 7): boolean {
  const expiryDate = new Date(createdAt)
  expiryDate.setDate(expiryDate.getDate() + expiryDays)
  return new Date() > expiryDate
}
