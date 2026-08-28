import EncabezadoSeccion from '../ui/EncabezadoSeccion'
import Prediagnostico from '../ui/Prediagnostico'
import Revelar from '../ui/Revelar'
import { situacion } from '@/lib/contenido'

export default function Situacion() {
  return (
    <section id="situacion" className="seccion bg-papel">
      <div className="contenedor">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <EncabezadoSeccion
              eyebrow={situacion.eyebrow}
              titulo={situacion.titulo}
              bajada={situacion.bajada}
            />
            <Revelar retardo={180}>
              <p className="mt-7 max-w-[46ch] border-l-2 border-borde-fuerte pl-4 text-[14px] leading-relaxed text-tenue">
                {situacion.nota}
              </p>
            </Revelar>
          </div>

          <Revelar retardo={120}>
            <Prediagnostico situaciones={situacion.situaciones} />
          </Revelar>
        </div>
      </div>
    </section>
  )
}
