"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ResultsDashboardAhorro } from "@/components/results-dashboard-ahorro"

export default function ResultadosAhorroPage() {
  const router = useRouter()
  const [selectedMonto, setSelectedMonto] = useState("$500")
  const [selectedFrecuencia, setSelectedFrecuencia] = useState("Mensual")
  const [selectedAnos, setSelectedAnos] = useState("5 años")
  const [selectedMetodo, setSelectedMetodo] = useState("Cuenta de ahorro")
  const [selectedInterest, setSelectedInterest] = useState("3%")

  useEffect(() => {
    // Leer los valores desde localStorage
    const monto = localStorage.getItem("selectedMonto") || "$500"
    const frecuencia = localStorage.getItem("selectedFrecuencia") || "Mensual"
    const anos = localStorage.getItem("selectedAnos") || "5 años"
    const metodo = localStorage.getItem("selectedMetodo") || "Cuenta de ahorro"
    const interest = localStorage.getItem("selectedInterest") || "3%"

    setSelectedMonto(monto)
    setSelectedFrecuencia(frecuencia)
    setSelectedAnos(anos)
    setSelectedMetodo(metodo)
    setSelectedInterest(interest)
  }, [])

  return (
    <ResultsDashboardAhorro
      onBack={() => router.push("/simulador/ahorro")}
      onNewSimulation={() => router.push("/escenarios")}
      selectedMonto={selectedMonto}
      selectedFrecuencia={selectedFrecuencia}
      selectedAnos={selectedAnos}
      selectedMetodo={selectedMetodo}
      selectedInterest={selectedInterest}
    />
  )
}