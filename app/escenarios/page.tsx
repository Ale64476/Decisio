"use client"

import { useRouter } from "next/navigation"
import { ScenarioSelector } from "@/components/scenario-selector"

export default function EscenariosPage() {
  const router = useRouter()

  const handleSelectScenario = (scenario: string) => {
    if (scenario === "remesa-enviar") {
      router.push("/simulador/remesas")
      return
    }

    if (scenario === "ahorro") {
      router.push("/simulador/ahorro")
      return
    }

    // Temporal: los demás escenarios siguen yendo a remesas
    router.push("/simulador/remesas")
  }

  return (
    <ScenarioSelector
      onBack={() => router.push("/")}
      onSelectScenario={handleSelectScenario}
    />
  )
}