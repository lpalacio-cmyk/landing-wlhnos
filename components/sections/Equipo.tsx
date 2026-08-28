import EncabezadoSeccion from '../ui/EncabezadoSeccion'
import FotoSocio from '../ui/FotoSocio'
import Logo from '../ui/Logo'
import Revelar from '../ui/Revelar'
import { equipo } from '@/lib/contenido'
import { aniosDeTrayectoria, site } from '@/lib/site'

/**
 * Quiénes firman este trabajo.
 *
 * Para una firma cuyo producto es confianza sobre información patrimonial
 * sensible, el anonimato es un problema de conversión. Se publica lo que está
 * confirmado —razón social, C.U.I.T., año de fundación, alcance, misión— y los
 * socios cuyos datos están verificados. No se rellena con siluetas, íconos de
 * persona ni fotografías de banco de imágenes.
 */
export default function Equipo() {
  const anios = aniosDeTrayectoria()

  return (
    <section id="equipo" className="bg-papel-2">
      {/* ── Banda institucional ────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-navy">
        <div aria-hidden="true" className="trama-puntos absolute inset-0" />
        <div className="contenedor relative py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="etiqueta etiqueta-clara">{equipo.eyebrow}</p>
              <h2 className="titular-2 mt-5 text-white">{equipo.titulo}</h2>
              <p className="bajada mt-4 max-w-[58ch] text-claro-2">{equipo.bajada}</p>
            </div>

            <dl className="flex flex-wrap gap-x-10 gap-y-6 lg:justify-end">
              {[
                { valor: String(site.fundacion), etiqueta: `Año de fundación · ${anios} años` },
                { valor: '5', etiqueta: 'Áreas en un mismo equipo' },
                { valor: 'NOA', etiqueta: 'Alcance de la firma' },
              ].map((d) => (
                <div key={d.etiqueta}>
                  <dt className="font-display text-[clamp(1.75rem,1.4rem+1.3vw,2.5rem)] font-semibold leading-none tracking-tight text-celeste-300">
                    {d.valor}
                  </dt>
                  <dd className="mt-2 text-[12px] uppercase tracking-[0.1em] text-claro-tenue">
                    {d.etiqueta}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* ── Motivos y socios ──────────────────────────────────────── */}
      <div className="contenedor py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <Revelar>
              <p className="max-w-[52ch] font-display text-[clamp(1.0625rem,1rem+0.35vw,1.25rem)] font-semibold leading-[1.5] tracking-[-0.015em] text-navy">
                {equipo.mision}
              </p>
            </Revelar>

            <div className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {equipo.motivos.map((m, i) => (
                <Revelar key={m.orden} retardo={i * 60}>
                  <div>
                    <span className="ordinal text-celeste-700">{m.orden}</span>
                    <h3 className="mt-2 font-display text-[15px] font-semibold leading-snug text-navy">
                      {m.titulo}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-[1.65] text-tinta-2">{m.texto}</p>
                  </div>
                </Revelar>
              ))}
            </div>
          </div>

          <div>
            <Revelar retardo={80}>
              <p className="ordinal text-tenue">LOS SOCIOS</p>
              <p className="mt-3 max-w-[46ch] text-[14px] leading-[1.7] text-tinta-2">
                {equipo.encuadreSocios}
              </p>
            </Revelar>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {equipo.socios.map((s, i) => (
                <Revelar key={s.clave} retardo={120 + i * 70}>
                  <article className="overflow-hidden rounded-[1.25rem] border border-borde bg-papel shadow-plana">
                    <FotoSocio foto={s.foto} nombre={s.nombre} monograma={s.monograma} />
                    <div className="p-5">
                      <h3 className="font-display text-[15px] font-semibold leading-snug text-navy">
                        {s.nombre}
                      </h3>
                      <p className="mt-1.5 text-[13px] leading-snug text-tinta-2">{s.titulo}</p>
                      {s.credencial && (
                        <p className="mt-2 text-[12.5px] leading-snug text-tenue">{s.credencial}</p>
                      )}
                      <p className="mt-3 border-t border-borde pt-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-celeste-700">
                        {s.area}
                      </p>
                    </div>
                  </article>
                </Revelar>
              ))}

              {/* Tarjeta institucional: cubre el lugar de los socios cuyos datos
                  todavía no están confirmados. Cuando estén los dos, sale. */}
              {equipo.socios.length < 2 && (
              <Revelar retardo={190}>
                <article className="flex h-full flex-col justify-between rounded-[1.25rem] border border-borde bg-papel-3 p-5">
                  <div>
                    <Logo alto={40} conNombre={false} />
                    <h3 className="mt-5 font-display text-[15px] font-semibold leading-snug text-navy">
                      {site.nombreLegal}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-snug text-tinta-2">
                      Sociedad de profesionales en Ciencias Económicas.
                    </p>
                  </div>
                  <dl className="mt-6 space-y-2 border-t border-borde pt-4 text-[12.5px]">
                    <div className="flex justify-between gap-3">
                      <dt className="text-tenue">C.U.I.T.</dt>
                      <dd className="cifras font-semibold text-navy">{site.cuit}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-tenue">Sede</dt>
                      <dd className="text-right font-semibold text-navy">{site.provincia}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-tenue">Desde</dt>
                      <dd className="cifras font-semibold text-navy">{site.fundacion}</dd>
                    </div>
                  </dl>
                </article>
              </Revelar>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
