import EnlaceMedido from '../ui/EnlaceMedido'
import { Flecha } from '../ui/icons'
import Revelar from '../ui/Revelar'
import { puertas } from '@/lib/contenido'

/**
 * Tres puertas de entrada, inmediatamente debajo de la portada.
 *
 * La página habla a tres lectores distintos —una sociedad, una empresa que
 * necesita financiarse y una persona humana— y sin esta banda los tres tienen
 * que leer lo que no les corresponde antes de encontrar lo suyo.
 */
export default function Puertas() {
  return (
    <section aria-labelledby="puertas-titulo" className="border-b border-borde bg-papel py-10 sm:py-12">
      <div className="contenedor">
        <h2 id="puertas-titulo" className="solo-lectores">
          {puertas.titulo}
        </h2>

        <div className="grid gap-3 md:grid-cols-3 md:gap-4">
          {puertas.opciones.map((o, i) => (
            <Revelar key={o.clave} retardo={i * 70}>
              <EnlaceMedido
                href={o.ancla}
                origen="puertas"
                tipo="perfil"
                detalle={o.clave}
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.125rem] border border-borde bg-papel p-5 transition-all duration-200 hover:border-navy-300 hover:shadow-tarjeta sm:p-6"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-2 font-display text-[3.25rem] font-semibold leading-none text-papel-3 transition-colors duration-200 group-hover:text-celeste-50"
                >
                  {o.orden}
                </span>

                <h3 className="relative font-display text-[17px] font-semibold leading-snug text-navy">
                  {o.titulo}
                </h3>
                <p className="relative mt-2.5 text-[13.5px] leading-[1.6] text-tinta-2">{o.texto}</p>

                <span className="relative mt-4 inline-flex items-center gap-1.5 font-display text-[13px] font-semibold text-celeste-700 transition-colors group-hover:text-navy">
                  Ver esta propuesta
                  <Flecha
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>
              </EnlaceMedido>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  )
}
