"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, AlertCircle, Trophy, RefreshCw, CheckCircle2, ArrowUpRight } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, AreaChart, Area } from "recharts"

interface ResultsDashboardProps {
  onBack: () => void
  onNewSimulation: () => void
  selectedMonto: string
  selectedFrecuencia: string
  selectedAnos: string
  selectedMetodo: string
  selectedInterest: string
}

const calculateTotalContribution = (monto: string, frecuencia: string, periodo: string): number => {
  const montoNum = parseInt(monto.replace(/[^\d]/g, ''))
  const periodoNum = parseInt(periodo.replace(/\D/g, ''))

  let frecuenciaNum: number
  switch (frecuencia) {
    case "Unica vez":
      return montoNum
    case "Mensual":
      frecuenciaNum = 12
      break
    case "Semanal":
      frecuenciaNum = 52
      break
    case "Quincenal":
      frecuenciaNum = 24
      break
    default:
      frecuenciaNum = 1
  }

  return montoNum * frecuenciaNum * periodoNum
}

/**
 * Calcula el valor nominal aplicando interés compuesto según frecuencia.
 * - efectivo: sin rendimientos
 * - cuenta de ahorro: tasa seleccionada compuesta según la frecuencia
 * - bitcoin: rendimiento promedio 20% anual compuesto
 *
 * La fórmula usada es la del valor futuro de una anualidad ordinaria:
 *   FV = P * [((1 + r)^n - 1) / r]
 * donde P es el monto por periodo, r la tasa por periodo y n el número de
 * periodos totales. Para "Unica vez" se utiliza la fórmula de un solo depósito:
 *   FV = P * (1 + r)^{years}
 */
