"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ResultsDashboardRemesas } from "@/components/results-dashboard-remesas"

export default function ResultadosRemesasPage() {
  const router = useRouter()

const searchParams = useSearchParams()

const metodo = searchParams.get("metodo") || "Bitcoin"
const origen = searchParams.get("origen") || "Estados Unidos"
const destino = searchParams.get("destino") || "México"
const montoBase = Number(searchParams.get("monto") || "500")
const frecuencia = searchParams.get("frecuencia") || "Mensual"
const monedaOrigen = searchParams.get("monedaOrigen") || "USD"
const monedaDestino = searchParams.get("monedaDestino") || "MXN"
const tipoCambioReferencia = Number(searchParams.get("tipoCambio") || "17")

  return (
    <ResultsDashboardRemesas
      metodoSeleccionado={metodo}
      origen={origen}
      destino={destino}
      monedaOrigen={monedaOrigen}
      monedaDestino={monedaDestino}
      montoBase={montoBase}
      frecuencia={frecuencia}
      tipoCambioReferencia={tipoCambioReferencia}
      onBack={() => router.push("/simulador/remesas")}
      onNewSimulation={() => router.push("/escenarios")}
    />
  )
}