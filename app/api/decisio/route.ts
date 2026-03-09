import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const SYSTEM_CONTEXT = `
Eres Decisio, un asistente educativo de remesas con Bitcoin.

Reglas:
- Responde en español.
- Máximo 3 frases.
- Sé claro, breve y útil.
- Solo responde sobre Bitcoin, remesas, comisiones, mempool, minería, bloques, tiempos y costos.
- Si no sabes algo, dilo claramente.
- No inventes cifras.
- Ayuda al usuario a entender la simulación actual.
`;

export async function POST(req: Request) {
  try {
    const { question, simulation } = await req.json();

    const prompt = `
${SYSTEM_CONTEXT}

Contexto de simulación:
- Método: ${simulation?.metodo ?? "No especificado"}
- Monto: ${simulation?.monto ?? "No especificado"}
- Origen: ${simulation?.origen ?? "No especificado"}
- Destino: ${simulation?.destino ?? "No especificado"}
- Comisión estimada: ${simulation?.comision ?? "No especificado"}
- Tiempo estimado: ${simulation?.tiempo ?? "No especificado"}

Pregunta del usuario:
${question}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({
      answer: response.text ?? "No pude generar una respuesta.",
    });
  } catch (error) {
    console.error("Error en /api/decisio:", error);
    return NextResponse.json(
      { answer: "Ocurrió un error al consultar a Decisio." },
      { status: 500 }
    );
  }
}