#!/usr/bin/env node
/**
 * Verificación de registro.
 *
 * Todo el material de la firma —las tres propuestas de servicios, la propuesta
 * económica y el manual de marca— está escrito en "usted". La landing anterior
 * mezclaba voseo en la página y usted en las calculadoras, y esa mezcla no se
 * lee como cercanía: se lee como copiar y pegar de dos fuentes distintas.
 *
 * Este script recorre el texto visible del sitio y falla si reaparece el voseo.
 * Corre como `prebuild`, así que un descuido no llega a producción.
 *
 * Uso:  node scripts/verificar-registro.mjs
 */

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, extname } from 'node:path'

const RAIZ = process.cwd()

const DIRECTORIOS = ['app', 'components', 'lib', 'public/herramientas']
const EXTENSIONES = new Set(['.ts', '.tsx', '.html', '.mdx', '.md'])
const EXCLUIR = ['node_modules', '.next', '.git', 'scripts']

/**
 * Formas voseantes, imperativos incluidos.
 *
 * Todos los patrones llevan la bandera `u` y usan `(?<![\p{L}])` / `(?![\p{L}])`
 * en lugar de `\b`. El motivo: sin `u`, `\b` trabaja sobre el alfabeto ASCII,
 * así que una vocal acentuada no cuenta como carácter de palabra y `\bCargá\b`
 * no llega a coincidir nunca. Con `\b` los imperativos voseantes —que en
 * español terminan justamente en vocal acentuada— pasaban todos sin detectarse.
 */
const PATRONES = [
  { re: /(?<![\p{L}])[Tt]us?(?![\p{L}])(?!\s*[=:])/gu, nombre: 'posesivo "tu/tus"' },
  { re: /(?<![\p{L}])[Vv]os(?![\p{L}])/gu, nombre: 'pronombre "vos"' },
  {
    re: /(?<![\p{L}])(?:querés|podés|tenés|sabés|vendés|comprás|ganás|perdés|necesitás|buscás|cobrás|superás|estás|tomás|hacés|decidís|elegís|recibís|vivís|salís|venís|seguís|preferís|invertís|cumplís)(?![\p{L}])/giu,
    nombre: 'verbo voseante',
  },
  {
    re: /(?<![\p{L}])(?:vas|irás|tendrás|podrás|verás|obtendrás|deberás|sabrás|harás|dirás|estarás|serás|querrás|pondrás|vendrás)(?![\p{L}])/giu,
    nombre: 'futuro o perífrasis en segunda persona',
  },
  {
    re: /(?<![\p{L}])(?:tuyo|tuya|tuyos|tuyas|contigo)(?![\p{L}])/giu,
    nombre: 'pronombre de segunda persona',
  },
  {
    re: /(?<![\p{L}])(?:Cargá|Probá|Descubrí|Conocé|Usá|Revisá|Bajá|Agendá|Completá|Mirá|Pensá|Fijate|Llevate|Descomponé|Escribinos|Contactanos|Sumate|Entrá|Mandá|Hacé|Elegí|Empezá|Calculá|Descargá|Ingresá|Sumá|Compará|Aprovechá|Consultá|Enterate|Registrate|Anotate|Pedí|Escribí|Averiguá|Fijate|Chequeá|Tené|Poné|Vení|Andá|Dejá|Contá|Sacá|Buscá|Elegi)(?![\p{L}])/gu,
    nombre: 'imperativo voseante',
  },
]

/**
 * Palabras que se parecen a una forma prohibida pero son correctas.
 *
 * Se comparan por igualdad exacta contra el hallazgo completo, NO con una
 * expresión regular sobre él. Con `\b` pasaba lo contrario y era peor que no
 * tener excepciones: como «á» no cuenta como carácter de palabra en modo ASCII,
 * /\bestá\b/ coincidía dentro de «estás» y anulaba la detección del voseo.
 */
const EXCEPCIONES = new Set([
  'esta', 'está', 'mas', 'más', 'ademas', 'además', 'despues', 'después',
  'traves', 'través', 'interes', 'interés',
  // Identificadores de código donde la secuencia no es una palabra en español.
  'status', 'virtus',
])

function archivos(dir) {
  const salida = []
  let entradas
  try {
    entradas = readdirSync(dir)
  } catch {
    return salida
  }
  for (const entrada of entradas) {
    if (EXCLUIR.includes(entrada)) continue
    const ruta = join(dir, entrada)
    if (statSync(ruta).isDirectory()) salida.push(...archivos(ruta))
    else if (EXTENSIONES.has(extname(ruta))) salida.push(ruta)
  }
  return salida
}

/** Quita lo que no es texto visible: base64, comentarios y bloques de estilo. */
function limpiar(contenido) {
  return contenido
    .replace(/data:image\/[^"')\s]{100,}/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|\s)\/\/[^\n]*/g, ' ')
}

const hallazgos = []

for (const carpeta of DIRECTORIOS) {
  for (const ruta of archivos(join(RAIZ, carpeta))) {
    const bruto = readFileSync(ruta, 'utf8')
    const texto = limpiar(bruto)

    for (const { re, nombre } of PATRONES) {
      re.lastIndex = 0
      let m
      while ((m = re.exec(texto)) !== null) {
        const contexto = texto.slice(Math.max(0, m.index - 45), m.index + m[0].length + 45).replace(/\s+/g, ' ')
        if (EXCEPCIONES.has(m[0].toLowerCase())) continue
        const linea = texto.slice(0, m.index).split('\n').length
        hallazgos.push({ ruta: relative(RAIZ, ruta), linea, nombre, hallazgo: m[0], contexto })
      }
    }
  }
}

if (hallazgos.length === 0) {
  console.log('✓ Registro verificado: no se detectaron formas voseantes en el texto del sitio.')
  process.exit(0)
}

console.error(`\n✗ Se detectaron ${hallazgos.length} posible(s) forma(s) voseante(s).`)
console.error('  El sitio y las propuestas de la firma tratan de "usted". Corregir antes de publicar.\n')
for (const h of hallazgos) {
  console.error(`  ${h.ruta}:${h.linea}  ${h.nombre} → "${h.hallazgo}"`)
  console.error(`     …${h.contexto}…\n`)
}
process.exit(1)
