import EncabezadoSeccion from '../ui/EncabezadoSeccion'
import Revelar from '../ui/Revelar'
import TablaNiveles from '../ui/TablaNiveles'
import EnlaceMedido from '../ui/EnlaceMedido'
import { WhatsApp } from '../ui/icons'
import { niveles } from '@/lib/contenido'
import { wa } from '@/lib/site'

/**
 * Los tres niveles de alcance, sin importes.
 *
 * Publicar la estructura es lo que permite que el visitante se ubique solo y
 * llegue a la reunión sabiendo qué está pidiendo. Publicar un precio que en la
 * propuesta figura en blanco sería inventarlo.
 */
export default function Niveles() {
  return (
    <section id="niveles" className="seccion bg-papel">
      <div className="contenedor">
        <EncabezadoSeccion
          eyebrow={niveles.eyebrow}
          titulo={niveles.titulo}
          bajada={niveles.bajada}
          cuerpo={niveles.cuerpo}
        />

        <div className="mt-12">
          <TablaNiveles />
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <Revelar>
            <div className="rounded-xl border border-borde bg-papel-2 p-6">
              <h3 className="font-display text-[15px] font-semibold text-navy">
                Qué determina el honorario
              </h3>
              <p className="mt-2.5 text-[14px] leading-[1.7] text-tinta-2">
                {niveles.dimensionamiento}
              </p>
            </div>
          </Revelar>

          <Revelar retardo={70}>
            <div className="rounded-xl border border-borde bg-papel-2 p-6">
              <h3 className="font-display text-[15px] font-semibold text-navy">
                {niveles.proyectos.titulo}
              </h3>
              <p className="mt-2.5 text-[14px] leading-[1.7] text-tinta-2">{niveles.proyectos.texto}</p>
            </div>
          </Revelar>
        </div>

        <Revelar retardo={110}>
          <EnlaceMedido href={wa.niveles} origen="niveles" className="boton boton-primario mt-9">
            <WhatsApp size={16} />
            {niveles.cta}
          </EnlaceMedido>
        </Revelar>
      </div>
    </section>
  )
}
