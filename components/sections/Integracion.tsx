import EncabezadoSeccion from '../ui/EncabezadoSeccion'
import Revelar from '../ui/Revelar'
import { integracion } from '@/lib/contenido'

/**
 * Por qué una sola firma.
 *
 * Dos movimientos: los tres planos simultáneos de evaluación —el argumento
 * mejor escrito de la firma— y las cinco áreas con los instrumentos que
 * efectivamente maneja cada una. La tabla de áreas prueba el alcance de un
 * golpe de vista, sin un solo adjetivo.
 */
export default function Integracion() {
  return (
    <section id="integracion" className="seccion bg-papel-2">
      <div className="contenedor">
        <EncabezadoSeccion
          eyebrow={integracion.eyebrow}
          titulo={integracion.titulo}
          bajada={integracion.bajada}
        />

        {/* ── Los tres planos ────────────────────────────────────────── */}
        <Revelar retardo={80}>
          <p className="mt-14 font-display text-[15px] font-semibold text-navy">
            {integracion.introPlanos}
          </p>
        </Revelar>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {integracion.planos.map((p, i) => (
            <Revelar key={p.orden} retardo={i * 80}>
              <div className="tarjeta tarjeta-viva h-full p-6">
                <span className="ordinal text-celeste-700">{p.orden}</span>
                <h3 className="titular-3 mt-3 text-navy">{p.titulo}</h3>
                <p className="mt-3 text-[14px] leading-[1.65] text-tinta-2">{p.texto}</p>
              </div>
            </Revelar>
          ))}
        </div>

        {/* ── Las cinco áreas ────────────────────────────────────────── */}
        <Revelar>
          <p className="mt-16 font-display text-[15px] font-semibold text-navy">
            {integracion.introAreas}
          </p>
        </Revelar>

        <Revelar retardo={80}>
          <dl className="mt-5 border-t border-borde">
            {integracion.areas.map((a) => (
              <div
                key={a.nombre}
                className="group grid gap-1.5 border-b border-borde py-5 sm:grid-cols-[220px_1fr] sm:gap-8"
              >
                <dt className="relative font-display text-[14.5px] font-semibold uppercase tracking-[0.06em] text-navy">
                  <span
                    aria-hidden="true"
                    className="absolute -left-4 top-1 hidden h-[1.15em] w-[3px] scale-y-0 bg-celeste transition-transform duration-200 group-hover:scale-y-100 sm:block"
                  />
                  {a.nombre}
                </dt>
                <dd className="text-[14.5px] leading-[1.65] text-tinta-2">{a.instrumentos}</dd>
              </div>
            ))}
          </dl>
        </Revelar>
      </div>
    </section>
  )
}
