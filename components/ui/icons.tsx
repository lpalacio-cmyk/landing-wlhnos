import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function base({ size = 20, strokeWidth = 1.6, ...rest }: IconProps & { strokeWidth?: number }) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    ...rest,
  }
}

export function WhatsApp({ size = 18, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...rest}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.523 5.847L.057 23.882l6.197-1.425A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.785 9.785 0 0 1-5.044-1.4l-.361-.215-3.741.981.998-3.648-.235-.374A9.817 9.817 0 0 1 2.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z" />
    </svg>
  )
}

export function Flecha(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function FlechaAbajo(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  )
}

export function Check(props: IconProps) {
  return (
    <svg {...base({ strokeWidth: 2.2, ...props })}>
      <path d="M4 12.5 9 17.5 20 6.5" />
    </svg>
  )
}

export function Mas(props: IconProps) {
  return (
    <svg {...base({ strokeWidth: 2, ...props })}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function Sobre(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  )
}

export function Telefono(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 3 5.2 2 2 0 0 1 5 3z" />
    </svg>
  )
}

export function Mundo(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 9h17M3.5 15h17M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  )
}

export function Pin(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

/* ── Iconografía de servicio: trazo fino, geometría sobria ───────────── */

export function Balanza(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 4v16M7 20h10M12 6 5 9M12 6l7 3" />
      <path d="M2.5 9 5 15h5L7.5 9zM14 9l2.5 6h5L19 9z" />
    </svg>
  )
}

export function Libro(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 4.5h6a2.5 2.5 0 0 1 2.5 2.5v13A2 2 0 0 0 10.5 18H4z" />
      <path d="M20 4.5h-6A2.5 2.5 0 0 0 11.5 7v13a2 2 0 0 1 2-2H20z" />
    </svg>
  )
}

export function Equipo(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16.5 5.4a3.2 3.2 0 0 1 0 5.2M18 14.2a6.5 6.5 0 0 1 3.5 5.8" />
    </svg>
  )
}

export function Grafico(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3.5 20.5V4M3.5 20.5H21" />
      <path d="m7 16 4-5 3.5 3L20 7" />
      <path d="M20 7h-3.5M20 7v3.5" />
    </svg>
  )
}

export function Banco(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 9.5 12 4l9 5.5" />
      <path d="M4.5 9.5v9M9.5 9.5v9M14.5 9.5v9M19.5 9.5v9" />
      <path d="M2.5 20.5h19" />
    </svg>
  )
}

export function Escudo(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3 5 5.8v5.4c0 4.2 2.9 8.1 7 9.3 4.1-1.2 7-5.1 7-9.3V5.8z" />
      <path d="m9 12 2 2 4-4.2" />
    </svg>
  )
}

export function Brujula(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </svg>
  )
}

export function Capas(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m12 3 9 4.5-9 4.5-9-4.5z" />
      <path d="m3 12.5 9 4.5 9-4.5" />
      <path d="m3 17 9 4.5 9-4.5" />
    </svg>
  )
}

export function Documento(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M8.5 13h7M8.5 16.5h4.5" />
    </svg>
  )
}

export function Calculadora(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="5" y="2.5" width="14" height="19" rx="2.5" />
      <path d="M8.5 6.5h7M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01M8.5 18h.01M12 18h.01M15.5 18h.01" />
    </svg>
  )
}

export function Reloj(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </svg>
  )
}

export function Menu(props: IconProps) {
  return (
    <svg {...base({ strokeWidth: 1.8, ...props })}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function Cerrar(props: IconProps) {
  return (
    <svg {...base({ strokeWidth: 1.8, ...props })}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}
