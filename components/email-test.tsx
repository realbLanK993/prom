"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Mail, CheckCircle, AlertCircle } from "lucide-react"

export function EmailTest() {
  const [isLoading, setIsLoading] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const { toast } = useToast()

  const testEmailConnection = async () => {
    setIsLoading(true)
    setTestResult(null)

    try {
      const response = await fetch("/api/test-email")
      const data = await response.json()

      setTestResult(data)

      if (data.success) {
        console.log(data);
        
        toast({
          title: "Email Test Successful! ✅",
          description: "Gmail connection is working properly.",
        })
      } else {
        toast({
          title: "Email Test Failed ❌",
          description: data.message,
          variant: "destructive",
        })
      }
    } catch (err) {
      console.log(err);
      
      const errorMessage = "Failed to test email connection"
      setTestResult({ success: false, message: errorMessage })
      toast({
        title: "Test Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-slate-800/50 border-gold-500/20 backdrop-blur-sm shadow-2xl max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center">
          <Mail className="w-8 h-8 text-slate-900" />
        </div>
        <CardTitle className="text-2xl font-bold text-gold-300">Email System Test</CardTitle>
        <CardDescription className="text-silver-300">Test your Gmail configuration</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Button
          onClick={testEmailConnection}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-900 font-semibold"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing Connection...
            </>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
              Test Email Connection
            </>
          )}
        </Button>

        {testResult && (
          <div
            className={`p-4 rounded-lg border ${
              testResult.success
                ? "bg-green-900/20 border-green-500/20 text-green-300"
                : "bg-red-900/20 border-red-500/20 text-red-300"
            }`}
          >
            <div className="flex items-center gap-2">
              {testResult.success ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <span className="font-medium">{testResult.success ? "Success" : "Failed"}</span>
            </div>
            <p className="mt-1 text-sm">{testResult.message}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
