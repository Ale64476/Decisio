"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap, Shield, Clock } from "lucide-react"

interface LandingPageProps {
  onStartSimulation: () => void
  onViewScenarios: () => void
}

export function LandingPage({ onStartSimulation, onViewScenarios }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#3b82f6]/8 via-[#8b5cf6]/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#8b5cf6]/8 via-[#3b82f6]/5 to-transparent rounded-full blur-3xl" />
      
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 lg:px-12 py-5 border-b border-[#334155]/30 backdrop-blur-sm bg-[#0f172a]/80">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/30 to-[#8b5cf6]/30 rounded-full blur-lg" />
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ajolote%20fintech-GPEqul13Rds1oDQEOr50vslu6pr6lQ.png" 
              alt="Decisio" 
              className="relative w-10 h-10 object-contain"
            />
          </div>
          <span className="text-2xl font-bold gradient-text-animated">
            Decisio
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={onViewScenarios} className="text-[#94a3b8] hover:text-white transition-colors text-sm font-medium">
            Escenarios
          </button>
          <button className="text-[#94a3b8] hover:text-white transition-colors text-sm font-medium">
            Como funciona
          </button>
          <button className="text-[#94a3b8] hover:text-white transition-colors text-sm font-medium">
            Acerca de
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-8 lg:px-12 py-16 lg:py-24">
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#3b82f6]/10 to-[#8b5cf6]/10 border border-[#3b82f6]/20 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-[#3b82f6]" />
                <span className="text-sm font-medium text-[#3b82f6]">Plataforma educativa de Bitcoin</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight text-balance">
                Explora decisiones financieras con{" "}
                <span className="gradient-text-animated">
                  Bitcoin
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-[#94a3b8] max-w-xl leading-relaxed">
                Compara remesas, ahorros y transferencias internacionales usando Bitcoin 
                versus sistemas tradicionales. Visualiza el impacto real de tus decisiones.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={onStartSimulation}
                className="btn-shine bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-90 text-white px-8 py-7 text-base font-semibold rounded-2xl shadow-xl shadow-[#3b82f6]/25 transition-all hover:shadow-2xl hover:shadow-[#3b82f6]/30 hover:-translate-y-0.5"
              >
                Iniciar simulacion
                <ArrowRight className="ml-2.5 w-5 h-5" />
              </Button>
              <Button 
                onClick={onViewScenarios}
                variant="outline" 
                className="border-[#334155] bg-[#1e293b]/50 text-white hover:bg-[#1e293b] hover:border-[#3b82f6]/50 px-8 py-7 text-base font-semibold rounded-2xl backdrop-blur-sm transition-all hover:-translate-y-0.5"
              >
                Ver escenarios
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-10 pt-6">
              <div className="space-y-1">
                <p className="text-3xl lg:text-4xl font-bold text-white">21M</p>
                <p className="text-sm text-[#64748b]">Bitcoin limitados</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl lg:text-4xl font-bold text-white">$60B+</p>
                <p className="text-sm text-[#64748b]">Remesas anuales MX</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl lg:text-4xl font-bold text-white">10min</p>
                <p className="text-sm text-[#64748b]">Confirmacion promedio</p>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/20 via-[#8b5cf6]/20 to-[#3b82f6]/20 rounded-full blur-[100px] animate-pulse" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/10 to-[#8b5cf6]/10 rounded-full blur-3xl scale-110" />
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Decisio-tCuoZ65Kbu9a1jKEjRW6GeotSLLj5s.png" 
                alt="Decisio Hero" 
                className="relative w-full max-w-md lg:max-w-xl xl:max-w-2xl object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Features Strip */}
      <div className="relative z-10 border-t border-[#334155]/30 bg-[#0f172a]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3b82f6]/20 to-[#3b82f6]/5 border border-[#3b82f6]/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#3b82f6]" />
              </div>
              <div>
                <p className="text-white font-semibold">Simulacion en tiempo real</p>
                <p className="text-sm text-[#64748b]">Resultados instantaneos</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/5 border border-[#8b5cf6]/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#8b5cf6]" />
              </div>
              <div>
                <p className="text-white font-semibold">100% educativo</p>
                <p className="text-sm text-[#64748b]">Sin riesgo financiero</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 border border-[#22c55e]/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#22c55e]" />
              </div>
              <div>
                <p className="text-white font-semibold">Proyecciones a largo plazo</p>
                <p className="text-sm text-[#64748b]">Hasta 10 anos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assistant Card */}
      <div className="relative z-10 px-8 lg:px-12 py-10 bg-gradient-to-t from-[#0f172a] to-transparent">
        <div className="max-w-3xl mx-auto">
          <div className="card-hover glow-blue bg-gradient-to-br from-[#1e293b] to-[#1e293b]/80 border border-[#334155]/50 backdrop-blur-xl p-6 rounded-2xl">
            <div className="flex items-start gap-5">
              <div className="shrink-0 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/30 to-[#8b5cf6]/30 rounded-full blur-lg" />
                <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#1e293b] to-[#0f172a] flex items-center justify-center border border-[#3b82f6]/30 ring-2 ring-[#3b82f6]/10">
                  <img 
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ajolote%20fintech-GPEqul13Rds1oDQEOr50vslu6pr6lQ.png" 
                    alt="Decisio Assistant" 
                    className="w-9 h-9 object-contain"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-sm font-semibold text-[#3b82f6]">Decisio</p>
                  <span className="px-2 py-0.5 rounded-full bg-[#3b82f6]/10 text-[10px] font-medium text-[#3b82f6] uppercase tracking-wide">
                    Asistente IA
                  </span>
                </div>
                <p className="text-[#cbd5e1] leading-relaxed">
                  Hola, soy Decisio. Te ayudare a entender como diferentes decisiones 
                  financieras impactan el resultado de tu dinero. Explora escenarios de 
                  remesas, ahorros e inversiones de forma interactiva.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
