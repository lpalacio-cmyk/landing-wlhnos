import Navegacion from '@/components/ui/Navegacion'
import BarraMovil from '@/components/ui/BarraMovil'
import PieDePagina from '@/components/ui/PieDePagina'

import Hero from '@/components/sections/Hero'
import Puertas from '@/components/sections/Puertas'
import Diagnostico from '@/components/sections/Diagnostico'
import Situacion from '@/components/sections/Situacion'
import Integracion from '@/components/sections/Integracion'
import Sociedades from '@/components/sections/Sociedades'
import Financiamiento from '@/components/sections/Financiamiento'
import Individuos from '@/components/sections/Individuos'
import Niveles from '@/components/sections/Niveles'
import Proceso from '@/components/sections/Proceso'
import Estandar from '@/components/sections/Estandar'
import Equipo from '@/components/sections/Equipo'
import Herramientas from '@/components/sections/Herramientas'
import Preguntas from '@/components/sections/Preguntas'
import Contacto from '@/components/sections/Contacto'

import { preguntas } from '@/lib/contenido'
import { faqJsonLd } from '@/lib/schema'

/**
 * El recorrido de la página, de arriba a abajo:
 *
 *   reconocimiento  → hero, puertas
 *   diagnóstico     → el punto de partida, prediagnóstico
 *   mecanismo       → por qué una sola firma
 *   alcance         → sociedades, financiamiento, individuos
 *   profundidad     → niveles, proceso
 *   prueba          → estándar normativo, equipo
 *   demostración    → herramientas
 *   objeciones      → preguntas
 *   acción          → contacto
 *
 * El ritmo de fondos alterna claro y oscuro para que el scroll tenga
 * crescendo en lugar de un latido plano: el capítulo de financiamiento y el
 * cierre son los dos bloques navy, y son también los dos momentos de mayor peso.
 */
export default function Pagina() {
  return (
    <>
      <Navegacion />

      <main id="contenido">
        <Hero />
        <Puertas />
        <Diagnostico />
        <Situacion />
        <Integracion />
        <Sociedades />
        <Financiamiento />
        <Individuos />
        <Niveles />
        <Proceso />
        <Estandar />
        <Equipo />
        <Herramientas />
        <Preguntas />
        <Contacto />
      </main>

      <PieDePagina />
      <BarraMovil />

      <script
        type="application/ld+json"
        // Contenido propio y estático: las preguntas frecuentes de lib/contenido.ts.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(preguntas.items)) }}
      />
    </>
  )
}