const calculateNominalValue = (
  monto: string,
  frecuencia: string,
  periodo: string,
  metodo: string,
  interest: string
): number => {
  const montoNum = parseInt(monto.replace(/[^\d]/g, ''), 10)
  const years = parseInt(periodo.replace(/\D/g, ''), 10)

  let periodsPerYear = 1
  switch (frecuencia) {
    case "Mensual":
      periodsPerYear = 12
      break
    case "Semanal":
      periodsPerYear = 52
      break
    case "Quincenal":
      periodsPerYear = 24
      break
    case "Unica vez":
    default:
      periodsPerYear = 1
  }

  const totalPeriods = years * periodsPerYear

  let annualRate = 0
  if (metodo === "Cuenta de ahorro") {
    // interest comes like "3%" or similar
    annualRate = parseFloat(interest.replace("%", "")) / 100
  } else if (metodo === "Bitcoin") {
    annualRate = 0.20
  } else {
    annualRate = 0
  }

  // sin rendimientos
  if (annualRate <= 0 || metodo === "En efectivo") {
    return montoNum * totalPeriods
  }

  const ratePerPeriod = annualRate / periodsPerYear

  if (frecuencia === "Unica vez") {
    // un solo depósito compuesto durante los años
    return montoNum * Math.pow(1 + ratePerPeriod, totalPeriods)
  }

  // anualidad ordinaria
  return montoNum * ((Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod)
}

/**
 * Calcula el valor real ajustando el valor nominal por inflación.
 * - Bitcoin: no se ve afectado por la inflación del peso mexicano (valor real = valor nominal)
 * - Otros métodos: valor real = valor nominal / (1 + 0.04)^años
 */
const calculateRealValue = (
  monto: string,
  frecuencia: string,
  periodo: string,
  metodo: string,
  interest: string
): number => {
  const nominalValue = calculateNominalValue(monto, frecuencia, periodo, metodo, interest)
  const years = parseInt(periodo.replace(/\D/g, ''), 10)

  if (metodo === "Bitcoin") {
    // Bitcoin no se ve afectado por la inflación del peso mexicano
    return nominalValue
  }

  // Ajuste por inflación del 4% anual
  const inflationRate = 0.04
  return nominalValue / Math.pow(1 + inflationRate, years)
}

const comparisonData = [
  { metodo: "Banco", comision: "$25.00", comisionPct: "5%", tiempo: "3-5 dias", recibido: "$475.00", valorReal: "$465.00" },
  { metodo: "Remesadora", comision: "$15.00", comisionPct: "3%", tiempo: "1-2 dias", recibido: "$485.00", valorReal: "$475.00" },
  { metodo: "Bitcoin", comision: "$2.50", comisionPct: "0.5%", tiempo: "10-60 min", recibido: "$497.50", valorReal: "$497.50" },
]

const growthData = [
  { mes: "Ene", banco: 500, remesadora: 510, bitcoin: 525 },
  { mes: "Feb", banco: 990, remesadora: 1015, bitcoin: 1055 },
  { mes: "Mar", banco: 1470, remesadora: 1515, bitcoin: 1590 },
  { mes: "Abr", banco: 1940, remesadora: 2010, bitcoin: 2130 },
  { mes: "May", banco: 2400, remesadora: 2500, bitcoin: 2680 },
  { mes: "Jun", banco: 2850, remesadora: 2985, bitcoin: 3240 },
]

const inflationData = [
  { ano: "2024", nominal: 6000, real: 5700 },
  { ano: "2025", nominal: 12000, real: 10800 },
  { ano: "2026", nominal: 18000, real: 15300 },
  { ano: "2027", nominal: 24000, real: 19200 },
  { ano: "2028", nominal: 30000, real: 22500 },
]

const feesData = [
  { metodo: "Banco", comision: 300, fill: "#ef4444" },
  { metodo: "Remesadora", comision: 180, fill: "#f59e0b" },
  { metodo: "Bitcoin", comision: 30, fill: "#22c55e" },
]

export function ResultsDashboardAhorro({ 
  onBack, 
  onNewSimulation, 
  selectedMonto = "$500", 
  selectedFrecuencia = "Mensual", 
  selectedAnos = "5 años", 
  selectedMetodo = "Cuenta de ahorro", 
  selectedInterest = "3%" 
}: ResultsDashboardProps) {
  // Calcular valores dinámicos
  const aporteTotal = calculateTotalContribution(selectedMonto, selectedFrecuencia, selectedAnos)
  const valorNominal = calculateNominalValue(selectedMonto, selectedFrecuencia, selectedAnos, selectedMetodo, selectedInterest)
  const valorReal = calculateRealValue(selectedMonto, selectedFrecuencia, selectedAnos, selectedMetodo, selectedInterest)
  const perdidaInflacion = valorNominal - valorReal

  // Datos para comparación (simplificado, asumiendo comparación con otros métodos)
  const comparisonData = [
    { metodo: selectedMetodo, aporteTotal: aporteTotal, valorNominal: valorNominal, valorReal: valorReal, perdidaInflacion: perdidaInflacion },
  ]
  return (
    <div className="min-h-screen bg-[#0f172a] relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 grid-pattern pointer-events-none" />
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#22c55e]/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#3b82f6]/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
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
          <span className="text-2xl font-bold gradient-text-animated">
            Resultados
          </span>
        </div>
        <Button 
          onClick={onNewSimulation}
          variant="outline" 
          className="border-[#334155] bg-[#1e293b]/50 text-white hover:bg-[#1e293b] hover:border-[#3b82f6]/50 rounded-xl"
        >
          <RefreshCw className="mr-2 w-4 h-4" />
          Nueva simulacion
        </Button>
      </header>

      {/* Progress indicator */}
      <div className="relative z-10 px-8 lg:px-12 py-4 border-b border-[#334155]/20">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <span className="text-sm text-[#22c55e] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            Simulacion completada
          </span>
          <div className="flex-1 h-1.5 bg-[#1e293b] rounded-full overflow-hidden ml-4">
            <div className="w-full h-full bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#22c55e] rounded-full" />
          </div>
        </div>
      </div>

      <main className="relative z-10 p-8 lg:p-12 max-w-7xl mx-auto space-y-8">
        {/* Title */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Resultados de la simulacion</h1>
          <p className="text-[#94a3b8] text-lg">Ahorro de ${selectedMonto} {selectedFrecuencia.toLowerCase()} durante {selectedAnos} usando {selectedMetodo.toLowerCase()}</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="card-hover glow-green bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 border border-[#334155]/50 p-6 rounded-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 border border-[#22c55e]/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#22c55e]" />
              </div>
              <span className="flex items-center text-xs text-[#22c55e] bg-[#22c55e]/10 px-2 py-1 rounded-full">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                Mejor opcion
              </span>
            </div>
            <p className="text-sm text-[#94a3b8] mb-1">Valor final ({selectedMetodo})</p>
            <p className="text-3xl font-bold text-white mb-2">${valorNominal.toLocaleString()}</p>
            <p className="text-sm text-[#22c55e] flex items-center">
              <TrendingUp className="w-4 h-4 mr-1.5" />
              +${(valorNominal - aporteTotal).toLocaleString()} vs aporte total
            </p>
          </div>

          <div className="card-hover bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 border border-[#334155]/50 p-6 rounded-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ef4444]/20 to-[#ef4444]/5 border border-[#ef4444]/20 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-[#ef4444]" />
              </div>
            </div>
            <p className="text-sm text-[#94a3b8] mb-1">Pérdida por inflación</p>
            <p className="text-3xl font-bold text-white mb-2">${perdidaInflacion.toLocaleString()}</p>
            <p className="text-sm text-[#ef4444] flex items-center">
              <TrendingDown className="w-4 h-4 mr-1.5" />
              -{((perdidaInflacion / valorNominal) * 100).toFixed(1)}% del valor nominal
            </p>
          </div>

          <div className="card-hover bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 border border-[#334155]/50 p-6 rounded-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f59e0b]/20 to-[#f59e0b]/5 border border-[#f59e0b]/20 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-[#f59e0b]" />
              </div>
            </div>
            <p className="text-sm text-[#94a3b8] mb-1">Impacto de inflacion</p>
            <p className="text-3xl font-bold text-white mb-2">-${perdidaInflacion.toLocaleString()}</p>
            <p className="text-sm text-[#f59e0b] flex items-center">
              <TrendingDown className="w-4 h-4 mr-1.5" />
              -{((perdidaInflacion / valorNominal) * 100).toFixed(1)}% poder adquisitivo
            </p>
          </div>

          <div className="card-hover glow-blue bg-gradient-to-br from-[#3b82f6]/10 via-[#1e293b] to-[#8b5cf6]/10 border border-[#3b82f6]/30 p-6 rounded-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3b82f6]/20 to-[#8b5cf6]/20 border border-[#3b82f6]/30 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-[#3b82f6]" />
              </div>
            </div>
            <p className="text-sm text-[#94a3b8] mb-1">Escenario seleccionado</p>
            <p className="text-3xl font-bold gradient-text-animated mb-2">{selectedMetodo}</p>
            <p className="text-sm text-[#3b82f6] flex items-center">
              <Trophy className="w-4 h-4 mr-1.5" />
              Método de ahorro elegido
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 border border-[#334155]/50 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-[#334155]/30">
            <h3 className="text-xl font-semibold text-white">Comparacion detallada de metodos</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#0f172a]/40">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#94a3b8]">Método</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#94a3b8]">Aporte Total</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#94a3b8]">Valor Nominal</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#94a3b8]">Valor Real</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#94a3b8]">Pérdida por Inflación</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row) => (
                  <tr 
                    key={row.metodo} 
                    className="border-t border-[#334155]/30 transition-colors hover:bg-[#0f172a]/20"
                  >
                    <td className="py-5 px-6">
                      <span className="font-semibold text-white">
                        {row.metodo}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-white font-medium">${row.aporteTotal.toLocaleString()}</td>
                    <td className="py-5 px-6 text-white font-medium">${row.valorNominal.toLocaleString()}</td>
                    <td className="py-5 px-6 text-[#22c55e] font-semibold">${row.valorReal.toLocaleString()}</td>
                    <td className="py-5 px-6 text-[#ef4444] font-medium">${row.perdidaInflacion.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Growth Chart */}
          <div className="bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 border border-[#334155]/50 p-6 lg:p-8 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-2">Crecimiento acumulado</h3>
            <p className="text-sm text-[#64748b] mb-6">Dinero total en el destino por metodo</p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="mes" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #334155',
                      borderRadius: '12px',
                      color: '#fff',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                    }}
                    formatter={(value) => [`$${value}`, '']}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="banco" stroke="#ef4444" strokeWidth={2.5} name="Banco" dot={false} />
                  <Line type="monotone" dataKey="remesadora" stroke="#f59e0b" strokeWidth={2.5} name="Remesadora" dot={false} />
                  <Line type="monotone" dataKey="bitcoin" stroke="#22c55e" strokeWidth={2.5} name="Bitcoin" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Inflation Impact Chart */}
          <div className="bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 border border-[#334155]/50 p-6 lg:p-8 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-2">Poder adquisitivo</h3>
            <p className="text-sm text-[#64748b] mb-6">Valor nominal vs valor real ajustado</p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={inflationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="ano" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #334155',
                      borderRadius: '12px',
                      color: '#fff',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                    }}
                    formatter={(value) => [`$${value.toLocaleString()}`, '']}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="nominal" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2.5} name="Valor nominal" />
                  <Area type="monotone" dataKey="real" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={2.5} name="Valor real" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Fees Comparison */}
          <div className="bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 border border-[#334155]/50 p-6 lg:p-8 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-2">Comisiones totales</h3>
            <p className="text-sm text-[#64748b] mb-6">Total pagado en comisiones (anual)</p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={feesData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                  <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <YAxis dataKey="metodo" type="category" stroke="#64748b" fontSize={12} width={90} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #334155',
                      borderRadius: '12px',
                      color: '#fff',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                    }}
                    formatter={(value) => [`$${value}`, 'Comision anual']}
                  />
                  <Bar dataKey="comision" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Educational Card */}
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
                <p className="text-white font-medium text-lg">Analisis de tus resultados</p>
              </div>
            </div>
            
            <div className="space-y-4 flex-1">
              <div className="p-4 rounded-xl bg-[#0f172a]/60 border border-[#334155]/30">
                <p className="text-sm text-[#cbd5e1] leading-relaxed">
                  <span className="text-[#3b82f6] font-medium">Sobre la inflacion:</span> Aunque un monto nominal parezca igual, su poder adquisitivo real 
                  puede disminuir con el tiempo. En {selectedAnos}, ${valorNominal.toLocaleString()} nominales 
                  equivalen a solo ${valorReal.toLocaleString()} en valor real.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#0f172a]/60 border border-[#334155]/30">
                <p className="text-sm text-[#cbd5e1] leading-relaxed">
                  <span className="text-[#f59e0b] font-medium">Sobre {selectedMetodo}:</span> {selectedMetodo === "Bitcoin" ? "Puede comportarse diferente a metodos tradicionales debido a su escasez y volatilidad." : "Las cuentas de ahorro ofrecen rendimientos, pero la inflación puede erosionar el valor."} Las comisiones bajas lo hacen atractivo para ahorros frecuentes.
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
        </div>
      </main>
    </div>
  )
}
