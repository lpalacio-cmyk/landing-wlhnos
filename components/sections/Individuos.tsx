import EncabezadoSeccion from '../ui/EncabezadoSeccion'
import Revelar from '../ui/Revelar'
import EnlaceMedido from '../ui/EnlaceMedido'
import { Flecha, WhatsApp } from '../ui/icons'
import { individuos } from '@/lib/contenido'
import { wa } from '@/lib/site'

export default function Individuos() {
  return (
    <section id="individuos" className="seccion bg-papel-2">
      <div className="contenedor">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <EncabezadoSeccion
            eyebrow={individuos.eyebrow}
            titulo={individuos.titulo}
            bajada={individuos.bajada}
            cuerpo={individuos.cuerpo}
          />

          <Revelar retardo={140}>
            <figure className="lg:pt-12">
              <blockquote className="border-l-[3px] border-celeste pl-6">
                <p className="font-display text-[clamp(1.125rem,1.02rem+0.55vw,1.375rem)] font-semibold leading-[1.35] tracking-[-0.018em] text-navy">
                  {individuos.cita}
                </p>
              </blockquote>
              <figcaption className="mt-5 max-w-[46ch] pl-6 text-[14px] leading-[1.7] text-tinta-2">
                {individuos.compromiso}
              </figcaption>
            </figure>
          </Revelar>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {individuos.servicios.map((s, i) => (
            <Revelar key={s.orden} retardo={i * 70}>
              <article className="tarjeta tarjeta-viva h-full p-6">
                <span className="ordinal text-celeste-700">{s.orden}</span>
                <h3 className="mt-2.5 font-display text-[17px] font-semibold leading-snug tracking-[-0.015em] text-navy">
                  {s.titulo}
                </h3>
                <ul className="mt-4 grid gap-2.5">
                  {s.detalle.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-[13.5px] leading-[1.6] text-tinta-2">
                      <span aria-hidden="true" className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-celeste" />
                      {d}
                    </li>
                  ))}
                </ul>
              </article>
            </Revelar>
          ))}
        </div>

        <Revelar>
          <p className="mt-7 max-w-[80ch] border-t border-borde pt-5 text-[12.5px] leading-relaxed text-tenue">
            {individuos.encuadre}
          </p>
        </Revelar>

        <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Revelar>
            <EnlaceMedido href={wa.individuos} origen="individuos" className="boton boton-primario">
              <WhatsApp size={16} />
              {individuos.cta}
            </EnlaceMedido>
          </Revelar>

          <Revelar retardo={70}>
            <a
              href="#niveles"
              className="group flex max-w-md items-start gap-3 rounded-xl border border-borde bg-papel px-4 py-3.5 transition-colors hover:border-navy-300"
            >
              <span>
                <span className="block font-display text-[13.5px] font-semibold text-navy">
                  {individuos.puente.titulo}
                </span>
                <span className="mt-1 block text-[13px] leading-snug text-tinta-2">
                  {individuos.puente.texto}
                </span>
              </span>
              <Flecha
                size={16}
                className="mt-0.5 shrink-0 text-celeste-700 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          </Revelar>
        </div>
      </div>
    </section>
  )
}
