import { track } from '@vercel/analytics'

/**
 * Medición de micro-conversiones. Sin esto no se puede saber qué sección de la
 * página genera consultas y cuál solo ocupa scroll.
 *
 * No se envía ningún dato personal: solo qué se tocó y desde dónde.
 */

type Origen =
  | 'navegacion'
  | 'hero'
  | 'puertas'
  | 'prediagnostico'
  | 'sociedades'
  | 'individuos'
  | 'financiamiento'
  | 'niveles'
  | 'proceso'
  | 'herramientas'
  | 'preguntas'
  | 'contacto'
  | 'estandar'
  | 'pie'
  | 'barra-movil'

export function clicWhatsApp(origen: Origen) {
  track('whatsapp', { origen })
}

export function clicTelefono(origen: Origen) {
  track('telefono', { origen })
}

export function clicHerramienta(herramienta: string) {
  track('herramienta_abierta', { herramienta })
}

export function formularioEnviado(perfil: string, entregado: boolean) {
  track('formulario_enviado', { perfil, entregado: entregado ? 'correo' : 'whatsapp' })
}

export function puertaElegida(perfil: string) {
  track('perfil_elegido', { perfil })
}
