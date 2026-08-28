'use client'

import { useState } from 'react'

type Props = {
  /** Ruta dentro de /public. Si el archivo todavía no existe, se muestra el monograma. */
  foto?: string
  nombre: string
  /** Iniciales a mostrar mientras no haya fotografía. */
  monograma: string
}

/**
 * Retrato del socio con reserva tipográfica.
 *
 * Las fotografías se cargan con una etiqueta <img> común, y no con next/image,
 * a propósito: si el archivo todavía no está en el repositorio, `onError`
 * sustituye el retrato por un monograma en lugar de dejar un hueco roto.
 * Así la sección se puede publicar antes de tener las fotos definitivas.
 */
export default function FotoSocio({ foto, nombre, monograma }: Props) {
  const [falla, setFalla] = useState(false)
  const mostrarFoto = Boolean(foto) && !falla

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.25rem] bg-navy">
      {mostrarFoto ? (
        <img
          src={foto}
          alt={`${nombre}, socio de WL Hnos. y Asoc.`}
          loading="lazy"
          decoding="async"
          onError={() => setFalla(true)}
          className="h-full w-full object-cover object-top"
        />
      ) : (
        <div
          className="trama-puntos grid h-full w-full place-items-center bg-navy"
          role="img"
          aria-label={`Retrato pendiente de ${nombre}`}
        >
          <span
            aria-hidden="true"
            className="font-display text-[clamp(3rem,7vw,4.5rem)] font-semibold tracking-tight text-white/22"
          >
            {monograma}
          </span>
        </div>
      )}

      {/* Degradado inferior: sostiene el nombre sobre cualquier fotografía. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-abismo/85 via-abismo/35 to-transparent"
      />
    </div>
  )
}
