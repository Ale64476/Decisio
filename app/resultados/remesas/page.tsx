"use client"

import { useRouter } from "next/navigation"
import { ResultsDashboardRemesas } from "@/components/results-dashboard-remesas"

export default function ResultadosRemesasPage() {
  const router = useRouter()

  return (
    <ResultsDashboardRemesas
      onBack={() => router.push("/simulador/remesas")}
      onNewSimulation={() => router.push("/escenarios")}
    />
  )
}