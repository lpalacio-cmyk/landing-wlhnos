import { site } from './site'

/**
 * Datos estructurados (schema.org) para que Google entienda quiénes somos,
 * dónde estamos y qué servicios prestamos. Mejora el panel de conocimiento
 * y la aparición en búsquedas locales del NOA.
 */
export function jsonLd() {
  const organizacion = {
    '@type': 'AccountingService',
    '@id': `${site.url}/#organizacion`,
    name: site.nombre,
    alternateName: 'WL Hnos. & Asoc.',
    description:
      'Sociedad de profesionales en Ciencias Económicas radicada en Catamarca. Asesoramiento tributario, contable, laboral, financiero y de mercado de capitales para sociedades y personas humanas del Noroeste Argentino.',
    url: site.url,
    email: site.email,
    telephone: site.telefonoE164,
    foundingDate: String(site.fundacion),
    taxID: site.cuit,
    logo: `${site.url}/images/logo.png`,
    image: `${site.url}/og.png`,
    /*
     * Sin el domicilio confirmado del Estudio no se declara `addressLocality`:
     * este bloque es el que Google usa para el panel de conocimiento y las
     * búsquedas locales del NOA, y una localidad inventada es peor que ninguna.
     * Cuando llegue la dirección, sumar `streetAddress`, `addressLocality` y
     * `postalCode`.
     */
    address: {
      '@type': 'PostalAddress',
      addressRegion: site.provincia,
      addressCountry: 'AR',
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Catamarca' },
      { '@type': 'AdministrativeArea', name: 'Noroeste Argentino' },
      { '@type': 'Country', name: 'Argentina' },
    ],
    knowsLanguage: 'es-AR',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios profesionales',
      itemListElement: [
        'Asesoramiento tributario y liquidación de impuestos',
        'Contabilidad, estados contables y auditoría externa',
        'Liquidación de haberes y gestión laboral',
        'Financiamiento PyME y estructuración de deuda',
        'Mercado de capitales e inversión de excedentes',
        'Planificación fiscal y patrimonial para personas humanas',
      ].map((nombre) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: nombre },
      })),
    },
  }

  const sitioWeb = {
    '@type': 'WebSite',
    '@id': `${site.url}/#sitio`,
    url: site.url,
    name: site.nombre,
    inLanguage: 'es-AR',
    publisher: { '@id': `${site.url}/#organizacion` },
  }

  return { '@context': 'https://schema.org', '@graph': [organizacion, sitioWeb] }
}

/** FAQPage separado: se arma con las preguntas reales de la sección de preguntas frecuentes. */
export function faqJsonLd(preguntas: ReadonlyArray<{ pregunta: string; respuesta: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: preguntas.map((p) => ({
      '@type': 'Question',
      name: p.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: p.respuesta },
    })),
  }
}
