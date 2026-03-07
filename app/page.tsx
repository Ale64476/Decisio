"use client"

import { useRouter } from "next/navigation"
import { LandingPage } from "@/components/landing-page"

export default function HomePage() {
  const router = useRouter()

  return (
    <LandingPage
      onStartSimulation={() => router.push("/escenarios")}
      onViewScenarios={() => router.push("/escenarios")}
    />
  )
}