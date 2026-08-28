'use client'

import EncabezadoSeccion from '../ui/EncabezadoSeccion'
import Revelar from '../ui/Revelar'
import { Check, WhatsApp } from '../ui/icons'
import { clicWhatsApp } from '@/lib/eventos'
import { financiamiento, metodo } from '@/lib/contenido'
import { wa } from '@/lib/site'

/**
 * El capítulo oscuro de la página.
 *
 * Financiamiento PyME es el material mejor escrito de la firma y el servicio
 * que ningún estudio contable de la zona ofrece con este nivel de detalle, así
 * que ocupa el bloque de mayor peso visual: fondo navy a sangre, continuo entre
 * los resultados y el método, sin corte de color entre ambos.
 */
export default function Financiamiento() {
  return (
    <section id="financiamiento" className="relative overflow-hidden bg-navy">
      <div aria-hidden="true" className="trama-puntos absolute inset-0" />

      <div className="contenedor relative">
        {/* ── Qué obtiene su empresa ───────────────────────────────── */}
        <div className="seccion pb-0">
          <EncabezadoSeccion
            eyebrow={financiamiento.eyebrow}
            titulo={financiamiento.titulo}
            bajada={financiamiento.bajada}
            oscuro
          />

          <div className="mt-12 grid gap-x-10 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
            {financiamiento.resultados.map((r, i) => (
              <Revelar key={r.orden} retardo={i * 60}>
                <article className="border-t border-white/14 pt-5">
                  <span className="ordinal text-celeste-300">{r.orden}</span>
                  <h3 className="titular-3 mt-2.5 text-white">{r.titulo}</h3>
                  <p className="mt-3 text-[14px] leading-[1.68] text-claro-2">{r.texto}</p>
                </article>
              </Revelar>
            ))}
          </div>

          {/* Fichas de instrumentos: comunican dominio antes de leerse. */}
          <Revelar>
            <div className="mt-14">
              <p className="font-display text-[13px] font-semibold uppercase tracking-[0.12em] text-claro-tenue">
                {financiamiento.tituloInstrumentos}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {financiamiento.instrumentos.map((n) => (
                  <li
                    key={n}
                    className="rounded-lg border border-celeste/35 bg-celeste/10 px-3 py-1.5 text-[12.5px] font-medium text-celeste-300"
                  >
                    {n}
                  </li>
                ))}
              </ul>
              <p className="mt-4 max-w-[76ch] text-[12.5px] leading-relaxed text-claro-tenue">
                {financiamiento.notaInstrumentos}
              </p>
            </div>
          </Revelar>
        </div>

        {/* ── Cómo trabajamos ───────────────────────────────────────── */}
        <div id="metodo" className="seccion">
          <Revelar>
            <div className="h-px bg-white/12" />
          </Revelar>

          <EncabezadoSeccion
            eyebrow={metodo.eyebrow}
            titulo={metodo.titulo}
            oscuro
            className="mt-14"
          />

          <ol className="mt-11">
            {metodo.etapas.map((e, i) => (
              <Revelar as="li" key={e.orden} retardo={i * 70} className="grid gap-5 border-t border-white/12 py-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="ordinal text-celeste-300">{e.orden}</span>
                      <h3 className="titular-3 text-white">{e.titulo}</h3>
                    </div>
                    <p className="mt-3.5 text-[14.5px] leading-[1.7] text-claro-2">{e.texto}</p>
                  </div>

                  <div className="tarjeta-oscura h-fit p-5">
                    <p className="ordinal text-celeste-300">ENTREGABLE</p>
                    <p className="mt-2 text-[14px] leading-[1.6] text-white">{e.entregable}</p>
                  </div>
                </Revelar>
            ))}
          </ol>

          {/* Los cinco entregables, con estética de índice de informe. */}
          <Revelar>
            <div className="mt-12 rounded-[1.25rem] border border-white/14 p-6 sm:p-8">
              <p className="font-display text-[15px] font-semibold text-white">
                {metodo.tituloEntregables}
              </p>
              <ol className="mt-5 grid gap-3.5 sm:grid-cols-2">
                {metodo.entregables.map((e, i) => (
                  <li key={e} className="flex items-start gap-3 text-[14px] leading-[1.6] text-claro-2">
                    <span className="ordinal mt-[3px] shrink-0 text-celeste-300">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {e}
                  </li>
                ))}
              </ol>
            </div>
          </Revelar>

          <Revelar retardo={60}>
            <p className="mt-8 max-w-[70ch] text-[14px] leading-[1.7] text-claro-tenue">
              {metodo.honorarios}
            </p>
          </Revelar>

          {/* Salvaguarda: impide que esta sección se lea como promesa de resultado. */}
          <Revelar retardo={100}>
            <div className="mt-6 flex max-w-[70ch] items-start gap-3 rounded-xl border border-celeste/30 bg-celeste/[0.08] px-5 py-4">
              <Check size={17} className="mt-0.5 shrink-0 text-celeste-300" />
              <p className="text-[14px] leading-[1.65] text-white">{metodo.salvaguarda}</p>
            </div>
          </Revelar>

          <Revelar retardo={140}>
            <a
              href={wa.financiamiento}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => clicWhatsApp('financiamiento')}
              className="boton boton-primario mt-9"
            >
              <WhatsApp size={16} />
              {metodo.cta}
            </a>
          </Revelar>
        </div>
      </div>
    </section>
  )
}
