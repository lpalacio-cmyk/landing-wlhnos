'use client'

import { useState, type FormEvent } from 'react'
import { Check, Flecha } from './icons'
import { formularioEnviado } from '@/lib/eventos'

const PERFILES = [
  { valor: 'sociedad', etiqueta: 'Tengo una sociedad', detalle: 'Empresa constituida' },
  { valor: 'financiamiento', etiqueta: 'Necesito financiamiento', detalle: 'Deuda o inversión' },
  { valor: 'individuo', etiqueta: 'Consulto como persona humana', detalle: 'Patrimonio propio' },
  { valor: 'otro', etiqueta: 'Otra consulta', detalle: '' },
] as const

type Estado = 'inicial' | 'enviando' | 'listo' | 'error'

export default function FormularioContacto({
  perfilInicial = 'sociedad',
}: {
  perfilInicial?: string
}) {
  const [perfil, setPerfil] = useState<string>(perfilInicial)
  const [estado, setEstado] = useState<Estado>('inicial')
  const [error, setError] = useState('')

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (estado === 'enviando') return

    setEstado('enviando')
    setError('')

    const datos = new FormData(e.currentTarget)
    const cuerpo = {
      nombre: String(datos.get('nombre') || ''),
      empresa: String(datos.get('empresa') || ''),
      email: String(datos.get('email') || ''),
      telefono: String(datos.get('telefono') || ''),
      perfil,
      mensaje: String(datos.get('mensaje') || ''),
      sitio: String(datos.get('sitio') || ''),
    }

    try {
      const respuesta = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cuerpo),
      })
      const resultado = await respuesta.json()

      if (!respuesta.ok || !resultado.ok) {
        setError(resultado.error || 'No pudimos enviar su consulta. Vuelva a intentar en un momento.')
        setEstado('error')
        return
      }

      formularioEnviado(perfil, Boolean(resultado.entregado))

      // Sin proveedor de correo configurado, la consulta se deriva a WhatsApp
      // con el texto ya redactado, para que no se pierda.
      if (!resultado.entregado && resultado.whatsapp) {
        window.open(resultado.whatsapp, '_blank', 'noopener,noreferrer')
      }
      setEstado('listo')
    } catch {
      setError('Hubo un problema de conexión. Escríbanos por WhatsApp y lo atendemos igual.')
      setEstado('error')
    }
  }

  if (estado === 'listo') {
    return (
      <div className="tarjeta flex flex-col items-start gap-4 p-7 sm:p-9">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-verde-50 text-verde-700">
          <Check size={22} />
        </span>
        <div>
          <h3 className="titular-3 text-navy">Recibimos su consulta</h3>
          <p className="mt-2.5 max-w-md text-[15px] leading-relaxed text-tinta-2">
            Le respondemos dentro de las próximas 24 horas hábiles. Si necesita una respuesta más
            rápida, escríbanos por WhatsApp y lo atendemos en el momento.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={enviar} className="tarjeta p-6 sm:p-8" noValidate>
      <fieldset className="border-0 p-0">
        <legend className="etiqueta-campo mb-3">¿Desde dónde nos consulta?</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {PERFILES.map((p) => {
            const activo = perfil === p.valor
            return (
              <label
                key={p.valor}
                className={`flex cursor-pointer items-start gap-2.5 rounded-xl border px-3.5 py-3 transition-colors duration-150 ${
                  activo
                    ? 'border-celeste-600 bg-celeste-50'
                    : 'border-borde-control bg-white hover:border-navy-300'
                }`}
              >
                <input
                  type="radio"
                  name="perfil"
                  value={p.valor}
                  checked={activo}
                  onChange={() => setPerfil(p.valor)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`mt-[3px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border-2 transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-celeste-600 ${
                    activo ? 'border-celeste-600' : 'border-borde-control'
                  }`}
                >
                  {activo && <span className="h-2 w-2 rounded-full bg-celeste-600" />}
                </span>
                <span className="leading-tight">
                  <span
                    className={`block font-display text-[13.5px] font-semibold ${
                      activo ? 'text-navy' : 'text-tinta'
                    }`}
                  >
                    {p.etiqueta}
                  </span>
                  {p.detalle && <span className="mt-0.5 block text-[12px] text-tenue">{p.detalle}</span>}
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nombre" className="etiqueta-campo">
            Nombre y apellido <span className="text-naranja-700">*</span>
          </label>
          <input id="nombre" name="nombre" required autoComplete="name" className="campo" />
        </div>
        <div>
          <label htmlFor="empresa" className="etiqueta-campo">
            Empresa <span className="font-normal text-tenue">(si corresponde)</span>
          </label>
          <input id="empresa" name="empresa" autoComplete="organization" className="campo" />
        </div>
        <div>
          <label htmlFor="email" className="etiqueta-campo">
            Correo electrónico
          </label>
          <input id="email" name="email" type="email" autoComplete="email" className="campo" />
        </div>
        <div>
          <label htmlFor="telefono" className="etiqueta-campo">
            Teléfono
          </label>
          <input id="telefono" name="telefono" type="tel" autoComplete="tel" className="campo" />
        </div>
      </div>

      <p className="mt-2 text-[12.5px] text-tenue">
        Con uno de los dos alcanza. Le respondemos por donde prefiera.
      </p>

      <div className="mt-5">
        <label htmlFor="mensaje" className="etiqueta-campo">
          ¿En qué podemos ayudarlo?
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          className="campo resize-y"
          placeholder="Cuéntenos brevemente su situación: rubro, si ya trabaja con un estudio, y qué necesita resolver."
        />
      </div>

      {/* Trampa antispam: los bots la completan, las personas no la ven. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="sitio">No completar este campo</label>
        <input id="sitio" name="sitio" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <p role="alert" className="mt-5 rounded-lg border border-naranja-700/25 bg-naranja-50 px-4 py-3 text-[13.5px] text-naranja-700">
          {error}
        </p>
      )}

      <button type="submit" disabled={estado === 'enviando'} className="boton boton-navy mt-6 w-full disabled:opacity-70">
        {estado === 'enviando' ? 'Enviando…' : 'Enviar consulta'}
        {estado !== 'enviando' && <Flecha size={16} />}
      </button>

      <p className="mt-3.5 text-[12.5px] leading-relaxed text-tenue">
        Sus datos se usan únicamente para responderle. No los cedemos a terceros ni los incorporamos
        a listas de difusión.{' '}
        <a href="/privacidad" className="font-semibold text-celeste-700 underline underline-offset-2">
          Política de privacidad
        </a>
        .
      </p>
    </form>
  )
}
