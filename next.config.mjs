/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  /*
   * Las dos calculadoras son HTML estático autónomo dentro de /public. Next no
   * mapea un directorio a su index.html: sin estas reescrituras, /herramientas/precio
   * redirige a /herramientas/precio y termina en 404. Con ellas, la URL queda
   * limpia y el archivo se sirve tal cual.
   */
  async rewrites() {
    return [
      { source: '/herramientas/precio', destination: '/herramientas/precio/index.html' },
      { source: '/herramientas/equilibrio', destination: '/herramientas/equilibrio/index.html' },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}
export default nextConfig
