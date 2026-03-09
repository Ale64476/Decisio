"use client"

import { useRouter } from "next/navigation"
import { ResultsDashboardRemesas } from "@/components/results-dashboard-remesas"

type Props = {
  metodo: string
  origen: string
  destino: string
  montoBase: number
  frecuencia: string
  monedaOrigen: string
  monedaDestino: string
  tipoCambioReferencia: number
}

export default function ResultadosRemesasClient({
  metodo,
  origen,
  destino,
  montoBase,
  frecuencia,
  monedaOrigen,
  monedaDestino,
  tipoCambioReferencia,
}: Props) {
  const router = useRouter()

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