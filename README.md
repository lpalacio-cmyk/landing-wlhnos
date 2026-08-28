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
npm run dev       # http://localhost:3000
npm run build     # verificación de producción
npm run registro  # chequeo de registro ("usted") — corre solo antes de cada build
```

### El chequeo de registro

Todo el material de la firma trata de **usted**. La landing anterior mezclaba
voseo en la página con usted en las calculadoras, y esa mezcla no se lee como
cercanía: se lee como copiar y pegar de dos fuentes distintas.

`scripts/verificar-registro.mjs` recorre el texto visible de `app/`, `components/`,
`lib/` y las calculadoras, y **falla el build** si reaparece el voseo. Corre como
`prebuild`, así que un descuido no llega a producción.

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
  layout.tsx             metadatos, tipografías, datos estructurados
  page.tsx               la landing: composición de secciones
  globals.css            tokens de marca y utilidades
  privacidad/page.tsx    política de privacidad (Ley 25.326)
  api/contacto/route.ts  recepción del formulario
components/
  sections/              una sección de la página por archivo
  ui/                    primitivas: botones, logo, íconos, revelado al scroll
lib/
  site.ts                datos institucionales, links de WhatsApp, navegación
  contenido.ts           TODO el texto de la página, en un solo lugar
  schema.ts              datos estructurados schema.org
  eventos.ts             micro-conversiones que se miden
scripts/
  verificar-registro.mjs chequeo de registro, corre como prebuild
public/
  herramientas/          las dos calculadoras (HTML estático autónomo)
  images/                logo en sus variantes y fotos de los socios
  og.png                 imagen de previsualización al compartir
```

### El orden de la página

    reconocimiento  hero · tres puertas de entrada
    diagnóstico     el punto de partida · prediagnóstico
    mecanismo       por qué una sola firma
    alcance         sociedades · financiamiento PyME · individuos
    profundidad     los tres niveles · el proceso
    prueba          estándar normativo · el equipo
    demostración    herramientas de cálculo
    objeciones      preguntas frecuentes
    acción          contacto

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

Las dos calculadoras (`/herramientas/precio` y `/herramientas/equilibrio`) son
HTML estático autónomo servido desde `public/`. No dependen de React ni del build:
se pueden editar y publicar por separado.

Next no mapea un directorio de `public/` a su `index.html`, así que las rutas
limpias se resuelven con dos reescrituras en `next.config.mjs`. Si se agrega una
tercera herramienta, hay que sumar su reescritura ahí.

## Reglas que sostiene este sitio

1. **Registro "usted"** en cada cadena visible. Lo verifica el build.
2. **Nada que las propuestas de la firma no puedan respaldar.** Sin testimonios,
   sin logos de clientes, sin porcentajes de ahorro, sin cantidad de clientes.
3. **Los únicos números del sitio son los que carga el visitante** en las
   calculadoras. Los años de trayectoria se calculan desde 2018 en tiempo de
   render, nunca se escriben a mano.
4. **El problema se atribuye siempre a la estructura del mercado**, nunca al
   descuido del lector ni al trabajo de su contador actual.
5. **Contraste AA en todos los pares.** Los colores de marca puros no lo
   alcanzan como texto ni como relleno de botón: para eso están las variantes
   oscurecidas, con el ratio anotado junto a cada token en `globals.css`.
