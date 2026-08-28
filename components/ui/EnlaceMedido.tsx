'use client'

import type { ReactNode } from 'react'
import { clicHerramienta, clicTelefono, clicWhatsApp, puertaElegida } from '@/lib/eventos'

type Origen = Parameters<typeof clicWhatsApp>[0]

type Props = {
  href: string
  origen: Origen
  /**
   * `whatsapp` abre el chat en una pestaña nueva; `telefono` marca;
   * `herramienta` y `perfil` registran una micro-conversión interna.
   */
  tipo?: 'whatsapp' | 'telefono' | 'herramienta' | 'perfil'
  /** Etiqueta del evento para `herramienta` y `perfil`. */
  detalle?: string
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
  detalle,
  className,
  children,
  ...resto
}: Props) {
  const esWhatsApp = tipo === 'whatsapp'

  function registrar() {
    if (tipo === 'whatsapp') clicWhatsApp(origen)
    else if (tipo === 'telefono') clicTelefono(origen)
    else if (tipo === 'herramienta') clicHerramienta(detalle ?? origen)
    else puertaElegida(detalle ?? origen)
  }

  return (
    <a
      href={href}
      className={className}
      onClick={registrar}
      {...(esWhatsApp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...resto}
    >
      {children}
    </a>
  )
}
