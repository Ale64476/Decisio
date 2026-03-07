"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Play, Wallet, Globe, Server, HardDrive, Cpu, CheckCircle, ArrowRight, Lightbulb, Zap, Shield, TrendingUp, Circle } from "lucide-react"
import { useState } from "react"

interface SimulatorPanelProps {
  scenario: string
  onBack: () => void
  onViewResults: () => void
}

const montoOptions = ["$100", "$500", "$1,000", "$5,000"]
const origenOptions = ["Estados Unidos", "Canada", "Espana"]
const destinoOptions = ["Mexico", "Guatemala", "Colombia"]
const frecuenciaOptions = ["Unica vez", "Mensual", "Semanal", "Quincenal"]
const metodoOptions = ["Banco", "Remesadora", "Bitcoin"]
const anosOptions = ["1 ano", "3 anos", "5 anos", "10 anos"]

const transactionSteps = [
  { id: "wallet", label: "Wallet", icon: Wallet, description: "Una wallet permite enviar y recibir Bitcoin.", color: "#3b82f6" },
  { id: "red", label: "Red", icon: Globe, description: "La transacción se propaga a través de la red.", color: "#8b5cf6" },
  { id: "mempool", label: "Mempool", icon: Server, description: "Aquí esperan las transacciones pendientes.", color: "#06b6d4" },
  { id: "mineria", label: "Minería", icon: Cpu, description: "Los mineros agrupan transacciones en un bloque.", color: "#f59e0b" },
  { id: "bloque", label: "Bloque", icon: HardDrive, description: "Tu transacción fue incluida en un nuevo bloque.", color: "#22c55e" },
  { id: "confirmacion", label: "Confirmación", icon: CheckCircle, description: "Cada confirmación aumenta la seguridad de la transacción.", color: "#10b981" },
]

