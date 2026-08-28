# Landing — WL Hnos. y Asoc.

Landing page de [WL Hnos. y Asoc.](https://wlhnos.com), sociedad de profesionales en
Ciencias Económicas radicada en Catamarca, con alcance en todo el Noroeste Argentino.

El objetivo de la página es uno solo: **explicar el valor del servicio y conseguir que
el visitante inicie una conversación** (WhatsApp, formulario o teléfono).

## Stack

| Pieza | Elección | Motivo |
|---|---|---|
| Framework | Next.js 16 (App Router) | Deploy sin configuración en Vercel, renderizado estático |
| Estilos | Tailwind CSS v4 | Tokens de marca definidos en `app/globals.css` |
| Lenguaje | TypeScript (modo estricto) | |
| Tipografías | `next/font` (self-hosted) | Sin llamadas a Google Fonts en tiempo de carga |
| Dependencias de terceros | Ninguna en el cliente | Los íconos, gráficos y animaciones son propios |

## Puesta en marcha

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # verificación de producción
```

## Deploy en Vercel

El proyecto es Next.js estándar: Vercel lo detecta solo, sin configuración.

1. Entrar a [vercel.com/new](https://vercel.com/new) e importar el repositorio
   `lpalacio-cmyk/landing-wlhnos`.
2. Framework Preset: **Next.js** (viene detectado). No hay que tocar build command
   ni output directory.
3. Cargar las variables de entorno que hagan falta (ver `.env.example`; **ninguna es
   obligatoria** para que el sitio funcione).
4. Deploy.
5. Para publicar en el dominio propio: Project → Settings → Domains → agregar
   `wlhnos.com` y `www.wlhnos.com`, y apuntar el DNS según indique Vercel.

Cada push a la rama conectada genera un deploy nuevo; las demás ramas generan
previews con su propia URL.

## Estructura

```
app/
  layout.tsx            metadatos, tipografías, datos estructurados
  page.tsx              la landing: composición de secciones
  globals.css           tokens de marca y utilidades
  api/contacto/route.ts recepción del formulario
components/
  sections/             una sección de la página por archivo
  ui/                   primitivas: botones, logo, íconos, revelado al scroll
lib/
  site.ts               datos institucionales, links de WhatsApp, navegación
  contenido.ts          TODO el texto de la página, en un solo lugar
  schema.ts             datos estructurados schema.org
public/
  herramientas/         las dos calculadoras (HTML estático autónomo)
  images/               logo en sus variantes y fotos de los socios
```

### Dónde editar el texto

Todo el copy vive en **`lib/contenido.ts`**. No hace falta tocar los componentes
para cambiar un título, una descripción o una pregunta frecuente.

Los datos de contacto (teléfono, correo, CUIT, links de WhatsApp) están en
**`lib/site.ts`**.

## Fotos de los socios

La sección de equipo espera dos archivos:

```
public/images/socios/christian-walther.jpg
public/images/socios/socio-2.jpg
```

Recomendado: retrato vertical, recorte 4:5, lado mayor de 1200 px, menos de 300 KB.
**Si los archivos no están, la sección no se rompe**: muestra un monograma tipográfico
en su lugar. Los nombres y cargos se editan en `lib/contenido.ts` → `equipo`.

## Formulario de contacto

`POST /api/contacto` con validación, honeypot antispam y límite por IP.

- **Con `RESEND_API_KEY` configurada**: envía la consulta por correo a
  `CONTACTO_EMAIL_DESTINO` (por defecto `estudio@wlhnos.com`).
- **Sin configurar**: devuelve un enlace de WhatsApp con la consulta ya redactada y
  el navegador lo abre. La consulta nunca se pierde.

## Herramientas

Las dos calculadoras (`/herramientas/precio/` y `/herramientas/equilibrio/`) son
HTML estático autónomo servido desde `public/`. No dependen de React ni del build:
se pueden editar y publicar por separado.
