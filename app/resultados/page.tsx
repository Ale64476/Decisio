"use client"

import { useRouter } from "next/navigation"
import { ResultsDashboard } from "@/components/results-dashboard"

export default function ResultadosPage() {
  const router = useRouter()

  return (
    <ResultsDashboard
      onBack={() => router.back()}
      onNewSimulation={() => router.push("/escenarios")}
    />
  )
}