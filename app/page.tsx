"use client"

import { useState } from "react"
import { LandingPage } from "@/components/landing-page"
import { ScenarioSelector } from "@/components/scenario-selector"
import { SimulatorPanel } from "@/components/simulator-panel"
import { ResultsDashboard } from "@/components/results-dashboard"

type Screen = "landing" | "scenarios" | "simulator" | "results"

export default function DecisioApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("landing")
  const [selectedScenario, setSelectedScenario] = useState<string>("")

  const handleStartSimulation = () => {
    setCurrentScreen("scenarios")
  }

  const handleViewScenarios = () => {
    setCurrentScreen("scenarios")
  }

  const handleSelectScenario = (scenario: string) => {
    setSelectedScenario(scenario)
    setCurrentScreen("simulator")
  }

  const handleRunSimulation = () => {
    setCurrentScreen("results")
  }

  const handleBackToLanding = () => {
    setCurrentScreen("landing")
  }

  const handleBackToScenarios = () => {
    setCurrentScreen("scenarios")
  }

  const handleBackToSimulator = () => {
    setCurrentScreen("simulator")
  }

  const handleNewSimulation = () => {
    setCurrentScreen("scenarios")
  }

  return (
    <>
      {currentScreen === "landing" && (
        <LandingPage 
          onStartSimulation={handleStartSimulation}
          onViewScenarios={handleViewScenarios}
        />
      )}
      {currentScreen === "scenarios" && (
        <ScenarioSelector 
          onBack={handleBackToLanding}
          onSelectScenario={handleSelectScenario}
        />
      )}
      {currentScreen === "simulator" && (
        <SimulatorPanel 
          scenario={selectedScenario}
          onBack={handleBackToScenarios}
          onRunSimulation={handleRunSimulation}
        />
      )}
      {currentScreen === "results" && (
        <ResultsDashboard 
          onBack={handleBackToSimulator}
          onNewSimulation={handleNewSimulation}
        />
      )}
    </>
  )
}
