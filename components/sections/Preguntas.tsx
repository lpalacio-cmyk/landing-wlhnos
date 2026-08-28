import EncabezadoSeccion from '../ui/EncabezadoSeccion'
import Revelar from '../ui/Revelar'
import { Mas } from '../ui/icons'
import { preguntas } from '@/lib/contenido'

/**
 * Preguntas frecuentes.
 *
 * Acordeón nativo con <details>/<summary>: funciona sin JavaScript, es
 * accesible por teclado sin código propio y el buscador indexa igual el
 * contenido cerrado. La primera queda abierta.
 */
export default function Preguntas() {
  return (
    <section id="preguntas" className="seccion bg-papel-2">
      <div className="contenedor">
        <EncabezadoSeccion eyebrow={preguntas.eyebrow} titulo={preguntas.titulo} />

        <div className="mt-11 max-w-3xl border-t border-borde">
          {preguntas.items.map((p, i) => (
            <Revelar key={p.pregunta} retardo={Math.min(i, 5) * 45}>
              <details name="preguntas" open={i === 0} className="group border-b border-borde">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-display text-[clamp(1rem,0.96rem+0.25vw,1.125rem)] font-semibold leading-snug tracking-[-0.015em] text-navy">
                    {p.pregunta}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-borde-fuerte text-celeste-700 transition-transform duration-200 group-open:rotate-45"
                  >
                    <Mas size={13} />
                  </span>
                </summary>

                <div className="pb-6 pr-10">
                  <p className="max-w-[70ch] text-[15px] leading-[1.75] text-tinta-2">{p.respuesta}</p>
                  {p.enlace && (
                    <a
                      href={p.enlace.href}
                      className="mt-3.5 inline-block font-display text-[13.5px] font-semibold text-celeste-700 underline underline-offset-4 transition-colors hover:text-navy"
                    >
                      {p.enlace.texto}
                    </a>
                  )}
                </div>
              </details>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  )
}
