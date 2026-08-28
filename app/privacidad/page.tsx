import type { Metadata } from 'next'
import Navegacion from '@/components/ui/Navegacion'
import PieDePagina from '@/components/ui/PieDePagina'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description:
    'Cómo trata WL Hnos. y Asoc. los datos personales que se envían a través de este sitio, en los términos de la Ley 25.326 de Protección de los Datos Personales.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/privacidad' },
}

const secciones = [
  {
    titulo: 'Quién es responsable de los datos',
    cuerpo: [
      `El responsable del tratamiento es ${site.nombreLegal}, C.U.I.T. ${site.cuit}, con domicilio en la provincia de ${site.provincia}, República Argentina.`,
      `Para cualquier consulta sobre esta política puede escribir a ${site.email} o llamar al ${site.telefono}.`,
    ],
  },
  {
    titulo: 'Qué datos se recogen y con qué finalidad',
    cuerpo: [
      'Este sitio recoge únicamente los datos que usted decide enviarnos a través del formulario de contacto: nombre, y —según lo que complete— empresa, correo electrónico, teléfono, el perfil de consulta seleccionado y el texto de su mensaje.',
      'Esos datos se utilizan con una sola finalidad: responder su consulta y, si corresponde, elaborar una propuesta de servicios. No se emplean para publicidad, no se incorporan a listas de difusión y no se ceden ni se venden a terceros.',
    ],
  },
  {
    titulo: 'Cómo se transmiten y dónde se conservan',
    cuerpo: [
      'El formulario envía la consulta por correo electrónico a la casilla institucional del Estudio. El sitio no conserva los envíos en una base de datos propia: una vez enviado el correo, el servidor no guarda copia del contenido.',
      'El envío del correo se realiza a través del prestador Resend Inc. (Estados Unidos), que actúa como encargado del tratamiento por cuenta del Estudio y no utiliza los datos para ninguna otra finalidad. El sitio se aloja en la infraestructura de Vercel Inc. (Estados Unidos). En ambos casos hay una transferencia internacional de datos, que usted consiente al enviar el formulario.',
      'Si el prestador de correo no estuviera configurado, el sitio se lo indica en pantalla y le ofrece continuar la consulta por WhatsApp: en ese caso los datos que cargó viajan dentro del mensaje que usted mismo revisa y envía, y la conversación queda sujeta además a las condiciones del servicio de mensajería.',
      'La conexión está cifrada mediante HTTPS. Las consultas recibidas se conservan en la casilla del Estudio mientras dure su gestión y hasta un máximo de veinticuatro meses, salvo que se inicie una relación profesional, en cuyo caso rigen los plazos de conservación documental que corresponden a esa relación.',
    ],
  },
  {
    titulo: 'Medición de uso',
    cuerpo: [
      'Utilizamos Vercel Analytics y Vercel Speed Insights para conocer, en forma agregada, qué secciones de la página se consultan y cuánto tarda en cargar. Esas herramientas no instalan cookies de seguimiento ni permiten identificar a un visitante en particular.',
      'Este sitio no utiliza cookies publicitarias, ni píxeles de redes sociales, ni herramientas de perfilado.',
    ],
  },
  {
    titulo: 'Secreto profesional',
    cuerpo: [
      'Con independencia de esta política, toda la información patrimonial, contable y financiera que se nos confía en el marco de una relación profesional queda amparada por el secreto profesional que rige el ejercicio de las Ciencias Económicas.',
    ],
  },
  {
    titulo: 'Sus derechos',
    cuerpo: [
      'La Ley 25.326 de Protección de los Datos Personales le reconoce el derecho a acceder a sus datos, y a solicitar su rectificación, actualización o supresión. Para ejercerlo alcanza con escribir a ' +
        site.email +
        '.',
      'El titular de los datos personales tiene la facultad de ejercer el derecho de acceso al mismo en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto, conforme lo establecido en el artículo 14, inciso 3 de la Ley 25.326.',
      'La Agencia de Acceso a la Información Pública, en su carácter de órgano de control de la Ley 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.',
    ],
  },
  {
    titulo: 'Herramientas de cálculo',
    cuerpo: [
      'Las calculadoras publicadas en este sitio se ejecutan íntegramente en su navegador. Los importes que cargue no se envían a ningún servidor ni quedan registrados por el Estudio.',
      'Sus resultados tienen carácter orientativo y no reemplazan el asesoramiento profesional sobre un caso concreto.',
    ],
  },
  {
    titulo: 'Actualizaciones',
    cuerpo: [
      'Esta política puede actualizarse para reflejar cambios en el funcionamiento del sitio o en la normativa aplicable. La versión vigente es siempre la publicada en esta página.',
    ],
  },
]

export default function Privacidad() {
  return (
    <>
      <Navegacion />
      <main id="contenido" className="pt-[68px]">
        <div className="border-b border-borde bg-papel-2">
          <div className="contenedor py-14 sm:py-20">
            <p className="etiqueta">Información legal</p>
            <h1 className="titular-2 mt-5 text-navy">Política de privacidad</h1>
            <p className="bajada mt-4 max-w-2xl">
              Qué datos recoge este sitio, para qué se usan y cómo puede pedir que se eliminen. En los
              términos de la Ley 25.326 de Protección de los Datos Personales.
            </p>
          </div>
        </div>

        <div className="contenedor py-14 sm:py-18">
          <div className="max-w-3xl">
            {secciones.map((s, i) => (
              <section key={s.titulo} className={i > 0 ? 'mt-12' : ''}>
                <h2 className="titular-3 text-navy">
                  <span className="ordinal mr-3 text-celeste-700">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {s.titulo}
                </h2>
                {s.cuerpo.map((p) => (
                  <p key={p.slice(0, 40)} className="mt-4 text-[15.5px] leading-[1.75] text-tinta-2">
                    {p}
                  </p>
                ))}
              </section>
            ))}

            <div className="regla my-12" />

            <p className="text-[13.5px] text-tenue">
              Última actualización: agosto de 2026. Ante cualquier duda, escríbanos a{' '}
              <a href={`mailto:${site.email}`} className="font-semibold text-celeste-700 underline underline-offset-2">
                {site.email}
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      <PieDePagina />
    </>
  )
}
