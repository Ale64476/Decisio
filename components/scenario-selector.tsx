"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Send, Download, PiggyBank, CreditCard, Plus, Check, ArrowRight } from "lucide-react"
import { useState } from "react"

interface ScenarioSelectorProps {
  onBack: () => void
  onSelectScenario: (scenario: string) => void
}

const scenarios = [
  {
    id: "remesa-enviar",
    title: "Enviar remesa internacional",
    description: "Compara el costo de enviar dinero a Mexico desde Estados Unidos usando diferentes metodos.",
    icon: Send,
    gradient: "from-[#3b82f6] to-[#60a5fa]",
    glowColor: "shadow-[#3b82f6]/20",
    borderHover: "hover:border-[#3b82f6]/50",
  },
  {
    id: "remesa-recibir",
    title: "Recibir pago internacional",
    description: "Analiza cuanto recibes realmente al recibir un pago del extranjero.",
    icon: Download,
    gradient: "from-[#8b5cf6] to-[#a78bfa]",
    glowColor: "shadow-[#8b5cf6]/20",
    borderHover: "hover:border-[#8b5cf6]/50",
  },
  {
    id: "ahorro",
    title: "Ahorro mensual",
    description: "Simula el crecimiento de tu ahorro a largo plazo con diferentes instrumentos financieros.",
    icon: PiggyBank,
    gradient: "from-[#22c55e] to-[#4ade80]",
    glowColor: "shadow-[#22c55e]/20",
    borderHover: "hover:border-[#22c55e]/50",
  },
  {
    id: "pago-nacional",
    title: "Pago nacional",
    description: "Compara transferencias bancarias tradicionales con alternativas digitales modernas.",
    icon: CreditCard,
    gradient: "from-[#f59e0b] to-[#fbbf24]",
    glowColor: "shadow-[#f59e0b]/20",
    borderHover: "hover:border-[#f59e0b]/50",
  },
  {
    id: "personalizado",
    title: "Escenario personalizado",
    description: "Configura tu propio escenario con parametros completamente personalizados.",
    icon: Plus,
    gradient: "from-[#64748b] to-[#94a3b8]",
    glowColor: "shadow-[#64748b]/20",
    borderHover: "hover:border-[#64748b]/50",
  },
]

export function ScenarioSelector({ onBack, onSelectScenario }: ScenarioSelectorProps) {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null)

  const handleSelect = (id: string) => {
    setSelectedScenario(id)
  }

  const handleContinue = () => {
    if (selectedScenario) {
      onSelectScenario(selectedScenario)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-[#3b82f6]/5 via-transparent to-transparent rounded-full" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 lg:px-12 py-5 border-b border-[#334155]/30 backdrop-blur-sm bg-[#0f172a]/80">
        <button 
          onClick={onBack}
          className="flex items-center gap-2.5 text-[#94a3b8] hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Volver</span>
        </button>
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
        <div className="w-24" />
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 px-8 lg:px-12 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e293b]/80 border border-[#334155]/50 mb-6">
              <span className="text-sm text-[#94a3b8]">Paso 1 de 3</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 text-balance">
              Selecciona un escenario financiero
            </h1>
            <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto leading-relaxed">
              Elige el tipo de transaccion que deseas simular. Compararemos Bitcoin 
              contra metodos tradicionales para que visualices las diferencias.
            </p>
          </div>

          {/* Scenario Cards Grid */}
          <div className="grid md:grid-cols-2 gap-5 mb-12">
            {scenarios.map((scenario) => {
              const Icon = scenario.icon
              const isSelected = selectedScenario === scenario.id
              
              return (
                <button 
                  key={scenario.id}
                  onClick={() => handleSelect(scenario.id)}
                  className={`
                    group relative text-left bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 
                    border rounded-2xl p-6 lg:p-7
                    transition-all duration-300 
                    ${scenario.borderHover}
                    ${isSelected 
                      ? `border-[#3b82f6] ring-2 ring-[#3b82f6]/20 shadow-xl ${scenario.glowColor}` 
                      : 'border-[#334155]/50 hover:bg-[#1e293b]/80 hover:shadow-lg'
                    }
                  `}
                >
                  {/* Selection indicator */}
                  <div className={`
                    absolute top-5 right-5 w-7 h-7 rounded-full flex items-center justify-center
                    transition-all duration-300
                    ${isSelected 
                      ? 'bg-[#3b82f6] scale-100 opacity-100' 
                      : 'bg-[#334155]/50 scale-90 opacity-0 group-hover:opacity-50'
                    }
                  `}>
                    <Check className="w-4 h-4 text-white" />
                  </div>

                  {/* Icon */}
                  <div className={`
                    w-14 h-14 rounded-xl bg-gradient-to-br ${scenario.gradient} 
                    flex items-center justify-center mb-5
                    shadow-lg ${scenario.glowColor}
                    transition-transform duration-300 group-hover:scale-105
                  `}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-white mb-2 pr-8">{scenario.title}</h3>
                  <p className="text-sm text-[#94a3b8] leading-relaxed">{scenario.description}</p>
                </button>
              )
            })}
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <Button 
              onClick={handleContinue}
              disabled={!selectedScenario}
              className="btn-shine bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-90 text-white px-10 py-7 text-base font-semibold rounded-2xl shadow-xl shadow-[#3b82f6]/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all hover:shadow-2xl hover:-translate-y-0.5"
            >
              Continuar con la simulacion
              <ArrowRight className="ml-2.5 w-5 h-5" />
            </Button>
          </div>
        </div>
      </main>

      {/* Assistant Tip */}
      <div className="relative z-10 px-8 lg:px-12 py-10 bg-gradient-to-t from-[#0f172a] to-transparent">
        <div className="max-w-3xl mx-auto">
          <div className="glow-violet bg-gradient-to-br from-[#1e293b] to-[#1e293b]/80 border border-[#334155]/50 backdrop-blur-xl p-5 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="shrink-0 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/30 to-[#3b82f6]/30 rounded-full blur-md" />
                <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-[#1e293b] to-[#0f172a] flex items-center justify-center border border-[#8b5cf6]/30">
                  <img 
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ajolote%20fintech-GPEqul13Rds1oDQEOr50vslu6pr6lQ.png" 
                    alt="Decisio Assistant" 
                    className="w-7 h-7 object-contain"
                  />
                </div>
              </div>
              <div className="flex-1 pt-0.5">
                <p className="text-sm font-semibold text-[#8b5cf6] mb-1.5">Decisio</p>
                <p className="text-[#cbd5e1] text-sm leading-relaxed">
                  Cada escenario tiene parametros unicos. Te guiare paso a paso para 
                  configurar tu simulacion y comprender los resultados de manera clara.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
