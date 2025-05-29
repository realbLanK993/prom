import { RegistrationForm } from "@/components/registration-form";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Celestial Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-silver-300 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-gold-300 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-silver-400 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 left-1/2 w-1 h-1 bg-gold-400 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-1/3 right-10 w-1.5 h-1.5 bg-silver-300 rounded-full animate-pulse delay-900"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center shadow-2xl">
              <svg
                className="w-12 h-12 text-slate-900"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text text-transparent mb-4">
            Celestial Ball
          </h1>
          <p className="text-xl md:text-2xl text-silver-200 font-light tracking-wide">
            An Evening of Enchantment & Mystery
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-6"></div>
        </div>

        <RegistrationForm />
      </div>
    </div>
  );
}
