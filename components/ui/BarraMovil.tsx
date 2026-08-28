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
  const [pasoElHero, setPasoElHero] = useState(false)
  const [enContacto, setEnContacto] = useState(false)
  const visible = pasoElHero && !enContacto

  useEffect(() => {
    const alScrollear = () => setPasoElHero(window.scrollY > 620)
    alScrollear()
    window.addEventListener('scroll', alScrollear, { passive: true })
    return () => window.removeEventListener('scroll', alScrollear)
  }, [])

  /*
   * La barra se retira cuando el formulario de contacto entra en pantalla: si
   * se quedara, taparía justamente el botón de enviar, que es la conversión que
   * se está buscando.
   */
  /*
   * Se marca en el documento para que el encabezado pueda esconder su propio
   * botón de WhatsApp mientras la barra está en pantalla: con los dos a la vez
   * había dos botones verdes idénticos ocupando casi un cuarto del alto útil
   * de un teléfono, con dos rótulos que prometen cosas distintas.
   */
  useEffect(() => {
    const raiz = document.documentElement
    if (visible) raiz.dataset.barraContacto = 'visible'
    else delete raiz.dataset.barraContacto
    return () => {
      delete raiz.dataset.barraContacto
    }
  }, [visible])

  useEffect(() => {
    const seccion = document.getElementById('contacto')
    if (!seccion) return
    const observador = new IntersectionObserver(
      ([entrada]) => setEnContacto(entrada.isIntersecting),
      { rootMargin: '0px 0px -25% 0px' },
    )
    observador.observe(seccion)
    return () => observador.disconnect()
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
          Agendar una reunión
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
