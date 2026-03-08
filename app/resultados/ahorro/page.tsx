"use client"

import { useRouter } from "next/navigation"
import { ResultsDashboardAhorro } from "@/components/results-dashboard-ahorro"

export default function ResultadosAhorroPage() {
  const router = useRouter()

  return (
    <ResultsDashboardAhorro
      onBack={() => router.push("/simulador/ahorro")}
      onNewSimulation={() => router.push("/escenarios")}
    />
  )
}