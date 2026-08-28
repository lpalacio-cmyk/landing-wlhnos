'use client'

import CascadaDelPrecio from '../ui/CascadaDelPrecio'
import EncabezadoSeccion from '../ui/EncabezadoSeccion'
import Revelar from '../ui/Revelar'
import { Calculadora, Flecha, WhatsApp } from '../ui/icons'
import { clicHerramienta, clicWhatsApp } from '@/lib/eventos'
import { herramientasSeccion } from '@/lib/contenido'
import { herramientas, wa } from '@/lib/site'

export default function Herramientas() {
  return (
    <section id="herramientas" className="seccion bg-papel">
      <div className="contenedor">
        <EncabezadoSeccion
          eyebrow={herramientasSeccion.eyebrow}
          titulo={herramientasSeccion.titulo}
          bajada={herramientasSeccion.bajada}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:gap-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {herramientas.map((h, i) => (
              <Revelar key={h.href} retardo={i * 80}>
                <article className="tarjeta tarjeta-viva flex h-full flex-col p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-celeste-50 text-celeste-700">
                      <Calculadora size={21} />
                    </span>
                    <span className="rounded-full border border-borde bg-papel-2 px-2.5 py-1 text-[11px] font-semibold text-tenue">
                      Sin registro · Sin costo
                    </span>
                  </div>

                  <h3 className="titular-3 mt-5 text-navy">{h.titulo}</h3>
                  <p className="mt-2.5 flex-1 text-[14px] leading-[1.65] text-tinta-2">{h.resumen}</p>

                  <a
                    href={h.href}
                    onClick={() => clicHerramienta(h.href.includes('precio') ? 'precio' : 'equilibrio')}
                    className="boton boton-secundario mt-6 self-start"
                  >
                    Abrir la calculadora
                    <Flecha size={15} />
                  </a>
                </article>
              </Revelar>
            ))}
          </div>

          <Revelar retardo={140}>
            <CascadaDelPrecio enlace={herramientas[0].href} />
          </Revelar>
        </div>

        <Revelar retardo={80}>
          <div className="mt-9 flex flex-col gap-5 rounded-[1.25rem] border border-borde bg-papel-2 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <p className="max-w-[52ch] text-[15px] leading-relaxed text-tinta-2">
              {herramientasSeccion.cierre}
            </p>
            <a
              href={wa.general}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => clicWhatsApp('herramientas')}
              className="boton boton-primario shrink-0"
            >
              <WhatsApp size={16} />
              {herramientasSeccion.cta}
            </a>
          </div>
        </Revelar>

        <p className="mt-4 text-[12.5px] text-tenue">{herramientasSeccion.disclaimer}</p>
      </div>
    </section>
  )
}
