'use client'

import { useEffect, useState } from 'react'
import Logo from './Logo'
import { Cerrar, Menu, WhatsApp } from './icons'
import { clicTelefono, clicWhatsApp } from '@/lib/eventos'
import { nav, site, wa } from '@/lib/site'

export default function Navegacion() {
  const [compacta, setCompacta] = useState(false)
  const [abierta, setAbierta] = useState(false)
  const [activa, setActiva] = useState<string>('')

  /* La barra se condensa apenas se empieza a bajar. */
  useEffect(() => {
    const alScrollear = () => setCompacta(window.scrollY > 16)
    alScrollear()
    window.addEventListener('scroll', alScrollear, { passive: true })
    return () => window.removeEventListener('scroll', alScrollear)
  }, [])

  /* Resalta en el menú la sección que se está mirando. */
  useEffect(() => {
    const secciones = nav
      .map((l) => document.querySelector(l.href))
      .filter((n): n is Element => n !== null)
    if (secciones.length === 0) return

    const observador = new IntersectionObserver(
      (entradas) => {
        const visibles = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visibles[0]) setActiva(`#${visibles[0].target.id}`)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    )

    secciones.forEach((s) => observador.observe(s))
    return () => observador.disconnect()
  }, [])

  /* Con el menú móvil abierto, el fondo no se mueve. */
  useEffect(() => {
    document.body.style.overflow = abierta ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [abierta])

  useEffect(() => {
    const alPresionar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAbierta(false)
    }
    window.addEventListener('keydown', alPresionar)
    return () => window.removeEventListener('keydown', alPresionar)
  }, [])

  return (
    <>
      <a href="#contenido" className="saltar-al-contenido">
        Saltar al contenido
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
          compacta
            ? 'border-b border-borde bg-papel/92 shadow-plana backdrop-blur-md'
            : 'border-b border-transparent bg-papel'
        }`}
      >
        <div className="contenedor flex h-[68px] items-center justify-between gap-6">
          <a href="#inicio" aria-label={`${site.nombre} — Inicio`} className="shrink-0">
            <Logo alto={32} prioridad />
          </a>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Secciones de la página">
            {nav.map((l) => (
              <a
                key={l.href}
                href={l.href}
                aria-current={activa === l.href ? 'true' : undefined}
                className={`rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors duration-150 ${
                  activa === l.href
                    ? 'bg-celeste-50 text-celeste-700'
                    : 'text-tinta-2 hover:bg-papel-2 hover:text-navy'
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${site.telefonoE164}`}
              onClick={() => clicTelefono('navegacion')}
              className="hidden whitespace-nowrap text-[13.5px] font-semibold text-tinta-2 transition-colors hover:text-navy xl:inline-flex"
            >
              {site.telefono}
            </a>
            <a
              href={wa.general}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => clicWhatsApp('navegacion')}
              className="boton boton-primario boton-chico whitespace-nowrap"
            >
              <WhatsApp size={15} />
              <span className="hidden sm:inline">Agendar reunión</span>
              <span className="sm:hidden">Escribirnos</span>
            </a>
            <button
              type="button"
              onClick={() => setAbierta((v) => !v)}
              aria-expanded={abierta}
              aria-controls="menu-movil"
              aria-label={abierta ? 'Cerrar menú' : 'Abrir menú'}
              className="-mr-1 grid h-10 w-10 place-items-center rounded-lg text-navy transition-colors hover:bg-papel-2 lg:hidden"
            >
              {abierta ? <Cerrar size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil */}
      <div
        id="menu-movil"
        hidden={!abierta}
        className="fixed inset-0 z-40 lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={() => setAbierta(false)}
          className="absolute inset-0 h-full w-full cursor-default bg-abismo/45 backdrop-blur-[2px]"
        />
        <nav className="absolute inset-x-0 top-[68px] max-h-[calc(100dvh-68px)] overflow-y-auto border-b border-borde bg-papel px-5 pb-7 pt-4 shadow-elevada">
          <ul className="divide-y divide-borde">
            {nav.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setAbierta(false)}
                  className="flex items-center justify-between py-3.5 font-display text-[15px] font-semibold text-navy"
                >
                  {l.label}
                  <span aria-hidden="true" className="text-tenue">
                    &rarr;
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6 grid gap-2.5">
            <a
              href={wa.general}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                clicWhatsApp('navegacion')
                setAbierta(false)
              }}
              className="boton boton-primario w-full"
            >
              <WhatsApp size={16} />
              Agendar una reunión
            </a>
            <a
              href={`tel:${site.telefonoE164}`}
              className="boton boton-secundario w-full"
              onClick={() => {
                clicTelefono('navegacion')
                setAbierta(false)
              }}
            >
              Llamar al {site.telefono}
            </a>
          </div>
        </nav>
      </div>
    </>
  )
}
