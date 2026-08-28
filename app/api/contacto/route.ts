import { NextResponse } from 'next/server'
import { site, waLink } from '@/lib/site'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Payload = {
  nombre?: string
  empresa?: string
  email?: string
  telefono?: string
  perfil?: string
  mensaje?: string
  /** Honeypot: los bots lo completan, las personas no lo ven. */
  sitio?: string
}

const PERFILES: Record<string, string> = {
  sociedad: 'Sociedad / empresa',
  individuo: 'Persona humana',
  financiamiento: 'Financiamiento PyME',
  otro: 'Otra consulta',
}

/**
 * Freno de envíos, en memoria. Se reinicia con cada instancia y no pretende ser
 * infalible: solo evitar que el formulario sea un grifo abierto.
 *
 * Son dos frenos, porque el de por IP no alcanza solo. La identidad del que
 * llama se conoce por cabeceras, y las cabeceras las puede escribir el cliente:
 * quien rota X-Forwarded-For pasa siete veces. Por eso se prefiere primero la
 * cabecera que escribe la plataforma —en Vercel, x-vercel-forwarded-for, que
 * sobrescribe lo que mande el cliente— y por debajo hay un tope global que
 * acota el volumen total aunque la identidad sea falsa.
 */
const ventana = 10 * 60 * 1000
const maxPorVentana = 5
const maxGlobalPorVentana = 120
const registro = new Map<string, number[]>()
let globales: number[] = []

function identificar(request: Request): string {
  const dePlataforma =
    request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('cf-connecting-ip')?.trim() ||
    request.headers.get('x-real-ip')?.trim()
  if (dePlataforma) return dePlataforma

  // Sin proxy de confianza, la última entrada es la que agregó el salto más
  // cercano al servidor; sigue siendo falsificable, y para eso está el tope global.
  const reenviadas = (request.headers.get('x-forwarded-for') ?? '')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean)
  return reenviadas[reenviadas.length - 1] || 'desconocida'
}

function excedeLimite(ip: string): boolean {
  const ahora = Date.now()

  globales = globales.filter((t) => ahora - t < ventana)
  globales.push(ahora)
  if (globales.length > maxGlobalPorVentana) return true

  const previos = (registro.get(ip) ?? []).filter((t) => ahora - t < ventana)
  previos.push(ahora)
  registro.set(ip, previos)
  if (registro.size > 5000) registro.clear()
  return previos.length > maxPorVentana
}

/** Campos de una línea: se quitan los caracteres de control por completo. */
function limpiar(valor: unknown, max: number): string {
  if (typeof valor !== 'string') return ''
  return valor.replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, max)
}

/**
 * Texto libre: conserva los saltos de línea.
 *
 * El mensaje es lo que el socio lee para decidir si el caso le interesa. Si se
 * borran los saltos, una consulta escrita en tres renglones llega con las
 * palabras pegadas, tanto por correo como por el enlace de WhatsApp.
 */
function limpiarTexto(valor: unknown, max: number): string {
  if (typeof valor !== 'string') return ''
  return valor
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, max)
}

const emailValido = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

/**
 * Tope de tamaño del cuerpo. Los route handlers del App Router no heredan el
 * límite que tenían las API routes del directorio pages: sin este freno,
 * `request.json()` bufferiza y parsea lo que llegue. Es un endpoint público y
 * anónimo; el formulario más largo posible entra holgado en 32 kB.
 */
const MAX_CUERPO = 32 * 1024

export async function POST(request: Request) {
  const declarado = Number(request.headers.get('content-length') ?? '0')
  if (Number.isFinite(declarado) && declarado > MAX_CUERPO) {
    return NextResponse.json({ ok: false, error: 'Solicitud inválida.' }, { status: 413 })
  }

  let body: Payload
  try {
    // Se lee como texto para poder cortar antes de parsear: content-length
    // puede faltar o mentir.
    const crudo = await request.text()
    if (crudo.length > MAX_CUERPO) {
      return NextResponse.json({ ok: false, error: 'Solicitud inválida.' }, { status: 413 })
    }
    body = JSON.parse(crudo) as Payload
    if (typeof body !== 'object' || body === null) throw new Error('cuerpo no es un objeto')
  } catch {
    return NextResponse.json({ ok: false, error: 'Solicitud inválida.' }, { status: 400 })
  }

  // Honeypot: respondemos ok para no darle señal al bot, pero no hacemos nada.
  if (limpiar(body.sitio, 200)) {
    return NextResponse.json({ ok: true, entregado: true })
  }

  if (excedeLimite(identificar(request))) {
    return NextResponse.json(
      { ok: false, error: 'Recibimos varias consultas suyas en los últimos minutos. Escríbanos por WhatsApp y lo atendemos de inmediato.' },
      { status: 429 },
    )
  }

  const nombre = limpiar(body.nombre, 120)
  const empresa = limpiar(body.empresa, 160)
  const email = limpiar(body.email, 160)
  const telefono = limpiar(body.telefono, 60)
  const perfilClave = limpiar(body.perfil, 40)
  const perfil = PERFILES[perfilClave] ?? 'Consulta general'
  const mensaje = limpiarTexto(body.mensaje, 4000)

  if (nombre.length < 2) {
    return NextResponse.json({ ok: false, error: 'Indíquenos su nombre.' }, { status: 400 })
  }
  if (!emailValido(email) && telefono.length < 6) {
    return NextResponse.json(
      { ok: false, error: 'Necesitamos un correo electrónico válido o un teléfono para responderle.' },
      { status: 400 },
    )
  }

  const resumen = [
    `Nombre: ${nombre}`,
    empresa && `Empresa: ${empresa}`,
    email && `Correo: ${email}`,
    telefono && `Teléfono: ${telefono}`,
    `Perfil: ${perfil}`,
    '',
    mensaje || '(Sin mensaje)',
  ]
    .filter(Boolean)
    .join('\n')

  const apiKey = process.env.RESEND_API_KEY
  const destino = process.env.CONTACTO_EMAIL_DESTINO || site.email
  const remitente = process.env.CONTACTO_EMAIL_REMITENTE || 'Web WL Hnos. <onboarding@resend.dev>'

  if (apiKey) {
    try {
      const respuesta = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: remitente,
          to: [destino],
          reply_to: emailValido(email) ? email : undefined,
          subject: `Consulta desde la web — ${nombre}${empresa ? ` (${empresa})` : ''}`,
          text: resumen,
        }),
      })

      if (respuesta.ok) {
        return NextResponse.json({ ok: true, entregado: true })
      }
      console.error('Resend respondió con error', respuesta.status, await respuesta.text())
    } catch (error) {
      console.error('No se pudo enviar el correo de contacto', error)
    }
  }

  // Sin proveedor de correo configurado (o falló el envío): nunca perdemos el lead.
  // Devolvemos un enlace de WhatsApp con la consulta ya redactada.
  return NextResponse.json({
    ok: true,
    entregado: false,
    whatsapp: waLink(`Hola. Les escribo desde la web.\n\n${resumen}`),
  })
}
