'use client'

import EncabezadoSeccion from '../ui/EncabezadoSeccion'
import Revelar from '../ui/Revelar'
import { WhatsApp } from '../ui/icons'
import { clicWhatsApp } from '@/lib/eventos'
import { sociedades } from '@/lib/contenido'
import { wa } from '@/lib/site'

export default function Sociedades() {
  return (
    <section id="sociedades" className="seccion bg-papel">
      <div className="contenedor">
        <EncabezadoSeccion
          eyebrow={sociedades.eyebrow}
          titulo={sociedades.titulo}
          bajada={sociedades.bajada}
          cuerpo={sociedades.cuerpo}
        />

        {/* ── Los tres objetivos ─────────────────────────────────────── */}
        <Revelar>
          <p className="mt-14 max-w-2xl font-display text-[15px] font-semibold leading-relaxed text-navy">
            {sociedades.introObjetivos}
          </p>
        </Revelar>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {sociedades.objetivos.map((o, i) => (
            <Revelar key={o.orden} retardo={i * 80}>
              <div className="border-t-2 border-celeste pt-5">
                <span className="ordinal text-celeste-700">{o.orden}</span>
                <h3 className="titular-3 mt-2.5 text-navy">{o.titulo}</h3>
                <p className="mt-3 text-[14.5px] leading-[1.7] text-tinta-2">{o.texto}</p>
              </div>
            </Revelar>
          ))}
        </div>

        {/* ── Los cinco servicios ────────────────────────────────────── */}
        <Revelar>
          <div className="regla mt-16" />
        </Revelar>

        <div className="mt-2">
          {sociedades.servicios.map((s, i) => (
            <Revelar key={s.orden} retardo={i * 55}>
              <article className="grid gap-4 border-b border-borde py-7 sm:grid-cols-[auto_1fr] sm:gap-8 lg:grid-cols-[auto_minmax(0,24rem)_1fr]">
                <span className="ordinal pt-1 text-celeste-700">{s.orden}</span>

                <h3 className="font-display text-[clamp(1.0625rem,1rem+0.35vw,1.3125rem)] font-semibold leading-snug tracking-[-0.018em] text-navy">
                  {s.titulo}
                </h3>

                <ul className="grid gap-2.5 sm:col-span-2 lg:col-span-1 lg:col-start-3">
                  {s.detalle.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-[14.5px] leading-[1.6] text-tinta-2">
                      <span aria-hidden="true" className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-celeste" />
                      {d}
                    </li>
                  ))}
                </ul>
              </article>
            </Revelar>
          ))}
        </div>

        <Revelar retardo={80}>
          <a
            href={wa.sociedades}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => clicWhatsApp('sociedades')}
            className="boton boton-primario mt-9"
          >
            <WhatsApp size={16} />
            {sociedades.cta}
          </a>
        </Revelar>
      </div>
    </section>
  )
}
