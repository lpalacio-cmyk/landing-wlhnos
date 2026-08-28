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
 * librería de animación: son unas pocas líneas y evita ~50 kB de JavaScript.
 *
 * El IntersectionObserver por sí solo no alcanza. Sus notificaciones son
 * asíncronas y se agrupan, así que cuando alguien tira del scroll de un saque
 * —rueda del mouse a fondo, arrastre de la barra, tecla Fin— un elemento puede
 * entrar y salir del viewport sin que se llegue a observar `isIntersecting`, y
 * queda invisible ocupando su lugar: una franja en blanco en medio de la
 * página. Por eso hay además una comprobación directa de posición al montar y
 * en cada scroll, limitada a un cuadro por vez y desmontada apenas se revela.
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

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    let vivo = true
    let cuadroPedido = false

    const revelar = () => {
      if (!vivo) return
      vivo = false
      observador.disconnect()
      window.removeEventListener('scroll', alScrollear)
      window.removeEventListener('resize', alScrollear)
      setVisible(true)
    }

    /**
     * ¿El elemento ya entró, esté o no el observador al día?
     *
     * Alcanza con que su borde superior haya cruzado el umbral: lo que quedó
     * por encima del viewport ya se recorrió y jamás debe volver a ocultarse.
     * Sin esa segunda mitad de la condición, quien salta a un ancla y sube, o
     * llega al pie y vuelve arriba de un tirón, se encuentra con secciones en
     * blanco que sí ocupan lugar.
     */
    const yaEntro = () => nodo.getBoundingClientRect().top < window.innerHeight * 0.92

    const alScrollear = () => {
      if (cuadroPedido || !vivo) return
      cuadroPedido = true
      requestAnimationFrame(() => {
        cuadroPedido = false
        if (yaEntro()) revelar()
      })
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) revelar()
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    )
    observador.observe(nodo)

    // Lo que ya está en pantalla al montar no espera a ningún evento.
    if (yaEntro()) {
      revelar()
      return
    }

    window.addEventListener('scroll', alScrollear, { passive: true })
    window.addEventListener('resize', alScrollear, { passive: true })

    return () => {
      vivo = false
      observador.disconnect()
      window.removeEventListener('scroll', alScrollear)
      window.removeEventListener('resize', alScrollear)
    }
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
