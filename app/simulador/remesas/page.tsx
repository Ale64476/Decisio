"use client"

import { useRouter } from "next/navigation"
import { SimulatorPanelRemesas } from "@/components/simulator-panel-remesas"

export default function RemesasSimulatorPage() {
  const router = useRouter()

  return (
    <SimulatorPanelRemesas 
      scenario="remesa-enviar"
      onBack={() => router.push("/escenarios")}
      onViewResults={() => router.push("/resultados")}
    />
  )
}