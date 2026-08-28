'use client'

import FormularioContacto from '../ui/FormularioContacto'
import Revelar from '../ui/Revelar'
import { Flecha, Sobre, Telefono, WhatsApp } from '../ui/icons'
import { clicTelefono, clicWhatsApp } from '@/lib/eventos'
import { contacto } from '@/lib/contenido'
import { site, wa } from '@/lib/site'

export default function Contacto() {
  return (
    <section id="contacto" className="relative overflow-hidden bg-navy">
      <div aria-hidden="true" className="trama-puntos absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute -left-1/4 bottom-0 h-[36rem] w-[36rem] rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(21,149,188,0.38) 0%, rgba(21,149,188,0) 70%)' }}
      />

      <div className="contenedor relative seccion">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* ── Canales ─────────────────────────────────────────────── */}
          <div>
            <Revelar>
              <h2 className="font-display text-[clamp(1.75rem,1.3rem+1.8vw,2.5rem)] font-semibold uppercase tracking-[0.16em] text-white">
                {contacto.titulo}
              </h2>
            </Revelar>

            <Revelar retardo={70}>
              <p className="bajada mt-5 max-w-[52ch] text-claro-2">{contacto.bajada}</p>
            </Revelar>

            <Revelar retardo={110}>
              <p className="mt-6 inline-flex items-center rounded-full border border-verde/40 bg-verde/15 px-3.5 py-1.5 font-display text-[12.5px] font-semibold text-white">
                {contacto.etiqueta}
              </p>
            </Revelar>

            <Revelar retardo={150}>
              <ul className="mt-10 border-t border-white/15">
                <li>
                  <a
                    href={wa.general}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => clicWhatsApp('contacto')}
                    className="group flex items-center gap-4 border-b border-white/15 py-5 transition-colors hover:bg-white/[0.04]"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-verde-700 text-white">
                      <WhatsApp size={19} />
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-[15px] font-semibold text-white">WhatsApp</span>
                      <span className="cifras block text-[13.5px] text-claro-tenue">{site.telefono}</span>
                    </span>
                    <Flecha
                      size={17}
                      className="shrink-0 text-celeste-300 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </a>
                </li>

                <li>
                  <a
                    href={`tel:${site.telefonoE164}`}
                    onClick={() => clicTelefono('contacto')}
                    className="group flex items-center gap-4 border-b border-white/15 py-5 transition-colors hover:bg-white/[0.04]"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/20 text-celeste-300">
                      <Telefono size={19} />
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-[15px] font-semibold text-white">Teléfono</span>
                      <span className="cifras block text-[13.5px] text-claro-tenue">{site.telefono}</span>
                    </span>
                    <Flecha
                      size={17}
                      className="shrink-0 text-celeste-300 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </a>
                </li>

                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="group flex items-center gap-4 border-b border-white/15 py-5 transition-colors hover:bg-white/[0.04]"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/20 text-celeste-300">
                      <Sobre size={19} />
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-[15px] font-semibold text-white">
                        Correo electrónico
                      </span>
                      <span className="block text-[13.5px] text-claro-tenue">{site.email}</span>
                    </span>
                    <Flecha
                      size={17}
                      className="shrink-0 text-celeste-300 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </a>
                </li>
              </ul>
            </Revelar>

            <Revelar retardo={190}>
              <p className="mt-8 max-w-[46ch] text-[13.5px] leading-relaxed text-claro-tenue">
                {contacto.cierre}
              </p>
            </Revelar>
          </div>

          {/* ── Formulario ──────────────────────────────────────────── */}
          <Revelar retardo={120}>
            <div>
              <p className="mb-4 font-display text-[15px] font-semibold text-white">
                {contacto.tituloFormulario}
              </p>
              <FormularioContacto />
              <p className="mt-4 text-[12.5px] leading-relaxed text-claro-tenue">
                La información que nos envíe queda amparada por el secreto profesional que rige el
                ejercicio de las Ciencias Económicas.
              </p>
            </div>
          </Revelar>
        </div>
      </div>
    </section>
  )
}
