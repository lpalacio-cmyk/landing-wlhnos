'use client'

import { useEffect, useState } from 'react'
import { Telefono, WhatsApp } from './icons'
import { clicTelefono, clicWhatsApp } from '@/lib/eventos'
import { site, wa } from '@/lib/site'

/**
 * Barra fija de contacto en móvil. El público del estudio consulta desde el
 * teléfono y vive en WhatsApp: dejarlo a un scroll de distancia del botón es
 * perder consultas. Aparece recién después del hero, para no tapar la portada.
 */
export default function BarraMovil() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const alScrollear = () => setVisible(window.scrollY > 620)
    alScrollear()
    window.addEventListener('scroll', alScrollear, { passive: true })
    return () => window.removeEventListener('scroll', alScrollear)
  }, [])

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-borde bg-papel/95 backdrop-blur-md transition-transform duration-300 lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-stretch gap-2 px-4 py-3">
        <a
          href={wa.general}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => clicWhatsApp('barra-movil')}
          tabIndex={visible ? undefined : -1}
          className="boton boton-primario flex-1"
        >
          <WhatsApp size={16} />
          Agendar reunión
        </a>
        <a
          href={`tel:${site.telefonoE164}`}
          onClick={() => clicTelefono('barra-movil')}
          tabIndex={visible ? undefined : -1}
          aria-label={`Llamar al ${site.telefono}`}
          className="boton boton-secundario w-14 shrink-0 px-0"
        >
          <Telefono size={18} />
        </a>
      </div>
    </div>
  )
}
