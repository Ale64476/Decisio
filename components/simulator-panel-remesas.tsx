"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Play,
  Wallet,
  Globe,
  ArrowRightLeft,
  Network,
  Coins,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  Zap,
  Shield,
  TrendingUp,
} from "lucide-react"
import { useState } from "react"

interface SimulatorPanelProps {
  scenario: string
  onBack: () => void
  onViewResults: (query?: string) => void
}

const montoOptions = ["$100", "$300", "$500", "$1,000"]
const origenOptions = ["Estados Unidos", "Canadá"]
const frecuenciaOptions = ["Única", "Semanal", "Quincenal", "Mensual"]
const metodoOptions = ["Bitcoin", "Remesadora", "Banco"]

const transactionSteps = [
  {
    id: "origen",
    label: "Origen",
    icon: Wallet,
    color: "#3b82f6",
    description:
      "Tu remesa comienza en el país de origen. Aquí el dinero en moneda local se convierte a su equivalente en bitcoin y se prepara para enviarse desde una wallet o plataforma compatible.",
  },
  {
    id: "red",
    label: "Red",
    icon: Network,
    color: "#06b6d4",
    description:
      "La remesa ya entró a la red Bitcoin. En esta etapa, el valor empieza a transmitirse digitalmente sin seguir el camino tradicional de una remesadora o banco.",
  },
  {
    id: "mempool",
    label: "Mempool",
    icon: ArrowRightLeft,
    color: "#8b5cf6",
    description:
      "Antes de confirmarse, la transacción entra a una sala de espera llamada mempool. Ahí permanece hasta que pueda ser tomada para validación.",
  },
  {
    id: "mineria",
    label: "Minería",
    icon: Shield,
    color: "#f59e0b",
    description:
      "La red verifica que la remesa sea válida y que pueda añadirse al siguiente bloque. Este proceso aporta seguridad y evita envíos inválidos o duplicados.",
  },
  {
    id: "bloque",
    label: "Bloque",
    icon: Coins,
    color: "#22c55e",
    description:
      "La transacción ya fue incluida en un bloque. Eso significa que la remesa alcanzó un estado mucho más sólido dentro de la blockchain.",
  },
  {
    id: "destino",
    label: "Destino",
    icon: CheckCircle2,
    color: "#10b981",
    description:
      "La remesa ya llegó a destino. Una vez confirmada, el valor puede mantenerse digitalmente o convertirse a pesos mexicanos para que el destinatario lo reciba.",
  },
]

