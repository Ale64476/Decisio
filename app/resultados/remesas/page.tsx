import ResultadosRemesasClient from "./ResultadosRemesasClient"

type PageProps = {
  searchParams: Promise<{
    metodo?: string
    origen?: string
    destino?: string
    monto?: string
    frecuencia?: string
    monedaOrigen?: string
    monedaDestino?: string
    tipoCambio?: string
  }>
}

export default async function ResultadosRemesasPage({ searchParams }: PageProps) {
  const params = await searchParams

  const metodo = params.metodo || "Bitcoin"
  const origen = params.origen || "Estados Unidos"
  const destino = params.destino || "México"
  const montoBase = Number(params.monto || "500")
  const frecuencia = params.frecuencia || "Mensual"
  const monedaOrigen = params.monedaOrigen || "USD"
  const monedaDestino = params.monedaDestino || "MXN"
  const tipoCambioReferencia = Number(params.tipoCambio || "17")

  return (
    <ResultadosRemesasClient
      metodo={metodo}
      origen={origen}
      destino={destino}
      montoBase={montoBase}
      frecuencia={frecuencia}
      monedaOrigen={monedaOrigen}
      monedaDestino={monedaDestino}
      tipoCambioReferencia={tipoCambioReferencia}
    />
  )
}