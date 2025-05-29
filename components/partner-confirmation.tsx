"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Heart, Sparkles, CheckCircle, AlertCircle } from "lucide-react"

interface PartnerConfirmationProps {
  token: string
}

interface RegistrationData {
  id: string
  studentName: string
  studentEmail: string
  partnerEmail: string
}

export function PartnerConfirmation({ token }: PartnerConfirmationProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isValidating, setIsValidating] = useState(true)
  const [isValidToken, setIsValidToken] = useState(false)
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null)
  const [error, setError] = useState("")
  const [partnerData, setPartnerData] = useState({
    name: "",
    email: "",
    studentId: "",
    year: "",
    department: "",
    emergencyContact: "",
    agreeToTerms: false,
  })
  const [registrationComplete, setRegistrationComplete] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch(`/api/partner-confirm/${token}`)
        const data = await response.json()

        if (response.ok) {
          setIsValidToken(true)
          setRegistrationData(data.registration)
          setPartnerData((prev) => ({ ...prev, email: data.registration.partnerEmail }))
        } else {
          setError(data.error || "Invalid invitation")
        }
      } catch (err) {
        console.log(err);
        
        setError("Failed to validate invitation")
      } finally {
        setIsValidating(false)
      }
    }

    validateToken()
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`/api/partner-confirm/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(partnerData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      setRegistrationComplete(true)
      toast({
        title: "Registration Complete! 🎭",
        description: "Welcome to the Celestial Ball! You'll receive confirmation details soon.",
      })
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setPartnerData((prev) => ({ ...prev, [field]: value }))
  }

  if (isValidating) {
    return (
      <div className="max-w-md mx-auto mt-20">
        <Card className="bg-slate-800/50 border-gold-500/20 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-slate-900 animate-spin" />
            </div>
            <CardTitle className="text-2xl font-bold text-gold-300">Validating Invitation</CardTitle>
            <CardDescription className="text-silver-300">
              Please wait while we verify your invitation...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (!isValidToken || error) {
    return (
      <div className="max-w-md mx-auto mt-20">
        <Card className="bg-slate-800/50 border-red-500/20 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-500 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-red-400">Invalid Invitation</CardTitle>
            <CardDescription className="text-silver-300">
              {error || "This invitation link is invalid or has expired."}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (registrationComplete) {
    return (
      <div className="max-w-md mx-auto mt-20">
        <Card className="bg-slate-800/50 border-gold-500/20 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-slate-900" />
            </div>
            <CardTitle className="text-3xl font-bold text-gold-300">Welcome to the Ball!</CardTitle>
            <CardDescription className="text-silver-300 text-lg mt-4">
              Your registration is complete. Get ready for an enchanting evening!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-silver-400 mb-6">
              {`You'll receive detailed information about the event, including dress code and venue details, via email
              soon.`}
            </p>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text text-transparent mb-4">
          {`You're Invited!`}
        </h1>
        <p className="text-xl text-silver-200">{registrationData?.studentName} has invited you to the Celestial Ball</p>
      </div>

      <Card className="bg-slate-800/50 border-gold-500/20 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center pb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-rose-400" />
            <CardTitle className="text-3xl font-bold text-gold-300">Partner Registration</CardTitle>
            <Heart className="w-6 h-6 text-rose-400" />
          </div>
          <CardDescription className="text-silver-300 text-lg">
            Complete your registration for the masquerade
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-silver-200">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={partnerData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    className="bg-slate-700/50 border-silver-600 text-silver-100 placeholder:text-silver-400 focus:border-gold-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentId" className="text-silver-200">
                    Student ID
                  </Label>
                  <Input
                    id="studentId"
                    value={partnerData.studentId}
                    onChange={(e) => handleInputChange("studentId", e.target.value)}
                    placeholder="Your student ID"
                    className="bg-slate-700/50 border-silver-600 text-silver-100 placeholder:text-silver-400 focus:border-gold-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-silver-200">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={partnerData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-slate-700/50 border-silver-600 text-silver-100 placeholder:text-silver-400 focus:border-gold-400"
                  required
                  disabled
                />
                <p className="text-sm text-silver-400">This email must match the invitation sent to you</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year" className="text-silver-200">
                    Academic Year
                  </Label>
                  <Select onValueChange={(value) => handleInputChange("year", value)}>
                    <SelectTrigger className="bg-slate-700/50 border-silver-600 text-silver-100 focus:border-gold-400">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-silver-600">
                      <SelectItem value="freshman">Freshman</SelectItem>
                      <SelectItem value="sophomore">Sophomore</SelectItem>
                      <SelectItem value="junior">Junior</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department" className="text-silver-200">
                    Department
                  </Label>
                  <Input
                    id="department"
                    value={partnerData.department}
                    onChange={(e) => handleInputChange("department", e.target.value)}
                    placeholder="Your department"
                    className="bg-slate-700/50 border-silver-600 text-silver-100 placeholder:text-silver-400 focus:border-gold-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContact" className="text-silver-200">
                  Emergency Contact
                </Label>
                <Input
                  id="emergencyContact"
                  value={partnerData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  placeholder="Emergency contact number"
                  className="bg-slate-700/50 border-silver-600 text-silver-100 placeholder:text-silver-400 focus:border-gold-400"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={partnerData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                className="border-silver-600 data-[state=checked]:bg-gold-500 data-[state=checked]:border-gold-500"
              />
              <Label htmlFor="terms" className="text-sm text-silver-300">
                I agree to the terms and conditions and code of conduct for the Celestial Ball
              </Label>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !partnerData.agreeToTerms}
              className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-900 font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Completing Registration...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Join the Masquerade
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
