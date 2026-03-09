"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
  Wallet,
  Landmark,
  Clock3,
  Banknote,
  ArrowRightLeft,
  TrendingUp,
  BadgeDollarSign,
  Network,
  ShieldCheck,
  PackageCheck,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts"

//recibimos los parametros desde lel simulador
interface ResultsDashboardProps {
  metodoSeleccionado: string
  origen: string
  destino: string
  monedaOrigen: string
  monedaDestino: string
  montoBase: number
  frecuencia: string
  tipoCambioReferencia: number
  onBack: () => void
  onNewSimulation: () => void
}

type ComparisonRow = {
  metodo: "Banco" | "Remesadora" | "Bitcoin"
  comision: number
  tiempo: string
  monedaOrigen: string
  netoOrigen: number
  recibidoMXN: number
  destacado?: boolean
}

const defaultReferenceScenario = {
  origen: "Estados Unidos",
  destino: "México",
  monedaOrigen: "USD",
  monedaDestino: "MXN",
  montoBase: 500,
  frecuencia: "Mensual",
  metodoSeleccionado: "Bitcoin",
  tipoCambioReferencia: 17,
}

const comparisonData: ComparisonRow[] = [
  {
    metodo: "Banco",
    comision: 22.5,
    tiempo: "1-2 días hábiles",
    monedaOrigen: "USD",
    netoOrigen: 477.5,
    recibidoMXN: 8117.5,
  },
  {
    metodo: "Remesadora",
    comision: 17.5,
    tiempo: "Minutos a horas",
    monedaOrigen: "USD",
    netoOrigen: 482.5,
    recibidoMXN: 8202.5,
  },
  {
    metodo: "Bitcoin",
    comision: 2.5,
    tiempo: "10-30 min",
    monedaOrigen: "USD",
    netoOrigen: 497.5,
    recibidoMXN: 8457.5,
    destacado: true,
  },
]

const annualInflationRate = 0.04

const getTransfersPerYear = (frecuencia: string) => {
  if (frecuencia === "Única" || frecuencia === "Unica") return 1
  if (frecuencia === "Semanal") return 52
  if (frecuencia === "Quincenal") return 24
  if (frecuencia === "Mensual") return 12
  return 12
}

const timelineSteps = [
  {
    title: "Origen",
    description:
      "La remesa parte desde el país de origen y el valor base se expresa en la moneda local del remitente.",
    icon: Wallet,
    color: "#3b82f6",
  },
  {
    title: "Red Bitcoin",
    description:
      "El valor se transmite digitalmente a través de la red Bitcoin para evitar el recorrido tradicional de múltiples intermediarios.",
    icon: Network,
    color: "#06b6d4",
  },
  {
    title: "Validación",
    description:
      "La operación se verifica antes de confirmarse, lo que ayuda a dar seguridad al envío.",
    icon: ShieldCheck,
    color: "#f59e0b",
  },
  {
    title: "Destino",
    description:
      "Una vez confirmada, la remesa puede recibirse en México y convertirse a pesos mexicanos.",
    icon: PackageCheck,
    color: "#22c55e",
  },
]

const formatMoney = (value: number, currency: string) => {
  const locale = currency === "MXN" ? "es-MX" : "en-US"
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value)
}

