/**
 * Datos institucionales de WL Hnos. y Asoc.
 * Fuente: propuestas de servicios y manual de marca (2025).
 * Un solo lugar para editar contacto, links y textos legales.
 */

export const site = {
  nombre: 'WL Hnos. y Asoc.',
  nombreCorto: 'WL Hnos.',
  nombreLegal: 'WL Hnos. y Asoc.',
  bajada: 'Asesoramiento Financiero Integral',
  tagline: 'Visión integral y estratégica para sus decisiones financieras',
  fundacion: 2018,
  ciudad: 'San Fernando del Valle de Catamarca',
  provincia: 'Catamarca',
  region: 'Noroeste Argentino',
  pais: 'Argentina',
  cuit: '30-71864062-4',
  url: 'https://wlhnos.com',
  email: 'estudio@wlhnos.com',
  telefono: '+54 9 3834 506588',
  telefonoE164: '+5493834506588',
  whatsapp: '5493834506588',
} as const

/** Años de trayectoria, calculados en tiempo de render para que nunca queden viejos. */
export function aniosDeTrayectoria(now: Date = new Date()): number {
  return now.getFullYear() - site.fundacion
}

/**
 * Link de WhatsApp con mensaje precargado.
 * El mensaje precargado sirve para dos cosas: bajar la fricción de escribir el primer
 * mensaje y dejar constancia de desde qué sección de la página llegó la consulta.
 */
export function waLink(mensaje?: string): string {
  const base = `https://wa.me/${site.whatsapp}`
  if (!mensaje) return base
  return `${base}?text=${encodeURIComponent(mensaje)}`
}

export const wa = {
  general: waLink(
    'Hola. Los encontré en la web y quisiera coordinar una reunión para conversar sobre el asesoramiento de mi empresa.',
  ),
  sociedades: waLink(
    'Hola. Tengo una sociedad y quisiera coordinar una reunión de diagnóstico para evaluar el asesoramiento integral.',
  ),
  individuos: waLink(
    'Hola. Quisiera coordinar una reunión para ordenar mi situación impositiva y patrimonial como persona humana.',
  ),
  financiamiento: waLink(
    'Hola. Me interesa la propuesta de financiamiento PyME y quisiera coordinar una reunión para revisar mi estructura de deuda.',
  ),
  niveles: waLink(
    'Hola. Vi los tres niveles de servicio en la web y quisiera una propuesta económica para mi empresa.',
  ),
} as const

export const nav = [
  { label: 'Sociedades', href: '#sociedades' },
  { label: 'Financiamiento', href: '#financiamiento' },
  { label: 'Individuos', href: '#individuos' },
  { label: 'Niveles', href: '#niveles' },
  { label: 'Herramientas', href: '#herramientas' },
  { label: 'Preguntas', href: '#preguntas' },
] as const

export const herramientas = [
  {
    href: '/herramientas/precio/',
    titulo: 'Calculadora de precio de venta',
    resumen:
      'Descomponga su precio hasta el ingreso real: IVA, Ingresos Brutos, tasa municipal, impuesto al cheque, retenciones, comisiones y costo financiero. Le devuelve a cuánto debería vender para alcanzar el margen que busca.',
  },
  {
    href: '/herramientas/equilibrio/',
    titulo: 'Calculadora de punto de equilibrio',
    resumen:
      'Determine cuánto necesita facturar para cubrir la totalidad de sus costos y a partir de qué volumen su negocio empieza efectivamente a generar ganancia.',
  },
] as const
