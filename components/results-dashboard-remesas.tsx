"use client"

import { Button } from "@/components/ui/button"
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
  ShieldCheck,
  Network,
  PackageCheck,
  BadgeDollarSign,
} from "lucide-react"

interface ResultsDashboardProps {
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

const referenceScenario = {
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

const selectedMethod = comparisonData.find((row) => row.metodo === referenceScenario.metodoSeleccionado) ?? comparisonData[2]
const bestReceivedMXN = Math.max(...comparisonData.map((row) => row.recibidoMXN))
const worstReceivedMXN = Math.min(...comparisonData.map((row) => row.recibidoMXN))
const savedVsWorst = bestReceivedMXN - worstReceivedMXN

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

export function ResultsDashboardRemesas({ onBack, onNewSimulation }: ResultsDashboardProps) {
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
            <p className="text-sm text-[#22c55e]">Estimación con tipo de cambio de referencia: {referenceScenario.tipoCambioReferencia} MXN por USD</p>
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

        <section className="grid xl:grid-cols-[1.3fr_0.7fr] gap-6">
          <div className="bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 border border-[#334155]/50 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-[#334155]/30">
              <h3 className="text-xl font-semibold text-white">Comparación de métodos</h3>
              <p className="text-sm text-[#64748b] mt-1">
                Diferencia estimada en comisión, tiempo y recepción final en México.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#0f172a]/40">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#94a3b8]">Método</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#94a3b8]">Comisión</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#94a3b8]">Tiempo</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#94a3b8]">Valor neto</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#94a3b8]">Recepción estimada</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row) => (
                    <tr
                      key={row.metodo}
                      className={`border-t border-[#334155]/30 transition-colors ${
                        row.destacado ? "bg-[#22c55e]/5" : "hover:bg-[#0f172a]/20"
                      }`}
                    >
                      <td className="py-5 px-6">
                        <span className={`font-semibold ${row.destacado ? "text-[#22c55e]" : "text-white"}`}>
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
                        <span className={`font-semibold ${row.destacado ? "text-[#22c55e]" : "text-white"}`}>
                          {formatMoney(row.recibidoMXN, referenceScenario.monedaDestino)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 border border-[#334155]/50 p-6 rounded-2xl space-y-5">
            <h3 className="text-xl font-semibold text-white">Lectura rápida del resultado</h3>
            <div className="p-4 rounded-xl bg-[#0f172a]/60 border border-[#334155]/30">
              <p className="text-sm text-[#64748b] mb-1">Recepción más alta estimada</p>
              <p className="text-2xl font-bold text-white">{formatMoney(bestReceivedMXN, "MXN")}</p>
              <p className="text-sm text-[#22c55e] mt-2">Bitcoin deja aproximadamente {formatMoney(savedVsWorst, "MXN")} más que la opción menos favorable.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0f172a]/60 border border-[#334155]/30">
              <p className="text-sm text-[#64748b] mb-1">Rango de recepción observado</p>
              <p className="text-white font-medium">
                {formatMoney(worstReceivedMXN, "MXN")} - {formatMoney(bestReceivedMXN, "MXN")}
              </p>
              <p className="text-sm text-[#94a3b8] mt-2">
                La diferencia viene principalmente de la comisión aplicada y del tiempo estimado de disponibilidad.
              </p>
            </div>
          </div>
        </section>

        <section className="grid xl:grid-cols-[0.9fr_1.1fr] gap-6">
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

          <div className="bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 border border-[#334155]/50 p-6 lg:p-8 rounded-2xl">
            <h3 className="text-xl font-semibold text-white mb-2">Cómo se obtuvo este resultado</h3>
            <p className="text-sm text-[#64748b] mb-6">
              Resumen del recorrido educativo usado para explicar una remesa con Bitcoin.
            </p>

            <div className="space-y-5">
              {timelineSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={step.title} className="flex gap-4">
                    <div className="flex flex-col items-center shrink-0">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center border"
                        style={{
                          borderColor: `${step.color}55`,
                          background: `linear-gradient(135deg, ${step.color}22, ${step.color}0d)`,
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: step.color }} />
                      </div>
                      {index < timelineSteps.length - 1 && <div className="w-px flex-1 bg-[#334155] my-2" />}
                    </div>
                    <div className="pt-1 pb-4">
                      <p className="text-white font-semibold mb-1">{step.title}</p>
                      <p className="text-sm text-[#94a3b8] leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