export function SimulatorPanel({ scenario, onBack, onViewResults }: SimulatorPanelProps) {
  const [selectedMonto, setSelectedMonto] = useState("$500")
  const [selectedOrigen, setSelectedOrigen] = useState("Estados Unidos")
  const [selectedDestino, setSelectedDestino] = useState("Mexico")
  const [selectedFrecuencia, setSelectedFrecuencia] = useState("Mensual")
  const [selectedMetodo, setSelectedMetodo] = useState("Bitcoin")
  const [selectedAnos, setSelectedAnos] = useState("5 anos")
  const [educativeMode, setEducativeMode] = useState(true)
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationFinished, setSimulationFinished] = useState(false)
  const [activeStep, setActiveStep] = useState<string | null>(null)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  const getCountryFlag = (country: string) => {
    const flags: Record<string, string> = {
      "Estados Unidos": "🇺🇸",
      "Canada": "🇨🇦",
      "Espana": "🇪🇸",
      "Mexico": "🇲🇽",
      "Guatemala": "🇬🇹",
      "Colombia": "🇨🇴"
    }
    return flags[country] || "🌐"
  }

  const getMontoNumber = (monto: string) => parseInt(monto.replace(/[^\d]/g, ''))
  const estimatedFee = Math.max(2.5, getMontoNumber(selectedMonto) * 0.005)
  const estimatedReceived = getMontoNumber(selectedMonto) - estimatedFee
  const estimatedTime = selectedMetodo === "Bitcoin" ? "10-30 min" : "1-2 dias"

  const getCurrentStepDescription = () => {
    if (simulationFinished) {
      return "La simulación terminó correctamente. Ya puedes revisar el flujo completo o abrir el panel de resultados."
    }

    const step = transactionSteps.find(s => s.id === activeStep)
    return step ? step.description : "Haz clic en 'Ejecutar simulación' para ver el flujo de transacción."
  }

  const handleRunSimulation = () => {
    setIsSimulating(true)
    setSimulationFinished(false)
    setCompletedSteps([])
    setActiveStep(null)

    let stepIndex = 0
    const stepIds = transactionSteps.map((s) => s.id)

    const simulateNextStep = () => {
      if (stepIndex < stepIds.length) {
        const currentStep = stepIds[stepIndex]
        setActiveStep(currentStep)

        setTimeout(() => {
          setCompletedSteps((prev) => [...prev, currentStep])
          stepIndex++
          simulateNextStep()
        }, educativeMode ? 2600 : 1400)
      } else {
        setIsSimulating(false)
        setSimulationFinished(true)
        setActiveStep(null)
      }
    }

    simulateNextStep()
  }

  const getStepState = (stepId: string) => {
    if (completedSteps.includes(stepId)) return "completado"
    if (activeStep === stepId) return "activo"
    return "pendiente"
  }

  const currentStepIndex = transactionSteps.findIndex(s => s.id === activeStep)
  const estimatedProgressPercent = simulationFinished
    ? 100
    : isSimulating
      ? ((completedSteps.length + (activeStep ? 1 : 0)) / transactionSteps.length) * 100
      : 0

  const getStepNodeStyle = (color: string, state: string) => {
    if (state === "activo") {
      return {
        background: `linear-gradient(135deg, ${color}33, ${color}12)`,
        borderColor: color,
        boxShadow: `0 0 0 1px ${color}55, 0 12px 30px ${color}33`,
      }
    }

    if (state === "completado") {
      return {
        background: `linear-gradient(135deg, ${color}26, ${color}0d)`,
        borderColor: `${color}99`,
        boxShadow: `0 0 0 1px ${color}22`,
      }
    }

    return {}
  }

  const getStepIconStyle = (color: string, state: string) => {
    if (state === "activo" || state === "completado") {
      return { color }
    }

    return {}
  }

  const getStepLabelStyle = (color: string, state: string) => {
    if (state === "completado") {
      return { color }
    }

    return {}
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#3b82f6]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-[#8b5cf6]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

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
            Simulador
          </span>
        </div>
        <div className="flex items-center gap-3 bg-[#1e293b]/60 border border-[#334155]/50 rounded-xl px-4 py-2.5 hover:border-[#3b82f6]/30 transition-colors">
          <Lightbulb className={`w-4 h-4 transition-colors ${educativeMode ? 'text-[#f59e0b]' : 'text-[#64748b]'}`} />
          <Label htmlFor="educative-mode" className="text-sm text-[#94a3b8] cursor-pointer">Modo educativo</Label>
          <Switch 
            id="educative-mode" 
            checked={educativeMode} 
            onCheckedChange={setEducativeMode}
            disabled={isSimulating}
          />
        </div>
      </header>

      {/* Progress indicator */}
      <div className="relative z-10 px-8 lg:px-12 py-4 border-b border-[#334155]/20">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <span className="text-sm text-[#94a3b8]">Paso 2 de 3</span>
          <div className="flex-1 h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
            <div className="w-2/3 h-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] rounded-full" />
          </div>
        </div>
      </div>

      {/* Main Content - Split Layout */}
      <main className="relative z-10 flex-1 grid lg:grid-cols-2 gap-8 p-8 lg:p-12 overflow-y-auto">
        {/* LEFT COLUMN - Decision Tree */}
        <div className="space-y-6 flex flex-col">
          {/* Configuration Card */}
          <div className="bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 border border-[#334155]/50 rounded-2xl p-8 shadow-lg shadow-[#1e293b]/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3b82f6]/20 to-[#3b82f6]/5 border border-[#3b82f6]/20 flex items-center justify-center">
                <span className="text-lg font-bold text-[#3b82f6]">1</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Configura tu simulación</h2>
                <p className="text-xs text-[#64748b]">Define los parámetros de tu transacción</p>
              </div>
            </div>
            
            <div className="space-y-8">
              {/* Monto Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-[#3b82f6]">$</span>
                  </div>
                  <label className="text-sm font-semibold text-[#f8fafc]">Monto a enviar</label>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {montoOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedMonto(option)}
                      disabled={isSimulating}
                      className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${
                        selectedMonto === option
                          ? 'bg-[#3b82f6] text-white shadow-lg shadow-[#3b82f6]/30 scale-105'
                          : 'bg-[#0f172a]/60 border border-[#334155]/50 text-[#94a3b8] hover:bg-[#3b82f6]/15 hover:border-[#3b82f6]/40 hover:text-white hover:shadow-md'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Origen Section */}
              <div className="space-y-4 pt-2 border-t border-[#334155]/30">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-[#3b82f6]" />
                  </div>
                  <label className="text-sm font-semibold text-[#f8fafc]">País de origen</label>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {origenOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedOrigen(option)}
                      disabled={isSimulating}
                      className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${
                        selectedOrigen === option
                          ? 'bg-[#3b82f6] text-white shadow-lg shadow-[#3b82f6]/30 scale-105'
                          : 'bg-[#0f172a]/60 border border-[#334155]/50 text-[#94a3b8] hover:bg-[#3b82f6]/15 hover:border-[#3b82f6]/40 hover:text-white hover:shadow-md'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Destino Section */}
              <div className="space-y-4 pt-2 border-t border-[#334155]/30">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-[#8b5cf6]" />
                  </div>
                  <label className="text-sm font-semibold text-[#f8fafc]">País de destino</label>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {destinoOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedDestino(option)}
                      disabled={isSimulating}
                      className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${
                        selectedDestino === option
                          ? 'bg-[#8b5cf6] text-white shadow-lg shadow-[#8b5cf6]/30 scale-105'
                          : 'bg-[#0f172a]/60 border border-[#334155]/50 text-[#94a3b8] hover:bg-[#8b5cf6]/15 hover:border-[#8b5cf6]/40 hover:text-white hover:shadow-md'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Frecuencia Section */}
              <div className="space-y-4 pt-2 border-t border-[#334155]/30">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-[#f59e0b]" />
                  </div>
                  <label className="text-sm font-semibold text-[#f8fafc]">Frecuencia de envío</label>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {frecuenciaOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedFrecuencia(option)}
                      disabled={isSimulating}
                      className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${
                        selectedFrecuencia === option
                          ? 'bg-[#3b82f6] text-white shadow-lg shadow-[#3b82f6]/30 scale-105'
                          : 'bg-[#0f172a]/60 border border-[#334155]/50 text-[#94a3b8] hover:bg-[#3b82f6]/15 hover:border-[#3b82f6]/40 hover:text-white hover:shadow-md'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metodo Section */}
              <div className="space-y-4 pt-2 border-t border-[#334155]/30">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-[#f59e0b]" />
                  </div>
                  <label className="text-sm font-semibold text-[#f8fafc]">Método de transferencia</label>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {metodoOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedMetodo(option)}
                      disabled={isSimulating}
                      className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${
                        selectedMetodo === option
                          ? option === "Bitcoin" 
                            ? 'bg-gradient-to-r from-[#f59e0b] to-[#f97316] text-white shadow-lg shadow-[#f59e0b]/35 scale-105' 
                            : 'bg-[#3b82f6] text-white shadow-lg shadow-[#3b82f6]/30 scale-105'
                          : 'bg-[#0f172a]/60 border border-[#334155]/50 text-[#94a3b8] hover:border-[#f59e0b]/40 hover:text-white hover:shadow-md'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Periodo Section */}
              <div className="space-y-4 pt-2 border-t border-[#334155]/30">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-[#22c55e]">T</span>
                  </div>
                  <label className="text-sm font-semibold text-[#f8fafc]">Período de comparación</label>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {anosOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedAnos(option)}
                      disabled={isSimulating}
                      className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${
                        selectedAnos === option
                          ? 'bg-[#22c55e] text-white shadow-lg shadow-[#22c55e]/30 scale-105'
                          : 'bg-[#0f172a]/60 border border-[#334155]/50 text-[#94a3b8] hover:bg-[#22c55e]/15 hover:border-[#22c55e]/40 hover:text-white hover:shadow-md'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Execute Button */}
            <div className="mt-8 space-y-3">
              <Button 
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className="btn-shine w-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-90 text-white py-7 text-base font-semibold rounded-xl shadow-xl shadow-[#3b82f6]/30 transition-all hover:shadow-2xl hover:shadow-[#8b5cf6]/40 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Play className="mr-2.5 w-5 h-5" />
                {isSimulating ? "Simulando..." : simulationFinished ? "Ejecutar de nuevo" : "Ejecutar simulación"}
              </Button>

              {simulationFinished && (
                <Button
                  onClick={onViewResults}
                  className="w-full bg-[#0f172a] border border-[#22c55e]/40 hover:bg-[#22c55e]/10 text-white py-7 text-base font-semibold rounded-xl transition-all"
                >
                  Ver resultados detallados
                  <ArrowRight className="ml-2.5 w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Simulation Panel */}
        <div className="space-y-6 flex flex-col">
          {/* Transfer Route */}
          <div className="bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 border border-[#334155]/50 rounded-2xl p-8 shadow-lg shadow-[#1e293b]/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/5 border border-[#8b5cf6]/20 flex items-center justify-center">
                <span className="text-lg font-bold text-[#8b5cf6]">2</span>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">Ruta de transferencia</h2>
                <p className="text-xs text-[#64748b]">Visualiza el flujo de tu transacción</p>
              </div>
            </div>

            {/* Transfer Route Visualization */}
            <div className="bg-gradient-to-b from-[#0f172a]/80 to-[#1e293b]/40 border border-[#334155]/30 p-8 rounded-xl mb-8">
              <div className="flex items-center justify-between">
                {/* Origin */}
                <div className="text-center flex-1">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3b82f6]/25 to-[#3b82f6]/5 border-2 border-[#3b82f6]/50 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#3b82f6]/20">
                    <span className="text-3xl">{getCountryFlag(selectedOrigen)}</span>
                  </div>
                  <p className="text-xs font-bold text-white mb-1">{selectedOrigen}</p>
                  <p className="text-xs text-[#64748b] font-medium">Origen</p>
                </div>

                {/* Connection */}
                <div className="flex-1 mx-6 flex items-center justify-center">
                  <div className="relative w-full h-12 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full h-1 bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#22c55e] rounded-full shadow-lg shadow-[#8b5cf6]/20" />
                    </div>
                    <div className="relative bg-[#0f172a] border-2 border-[#8b5cf6] rounded-full p-2.5 shadow-lg shadow-[#8b5cf6]/30">
                      <ArrowRight className="w-5 h-5 text-[#8b5cf6]" />
                    </div>
                  </div>
                </div>

                {/* Destination */}
                <div className="text-center flex-1">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#22c55e]/25 to-[#22c55e]/5 border-2 border-[#22c55e]/50 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#22c55e]/20">
                    <span className="text-3xl">{getCountryFlag(selectedDestino)}</span>
                  </div>
                  <p className="text-xs font-bold text-white mb-1">{selectedDestino}</p>
                  <p className="text-xs text-[#64748b] font-medium">Destino</p>
                </div>
              </div>

              {/* Method Badge */}
              <div className="mt-6 flex items-center justify-center">
                <div className={`px-6 py-2.5 rounded-lg font-semibold text-white text-xs shadow-lg ${
                  selectedMetodo === "Bitcoin"
                    ? 'bg-gradient-to-r from-[#f59e0b] to-[#f97316] shadow-[#f59e0b]/30'
                    : 'bg-[#3b82f6] shadow-[#3b82f6]/30'
                }`}>
                  {selectedMetodo}
                </div>
              </div>
            </div>
          </div>

          {/* Bitcoin Transaction Journey - Horizontal Process */}
          <div className="bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 border border-[#334155]/50 rounded-2xl p-8 shadow-lg shadow-[#1e293b]/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 border border-[#22c55e]/20 flex items-center justify-center">
                <span className="text-lg font-bold text-[#22c55e]">3</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Viaje de la transacción</h2>
                <p className="text-xs text-[#64748b]">Blockchain: Wallet → Red → Mempool → Minería → Bloque → Confirmación</p>
              </div>
            </div>

            {/* Horizontal Process Flow */}
            <div className="bg-gradient-to-b from-[#0f172a]/80 to-[#1e293b]/40 border border-[#334155]/30 px-4 py-6 lg:px-5 lg:py-7 rounded-xl mb-6 overflow-hidden">
              <div className="flex items-start justify-between gap-1 w-full">
                {transactionSteps.map((step, index) => {
                  const state = getStepState(step.id)
                  const StepIcon = step.icon

                  return (
                    <div key={step.id} className="flex items-center flex-1 min-w-0">
                      {/* Step Node */}
                      <div className="flex flex-col items-center shrink-0">
                        <div className="relative">
                          {state === "activo" && (
                            <>
                              <div
                                className="absolute inset-0 rounded-full animate-ping"
                                style={{
                                  backgroundColor: `${step.color}22`,
                                  boxShadow: `0 0 24px ${step.color}55`,
                                  transform: "scale(1.22)",
                                }}
                              />
                              <div
                                className="absolute inset-0 rounded-full"
                                style={{
                                  boxShadow: `0 0 28px ${step.color}66`,
                                  transform: "scale(1.18)",
                                }}
                              />
                            </>
                          )}

                          <div
                            className="relative w-11 h-11 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all duration-300 bg-[#0f172a]/80 border-2 border-[#334155]/40"
                            style={getStepNodeStyle(step.color, state)}
                          >
                            <StepIcon
                              className={`w-5 h-5 ${state === "pendiente" ? "text-[#64748b]" : ""}`}
                              style={getStepIconStyle(step.color, state)}
                            />
                          </div>
                        </div>

                        <p
                          className={`text-[10px] lg:text-[11px] font-bold mt-2 text-center leading-tight min-h-[28px] w-14 lg:w-16 ${
                            state === "activo" ? "text-white" : state === "pendiente" ? "text-[#64748b]" : ""
                          }`}
                          style={getStepLabelStyle(step.color, state)}
                        >
                          {step.label}
                        </p>

                        <p
                          className={`text-[10px] mt-1 ${
                            state === "activo"
                              ? "text-[#3b82f6] font-semibold"
                              : state === "completado"
                                ? "text-[#10b981]"
                                : "text-[#475569]"
                          }`}
                        >
                          {state === "activo" && "Activo"}
                          {state === "completado" && "✓"}
                          {state === "pendiente" && "—"}
                        </p>
                      </div>

                      {/* Connector Line */}
                      {index < transactionSteps.length - 1 && (
                        <div className="flex-1 h-[3px] mx-1.5 lg:mx-2 rounded-full bg-[#334155] relative overflow-hidden min-w-[12px]">
                          {completedSteps.includes(step.id) && (
                            <div
                              className="absolute inset-0 rounded-full"
                              style={{
                                background: "linear-gradient(to right, #22c55e, #16a34a)",
                              }}
                            />
                          )}

                          {activeStep === step.id && (
                            <>
                              <div
                                className="absolute inset-0 rounded-full"
                                style={{
                                  background: "linear-gradient(to right, #22c55e, #3b82f6)",
                                }}
                              />
                              <div
                                className="absolute inset-y-[-3px] w-10 rounded-full animate-pulse"
                                style={{
                                  right: 0,
                                  background: "linear-gradient(to right, transparent, #60a5fa, transparent)",
                                  filter: "blur(4px)",
                                }}
                              />
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
            
            {/* Educational Card */}
            {educativeMode && (
              <div className="relative z-10 px-8 lg:px-12 pt-6">
                <div className="max-w-7xl mx-auto">
                  <div className="glow-blue bg-gradient-to-br from-[#1e293b]/80 to-[#0f172a]/60 border border-[#3b82f6]/30 p-6 rounded-2xl shadow-lg shadow-[#3b82f6]/10">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/40 to-[#8b5cf6]/30 rounded-full blur-lg" />
                        <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#1e293b] to-[#0f172a] flex items-center justify-center border border-[#3b82f6]/40 shadow-lg">
                          <img 
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ajolote%20fintech-GPEqul13Rds1oDQEOr50vslu6pr6lQ.png" 
                            alt="Decisio Assistant" 
                            className="w-7 h-7 object-contain"
                          />
                        </div>
                      </div>

                      <div className="flex-1 pt-1">
                        <p className="text-sm font-bold text-[#3b82f6] mb-2">Decisio</p>
                        <p className="text-[#cbd5e1] text-sm leading-relaxed">
                          {isSimulating
                            ? getCurrentStepDescription()
                            : simulationFinished
                              ? "La simulación ha finalizado. Puedes revisar el recorrido completo o abrir el panel de resultados detallados."
                              : "Los parámetros que seleccionas determinan cómo se procesará tu transacción. Bitcoin ofrece comisiones más bajas pero mayor volatilidad de precio."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* KPI Cards - Simulation Outcome */}
          <div className="bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 border border-[#334155]/50 rounded-2xl p-8 shadow-lg shadow-[#1e293b]/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f59e0b]/20 to-[#f59e0b]/5 border border-[#f59e0b]/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#f59e0b]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Resultados simulados</h2>
                <p className={`text-xs ${isSimulating ? 'text-[#3b82f6]' : simulationFinished ? 'text-[#22c55e]' : 'text-[#64748b]'}`}>
                  {isSimulating
                    ? `Etapa: ${activeStep ? transactionSteps.find(s => s.id === activeStep)?.label : 'Preparando...'}`
                    : simulationFinished
                      ? 'Simulación completada'
                      : 'Haz clic en ejecutar para ver los resultados'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Monto Enviado */}
              <div className="bg-gradient-to-br from-[#0f172a]/80 to-[#1e293b]/40 border border-[#334155]/30 p-6 rounded-xl">
                <p className="text-xs font-semibold text-[#94a3b8] mb-3">Monto enviado</p>
                <p className="text-2xl font-bold text-white mb-1">{selectedMonto}</p>
                <p className="text-xs text-[#64748b]">Cantidad original</p>
              </div>

              {/* Comisión */}
              <div className="bg-gradient-to-br from-[#0f172a]/80 to-[#1e293b]/40 border border-[#334155]/30 p-6 rounded-xl">
                <p className="text-xs font-semibold text-[#94a3b8] mb-3">Comisión estimada</p>
                <p className="text-2xl font-bold text-[#f59e0b]">${estimatedFee.toFixed(2)}</p>
                <p className="text-xs text-[#64748b]">({((estimatedFee / getMontoNumber(selectedMonto)) * 100).toFixed(2)}%)</p>
              </div>

              {/* Monto Recibido */}
              <div className="bg-gradient-to-br from-[#0f172a]/80 to-[#1e293b]/40 border border-[#334155]/30 p-6 rounded-xl">
                <p className="text-xs font-semibold text-[#94a3b8] mb-3">Monto recibido</p>
                <p className="text-2xl font-bold text-[#22c55e]">${estimatedReceived.toFixed(2)}</p>
                <p className="text-xs text-[#64748b]">Después de comisiones</p>
              </div>

              {/* Tiempo Estimado */}
              <div className="bg-gradient-to-br from-[#0f172a]/80 to-[#1e293b]/40 border border-[#334155]/30 p-6 rounded-xl">
                <p className="text-xs font-semibold text-[#94a3b8] mb-3">Tiempo estimado</p>
                <p className="text-2xl font-bold text-[#3b82f6]">{estimatedTime}</p>
                <p className="text-xs text-[#64748b]">{selectedMetodo}</p>
              </div>
            </div>

            {/* Estado Actual */}
            <div className="bg-gradient-to-r from-[#3b82f6]/10 to-[#8b5cf6]/10 border border-[#3b82f6]/30 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-[#3b82f6] animate-pulse" />
                <p className="text-sm font-semibold text-white">Estado actual de la transacción</p>
              </div>
              <p className="text-sm text-[#cbd5e1]">
                {isSimulating
                  ? activeStep
                    ? `En progreso: ${transactionSteps.find(s => s.id === activeStep)?.label}`
                    : 'Iniciando simulación...'
                  : simulationFinished
                    ? 'Simulación finalizada. El flujo completó todas las etapas.'
                    : 'Esperando para ejecutar simulación'}
              </p>

              {(isSimulating || simulationFinished) && (
                <div className="w-full h-2 bg-[#0f172a]/60 rounded-full mt-4 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#3b82f6] to-[#22c55e] rounded-full transition-all duration-300"
                    style={{ width: `${estimatedProgressPercent}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
