'use client'

import { Flecha, WhatsApp } from '../ui/icons'
import { clicWhatsApp } from '@/lib/eventos'
import { hero } from '@/lib/contenido'
import { wa } from '@/lib/site'

/**
 * Portada.
 *
 * La columna derecha no lleva un panel de gestión con cifras inventadas —el
 * error de la versión anterior— sino el contraste tipográfico entre lo que se
 * acepta y lo que se decide, construido con frases textuales de la propuesta de
 * Financiamiento PyME. Es contenido real y no depende de ningún activo.
 */
export default function Hero() {
  const [antes, despues] = hero.titulo.split(hero.tituloResaltado)

  return (
    <section id="inicio" className="relative overflow-hidden bg-navy pt-[68px]">
      {/* Trama y halo de fondo */}
      <div aria-hidden="true" className="trama-puntos absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute -right-1/4 -top-1/3 h-[42rem] w-[42rem] rounded-full opacity-45 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(21,149,188,0.42) 0%, rgba(21,149,188,0) 68%)',
        }}
      />

      <div className="contenedor relative">
        <div className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:py-24">
          {/* ── Columna de texto ──────────────────────────────────────── */}
          <div>
            <p className="etiqueta etiqueta-clara">{hero.eyebrow}</p>

            <h1 className="titular-1 mt-6 max-w-[17ch] text-white lg:max-w-[19ch]">
              {antes}
              <span className="text-celeste-300">{hero.tituloResaltado}</span>
              {despues}
            </h1>

            <p className="bajada mt-6 max-w-[54ch] text-claro-2">{hero.bajada}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={wa.general}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => clicWhatsApp('hero')}
                className="boton boton-primario"
              >
                <WhatsApp size={17} />
                {hero.ctaPrimario}
              </a>
              <a href="#niveles" className="boton boton-fantasma-claro">
                {hero.ctaSecundario}
                <Flecha size={15} />
              </a>
            </div>

            <p className="mt-3.5 text-[13px] text-claro-tenue">{hero.ctaPrimarioNota}</p>

            {/* Indicadores de confianza: los tres son verificables. */}
            <dl className="mt-11 grid gap-6 border-t border-white/12 pt-7 sm:grid-cols-3 sm:gap-5">
              {hero.confianza.map((c) => (
                <div key={c.valor}>
                  <dt className="font-display text-[15px] font-semibold leading-tight text-white">
                    {c.valor}
                  </dt>
                  <dd className="mt-1.5 text-[12.5px] leading-snug text-claro-tenue">{c.detalle}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ── Columna del contraste ─────────────────────────────────── */}
          <div className="lg:pl-4">
            <div className="overflow-hidden rounded-[1.375rem] border border-white/14 bg-white/[0.045] backdrop-blur-sm">
              <div className="grid grid-cols-[1fr_1fr] border-b border-white/12">
                <p className="px-4 py-3 text-center font-display text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/45 sm:px-5">
                  Se acepta
                </p>
                <p className="border-l border-white/12 bg-celeste/10 px-4 py-3 text-center font-display text-[10.5px] font-semibold uppercase tracking-[0.18em] text-celeste-300 sm:px-5">
                  Se decide
                </p>
              </div>

              <ul>
                {hero.contraste.map((fila, i) => (
                  <li
                    key={fila.clave}
                    className={`grid grid-cols-[1fr_1fr] ${
                      i > 0 ? 'border-t border-white/10' : ''
                    }`}
                  >
                    <p className="px-4 py-4 text-[13px] leading-[1.5] text-white/50 sm:px-5 sm:text-[13.5px]">
                      {fila.acepta}
                    </p>
                    <p className="border-l border-white/12 bg-celeste/[0.07] px-4 py-4 text-[13px] leading-[1.5] text-white sm:px-5 sm:text-[13.5px]">
                      {fila.decide}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-3.5 px-1 text-[12px] leading-relaxed text-white/40">
              Esquema conceptual. Qué corresponde en cada caso depende del destino de los fondos, del
              encuadre de la empresa y de las garantías disponibles.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
