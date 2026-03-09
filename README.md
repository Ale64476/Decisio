# Decisio

<p align="center">
  <b>Visualiza, compara y entiende como funciona la Bitcoin en diferentes escenarios en México.</b>
</p>

<p align="center">
  Herramienta educativa para mostrar comisiones, tiempos, diferencias entre métodos tradicionales y Bitcoin, e impacto acumulado en el dinero recibido.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-149eca" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-Ready-3178c6" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-UI-38bdf8" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Status-MVP-success" alt="MVP" />
</p>

---
En México, millones de familias dependen de las remesas y el ahorro. Aun así, muchas personas no tienen claridad sobre cuánto dinero se pierde realmente entre comisiones, tipos de cambio desfavorables y tiempos de espera.

**Decisio** nace para volver visible ese problema.

En lugar de presentar datos fríos o complicados, Decisio transforma el envío de remesas en una experiencia visual, comparativa y fácil de entender. El usuario puede explorar escenarios, comparar métodos y descubrir cuánto dinero llega realmente a destino.

Más que imponer una alternativa, Decisio busca **educar**. Presenta de forma clara el costo real de cada decisión y abre la puerta a entender cómo tecnologías como Bitcoin pueden ofrecer rutas distintas dentro de un contexto práctico, cotidiano y relevante para México.

## ¿Por qué existe?

Porque muchas decisiones financieras se toman sin información clara.

Decisio busca resolver tres problemas principales:

- La falta de visibilidad sobre las comisiones reales.
- La dificultad para comparar métodos de envío de forma simple.
- La necesidad de acercar la educación financiera y Bitcoin a casos reales.

## Propuesta de valor

Decisio aporta valor porque:

- hace visible un costo que normalmente pasa desapercibido
- traduce conceptos financieros complejos a comparaciones simples
- convierte datos en una experiencia visual y educativa
- conecta educación Bitcoin con una necesidad real de México
- puede escalar hacia una plataforma de aprendizaje financiero más amplia

## Funcionalidades principales

- Simulación de escenarios de remesas.
- Simulación de escenarios de ahorro.
- Comparación entre distintos métodos de envío.
- Visualización del dinero recibido neto.
- Análisis de comisiones y costos ocultos.
- Comparativas claras de tiempo y eficiencia.
- Visualización del impacto acumulado a lo largo de los años.
- Interpretación asistida por IA de resultados.

## Flujo del producto

1. El usuario entra al simulador.
2. Selecciona un escenario de envío.
3. Decisio procesa el monto, método y condiciones.
4. Se generan resultados comparativos.
5. El usuario entiende cuánto pierde, cuánto recibe y cómo cambia el resultado según el método elegido.

## Stack tecnológico

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Vercel**
- **Gemini API** para interpretación de resultados

## Estructura general

```text
app/
  api/
    decisio/
  escenarios/
  resultados/
    ahorro/
    remesas/
  simulador/
    ahorro/
    remesas/

components/
public/
```

## Requisitos previos

Instala lo siguiente antes de correr el proyecto:

- **Node.js 18 o superior**
- **pnpm**

Verifica instalación:

```bash
node -v
pnpm -v
```

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/Ale64476/Decisio.git
```

Entra al proyecto:

```bash
cd Decisio
```

Instala dependencias:

```bash
pnpm install
```

## Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
GEMINI_API_KEY=tu_api_key_aqui
```

Notas importantes:

- No subas `.env.local` al repositorio.
- En Vercel debes configurar la misma variable en **Project Settings > Environment Variables**.
- Si cambias variables de entorno en Vercel, debes volver a desplegar.

## Ejecutar en local

Inicia el entorno de desarrollo:

```bash
pnpm dev
```

Abre:

```text
http://localhost:3000
```

## Build de producción

Para validar que el proyecto compila correctamente:

```bash
pnpm build
```

Para levantar la versión de producción:

```bash
pnpm start
```

## Errores comunes

### 1. Falta la variable de entorno

Si la API no responde o falla la interpretación de resultados, revisa que exista:

```env
GEMINI_API_KEY=...
```

y que esté configurada también en Vercel.

### 2. Error con `useSearchParams()` en producción

Si Next.js falla al hacer build con un mensaje relacionado con `useSearchParams`, revisa que esa lógica no esté directamente dentro de un `page.tsx` que se renderiza en servidor. En ese caso:

- mueve la lógica a un componente cliente, o
- recibe `searchParams` desde la página del App Router

### 3. El deploy sí compila pero la API falla

Verifica:

- que `GEMINI_API_KEY` exista en Vercel
- que el endpoint de la API esté usando correctamente `process.env.GEMINI_API_KEY`
- que hayas hecho redeploy después de agregar la variable

## Estado actual

Decisio se encuentra en etapa de **MVP funcional** con foco en:

- educación financiera
- educación Bitcoin aplicada a México
- comparación visual de remesas
- experiencia simple y entendible para el usuario

## Visión

Decisio puede evolucionar hacia una plataforma educativa más completa que ayude a personas y familias a comprender mejor decisiones financieras cotidianas.

A futuro, el proyecto puede crecer con:

- más tipos de simulación
- más métodos de comparación
- nuevas visualizaciones
- rutas educativas guiadas
- herramientas orientadas a adopción y comprensión de Bitcoin en contextos reales

## Demo

```text
https://decisio-1mj5a5prb-al064476-6759s-projects.vercel.app
```


## Autor

Desarrollado por **Alejandro Ordoñez y Néstor Medina** como una propuesta enfocada en educación Bitcoin, visualización de escenarios económicas y toma de decisiones financieras más informadas.

