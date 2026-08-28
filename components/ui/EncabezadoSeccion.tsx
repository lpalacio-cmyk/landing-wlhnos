import type { ReactNode } from 'react'
import Revelar from './Revelar'

type Props = {
  eyebrow?: string
  titulo: ReactNode
  bajada?: ReactNode
  cuerpo?: ReactNode
  /** Sobre fondos oscuros invierte los colores del texto. */
  oscuro?: boolean
  /** Centra el bloque y lo limita en ancho. */
  centrado?: boolean
  className?: string
}

export default function EncabezadoSeccion({
  eyebrow,
  titulo,
  bajada,
  cuerpo,
  oscuro = false,
  centrado = false,
  className = '',
}: Props) {
  return (
    <div className={`${centrado ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}>
      {eyebrow && (
        <Revelar>
          <p className={`etiqueta ${oscuro ? 'etiqueta-clara' : ''} ${centrado ? 'justify-center' : ''}`}>
            {eyebrow}
          </p>
        </Revelar>
      )}
      <Revelar retardo={60}>
        <h2 className={`titular-2 ${eyebrow ? 'mt-5' : ''} ${oscuro ? 'text-white' : 'text-navy'}`}>
          {titulo}
        </h2>
      </Revelar>
      {bajada && (
        <Revelar retardo={110}>
          <p className={`bajada mt-5 ${oscuro ? 'text-claro-2' : ''}`}>{bajada}</p>
        </Revelar>
      )}
      {cuerpo && (
        <Revelar retardo={150}>
          <div className={`mt-4 text-[15.5px] leading-[1.75] ${oscuro ? 'text-claro-tenue' : 'text-tinta-2'}`}>
            {cuerpo}
          </div>
        </Revelar>
      )}
    </div>
  )
}
