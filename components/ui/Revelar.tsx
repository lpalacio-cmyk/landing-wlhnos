'use client'

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Retardo en milisegundos, para escalonar elementos de una misma grilla. */
  retardo?: number
  className?: string
  as?: ElementType
}

/**
 * Revelado al entrar en viewport. Usa IntersectionObserver en lugar de una
 * librería de animación: son 40 líneas y evita ~50 kB de JavaScript.
 *
 * Respeta `prefers-reduced-motion`: si el usuario lo pidió, el contenido
 * aparece directamente, sin desplazamiento ni fundido.
 */
export default function Revelar({ children, retardo = 0, className = '', as: Tag = 'div' }: Props) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const nodo = ref.current
    if (!nodo) return

    const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (sinMovimiento) {
      setVisible(true)
      return
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            setVisible(true)
            observador.disconnect()
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    )

    observador.observe(nodo)
    return () => observador.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      data-visible={visible ? 'true' : 'false'}
      style={retardo ? { transitionDelay: `${retardo}ms` } : undefined}
      className={`revelar ${className}`}
    >
      {children}
    </Tag>
  )
}
