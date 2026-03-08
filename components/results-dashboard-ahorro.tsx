"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, AlertCircle, Trophy, RefreshCw, CheckCircle2, ArrowUpRight } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, AreaChart, Area } from "recharts"

interface ResultsDashboardProps {
  onBack: () => void
  onNewSimulation: () => void
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

export function ResultsDashboardAhorro({ onBack, onNewSimulation }: ResultsDashboardProps) {
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
          <p className="text-[#94a3b8] text-lg">Comparacion de metodos para envio mensual de $500 USD durante 5 anos</p>
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
            <p className="text-sm text-[#94a3b8] mb-1">Valor final (Bitcoin)</p>
            <p className="text-3xl font-bold text-white mb-2">$29,850</p>
            <p className="text-sm text-[#22c55e] flex items-center">
              <TrendingUp className="w-4 h-4 mr-1.5" />
              +$4,850 vs banco
            </p>
          </div>

          <div className="card-hover bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 border border-[#334155]/50 p-6 rounded-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ef4444]/20 to-[#ef4444]/5 border border-[#ef4444]/20 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-[#ef4444]" />
              </div>
            </div>
            <p className="text-sm text-[#94a3b8] mb-1">Perdida por comisiones (Banco)</p>
            <p className="text-3xl font-bold text-white mb-2">$1,500</p>
            <p className="text-sm text-[#ef4444] flex items-center">
              <TrendingDown className="w-4 h-4 mr-1.5" />
              -5% del total enviado
            </p>
          </div>

          <div className="card-hover bg-gradient-to-br from-[#1e293b] to-[#1e293b]/60 border border-[#334155]/50 p-6 rounded-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f59e0b]/20 to-[#f59e0b]/5 border border-[#f59e0b]/20 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-[#f59e0b]" />
              </div>
            </div>
            <p className="text-sm text-[#94a3b8] mb-1">Impacto de inflacion</p>
            <p className="text-3xl font-bold text-white mb-2">-$7,500</p>
            <p className="text-sm text-[#f59e0b] flex items-center">
              <TrendingDown className="w-4 h-4 mr-1.5" />
              -25% poder adquisitivo
            </p>
          </div>

          <div className="card-hover glow-blue bg-gradient-to-br from-[#3b82f6]/10 via-[#1e293b] to-[#8b5cf6]/10 border border-[#3b82f6]/30 p-6 rounded-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3b82f6]/20 to-[#8b5cf6]/20 border border-[#3b82f6]/30 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-[#3b82f6]" />
              </div>
            </div>
            <p className="text-sm text-[#94a3b8] mb-1">Escenario mas eficiente</p>
            <p className="text-3xl font-bold gradient-text-animated mb-2">Bitcoin</p>
            <p className="text-sm text-[#3b82f6] flex items-center">
              <Trophy className="w-4 h-4 mr-1.5" />
              Menor costo total
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
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#94a3b8]">Metodo</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#94a3b8]">Comision</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#94a3b8]">Tiempo</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#94a3b8]">Dinero recibido</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#94a3b8]">Valor real</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row) => (
                  <tr 
                    key={row.metodo} 
                    className={`border-t border-[#334155]/30 transition-colors ${row.metodo === "Bitcoin" ? "bg-[#22c55e]/5" : "hover:bg-[#0f172a]/20"}`}
                  >
                    <td className="py-5 px-6">
                      <span className={`font-semibold ${row.metodo === "Bitcoin" ? "text-[#22c55e]" : "text-white"}`}>
                        {row.metodo}
                      </span>
                    </td>
                    <td className="py-5 px-6">
                      <span className="text-white font-medium">{row.comision}</span>
                      <span className="text-[#64748b] text-sm ml-2">({row.comisionPct})</span>
                    </td>
                    <td className="py-5 px-6 text-[#94a3b8]">{row.tiempo}</td>
                    <td className="py-5 px-6 text-white font-medium">{row.recibido}</td>
                    <td className="py-5 px-6">
                      <span className={`font-semibold ${row.metodo === "Bitcoin" ? "text-[#22c55e]" : "text-white"}`}>
                        {row.valorReal}
                      </span>
                    </td>
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
                  puede disminuir con el tiempo. En 5 anos, $30,000 nominales 
                  equivalen a solo $22,500 en valor real.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#0f172a]/60 border border-[#334155]/30">
                <p className="text-sm text-[#cbd5e1] leading-relaxed">
                  <span className="text-[#f59e0b] font-medium">Sobre Bitcoin:</span> Puede comportarse diferente a metodos tradicionales debido 
                  a su escasez y volatilidad. Sin embargo, las comisiones bajas lo 
                  hacen atractivo para transferencias frecuentes.
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
