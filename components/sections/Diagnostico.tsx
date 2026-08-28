import Revelar from '../ui/Revelar'
import { diagnostico } from '@/lib/contenido'

/**
 * El punto de partida.
 *
 * Es el mejor párrafo que escribió la firma y va casi intacto. Funciona porque
 * la construcción es impersonal: describe cómo está organizado el mercado, no
 * lo que el lector hizo mal. Ese es exactamente el motivo por el que se puede
 * leer sin ponerse a la defensiva, y hay que sostenerlo.
 */
export default function Diagnostico() {
  return (
    <section id="diagnostico" className="seccion bg-papel-2">
      <div className="contenedor">
        <div className="max-w-4xl">
          <Revelar>
            <p className="etiqueta">{diagnostico.eyebrow}</p>
          </Revelar>

          <Revelar retardo={70}>
            <blockquote className="mt-7 border-l-[3px] border-celeste pl-6 sm:pl-8">
              <p className="font-display text-[clamp(1.5rem,1.05rem+1.9vw,2.25rem)] font-semibold leading-[1.22] tracking-[-0.025em] text-navy">
                {diagnostico.cita}
              </p>
              <footer className="mt-4 text-[12px] font-semibold uppercase tracking-[0.13em] text-tenue">
                {diagnostico.atribucion}
              </footer>
            </blockquote>
          </Revelar>

          {diagnostico.cuerpo.map((p, i) => (
            <Revelar key={i} retardo={120 + i * 50}>
              <p className="mt-8 max-w-[64ch] text-[16.5px] leading-[1.78] text-tinta-2">{p}</p>
            </Revelar>
          ))}

          <Revelar retardo={210}>
            <p className="mt-10 max-w-[52ch] font-display text-[clamp(1.125rem,1.02rem+0.5vw,1.375rem)] font-semibold leading-[1.4] tracking-[-0.015em] text-navy">
              {diagnostico.remate}
            </p>
          </Revelar>
        </div>
      </div>
    </section>
  )
}
