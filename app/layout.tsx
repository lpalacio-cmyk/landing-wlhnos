import type { Metadata, Viewport } from 'next'
import { Poppins, Open_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { site } from '@/lib/site'
import { jsonLd } from '@/lib/schema'

/**
 * Tipografías del manual de marca: Poppins SemiBold para titulares,
 * Open Sans para el cuerpo de texto. Se sirven desde el propio dominio
 * (next/font las descarga en el build), así que no hay pedidos a Google
 * en tiempo de carga ni salto de tipografía.
 */
const display = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--fuente-display',
  display: 'swap',
})

const cuerpo = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--fuente-cuerpo',
  display: 'swap',
})

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || site.url

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'WL Hnos. y Asoc. — Asesoramiento financiero integral en Catamarca y el NOA',
    template: '%s · WL Hnos. y Asoc.',
  },
  description:
    'Sociedad de profesionales en Ciencias Económicas. Las cinco áreas que deciden el resultado de su empresa —tributaria, contable, laboral, financiera y de mercado de capitales— en un mismo equipo. Catamarca y todo el Noroeste Argentino.',
  applicationName: site.nombre,
  authors: [{ name: site.nombre, url: site.url }],
  creator: site.nombre,
  publisher: site.nombre,
  keywords: [
    'estudio contable Catamarca',
    'asesoramiento financiero NOA',
    'contador Catamarca',
    'financiamiento PyME',
    'mercado de capitales Catamarca',
    'liquidación de impuestos',
    'estados contables',
    'auditoría externa',
    'planificación fiscal',
    'SGR aval',
    'Bienes Personales',
    'Ingresos Brutos',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: baseUrl,
    siteName: site.nombre,
    title: 'WL Hnos. y Asoc. — Asesoramiento financiero integral',
    description:
      'Cinco áreas —tributaria, contable, laboral, financiera y de mercado de capitales— en un mismo equipo, para que cada decisión se evalúe completa antes de tomarse. Catamarca y el NOA, desde 2018.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${site.nombre} — ${site.bajada}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WL Hnos. y Asoc. — Asesoramiento financiero integral',
    description:
      'Cinco áreas en un mismo equipo, para que cada decisión se evalúe completa antes de tomarse. Catamarca y el NOA.',
    images: ['/og.png'],
  },
  icons: {
    icon: [{ url: '/icon-180.png', sizes: '180x180', type: 'image/png' }],
    apple: [{ url: '/apple-icon.png', sizes: '512x512', type: 'image/png' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  formatDetection: { telephone: true, email: true, address: false },
}

export const viewport: Viewport = {
  themeColor: '#102250',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${display.variable} ${cuerpo.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // Datos estructurados: contenido propio y estático, no entrada de usuario.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
