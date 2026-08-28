import EnlaceMedido from './EnlaceMedido'
import Logo from './Logo'
import { Mundo, Pin, Sobre, Telefono, WhatsApp } from './icons'
import { herramientas, nav, site, wa } from '@/lib/site'

const servicios = [
  'Impuestos y planificación fiscal',
  'Contabilidad y auditoría externa',
  'Liquidación de haberes y cargas sociales',
  'Financiamiento PyME y garantías',
  'Mercado de capitales',
  'Patrimonio de personas humanas',
]

export default function PieDePagina() {
  const anio = new Date().getFullYear()

  return (
    <footer className="bg-abismo text-claro-tenue">
      <div className="contenedor py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Marca */}
          <div>
            <Logo variante="blanco" alto={38} conNombre={false} />
            <p className="mt-5 max-w-[26ch] font-display text-[15px] font-semibold leading-snug text-white">
              {site.nombre}
            </p>
            <p className="mt-2 max-w-[34ch] text-[13.5px] leading-relaxed">
              {site.bajada}. Sociedad de profesionales en Ciencias Económicas, desde {site.fundacion}.
            </p>
            <EnlaceMedido
              href={wa.general}
              origen="pie"
              className="boton boton-primario boton-chico mt-6"
            >
              <WhatsApp size={15} />
              Agendar una reunión
            </EnlaceMedido>
          </div>

          {/* Navegación */}
          <nav aria-label="Secciones">
            <h2 className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
              La página
            </h2>
            <ul className="mt-5 space-y-3">
              {nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[13.5px] transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contacto" className="text-[13.5px] transition-colors hover:text-white">
                  Contacto
                </a>
              </li>
            </ul>
          </nav>

          {/* Servicios (sin enlace: son descriptivos, no páginas) */}
          <div>
            <h2 className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
              Servicios
            </h2>
            <ul className="mt-5 space-y-3">
              {servicios.map((s) => (
                <li key={s} className="text-[13.5px] leading-snug">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h2 className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
              Contacto
            </h2>
            <ul className="mt-5 space-y-3.5">
              <li>
                <EnlaceMedido
                  href={`tel:${site.telefonoE164}`}
                  origen="pie"
                  tipo="telefono"
                  className="flex items-center gap-2.5 text-[13.5px] transition-colors hover:text-white"
                >
                  <Telefono size={15} className="shrink-0 text-celeste-300" />
                  {site.telefono}
                </EnlaceMedido>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2.5 text-[13.5px] transition-colors hover:text-white"
                >
                  <Sobre size={15} className="shrink-0 text-celeste-300" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.url}
                  className="flex items-center gap-2.5 text-[13.5px] transition-colors hover:text-white"
                >
                  <Mundo size={15} className="shrink-0 text-celeste-300" />
                  wlhnos.com
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-[13.5px] leading-snug">
                <Pin size={15} className="mt-0.5 shrink-0 text-celeste-300" />
                <span>
                  {site.ciudad}
                  <br />
                  {site.provincia}, {site.pais}
                </span>
              </li>
            </ul>

            <h2 className="mt-8 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
              Herramientas
            </h2>
            <ul className="mt-4 space-y-3">
              {herramientas.map((h) => (
                <li key={h.href}>
                  <a href={h.href} className="text-[13.5px] leading-snug transition-colors hover:text-white">
                    {h.titulo}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-7">
          <div className="flex flex-col gap-3 text-[12.5px] sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {anio} {site.nombreLegal}. C.U.I.T. {site.cuit}.
            </p>
            <div className="flex items-center gap-4">
              <a href="/privacidad" className="transition-colors hover:text-white">
                Política de privacidad
              </a>
              <span aria-hidden="true" className="text-white/20">·</span>
              <p className="text-white/60">{site.tagline}</p>
            </div>
          </div>
          <p className="mt-5 max-w-4xl text-[11.5px] leading-relaxed text-white/55">
            El contenido de esta página tiene carácter informativo y no constituye asesoramiento
            profesional para un caso particular. Toda prestación se rige por la propuesta de servicios
            y la propuesta económica que se acuerden por escrito con cada cliente. La información
            patrimonial y financiera que se nos confía queda amparada por el secreto profesional que
            rige el ejercicio de las Ciencias Económicas.
          </p>
        </div>
      </div>
    </footer>
  )
}
