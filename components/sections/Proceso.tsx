'use client'

import EncabezadoSeccion from '../ui/EncabezadoSeccion'
import Revelar from '../ui/Revelar'
import { WhatsApp } from '../ui/icons'
import { clicWhatsApp } from '@/lib/eventos'
import { proceso } from '@/lib/contenido'
import { wa } from '@/lib/site'

export default function Proceso() {
  return (
    <section id="proceso" className="seccion bg-papel-2">
      <div className="contenedor">
        <EncabezadoSeccion eyebrow={proceso.eyebrow} titulo={proceso.titulo} />

        <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Regla que une los tres nodos en escritorio. */}
          <span
            aria-hidden="true"
            className="absolute left-[22px] right-[22px] top-[21px] hidden h-0.5 rounded-full bg-gradient-to-r from-borde-fuerte via-borde-fuerte to-transparent md:block"
          />

          {proceso.pasos.map((p, i) => (
            <Revelar as="li" key={p.orden} retardo={i * 90} className="relative">
              <div>
                <span
                  className={`relative z-10 grid h-11 w-11 place-items-center rounded-full font-display text-[15px] font-semibold text-white ${
                    i === 0 ? 'bg-navy ring-4 ring-naranja/30' : 'bg-navy'
                  }`}
                >
                  {p.orden}
                </span>

                <h3 className="titular-3 mt-5 text-navy">{p.titulo}</h3>

                {p.etiqueta && (
                  <p className="mt-2.5 inline-flex items-center rounded-full border border-verde-700/25 bg-verde-50 px-3 py-1 font-display text-[12px] font-semibold text-verde-800">
                    {p.etiqueta}
                  </p>
                )}

                <p className="mt-3 max-w-[42ch] text-[14.5px] leading-[1.7] text-tinta-2">{p.texto}</p>
              </div>
            </Revelar>
          ))}
        </ol>

        <Revelar retardo={120}>
          <div className="mt-12 flex flex-col gap-6 border-t border-borde pt-7 lg:flex-row lg:items-start lg:justify-between">
            <p className="max-w-[62ch] text-[14px] leading-[1.7] text-tenue">{proceso.nota}</p>
            {/* Acá el lector acaba de leer que el primer paso no compromete nada:
                es el pico de intención de toda la página y no tenía dónde tocar. */}
            <a
              href={wa.general}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => clicWhatsApp('proceso')}
              className="boton boton-primario shrink-0"
            >
              <WhatsApp size={16} />
              Agendar la reunión de diagnóstico
            </a>
          </div>
        </Revelar>
      </div>
    </section>
  )
}
