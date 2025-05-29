"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Sparkles, Heart, Users, CheckCircle } from "lucide-react"

export function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [registrationId, setRegistrationId] = useState("")
  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    studentId: "",
    year: "",
    department: "",
    partnerEmail: "",
    emergencyContact: "",
    agreeToTerms: false,
  })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      setIsSuccess(true)
      setRegistrationId(data.registrationId)

      toast({
        title: "Registration Initiated! ✨",
        description: "Your partner will receive a magical invitation to complete the registration.",
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
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto">
        <Card className="bg-slate-800/50 border-gold-500/20 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-slate-900" />
            </div>
            <CardTitle className="text-3xl font-bold text-gold-300">Registration Initiated!</CardTitle>
            <CardDescription className="text-silver-300 text-lg mt-4">
              Your partner will receive an invitation email shortly
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-silver-400 mb-4">
              Registration ID: <code className="bg-slate-700 px-2 py-1 rounded text-gold-300">{registrationId}</code>
            </p>
            <p className="text-silver-400 mb-6">
              Your partner has 7 days to complete their registration using the unique link sent to their email.
            </p>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-slate-800/50 border-gold-500/20 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center pb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-gold-400" />
            <CardTitle className="text-3xl font-bold text-gold-300">Join the Masquerade</CardTitle>
            <Sparkles className="w-6 h-6 text-gold-400" />
          </div>
          <CardDescription className="text-silver-300 text-lg">
            Register for an unforgettable evening of elegance and mystery
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Student Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-gold-400" />
                <h3 className="text-xl font-semibold text-gold-300">Your Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentName" className="text-silver-200">
                    Full Name
                  </Label>
                  <Input
                    id="studentName"
                    value={formData.studentName}
                    onChange={(e) => handleInputChange("studentName", e.target.value)}
                    placeholder="Enter your full name"
                    className="bg-slate-700/50 border-silver-600 text-silver-100 placeholder:text-silver-400 focus:border-gold-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentId" className="text-silver-200">
                    Student Roll Number
                  </Label>
                  <Input
                    id="studentId"
                    value={formData.studentId}
                    onChange={(e) => handleInputChange("studentId", e.target.value)}
                    placeholder="Your student Roll Number"
                    className="bg-slate-700/50 border-silver-600 text-silver-100 placeholder:text-silver-400 focus:border-gold-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentEmail" className="text-silver-200">
                  Your Email
                </Label>
                <Input
                  id="studentEmail"
                  type="email"
                  value={formData.studentEmail}
                  onChange={(e) => handleInputChange("studentEmail", e.target.value)}
                  placeholder="your.email@college.edu"
                  className="bg-slate-700/50 border-silver-600 text-silver-100 placeholder:text-silver-400 focus:border-gold-400"
                  required
                />
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
                      <SelectItem value="foundational">Foundational</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="bsc">Degree (BSC)</SelectItem>
                      <SelectItem value="bs">Degree (BS)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department" className="text-silver-200">
                    Department
                  </Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleInputChange("department", e.target.value)}
                    placeholder="Your department"
                    className="bg-slate-700/50 border-silver-600 text-silver-100 placeholder:text-silver-400 focus:border-gold-400"
                    required
                  />
                  <Select onValueChange={(e) => handleInputChange("department", e)}>
                    <SelectTrigger className="bg-slate-700/50 border-silver-600 text-silver-100 focus:border-gold-400">
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-silver-600">
                      <SelectItem value="ds">Data Science</SelectItem>
                      <SelectItem value="es">Electronic Systems</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Partner Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-rose-400" />
                <h3 className="text-xl font-semibold text-gold-300">Your Partner</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="partnerEmail" className="text-silver-200">
                  {`Partner's Email`}
                </Label>
                <Input
                  id="partnerEmail"
                  type="email"
                  value={formData.partnerEmail}
                  onChange={(e) => handleInputChange("partnerEmail", e.target.value)}
                  placeholder="partner.email@college.edu"
                  className="bg-slate-700/50 border-silver-600 text-silver-100 placeholder:text-silver-400 focus:border-gold-400"
                  required
                />
                <p className="text-sm text-silver-400">
                  Your partner will receive a unique invitation link to complete the registration
                </p>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gold-300">Additional Details</h3>

              <div className="space-y-2">
                <Label htmlFor="emergencyContact" className="text-silver-200">
                  Emergency Contact
                </Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  placeholder="Emergency contact number"
                  className="bg-slate-700/50 border-silver-600 text-silver-100 placeholder:text-silver-400 focus:border-gold-400"
                  required
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                className="border-silver-600 data-[state=checked]:bg-gold-500 data-[state=checked]:border-gold-500"
              />
              <Label htmlFor="terms" className="text-sm text-silver-300">
                I agree to the terms and conditions and code of conduct for the Celestial Ball
              </Label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || !formData.agreeToTerms}
              className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-900 font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending Invitation...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Begin the Magic
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