export function ResultsDashboardRemesas({ 
  metodoSeleccionado,
  origen,
  destino,
  monedaOrigen,
  monedaDestino,
  montoBase,
  frecuencia,
  tipoCambioReferencia,
  onBack,
  onNewSimulation,
}: ResultsDashboardProps) {
  const [projectionYears, setProjectionYears] = useState(5)
  const [chartViewMode, setChartViewMode] = useState<"comparativa" | "individual">("comparativa")
  const [decisioQuestion, setDecisioQuestion] = useState("")
  const [decisioAnswer, setDecisioAnswer] = useState("")
  const [isAskingDecisio, setIsAskingDecisio] = useState(false)

  const referenceScenario = {
    ...defaultReferenceScenario,
    metodoSeleccionado,
    origen,
    destino,
    monedaOrigen,
    monedaDestino,
    montoBase,
    frecuencia,
    tipoCambioReferencia,
  }

  const comparisonRows = comparisonData.map((row) => {
    const ratio = row.netoOrigen / defaultReferenceScenario.montoBase
    const netoOrigen = referenceScenario.montoBase * ratio
    const recibidoMXN = netoOrigen * referenceScenario.tipoCambioReferencia
    const comision = referenceScenario.montoBase - netoOrigen

    return {
      ...row,
      monedaOrigen: referenceScenario.monedaOrigen,
      netoOrigen,
      recibidoMXN,
      comision,
    }
  })

  const selectedMethod =
    comparisonRows.find((row) => row.metodo === referenceScenario.metodoSeleccionado) ??
    comparisonRows[2]


  const buildProjectionForMethod = (row: ComparisonRow, years: number) => {
    const totalTransfers = getTransfersPerYear(referenceScenario.frecuencia) * years
    const totalBaseOrigen = referenceScenario.montoBase * totalTransfers
    const totalFees = row.comision * totalTransfers
    const totalNetOrigen = row.netoOrigen * totalTransfers
    const totalReceivedMXN = row.recibidoMXN * totalTransfers
    const realValueMXN = totalReceivedMXN / Math.pow(1 + annualInflationRate, years)

    return {
      metodo: row.metodo,
      tiempo: row.tiempo,
      destacado: row.destacado,
      totalTransfers,
      totalBaseOrigen,
      totalFees,
      totalNetOrigen,
      totalReceivedMXN,
      realValueMXN,
    }
  }

  const projectionRows = comparisonRows.map((row) =>
    buildProjectionForMethod(row, projectionYears)
  )

  const selectedProjection =
    projectionRows.find((row) => row.metodo === referenceScenario.metodoSeleccionado) ??
    projectionRows[2]

  const bankProjection =
    projectionRows.find((row) => row.metodo === "Banco") ??
    projectionRows[0]

  const savedVsBankProjection =
    selectedProjection.totalReceivedMXN - bankProjection.totalReceivedMXN

  // Datos para las gráficas
  type ChartBarItem = {
    metodo: string
    valor: number
  }

  type FeesImpactItem = {
    metodo: string
    perdidoMXN: number
  }

  const chartData: ChartBarItem[] = projectionRows.map((row) => ({
    metodo: row.metodo,
    valor: row.totalReceivedMXN,
  }))

  const feesImpactData: FeesImpactItem[] = projectionRows.map((row) => ({
    metodo: row.metodo,
    perdidoMXN: row.totalFees * referenceScenario.tipoCambioReferencia,
  }))

  const visibleChartData: ChartBarItem[] =
    chartViewMode === "comparativa"
      ? chartData
      : chartData.filter((item) => item.metodo === referenceScenario.metodoSeleccionado)

  const visibleFeesImpactData: FeesImpactItem[] =
    chartViewMode === "comparativa"
      ? feesImpactData
      : feesImpactData.filter((item) => item.metodo === referenceScenario.metodoSeleccionado)

  const topProjection = [...projectionRows].sort((a, b) => b.totalReceivedMXN - a.totalReceivedMXN)[0]
  const topFeesLoss = [...feesImpactData].sort((a, b) => b.perdidoMXN - a.perdidoMXN)[0]

  const projectionInsight =
    chartViewMode === "comparativa"
      ? `${topProjection.metodo} proyecta la mayor recepción acumulada en ${projectionYears} ${projectionYears === 1 ? "año" : "años"}.`
      : `${referenceScenario.metodoSeleccionado} muestra cuánto podría recibirse al cierre del horizonte seleccionado.`

  const feesInsight =
    chartViewMode === "comparativa"
      ? `${topFeesLoss.metodo} acumula la mayor pérdida estimada en comisiones en este horizonte.`
      : `${referenceScenario.metodoSeleccionado} concentra aquí la pérdida total estimada en comisiones del periodo.`

  const handleAskDecisio = async () => {
  if (!decisioQuestion.trim()) return

  setIsAskingDecisio(true)
  setDecisioAnswer("")

  try {
    const res = await fetch("/api/decisio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: decisioQuestion,
        simulation: {
          metodo: referenceScenario.metodoSeleccionado,
          monto: referenceScenario.montoBase,
          origen: referenceScenario.origen,
          destino: referenceScenario.destino,
          comision: selectedProjection.totalFees,
          tiempo: comparisonRows.find(
            (row) => row.metodo === referenceScenario.metodoSeleccionado
          )?.estimatedTime ?? "No especificado",
        },
      }),
    })

    const data = await res.json()
    setDecisioAnswer(data.answer ?? "No pude obtener una respuesta.")
  } catch (error) {
    setDecisioAnswer("Ocurrió un error al consultar a Decisio.")
  } finally {
    setIsAskingDecisio(false)
  }
}

  return (
    <div className="min-h-screen bg-[#0f172a] relative overflow-hidden">
      <div className="fixed inset-0 grid-pattern pointer-events-none" />
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#22c55e]/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#3b82f6]/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <header className="relative z-10 flex items-center justify-between px-8 lg:px-12 py-5 border-b border-[#334155]/30 sticky top-0 bg-[#0f172a]/90 backdrop-blur-xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2.5 text-[#94a3b8] hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Volver</span>
        </button>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/30 to-[#3b82f6]/30 rounded-full blur-lg" />
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ajolote%20fintech-GPEqul13Rds1oDQEOr50vslu6pr6lQ.png"
              alt="Decisio"
              className="relative w-10 h-10 object-contain"
            />
          </div>
          <span className="text-2xl font-bold gradient-text-animated">Resultados de remesas</span>
        </div>

        <Button
          onClick={onNewSimulation}
          variant="outline"
          className="border-[#334155] bg-[#1e293b]/50 text-white hover:bg-[#1e293b] hover:border-[#3b82f6]/50 rounded-xl"
        >
          <RefreshCw className="mr-2 w-4 h-4" />
          Nueva simulación
        </Button>
      </header>

      <div className="relative z-10 px-8 lg:px-12 py-4 border-b border-[#334155]/20">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <span className="text-sm text-[#22c55e] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            Simulación completada
          </span>
          <div className="flex-1 h-1.5 bg-[#1e293b] rounded-full overflow-hidden ml-4">
            <div className="w-full h-full bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#22c55e] rounded-full" />
          </div>
        </div>
      </div>

      <main className="relative z-10 p-8 lg:p-12 max-w-7xl mx-auto space-y-8">
        <section className="space-y-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Resultados de tu remesa</h1>
            <p className="text-[#94a3b8] text-lg">
              Resumen del envío, recepción estimada en México y comparación de costos entre métodos.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              { label: "Origen", value: referenceScenario.origen },
              { label: "Destino", value: referenceScenario.destino },
              { label: "Método", value: referenceScenario.metodoSeleccionado },
              { label: "Frecuencia", value: referenceScenario.frecuencia },
              { label: "Moneda origen", value: referenceScenario.monedaOrigen },
              { label: "Moneda destino", value: referenceScenario.monedaDestino },
            ].map((item) => (
              <div
                key={item.label}
                className="px-4 py-2 rounded-xl border border-[#334155]/40 bg-[#1e293b]/60 text-sm"
              >
                <span className="text-[#64748b] mr-2">{item.label}:</span>
                <span className="text-white font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          <div className="card-hover glow-blue bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 border border-[#334155]/50 p-6 rounded-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3b82f6]/20 to-[#3b82f6]/5 border border-[#3b82f6]/20 flex items-center justify-center">
                <BadgeDollarSign className="w-6 h-6 text-[#3b82f6]" />
              </div>
            </div>
            <p className="text-sm text-[#94a3b8] mb-1">Método seleccionado</p>
            <p className="text-3xl font-bold text-white mb-2">{referenceScenario.metodoSeleccionado}</p>
            <p className="text-sm text-[#3b82f6]">Comparación principal para esta simulación</p>
          </div>

          <div className="card-hover bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 border border-[#334155]/50 p-6 rounded-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 border border-[#22c55e]/20 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-[#22c55e]" />
              </div>
            </div>
            <p className="text-sm text-[#94a3b8] mb-1">Monto base de la remesa</p>
            <p className="text-3xl font-bold text-white mb-2">
              {formatMoney(referenceScenario.montoBase, referenceScenario.monedaOrigen)}
            </p>
            <p className="text-sm text-[#22c55e]">Valor base expresado en la moneda del país de origen</p>
          </div>

          <div className="card-hover bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 border border-[#334155]/50 p-6 rounded-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ef4444]/20 to-[#ef4444]/5 border border-[#ef4444]/20 flex items-center justify-center">
                <Landmark className="w-6 h-6 text-[#ef4444]" />
              </div>
            </div>
            <p className="text-sm text-[#94a3b8] mb-1">Comisión estimada</p>
            <p className="text-3xl font-bold text-white mb-2">
              {formatMoney(selectedMethod.comision, referenceScenario.monedaOrigen)}
            </p>
            <p className="text-sm text-[#ef4444]">Costo asociado al método seleccionado</p>
          </div>

          <div className="card-hover bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 border border-[#334155]/50 p-6 rounded-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f59e0b]/20 to-[#f59e0b]/5 border border-[#f59e0b]/20 flex items-center justify-center">
                <Banknote className="w-6 h-6 text-[#f59e0b]" />
              </div>
            </div>
            <p className="text-sm text-[#94a3b8] mb-1">Valor neto antes de conversión</p>
            <p className="text-3xl font-bold text-white mb-2">
              {formatMoney(selectedMethod.netoOrigen, referenceScenario.monedaOrigen)}
            </p>
            <p className="text-sm text-[#f59e0b]">Monto restante tras descontar la comisión estimada</p>
          </div>

          <div className="card-hover glow-green bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 border border-[#334155]/50 p-6 rounded-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 border border-[#22c55e]/20 flex items-center justify-center">
                <ArrowRightLeft className="w-6 h-6 text-[#22c55e]" />
              </div>
              <span className="flex items-center text-xs text-[#22c55e] bg-[#22c55e]/10 px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3 mr-1" />
                Mejor recepción
              </span>
            </div>
            <p className="text-sm text-[#94a3b8] mb-1">Equivalente estimado en MXN</p>
            <p className="text-3xl font-bold text-white mb-2">
              {formatMoney(selectedMethod.recibidoMXN, referenceScenario.monedaDestino)}
            </p>
            <p className="text-sm text-[#22c55e]">
              Estimación con tipo de cambio de referencia: {referenceScenario.tipoCambioReferencia} {referenceScenario.monedaDestino} por {referenceScenario.monedaOrigen}
            </p>
          </div>

          <div className="card-hover bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 border border-[#334155]/50 p-6 rounded-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/5 border border-[#8b5cf6]/20 flex items-center justify-center">
                <Clock3 className="w-6 h-6 text-[#8b5cf6]" />
              </div>
            </div>
            <p className="text-sm text-[#94a3b8] mb-1">Tiempo estimado</p>
            <p className="text-3xl font-bold text-white mb-2">{selectedMethod.tiempo}</p>
            <p className="text-sm text-[#8b5cf6]">Tiempo aproximado de procesamiento y disponibilidad</p>
          </div>
        </section>

        <section className="grid xl:grid-cols-[1.3fr_0.7fr] gap-6 items-start">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 border border-[#334155]/50 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-[#334155]/30">
                <h3 className="text-xl font-semibold text-white">Comparación del envío actual</h3>
                <p className="text-sm text-[#64748b] mt-1">
                  Costo, tiempo y recepción estimada por método para una sola remesa.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#0f172a]/40">
                      <th className="text-left py-4 px-6 text-sm font-semibold text-[#94a3b8]">Método</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-[#94a3b8]">Comisión</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-[#94a3b8]">Tiempo</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-[#94a3b8]">Recibido estimado</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-[#94a3b8]">Valor real</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr
                        key={row.metodo}
                        className={`border-t transition-colors ${
                          row.metodo === referenceScenario.metodoSeleccionado
                            ? "bg-[#f7931a]/10 border-[#f7931a]/30"
                            : "border-[#334155]/30 hover:bg-[#0f172a]/20"
                        }`}
                      >
                        <td className="py-5 px-6">
                          <span
                            className={`font-semibold ${
                              row.metodo === referenceScenario.metodoSeleccionado ? "text-[#f7931a]" : "text-white"
                            }`}
                          >
                            {row.metodo}
                          </span>
                        </td>
                        <td className="py-5 px-6 text-white font-medium">
                          {formatMoney(row.comision, row.monedaOrigen)}
                        </td>
                        <td className="py-5 px-6 text-[#94a3b8]">{row.tiempo}</td>
                        <td className="py-5 px-6 text-white font-medium">
                          {formatMoney(row.netoOrigen, row.monedaOrigen)}
                        </td>
                        <td className="py-5 px-6">
                          <span
                            className={`font-semibold ${
                              row.metodo === referenceScenario.metodoSeleccionado ? "text-[#f7931a]" : "text-white"
                            }`}
                          >
                            {formatMoney(row.recibidoMXN, referenceScenario.monedaDestino)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="glow-blue bg-gradient-to-br from-[#1e293b] via-[#1e293b]/80 to-[#0f172a] border border-[#334155]/50 p-6 lg:p-8 rounded-2xl flex flex-col">
              <div className="flex items-start gap-5 mb-6">
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
                <div>
                  <p className="text-sm font-semibold text-[#3b82f6] mb-1">Decisio</p>
                  <p className="text-white font-medium text-lg">Interpretación del resultado</p>
                </div>
              </div>

              <div className="space-y-4 flex-1">
                <div className="p-4 rounded-xl bg-[#0f172a]/60 border border-[#334155]/30">
                  <p className="text-sm text-[#cbd5e1] leading-relaxed">
                    <span className="text-[#3b82f6] font-medium">Sobre el envío:</span> el monto base de la remesa parte en {referenceScenario.monedaOrigen} y luego se compara por comisión, tiempo y recepción estimada en México.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#0f172a]/60 border border-[#334155]/30">
                  <p className="text-sm text-[#cbd5e1] leading-relaxed">
                    <span className="text-[#22c55e] font-medium">Sobre Bitcoin:</span> en este escenario destaca por dejar una recepción final más alta, debido a que reduce el costo operativo frente a un banco o una remesadora tradicional.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#0f172a]/60 border border-[#334155]/30">
                  <p className="text-sm text-[#cbd5e1] leading-relaxed">
                    <span className="text-[#f59e0b] font-medium">Sobre la recepción en México:</span> el valor final expresado en MXN es una estimación con tipo de cambio de referencia; la cantidad real puede variar según conversión y proveedor de salida.
                  </p>

                  <div className="mt-5 space-y-3">
                    <textarea
                      value={decisioQuestion}
                      onChange={(e) => setDecisioQuestion(e.target.value)}
                      placeholder="Pregúntale a Decisio sobre Bitcoin, comisiones o esta simulación..."
                      className="w-full min-h-[90px] rounded-xl bg-[#0f172a] border border-[#334155] text-white px-4 py-3 text-sm outline-none resize-none focus:border-[#3b82f6]"
                    />

                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleAskDecisio}
                        disabled={isAskingDecisio || !decisioQuestion.trim()}
                        className="px-4 py-2.5 rounded-xl bg-[#3b82f6] text-white text-sm font-semibold transition-all disabled:opacity-60"
                      >
                        {isAskingDecisio ? "Consultando..." : "Preguntar a Decisio"}
                      </button>

                      <p className="text-xs text-[#64748b]">
                        Respuestas breves, enfocadas en Bitcoin y remesas.
                      </p>
                    </div>

                    {decisioAnswer && (
                      <div className="rounded-xl border border-[#334155] bg-[#0f172a]/80 p-4">
                        <p className="text-sm text-[#cbd5e1] leading-relaxed">{decisioAnswer}</p>
                      </div>
                    )}
                  </div>

                </div>
              </div>

              <Button
                onClick={onNewSimulation}
                className="btn-shine mt-6 w-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-90 text-white py-6 font-semibold rounded-xl shadow-xl shadow-[#3b82f6]/25"
              >
                <RefreshCw className="mr-2 w-5 h-5" />
                Explorar otro escenario
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-[#334155]/40 rounded-2xl p-6 shadow-xl shadow-black/10">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <h3 className="text-xl font-semibold text-white">Análisis acumulado</h3>
                  <p className="text-sm text-[#94a3b8] mt-1">
                    Ajusta el horizonte y el modo de visualización para explorar el impacto estimado de la remesa.
                  </p>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-[#0f172a]/80 border border-[#334155]/40 text-xs font-medium text-[#cbd5e1]">
                  Horizonte: {projectionYears} {projectionYears === 1 ? "año" : "años"}
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-white">Horizonte de proyección</p>
                    <p className="text-xs text-[#64748b]">
                      Remesa {referenceScenario.frecuencia.toLowerCase()} de{" "}
                      {formatMoney(referenceScenario.montoBase, referenceScenario.monedaOrigen)}
                    </p>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={projectionYears}
                    onChange={(e) => setProjectionYears(Number(e.target.value))}
                    className="w-full accent-[#f7931a]"
                  />
                  <div className="flex justify-between text-[11px] text-[#64748b] mt-2">
                    <span>1 año</span>
                    <span>10 años</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-white mb-3">Modo de visualización</p>
                  <div className="inline-flex bg-[#0f172a]/70 border border-[#334155]/50 rounded-xl p-1 gap-1">
                    <button
                      onClick={() => setChartViewMode("comparativa")}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        chartViewMode === "comparativa"
                          ? "bg-[#3b82f6] text-white shadow-md"
                          : "text-[#94a3b8] hover:text-white hover:bg-[#1e293b]"
                      }`}
                    >
                      Comparativa
                    </button>

                    <button
                      onClick={() => setChartViewMode("individual")}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        chartViewMode === "individual"
                          ? "bg-[#8b5cf6] text-white shadow-md"
                          : "text-[#94a3b8] hover:text-white hover:bg-[#1e293b]"
                      }`}
                    >
                      Solo {referenceScenario.metodoSeleccionado}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0f172a]/40 border border-[#334155]/30 rounded-xl p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">Total recibido acumulado</h3>
                  <p className="text-sm text-[#94a3b8] mt-1">
                    Comparación del total estimado que llegaría a México al cierre del horizonte seleccionado.
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-xs font-medium text-[#93c5fd]">
                  Valor neto
                </div>
              </div>

              <div className="mb-4 p-3 rounded-xl bg-[#0f172a]/70 border border-[#334155]/30">
                <p className="text-sm text-[#cbd5e1] leading-relaxed">{projectionInsight}</p>
              </div>

              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={visibleChartData}
                    margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
                    barCategoryGap="35%"
                  >
                    <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                    <XAxis dataKey="metodo" stroke="#94a3b8" />
                    <YAxis
                      stroke="#94a3b8"
                      domain={[0, "dataMax + 50000"]}
                      tickFormatter={(value) => {
                        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
                        if (value >= 1000) return `${(value / 1000).toFixed(0)}k`
                        return String(value)
                      }}
                    />
                    <Tooltip
                      formatter={(value: number) =>
                        new Intl.NumberFormat("es-MX", {
                          style: "currency",
                          currency: "MXN",
                          maximumFractionDigits: 0,
                        }).format(value)
                      }
                    />
                    <Bar
                      dataKey="valor"
                      radius={[6, 6, 0, 0]}
                      animationDuration={500}
                      animationEasing="ease-out"
                    >
                      <LabelList
                        dataKey="valor"
                        position="top"
                        formatter={(value: number) =>
                          new Intl.NumberFormat("es-MX", {
                            style: "currency",
                            currency: "MXN",
                            maximumFractionDigits: 0,
                          }).format(value)
                        }
                      />
                      {visibleChartData.map((entry: ChartBarItem, index: number) => {
                        const fill =
                          entry.metodo === "Banco"
                            ? "#ef4444"
                            : entry.metodo === "Remesadora"
                              ? "#f59e0b"
                              : "#f7931a"

                        return <Cell key={`cell-${index}`} fill={fill} />
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 border border-[#334155]/50 rounded-2xl p-6 shadow-lg shadow-[#1e293b]/50">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ef4444]/20 to-[#ef4444]/5 border border-[#ef4444]/20 flex items-center justify-center">
                    <BadgeDollarSign className="w-5 h-5 text-[#ef4444]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Dinero perdido en comisiones</h3>
                    <p className="text-sm text-[#94a3b8]">
                      Comparación del costo total estimado por método al cierre del horizonte seleccionado.
                    </p>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-[#ef4444]/10 border border-[#ef4444]/20 text-xs font-medium text-[#fca5a5]">
                  Costo acumulado
                </div>
              </div>

              <div className="mb-4 p-3 rounded-xl bg-[#0f172a]/70 border border-[#334155]/30">
                <p className="text-sm text-[#cbd5e1] leading-relaxed">{feesInsight}</p>
              </div>

              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={visibleFeesImpactData}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                    <XAxis
                      type="number"
                      stroke="#94a3b8"
                      tickFormatter={(value) => {
                        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
                        if (value >= 1000) return `${(value / 1000).toFixed(0)}k`
                        return String(value)
                      }}
                    />
                    <YAxis
                      type="category"
                      dataKey="metodo"
                      stroke="#94a3b8"
                      width={100}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(148, 163, 184, 0.08)" }}
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        border: "1px solid #334155",
                        borderRadius: "12px",
                        color: "#fff",
                      }}
                      formatter={(value: number) => [formatMoney(value, "MXN"), "Pérdida estimada"]}
                    />
                    <Bar
                      dataKey="perdidoMXN"
                      radius={[0, 8, 8, 0]}
                      animationDuration={500}
                      animationEasing="ease-out"
                    >
                      <LabelList
                        dataKey="perdidoMXN"
                        position="right"
                        formatter={(value: number) =>
                          new Intl.NumberFormat("es-MX", {
                            style: "currency",
                            currency: "MXN",
                            maximumFractionDigits: 0,
                          }).format(value)
                        }
                      />
                      {visibleFeesImpactData.map((entry: FeesImpactItem, index: number) => {
                        const fill =
                          entry.metodo === "Banco"
                            ? "#ef4444"
                            : entry.metodo === "Remesadora"
                              ? "#f59e0b"
                              : "#f7931a"

                        return <Cell key={`fees-cell-${index}`} fill={fill} />
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
