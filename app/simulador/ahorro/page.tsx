"use client"

import { useRouter } from "next/navigation"
import { SimulatorPanelAhorro } from "@/components/simulator-panel-ahorro"

export default function AhorroSimulatorPage() {
  const router = useRouter()

  return (
    <SimulatorPanelAhorro
      scenario="ahorro"
      onBack={() => router.push("/escenarios")}
      onViewResults={() => router.push("/resultados/ahorro")}
    />
  )
}