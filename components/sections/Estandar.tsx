import Image from 'next/image'
import EncabezadoSeccion from '../ui/EncabezadoSeccion'
import Revelar from '../ui/Revelar'
import { estandar } from '@/lib/contenido'

/**
 * Bajo qué estándar trabajamos.
 *
 * Ocupa el lugar donde otras páginas ponen testimonios y logos de clientes.
 * La firma no tiene esos activos y no se inventan: en su lugar va la garantía
 * normativa, que es verificable y además es lo que de verdad le importa a
 * alguien que va a entregar información patrimonial sensible.
 */
export default function Estandar() {
  return (
    <section id="estandar" className="relative overflow-hidden bg-papel">
      {/* Sello del imagotipo, muy tenue, como marca de agua de un documento. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-1/2 hidden -translate-y-1/2 opacity-[0.045] lg:block"
      >
        <Image src="/images/logo.png" alt="" width={520} height={488} className="h-auto w-[32rem]" />
      </div>

      <div className="contenedor relative seccion">
        <EncabezadoSeccion
          eyebrow={estandar.eyebrow}
          titulo={estandar.titulo}
          bajada={estandar.bajada}
        />

        <Revelar retardo={80}>
          <dl className="mt-12 border-t border-borde">
            {estandar.pilares.map((p) => (
              <div
                key={p.titulo}
                className="grid gap-2 border-b border-borde py-6 sm:grid-cols-[260px_1fr] sm:gap-10"
              >
                <dt className="font-display text-[13px] font-semibold uppercase tracking-[0.11em] text-navy">
                  {p.titulo}
                </dt>
                <dd className="max-w-[68ch] text-[14.5px] leading-[1.7] text-tinta-2">{p.texto}</dd>
              </div>
            ))}
          </dl>
        </Revelar>

        <Revelar retardo={120}>
          <div className="mt-9">
            <p className="ordinal text-tenue">VALORES</p>
            <ul className="mt-3.5 flex flex-wrap gap-x-2.5 gap-y-2">
              {estandar.valores.map((v) => (
                <li
                  key={v}
                  className="rounded-lg border border-borde bg-papel-2 px-3 py-1.5 text-[13px] font-medium text-tinta-2"
                >
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </Revelar>
      </div>
    </section>
  )
}