export function SimulatorPanelRemesas({ scenario: _scenario, onBack, onViewResults }: SimulatorPanelProps) {
  const [selectedMonto, setSelectedMonto] = useState("$500")
  const [selectedMetodo, setSelectedMetodo] = useState("Bitcoin")
  const [selectedFrecuencia, setSelectedFrecuencia] = useState("Mensual")
  const [selectedOrigen, setSelectedOrigen] = useState("Estados Unidos")

  const [educativeMode, setEducativeMode] = useState(true)
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationFinished, setSimulationFinished] = useState(false)
  const [activeStep, setActiveStep] = useState<string | null>(null)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  const selectedDestino = "México"

  const getCountryFlag = (country: string) => {
    const flags: Record<string, string> = {
      "Estados Unidos": "🇺🇸",
      "Canadá": "🇨🇦",
      "México": "🇲🇽",
    }
    return flags[country] || "🌐"
  }

  const getCurrencyCode = (country: string) => {
    const currencies: Record<string, string> = {
      "Estados Unidos": "USD",
      "Canadá": "CAD",
      "México": "MXN",
    }
    return currencies[country] || "N/A"
  }

  const getReferenceExchangeRate = (origen: string, destino: string) => {
    if (origen === "Estados Unidos" && destino === "México") return 17.0
    if (origen === "Canadá" && destino === "México") return 12.5
    return 17.0
  }

  

  const getMontoNumber = (monto: string) => parseInt(monto.replace(/[^\d]/g, ""))

  const getExchangeRateToMXN = (country: string) => {
    const rates: Record<string, number> = {
      "Estados Unidos": 17.0,
      "Canadá": 12.5,
      "México": 1,
    }
    return rates[country] || 1
  }

  const formatNumber = (value: number) =>
    new Intl.NumberFormat("es-MX", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)

  const estimatedFee =
    selectedMetodo === "Bitcoin"
      ? Math.max(2.5, getMontoNumber(selectedMonto) * 0.005)
      : selectedMetodo === "Remesadora"
        ? Math.max(6, getMontoNumber(selectedMonto) * 0.035)
        : Math.max(8, getMontoNumber(selectedMonto) * 0.045)

  const estimatedReceived = getMontoNumber(selectedMonto) - estimatedFee
  const estimatedReceivedMXN = estimatedReceived * getExchangeRateToMXN(selectedOrigen)

  const estimatedTime =
    selectedMetodo === "Bitcoin"
      ? "10-30 min"
      : selectedMetodo === "Remesadora"
        ? "Minutos a horas"
        : "1-2 días hábiles"

  const methodComparisonNote =
    selectedMetodo !== "Bitcoin"
      ? `Esta animación mantiene el recorrido educativo de una remesa con Bitcoin. ${selectedMetodo} se usa aquí para comparar tiempos y comisiones frente a esa alternativa.`
      : "Este recorrido educativo muestra cómo una remesa puede procesarse con Bitcoin desde el origen hasta la recepción en México."

  const getCurrentStepDescription = () => {
    if (simulationFinished) {
      return "La simulación educativa de la remesa terminó correctamente. Ya puedes revisar el flujo completo o abrir el panel de resultados."
    }

    const step = transactionSteps.find((s) => s.id === activeStep)
    return step
      ? step.description
      : "Haz clic en 'Ejecutar simulación' para recorrer paso a paso cómo una remesa puede enviarse con Bitcoin hasta llegar a México."
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

  const handleViewResults = () => {
    const montoNumerico = getMontoNumber(selectedMonto)
    const monedaOrigen = getCurrencyCode(selectedOrigen)
    const monedaDestino = getCurrencyCode(selectedDestino)
    const tipoCambio = getReferenceExchangeRate(selectedOrigen, selectedDestino)

    const params = new URLSearchParams({
      metodo: selectedMetodo,
      origen: selectedOrigen,
      destino: selectedDestino,
      monto: String(montoNumerico),
      frecuencia: selectedFrecuencia,
      monedaOrigen,
      monedaDestino,
      tipoCambio: String(tipoCambio),
    })

    onViewResults(`?${params.toString()}`)
  }

  const getStepState = (stepId: string) => {
    if (completedSteps.includes(stepId)) return "completado"
    if (activeStep === stepId) return "activo"
    return "pendiente"
  }

  const estimatedProgressPercent = simulationFinished
    ? 100
    : isSimulating
      ? ((completedSteps.length + (activeStep ? 1 : 0)) / transactionSteps.length) * 100
      : 0


  const summaryMetrics = [
    {
      label: "Monto base",
      value: `${selectedMonto} ${getCurrencyCode(selectedOrigen)}`,
      accent: "text-white",
      helper: `Origen · ${selectedOrigen}`,
    },
    {
      label: "Comisión estimada",
      value: `${getCurrencyCode(selectedOrigen)} ${formatNumber(estimatedFee)}`,
      accent: "text-[#f59e0b]",
      helper: `${((estimatedFee / getMontoNumber(selectedMonto)) * 100).toFixed(2)}% del monto`,
    },
    {
      label: "Equivalente estimado en MXN",
      value: `MXN ${formatNumber(estimatedReceivedMXN)}`,
      accent: "text-[#22c55e]",
      helper: "Monto aproximado a recibir en México",
    },
    {
      label: "Tiempo estimado",
      value: estimatedTime,
      accent: "text-[#3b82f6]",
      helper: `Método: ${selectedMetodo}`,
    },
  ]

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
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#3b82f6]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-[#8b5cf6]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

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
          <span className="text-2xl font-bold gradient-text-animated">Remesas internacionales</span>
        </div>

        <div className="flex items-center gap-3 bg-[#1e293b]/60 border border-[#334155]/50 rounded-xl px-4 py-2.5 hover:border-[#3b82f6]/30 transition-colors">
          <Lightbulb className={`w-4 h-4 transition-colors ${educativeMode ? "text-[#f59e0b]" : "text-[#64748b]"}`} />
          <Label htmlFor="educative-mode" className="text-sm text-[#94a3b8] cursor-pointer">
            Modo educativo
          </Label>
          <Switch id="educative-mode" checked={educativeMode} onCheckedChange={setEducativeMode} disabled={isSimulating} />
        </div>
      </header>

      <div className="relative z-10 px-8 lg:px-12 py-4 border-b border-[#334155]/20">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <span className="text-sm text-[#94a3b8]">Paso 2 de 3</span>
          <div className="flex-1 h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
            <div className="w-2/3 h-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] rounded-full" />
          </div>
        </div>
      </div>

      <main className="relative z-10 flex-1 grid lg:grid-cols-2 gap-8 p-8 lg:p-12 overflow-y-auto">
        <div className="space-y-6 flex flex-col">
          <div className="bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 border border-[#334155]/50 rounded-2xl p-8 shadow-lg shadow-[#1e293b]/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3b82f6]/20 to-[#3b82f6]/5 border border-[#3b82f6]/20 flex items-center justify-center">
                <span className="text-lg font-bold text-[#3b82f6]">1</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Configura tu remesa</h2>
                <p className="text-xs text-[#64748b]">Define los datos principales del envío a México</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-[#3b82f6]">$</span>
                  </div>
                  <label className="text-sm font-semibold text-[#f8fafc]">Monto base de la remesa</label>
                </div>
                <p className="text-xs text-[#64748b]">Se expresa en la moneda del país de origen: {getCurrencyCode(selectedOrigen)}</p>
                <div className="flex flex-wrap gap-2.5">
                  {montoOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedMonto(option)}
                      disabled={isSimulating}
                      className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${
                        selectedMonto === option
                          ? "bg-[#3b82f6] text-white shadow-lg shadow-[#3b82f6]/30 scale-105"
                          : "bg-[#0f172a]/60 border border-[#334155]/50 text-[#94a3b8] hover:bg-[#3b82f6]/15 hover:border-[#3b82f6]/40 hover:text-white hover:shadow-md"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

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
                          ? "bg-[#3b82f6] text-white shadow-lg shadow-[#3b82f6]/30 scale-105"
                          : "bg-[#0f172a]/60 border border-[#334155]/50 text-[#94a3b8] hover:bg-[#3b82f6]/15 hover:border-[#3b82f6]/40 hover:text-white hover:shadow-md"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-2 border-t border-[#334155]/30">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-[#8b5cf6]" />
                  </div>
                  <label className="text-sm font-semibold text-[#f8fafc]">País de destino</label>
                </div>
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-[#8b5cf6]/15 border border-[#8b5cf6]/35 text-white shadow-lg shadow-[#8b5cf6]/10">
                  <span className="text-xl">{getCountryFlag(selectedDestino)}</span>
                  <div className="text-left">
                    <p className="text-sm font-semibold">{selectedDestino}</p>
                    <p className="text-xs text-[#cbd5e1]">Destino fijo · {getCurrencyCode(selectedDestino)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-2 border-t border-[#334155]/30">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-[#f59e0b]" />
                  </div>
                  <label className="text-sm font-semibold text-[#f8fafc]">Frecuencia de remesa</label>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {frecuenciaOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedFrecuencia(option)}
                      disabled={isSimulating}
                      className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${
                        selectedFrecuencia === option
                          ? "bg-[#3b82f6] text-white shadow-lg shadow-[#3b82f6]/30 scale-105"
                          : "bg-[#0f172a]/60 border border-[#334155]/50 text-[#94a3b8] hover:bg-[#3b82f6]/15 hover:border-[#3b82f6]/40 hover:text-white hover:shadow-md"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-2 border-t border-[#334155]/30">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-[#f59e0b]" />
                  </div>
                  <label className="text-sm font-semibold text-[#f8fafc]">Método de envío</label>
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
                            ? "bg-gradient-to-r from-[#f59e0b] to-[#f97316] text-white shadow-lg shadow-[#f59e0b]/35 scale-105"
                            : "bg-[#3b82f6] text-white shadow-lg shadow-[#3b82f6]/30 scale-105"
                          : "bg-[#0f172a]/60 border border-[#334155]/50 text-[#94a3b8] hover:border-[#f59e0b]/40 hover:text-white hover:shadow-md"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Button
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className="btn-shine w-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-90 text-white py-7 text-base font-semibold rounded-xl shadow-xl shadow-[#3b82f6]/30 transition-all hover:shadow-2xl hover:shadow-[#8b5cf6]/40 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Play className="mr-2.5 w-5 h-5" />
                {isSimulating ? "Simulando..." : simulationFinished ? "Ejecutar de nuevo" : "Ejecutar simulación"}
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6 flex flex-col">
          {simulationFinished && (
            <div className="animate-[fadeInUp_0.45s_ease-out] bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 border border-[#22c55e]/30 rounded-2xl p-6 shadow-lg shadow-[#1e293b]/50">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 border border-[#22c55e]/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-[#22c55e]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Resumen del envío</h2>
                    <p className="text-xs text-[#22c55e]">Simulación completada · Resultado rápido del método seleccionado</p>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full border border-[#22c55e]/20 bg-[#22c55e]/10 text-[11px] font-semibold text-[#86efac]">
                  {selectedMetodo}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                {summaryMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="bg-gradient-to-br from-[#0f172a]/85 to-[#1e293b]/40 border border-[#334155]/30 p-4 rounded-xl"
                  >
                    <p className="text-[11px] font-semibold text-[#94a3b8] mb-2">{metric.label}</p>
                    <p className={`text-lg font-bold mb-1 ${metric.accent}`}>{metric.value}</p>
                    <p className="text-[11px] text-[#64748b] leading-relaxed">{metric.helper}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-[#22c55e]/10 to-[#3b82f6]/10 border border-[#334155]/40 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
                  <p className="text-sm font-semibold text-white">Estado actual de la remesa</p>
                </div>
                <p className="text-sm text-[#cbd5e1] leading-relaxed">
                  Simulación finalizada. Ya puedes revisar el recorrido completo o abrir el panel de resultados detallados.
                </p>
                <div className="mt-5">
                  <Button
                    onClick={handleViewResults}
                    className="w-full bg-[#0f172a] border border-[#22c55e]/40 hover:bg-[#22c55e]/10 text-white py-6 text-sm font-semibold rounded-xl transition-all"
                  >
                    Ver resultados detallados
                    <ArrowRight className="ml-2.5 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 border border-[#334155]/50 rounded-2xl p-6 shadow-lg shadow-[#1e293b]/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/5 border border-[#8b5cf6]/20 flex items-center justify-center">
                <span className="text-base font-bold text-[#8b5cf6]">2</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Ruta del envío</h2>
                <p className="text-xs text-[#64748b]">Tu remesa viaja desde el país de origen hasta México</p>
              </div>
            </div>

            <div className="bg-gradient-to-b from-[#0f172a]/80 to-[#1e293b]/40 border border-[#334155]/30 p-5 rounded-xl">
              <div className="flex items-center justify-between gap-4">
                <div className="text-center flex-1 min-w-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3b82f6]/25 to-[#3b82f6]/5 border-2 border-[#3b82f6]/50 flex items-center justify-center mx-auto mb-2 shadow-lg shadow-[#3b82f6]/20">
                    <span className="text-2xl">{getCountryFlag(selectedOrigen)}</span>
                  </div>
                  <p className="text-xs font-bold text-white mb-1 leading-tight">{selectedOrigen}</p>
                  <p className="text-[11px] text-[#64748b] font-medium">Origen · {getCurrencyCode(selectedOrigen)}</p>
                </div>

                <div className="flex-1 mx-3 flex items-center justify-center">
                  <div className="relative w-full h-10 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full h-[3px] bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#22c55e] rounded-full shadow-lg shadow-[#8b5cf6]/20" />
                    </div>
                    <div className="relative bg-[#0f172a] border-2 border-[#8b5cf6] rounded-full p-2 shadow-lg shadow-[#8b5cf6]/30">
                      <ArrowRight className="w-4 h-4 text-[#8b5cf6]" />
                    </div>
                  </div>
                </div>

                <div className="text-center flex-1 min-w-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#22c55e]/25 to-[#22c55e]/5 border-2 border-[#22c55e]/50 flex items-center justify-center mx-auto mb-2 shadow-lg shadow-[#22c55e]/20">
                    <span className="text-2xl">{getCountryFlag(selectedDestino)}</span>
                  </div>
                  <p className="text-xs font-bold text-white mb-1 leading-tight">{selectedDestino}</p>
                  <p className="text-[11px] text-[#64748b] font-medium">Destino · {getCurrencyCode(selectedDestino)}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center">
                <div
                  className={`px-4 py-2 rounded-lg font-semibold text-white text-[11px] shadow-lg ${
                    selectedMetodo === "Bitcoin"
                      ? "bg-gradient-to-r from-[#f59e0b] to-[#f97316] shadow-[#f59e0b]/30"
                      : "bg-[#3b82f6] shadow-[#3b82f6]/30"
                  }`}
                >
                  {selectedMetodo}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 border border-[#334155]/50 rounded-2xl p-8 shadow-lg shadow-[#1e293b]/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 border border-[#22c55e]/20 flex items-center justify-center">
                <span className="text-lg font-bold text-[#22c55e]">3</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Recorrido de la remesa</h2>
                <p className="text-xs text-[#64748b]">Así se procesa una remesa con Bitcoin, paso a paso</p>
              </div>
            </div>

            <div className="bg-gradient-to-b from-[#0f172a]/80 to-[#1e293b]/40 border border-[#334155]/30 px-4 py-6 lg:px-5 lg:py-7 rounded-xl mb-6 overflow-hidden">
              <div className="flex items-start justify-between gap-1 w-full">
                {transactionSteps.map((step, index) => {
                  const state = getStepState(step.id)
                  const StepIcon = step.icon

                  return (
                    <div key={step.id} className="flex items-center flex-1 min-w-0">
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

            {educativeMode && (
              <div className="mt-6">
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
                            ? "La simulación educativa de la remesa ha finalizado. Puedes revisar el recorrido completo o abrir el panel de resultados detallados."
                            : "Este módulo te explica cómo una remesa puede procesarse con Bitcoin desde el país de origen hasta México, mientras comparas el tiempo y el costo frente a otros métodos."}
                      </p>
                      <p className="text-xs text-[#93c5fd] mt-3 leading-relaxed">{methodComparisonNote}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  )
}
