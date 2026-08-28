'use client'

import type { ReactNode } from 'react'
import { clicTelefono, clicWhatsApp } from '@/lib/eventos'

type Origen = Parameters<typeof clicWhatsApp>[0]

type Props = {
  href: string
  origen: Origen
  /** `whatsapp` abre el chat en una pestaña nueva; `telefono` marca. */
  tipo?: 'whatsapp' | 'telefono'
  className?: string
  children: ReactNode
  'aria-label'?: string
}

/**
 * Enlace de contacto que registra el clic.
 *
 * Existe para no convertir en componentes de cliente al pie de página ni a la
 * tabla de niveles, que son estáticos salvo por este dato: así solo viaja al
 * navegador el enlace, y no la sección entera.
 */
export default function EnlaceMedido({
  href,
  origen,
  tipo = 'whatsapp',
  className,
  children,
  ...resto
}: Props) {
  const esWhatsApp = tipo === 'whatsapp'

  return (
    <a
      href={href}
      className={className}
      onClick={() => (esWhatsApp ? clicWhatsApp(origen) : clicTelefono(origen))}
      {...(esWhatsApp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...resto}
    >
      {children}
    </a>
  )
}
