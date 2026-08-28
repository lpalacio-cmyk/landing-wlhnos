import EnlaceMedido from './EnlaceMedido'
import { Check, WhatsApp } from './icons'
import { waNivel } from '@/lib/site'

/**
 * Los tres niveles de alcance de la propuesta económica, sin importes.
 *
 * En el documento los honorarios están en blanco ("$ [ ] + IVA por mes"), así
 * que acá tampoco hay cifras: publicar la estructura sirve para que el visitante
 * se ubique solo y llegue a la reunión sabiendo qué está pidiendo; publicar un
 * precio inventado sería otra cosa.
 *
 * En pantallas chicas la tabla se convierte en tres tarjetas apiladas: una tabla
 * de siete filas por tres columnas es ilegible en un teléfono, y el teléfono es
 * desde donde consulta la mayoría.
 */

const NIVELES = [
  {
    orden: '01',
    nombre: 'Esencial',
    foco: 'Cumplimiento mensual',
    resumen: 'Las obligaciones al día, sin sobresaltos ni multas.',
    destacado: false,
  },
  {
    orden: '02',
    nombre: 'Integral',
    foco: 'Eficiencia y optimización',
    resumen: 'Además, se trabaja sobre la carga fiscal, el costo del financiamiento y la calidad de la información para decidir.',
    destacado: true,
  },
  {
    orden: '03',
    nombre: 'Estratégico',
    foco: 'Sinergia sociedad–accionista',
    resumen: 'Además, se alinea el resultado de la sociedad con el patrimonio de quienes la integran.',
    destacado: false,
  },
] as const

const FILAS = [
  {
    dimension: 'Perímetro',
    // El Nivel 02 trabaja MÁS sobre el MISMO perímetro: acá no hay incremento,
    // y marcarlo con "+" borraría justamente lo que la firma quiere mostrar.
    incremento: [false, false, true],
    valores: ['La sociedad', 'La sociedad', 'La sociedad y los socios como personas humanas'],
  },
  {
    dimension: 'Contable',
    incremento: [false, true, true],
    valores: [
      'Registración en libro diario',
      'Estados contables anuales',
      'Auditoría externa e Informe del Auditor Independiente',
    ],
  },
  {
    dimension: 'Tributario y laboral',
    incremento: [false, true, true],
    valores: [
      'IVA, Ingresos Brutos, Tasa de Seguridad e Higiene, regímenes de información, liquidación de haberes y cargas sociales, y contestación de intimaciones',
      'Proyección anual de la carga fiscal, revisión de encuadres y alternativas de ahorro, y declaraciones juradas de Ganancias y Bienes Personales (Acciones y Participaciones)',
      'Planificación fiscal y patrimonial anual, y declaraciones juradas de los socios personas humanas',
    ],
  },
  {
    dimension: 'Financiamiento',
    incremento: [false, true, true],
    valores: [
      'Preparación de información para presentación bancaria',
      'Diagnóstico y diseño del endeudamiento óptimo, y confección de legajos para presentación ante S.G.R.',
      'Gestión de la obtención del aval y estructuración del financiamiento',
    ],
  },
  {
    dimension: 'Mercado de capitales',
    incremento: [false, true, true],
    valores: [
      'Acceso a instrumentos financieros',
      'Diseño de estrategias de colocación de excedentes',
      'Estrategia patrimonial integrada entre la sociedad y sus accionistas',
    ],
  },
  {
    dimension: 'Asesoramiento',
    // Reemplaza la modalidad del nivel anterior, no la acumula.
    incremento: [false, false, false],
    valores: [
      'Consultas puntuales, cotizadas por separado',
      'Dos horas mensuales incluidas',
      'Permanente, sin límite de consultas',
    ],
  },
  {
    dimension: 'Interlocución',
    // No es acumulativo: cambia el interlocutor, no se suma uno.
    incremento: [false, false, false],
    valores: [
      'Equipo profesional asignado · revisión anual',
      'Gerente asignado · reunión trimestral de gestión',
      'Socio · reunión mensual de gestión',
    ],
  },
] as const

