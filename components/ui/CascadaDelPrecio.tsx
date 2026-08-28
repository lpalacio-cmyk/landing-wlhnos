import { Flecha } from './icons'

/**
 * Cascada del precio: del precio de lista al ingreso que efectivamente queda.
 *
 * No lleva un solo importe. Los únicos números del sitio son los que carga el
 * propio visitante en las calculadoras; acá se nombran los conceptos, que es
 * exactamente donde está el argumento: la mayoría de las PyMEs fija precio
 * mirando el margen bruto y descubre tarde todo lo que hay entre la lista y
 * el bolsillo.
 */

const deducciones = [
  { concepto: 'IVA débito fiscal', nota: 'No es ingreso: se traslada.' },
  { concepto: 'Ingresos Brutos', nota: 'Según jurisdicción y actividad.' },
  { concepto: 'Tasa de Seguridad e Higiene', nota: 'Municipal, sobre facturación.' },
  { concepto: 'Impuesto a débitos y créditos', nota: 'Sobre el movimiento bancario.' },
  { concepto: 'Retenciones no recuperables', nota: 'Saldos que quedan a favor sin uso.' },
  { concepto: 'Comisiones de medios de pago', nota: 'Tarjeta, billetera, cuotas.' },
  { concepto: 'Bonificaciones', nota: 'Descuentos de lista efectivamente otorgados.' },
  { concepto: 'Costo financiero', nota: 'El precio de cobrar a plazo.' },
]

export default function CascadaDelPrecio({ enlace }: { enlace?: string }) {
  return (
    <figure className="tarjeta overflow-hidden">
      <figcaption className="border-b border-borde bg-papel-2 px-5 py-4 sm:px-6">
        <p className="ordinal text-celeste-700">DEL PRECIO DE LISTA AL INGRESO REAL</p>
        <p className="mt-1.5 text-[13.5px] leading-snug text-tinta-2">
          Lo que separa el precio que factura del dinero que finalmente le queda.
        </p>
      </figcaption>

      <div className="px-5 py-5 sm:px-6">
        <div className="flex items-baseline justify-between gap-4 border-b border-borde pb-3.5">
          <span className="font-display text-[14.5px] font-semibold text-navy">Precio de lista</span>
          <span className="text-[12.5px] text-tenue">lo que paga su cliente</span>
        </div>

        <ul className="mt-1">
          {deducciones.map((d) => (
            <li
              key={d.concepto}
              className="flex items-baseline justify-between gap-4 border-b border-borde-suave py-2.5"
              style={{ borderBottomColor: 'var(--color-borde)' }}
            >
              <span className="flex items-baseline gap-2 text-[13.5px] text-tinta">
                <span aria-hidden="true" className="font-display text-[13px] font-semibold text-naranja-700">
                  &minus;
                </span>
                {d.concepto}
              </span>
              <span className="hidden text-right text-[12px] leading-tight text-tenue sm:block">
                {d.nota}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-3.5 flex items-baseline justify-between gap-4 rounded-xl bg-navy px-4 py-3.5">
          <span className="font-display text-[14.5px] font-semibold text-white">
            Ingreso real por unidad
          </span>
          <span className="text-[12.5px] text-claro-tenue">sobre esto se calcula el margen</span>
        </div>

        {enlace && (
          <a
            href={enlace}
            className="mt-4 inline-flex items-center gap-1.5 font-display text-[13.5px] font-semibold text-celeste-700 transition-colors hover:text-navy"
          >
            Calcularlo con sus números
            <Flecha size={14} />
          </a>
        )}
      </div>
    </figure>
  )
}
