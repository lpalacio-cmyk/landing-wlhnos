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
 * Límite de envíos por IP. Es una defensa mínima en memoria: se reinicia con cada
 * instancia y no pretende ser infalible, solo frenar el spam más burdo.
 */
const ventana = 10 * 60 * 1000
const maxPorVentana = 5
const registro = new Map<string, number[]>()

function excedeLimite(ip: string): boolean {
  const ahora = Date.now()
  const previos = (registro.get(ip) ?? []).filter((t) => ahora - t < ventana)
  previos.push(ahora)
  registro.set(ip, previos)
  if (registro.size > 5000) registro.clear()
  return previos.length > maxPorVentana
}

function limpiar(valor: unknown, max: number): string {
  if (typeof valor !== 'string') return ''
  return valor.replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, max)
}

const emailValido = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

export async function POST(request: Request) {
  let body: Payload
  try {
    body = (await request.json()) as Payload
  } catch {
    return NextResponse.json({ ok: false, error: 'Solicitud inválida.' }, { status: 400 })
  }

  // Honeypot: respondemos ok para no darle señal al bot, pero no hacemos nada.
  if (limpiar(body.sitio, 200)) {
    return NextResponse.json({ ok: true, entregado: true })
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'desconocida'

  if (excedeLimite(ip)) {
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
  const mensaje = limpiar(body.mensaje, 4000)

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
