import { EmailTest } from "@/components/email-test"

export default function EmailTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Celestial Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-silver-300 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-gold-300 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-silver-400 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 left-1/2 w-1 h-1 bg-gold-400 rounded-full animate-pulse delay-300"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text text-transparent mb-4">
            Email Configuration
          </h1>
          <p className="text-xl text-silver-200">Test your Gmail setup</p>
        </div>

        <EmailTest />
      </div>
    </div>
  )
}