export default function TablaNiveles() {
  return (
    <div>
      {/* ── Escritorio: tabla comparativa ─────────────────────────────── */}
      <div className="hidden lg:block">
        <div className="overflow-hidden rounded-[1.25rem] border border-borde bg-papel shadow-tarjeta">
          <table className="w-full border-collapse text-left">
            <caption className="solo-lectores">
              Comparación de los tres niveles de alcance: Esencial, Integral y Estratégico. Cada nivel
              comprende el alcance del anterior.
            </caption>
            <thead>
              <tr>
                <th scope="col" className="w-[16%] border-b border-borde bg-papel-2 px-5 py-5 align-bottom">
                  <span className="ordinal text-tenue">ALCANCE</span>
                </th>
                {NIVELES.map((n) => (
                  <th
                    key={n.nombre}
                    scope="col"
                    className={`w-[28%] border-b border-l border-borde px-5 py-5 align-bottom ${
                      n.destacado ? 'bg-navy' : 'bg-papel-2'
                    }`}
                  >
                    <span className={`ordinal ${n.destacado ? 'text-celeste-300' : 'text-tenue'}`}>
                      NIVEL {n.orden}
                    </span>
                    <span
                      className={`mt-1.5 block font-display text-[19px] font-semibold tracking-tight ${
                        n.destacado ? 'text-white' : 'text-navy'
                      }`}
                    >
                      {n.nombre}
                    </span>
                    <span
                      className={`mt-1 block text-[13px] font-semibold ${
                        n.destacado ? 'text-celeste-300' : 'text-celeste-700'
                      }`}
                    >
                      {n.foco}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FILAS.map((fila, i) => (
                <tr key={fila.dimension} className={i % 2 === 1 ? 'bg-papel-2/55' : undefined}>
                  <th
                    scope="row"
                    className="border-b border-borde px-5 py-4 align-top font-display text-[13.5px] font-semibold text-navy"
                  >
                    {fila.dimension}
                  </th>
                  {fila.valores.map((valor, j) => (
                    <td
                      key={j}
                      className={`border-b border-l border-borde px-5 py-4 align-top text-[13.5px] leading-[1.55] text-tinta-2 ${
                        NIVELES[j].destacado ? 'bg-celeste-50/45' : ''
                      }`}
                    >
                      {fila.incremento[j] && (
                        <span aria-hidden="true" className="mr-1.5 font-display font-semibold text-verde-800">
                          +
                        </span>
                      )}
                      {valor}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <th scope="row" className="px-5 py-5 align-top font-display text-[13.5px] font-semibold text-navy">
                  Honorarios
                </th>
                {NIVELES.map((n) => (
                  <td
                    key={n.nombre}
                    className={`border-l border-borde px-5 py-5 align-top ${
                      n.destacado ? 'bg-celeste-50/45' : ''
                    }`}
                  >
                    <span className="block font-display text-[13.5px] font-semibold text-navy">
                      Según alcance
                    </span>
                    <span className="mt-0.5 block text-[12.5px] text-tenue">Abono mensual, más IVA.</span>
                    <EnlaceMedido
                      href={waNivel(n.orden, n.nombre)}
                      origen="niveles"
                      className="mt-1.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-celeste-700 underline underline-offset-2 transition-colors hover:text-navy"
                    >
                      Solicitar propuesta
                    </EnlaceMedido>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Móvil y tablet: tarjetas apiladas ─────────────────────────── */}
      <div className="grid gap-4 lg:hidden">
        {NIVELES.map((n, j) => (
          <div
            key={n.nombre}
            className={`overflow-hidden rounded-[1.25rem] border ${
              n.destacado ? 'border-navy shadow-elevada' : 'border-borde shadow-plana'
            }`}
          >
            <div className={`px-5 py-4 ${n.destacado ? 'bg-navy' : 'bg-papel-2'}`}>
              <span className={`ordinal ${n.destacado ? 'text-celeste-300' : 'text-tenue'}`}>
                NIVEL {n.orden}
              </span>
              <h3
                className={`mt-1 font-display text-[20px] font-semibold tracking-tight ${
                  n.destacado ? 'text-white' : 'text-navy'
                }`}
              >
                {n.nombre}
              </h3>
              <p className={`mt-0.5 text-[13.5px] font-semibold ${n.destacado ? 'text-celeste-300' : 'text-celeste-700'}`}>
                {n.foco}
              </p>
              <p className={`mt-2 text-[13.5px] leading-relaxed ${n.destacado ? 'text-claro-2' : 'text-tinta-2'}`}>
                {n.resumen}
              </p>
            </div>

            <dl className="divide-y divide-borde bg-papel">
              {FILAS.map((fila) => (
                <div key={fila.dimension} className="px-5 py-3.5">
                  <dt className="ordinal text-tenue">{fila.dimension.toUpperCase()}</dt>
                  <dd className="mt-1 flex items-start gap-1.5 text-[13.5px] leading-[1.55] text-tinta-2">
                    {fila.incremento[j] && (
                      <span aria-hidden="true" className="font-display font-semibold text-verde-800">
                        +
                      </span>
                    )}
                    <span>{fila.valores[j]}</span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="border-t border-borde bg-white px-5 py-4">
              <p className="mb-3 text-[13px] text-tinta-2">
                <span className="font-display font-semibold text-navy">Honorarios según alcance.</span>{' '}
                Abono mensual, más IVA.
              </p>
              <EnlaceMedido
                href={waNivel(n.orden, n.nombre)}
                origen="niveles"
                className={`boton w-full ${n.destacado ? 'boton-primario' : 'boton-secundario'}`}
              >
                <WhatsApp size={15} />
                Solicitar propuesta
              </EnlaceMedido>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-borde bg-papel-2 px-4 py-3.5">
        <Check size={16} className="mt-0.5 shrink-0 text-verde-700" />
        <p className="text-[13.5px] leading-relaxed text-tinta-2">
          Cada nivel comprende el alcance del anterior. El cambio de nivel puede solicitarse en
          cualquier momento y rige a partir del mes siguiente. Los honorarios se acuerdan antes de
          empezar y se revisan trimestralmente conforme al IPC publicado por el INDEC.
        </p>
      </div>
    </div>
  )
}
