'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Check, Flecha, WhatsApp } from './icons'
import { clicTelefono, clicWhatsApp, formularioEnviado } from '@/lib/eventos'
import { site, wa } from '@/lib/site'

const PERFILES = [
  { valor: 'sociedad', etiqueta: 'Tengo una sociedad', detalle: 'Empresa constituida' },
  { valor: 'financiamiento', etiqueta: 'Necesito financiamiento', detalle: 'Deuda o inversión' },
  { valor: 'individuo', etiqueta: 'Consulto como persona humana', detalle: 'Patrimonio propio' },
  { valor: 'otro', etiqueta: 'Otra consulta', detalle: '' },
] as const

type Estado = 'inicial' | 'enviando' | 'listo' | 'derivar' | 'error'

export default function FormularioContacto({
  perfilInicial = 'sociedad',
}: {
  perfilInicial?: string
}) {
  const [perfil, setPerfil] = useState<string>(perfilInicial)
  const [estado, setEstado] = useState<Estado>('inicial')
  const [error, setError] = useState('')
  const [enlaceWhatsApp, setEnlaceWhatsApp] = useState('')
  const resultadoRef = useRef<HTMLDivElement | null>(null)

  /*
   * El formulario mide unos 1.150 px y la tarjeta de resultado unos 330: al
   * reemplazarse, el documento se acorta y en un teléfono la confirmación queda
   * por encima del viewport. El visitante ve el pie de página y no sabe si el
   * envío funcionó: vuelve a tocar Enviar, o se va. Por eso se la trae a la
   * vista y se le da el foco, que además la anuncia en un lector de pantalla.
   */
  useEffect(() => {
    if (estado !== 'listo' && estado !== 'derivar') return
    const nodo = resultadoRef.current
    if (!nodo) return
    nodo.scrollIntoView({ block: 'center', behavior: 'smooth' })
    nodo.focus({ preventScroll: true })
  }, [estado])

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (estado === 'enviando') return

    const datos = new FormData(e.currentTarget)

    /*
     * Validar acá antes de salir a la red: con una conexión de datos irregular,
     * enterarse de que falta el nombre después de un viaje de ida y vuelta es
     * fricción pura en el último paso del único formulario del sitio.
     */
    const nombreCargado = String(datos.get('nombre') || '').trim()
    const emailCargado = String(datos.get('email') || '').trim()
    const telefonoCargado = String(datos.get('telefono') || '').trim()
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailCargado)

    if (nombreCargado.length < 2) {
      setError('Indíquenos su nombre.')
      setEstado('error')
      document.getElementById('nombre')?.focus()
      return
    }
    if (!emailOk && telefonoCargado.length < 6) {
      setError('Necesitamos un correo electrónico válido o un teléfono para responderle.')
      setEstado('error')
      document.getElementById(emailCargado ? 'email' : 'telefono')?.focus()
      return
    }

    setEstado('enviando')
    setError('')
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
        setError(resultado.error || 'No pudimos enviar su consulta. Vuelva a intentarlo en unos minutos o escríbanos por WhatsApp.')
        setEstado('error')
        return
      }

      formularioEnviado(perfil, Boolean(resultado.entregado))

      /*
       * Si no hay proveedor de correo configurado, la consulta NO llegó al
       * Estudio. Decirle igual "recibimos su consulta" sería lo peor posible:
       * el visitante se queda esperando una respuesta que nadie va a mandar.
       *
       * Tampoco sirve abrir WhatsApp con window.open desde acá: la llamada
       * ocurre después de un await, fuera de la pila del gesto del usuario, y
       * los navegadores la bloquean como ventana emergente. Por eso se muestra
       * un enlace que la persona toca, que sí abre la aplicación.
       */
      if (!resultado.entregado && resultado.whatsapp) {
        setEnlaceWhatsApp(resultado.whatsapp)
        setEstado('derivar')
        return
      }
      setEstado('listo')
    } catch {
      setError('Hubo un problema de conexión. Escríbanos por WhatsApp y lo atendemos igual.')
      setEstado('error')
    }
  }

  if (estado === 'listo') {
    return (
      <div
        ref={resultadoRef}
        tabIndex={-1}
        role="status"
        className="tarjeta flex flex-col items-start gap-4 p-7 sm:p-9 focus:outline-none"
      >
        <span className="grid h-11 w-11 place-items-center rounded-full bg-verde-50 text-verde-800">
          <Check size={22} />
        </span>
        <div>
          <h3 className="titular-3 text-navy">Recibimos su consulta</h3>
          <p className="mt-2.5 max-w-md text-[15px] leading-relaxed text-tinta-2">
            Le respondemos a la brevedad. Si necesita una respuesta inmediata, escríbanos por
            WhatsApp y lo atendemos en el momento.
          </p>
        </div>
        <a
          href={wa.general}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => clicWhatsApp('contacto')}
          className="boton boton-primario"
        >
          <WhatsApp size={16} />
          Escribirnos por WhatsApp
        </a>
      </div>
    )
  }

  /*
   * El correo no está configurado: la consulta todavía NO llegó al Estudio y
   * hay que decirlo con todas las letras, con el mensaje ya redactado a un
   * toque de distancia.
   */
  if (estado === 'derivar') {
    return (
      <div
        ref={resultadoRef}
        tabIndex={-1}
        role="status"
        className="tarjeta flex flex-col items-start gap-4 p-7 sm:p-9 focus:outline-none"
      >
        <span className="grid h-11 w-11 place-items-center rounded-full bg-naranja-50 text-naranja-700">
          <WhatsApp size={22} />
        </span>
        <div>
          <h3 className="titular-3 text-navy">Falta un paso: envíela por WhatsApp</h3>
          <p className="mt-2.5 max-w-md text-[15px] leading-relaxed text-tinta-2">
            Su consulta todavía no llegó al Estudio. Ya la redactamos con los datos que cargó:
            toque el botón, revísela y envíela. También puede llamarnos al{' '}
            <a
              href={`tel:${site.telefonoE164}`}
              onClick={() => clicTelefono('contacto')}
              className="font-semibold text-celeste-700 underline underline-offset-2"
            >
              {site.telefono}
            </a>
            .
          </p>
        </div>
        <a
          href={enlaceWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => clicWhatsApp('contacto')}
          className="boton boton-primario"
        >
          <WhatsApp size={16} />
          Enviar la consulta por WhatsApp
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={enviar} className="tarjeta p-6 sm:p-8" noValidate>
      <fieldset className="border-0 p-0">
        <legend className="etiqueta-campo mb-3">¿Cuál es su caso?</legend>
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
        Con el correo o el teléfono alcanza <span className="text-naranja-700">*</span>: le
        respondemos por donde prefiera.
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
