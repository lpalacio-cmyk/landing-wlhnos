import Image from 'next/image'
import { site } from '@/lib/site'

type Props = {
  /** `color` sobre fondos claros, `blanco` sobre fondos oscuros o fotografías. */
  variante?: 'color' | 'blanco'
  /** Alto del imagotipo en píxeles. El ancho se calcula por proporción. */
  alto?: number
  /** Muestra el nombre de la firma junto al imagotipo. */
  conNombre?: boolean
  className?: string
  prioridad?: boolean
}

/** Proporción del imagotipo original: 480 × 450. */
const PROPORCION = 480 / 450

export default function Logo({
  variante = 'color',
  alto = 34,
  conNombre = true,
  className = '',
  prioridad = false,
}: Props) {
  const ancho = Math.round(alto * PROPORCION)
  const oscuro = variante === 'blanco'

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src={oscuro ? '/images/logo-blanco.png' : '/images/logo.png'}
        alt={`${site.nombre} — ${site.bajada}`}
        width={ancho}
        height={alto}
        priority={prioridad}
        className="h-auto w-auto shrink-0"
        style={{ height: alto, width: ancho }}
      />
      {conNombre && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display text-[15px] font-semibold tracking-tight ${
              oscuro ? 'text-white' : 'text-navy'
            }`}
          >
            WL Hnos. <span className="font-normal opacity-60">&amp;</span> Asoc.
          </span>
          <span
            className={`mt-1 hidden text-[9.5px] font-medium uppercase tracking-[0.14em] sm:block ${
              oscuro ? 'text-white/55' : 'text-tenue'
            }`}
          >
            Asesoramiento financiero integral
          </span>
        </span>
      )}
    </span>
  )
}
