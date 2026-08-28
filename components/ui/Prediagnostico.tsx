'use client'

import { useMemo, useState } from 'react'
import { Check, WhatsApp } from './icons'
import { clicWhatsApp } from '@/lib/eventos'
import { waLink } from '@/lib/site'

export type Situacion = {
  id: string
  /** Frente al que pertenece: agrupa el resultado sin puntuarlo. */
  frente: string
  texto: string
}

type Props = {
  situaciones: ReadonlyArray<Situacion>
}

/**
 * Prediagnóstico.
 *
 * El visitante marca las situaciones que reconoce como propias y el componente
 * arma con ellas el mensaje de WhatsApp. Resuelve dos cosas a la vez: le ahorra
 * la hoja en blanco del chat y hace que la consulta llegue ya descripta.
 *
 * Tres reglas deliberadas:
 *  · Sin puntaje, sin semáforo y sin porcentaje de riesgo. Un número inventado
 *    a partir de casillas tildadas sería exactamente el tipo de dato que este
 *    sitio no publica.
 *  · La salida es cualitativa y agrupada por frente de trabajo.
 *  · Nada se envía ni se almacena: las respuestas viven en el navegador hasta
 *    que la persona decide enviarlas.
 */
export default function Prediagnostico({ situaciones }: Props) {
  const [marcadas, setMarcadas] = useState<ReadonlySet<string>>(new Set())

  function alternar(id: string) {
    setMarcadas((previas) => {
      const siguiente = new Set(previas)
      if (siguiente.has(id)) siguiente.delete(id)
      else siguiente.add(id)
      return siguiente
    })
  }

  const elegidas = useMemo(
    () => situaciones.filter((s) => marcadas.has(s.id)),
    [situaciones, marcadas],
  )

  const frentes = useMemo(() => {
    const orden: string[] = []
    for (const s of elegidas) if (!orden.includes(s.frente)) orden.push(s.frente)
    return orden
  }, [elegidas])

  const enlace = useMemo(() => {
    if (elegidas.length === 0) {
      return waLink('Hola. Quisiera coordinar una reunión de diagnóstico para revisar la situación de mi empresa.')
    }
    const lineas = elegidas.map((s) => `• ${s.texto}`).join('\n')
    return waLink(
      `Hola. Revisé el prediagnóstico en su web y reconozco estas situaciones:\n\n${lineas}\n\nQuisiera coordinar una reunión para conversarlo.`,
    )
  }, [elegidas])

  return (
    <div className="tarjeta overflow-hidden">
      <fieldset className="border-0 p-0">
        <legend className="solo-lectores">
          Situaciones que puede reconocer en su empresa. Marcar las que correspondan.
        </legend>

        <ul className="divide-y divide-borde">
          {situaciones.map((s) => {
            const activa = marcadas.has(s.id)
            return (
              <li key={s.id}>
                <label
                  className={`flex cursor-pointer items-start gap-3.5 px-5 py-4 transition-colors duration-150 sm:px-6 ${
                    activa ? 'bg-celeste-50' : 'hover:bg-papel-2'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={activa}
                    onChange={() => alternar(s.id)}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-md border-2 transition-colors duration-150 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-celeste-600 ${
                      activa
                        ? 'border-celeste-600 bg-celeste-600 text-white'
                        : 'border-borde-control bg-white'
                    }`}
                  >
                    {activa && <Check size={13} />}
                  </span>
                  <span
                    className={`text-[14.5px] leading-[1.55] transition-colors duration-150 ${
                      activa ? 'text-navy' : 'text-tinta-2'
                    }`}
                  >
                    {s.texto}
                  </span>
                </label>
              </li>
            )
          })}
        </ul>
      </fieldset>

      <div className="border-t border-borde bg-papel-2 px-5 py-5 sm:px-6">
        {elegidas.length === 0 ? (
          <p className="text-[13.5px] leading-relaxed text-tenue">
            Marque las que reconozca. Con lo que señale armamos el mensaje, para que no tenga que
            escribirlo usted. Las respuestas no se envían ni se guardan: quedan en su navegador hasta
            que decida mandarlas.
          </p>
        ) : (
          <>
            <p className="text-[13.5px] leading-relaxed text-tinta-2">
              Señaló <strong className="font-semibold text-navy">{elegidas.length}</strong>{' '}
              {elegidas.length === 1 ? 'situación' : 'situaciones'}
              {frentes.length > 0 && (
                <>
                  {' '}
                  sobre {frentes.length === 1 ? 'un frente de trabajo' : `${frentes.length} frentes de trabajo`}
                  {': '}
                  <span className="font-semibold text-navy">{frentes.join(', ')}</span>
                </>
              )}
              . Ninguna de ellas se resuelve por separado; por eso las miramos juntas.
            </p>
            <a
              href={enlace}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => clicWhatsApp('prediagnostico')}
              className="boton boton-primario mt-4 w-full sm:w-auto"
            >
              <WhatsApp size={16} />
              Enviar lo que señalé y coordinar una reunión
            </a>
            <p className="mt-2.5 text-[12.5px] text-tenue">
              Se abre WhatsApp con el mensaje ya redactado. Usted revisa antes de enviar.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
