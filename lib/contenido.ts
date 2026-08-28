/**
 * TODO el texto de la landing, en un solo archivo.
 *
 * Para cambiar un título, una descripción o una pregunta frecuente no hace falta
 * tocar ningún componente: se edita acá.
 *
 * Reglas que sostiene este contenido:
 *  1. Registro "usted" en cada cadena visible. Lo verifica `npm run registro`.
 *  2. Nada que no esté respaldado por las propuestas de la firma. Sin testimonios,
 *     sin logos de clientes, sin porcentajes de ahorro, sin cantidad de clientes.
 *  3. Los únicos números del sitio son los que carga el visitante en las
 *     calculadoras. Los años de trayectoria se calculan en tiempo de render
 *     (`aniosDeTrayectoria()`), nunca se escriben a mano.
 *  4. El problema se atribuye siempre a la estructura del mercado, nunca al
 *     descuido del lector ni al trabajo de su contador actual.
 */

export const hero = {
  eyebrow: 'Asesoramiento Financiero Integral · Catamarca y todo el NOA',
  titulo: 'Un estudio de Ciencias Económicas que además le gestiona el financiamiento.',
  /** Fragmento del título que va resaltado en celeste. */
  tituloResaltado: 'que además le gestiona el financiamiento',
  bajada:
    'Liquidamos sus impuestos y llevamos su contabilidad, y con esa misma información diseñamos y gestionamos la estructura de financiamiento de su empresa. Una sola firma para todo el ciclo financiero, en Catamarca y en todo el Noroeste Argentino.',
  ctaPrimario: 'Agendar una reunión',
  ctaPrimarioNota: '45 minutos, sin costo ni compromiso. Presencial en Catamarca o virtual.',
  ctaSecundario: 'Ver qué incluye cada nivel',
  confianza: [
    { valor: 'Desde 2018', detalle: 'Sociedad de profesionales en Ciencias Económicas.' },
    { valor: '5 áreas, un mismo equipo', detalle: 'Tributaria, contable, laboral, financiera y de mercado de capitales.' },
    { valor: 'Catamarca y todo el NOA', detalle: 'Atención presencial en Catamarca y virtual en el resto de la región.' },
  ],
  /** Contraste tipográfico construido con frases del párrafo canónico de la firma. */
  contraste: [
    {
      clave: 'tasa',
      acepta: 'La tasa que ofrece el banco con el que ya se opera.',
      decide: 'El costo financiero total, comparado entre alternativas.',
    },
    {
      clave: 'plazo',
      acepta: 'El plazo que ese banco propone.',
      decide: 'El plazo que corresponde al activo que se financia.',
    },
    {
      clave: 'garantia',
      acepta: 'La garantía que ese banco pide.',
      decide: 'Si la operación admite un aval de S.G.R. en lugar de una garantía real.',
    },
    {
      clave: 'informacion',
      acepta: 'El balance que llega cuando la decisión ya se tomó.',
      decide: 'La información de gestión disponible durante todo el ejercicio.',
    },
  ],
} as const

export const puertas = {
  titulo: 'Elija por dónde empezar',
  opciones: [
    {
      clave: 'sociedad',
      orden: '01',
      titulo: 'Tengo una sociedad',
      texto:
        'Cumplimiento mensual, estados contables, liquidación de haberes y decisiones de inversión bajo una misma conducción técnica.',
      ancla: '#sociedades',
    },
    {
      clave: 'financiamiento',
      orden: '02',
      titulo: 'Necesito financiar mi empresa',
      texto:
        'Diagnóstico, diseño de la estructura de endeudamiento y gestión del legajo y las garantías hasta la acreditación.',
      ancla: '#financiamiento',
    },
    {
      clave: 'individuo',
      orden: '03',
      titulo: 'Quiero ordenar mi patrimonio',
      texto:
        'Impuestos personales, manifestación de bienes y deudas certificada y acceso al mercado de capitales.',
      ancla: '#individuos',
    },
  ],
} as const

export const diagnostico = {
  eyebrow: 'El punto de partida',
  cita: 'En la mayoría de las PyMEs, el costo del financiamiento no se decide: se acepta.',
  cuerpo: [
    'Se toma la línea que ofrece el banco con el que ya se opera, en el plazo que ese banco propone y con la garantía que ese banco pide. El resultado suele ser una estructura de deuda más cara y más corta de lo necesario: capital de trabajo sostenido con descubierto en cuenta corriente, inversiones en bienes de capital calzadas contra plazos de doce meses y garantías reales comprometidas donde hubiera alcanzado un aval.',
  ],
  remate: 'Nuestro trabajo consiste en convertir el costo del financiamiento en una variable gestionada.',
  atribucion: 'Propuesta de Servicios · Financiamiento PyME',
} as const

export const situacion = {
  eyebrow: 'Prediagnóstico',
  titulo: '¿En cuántas de estas situaciones se reconoce?',
  bajada:
    'Son los mismos puntos que repasamos en la primera reunión. Marque los que correspondan a su empresa.',
  nota: 'Esto no reemplaza un diagnóstico. Sirve para que la primera conversación empiece donde corresponde.',
  situaciones: [
    { id: '01', frente: 'estructura de financiamiento', texto: 'Sostiene capital de trabajo con descubierto en cuenta corriente.' },
    { id: '02', frente: 'estructura de financiamiento', texto: 'Financió bienes de capital contra plazos de doce meses.' },
    { id: '03', frente: 'estructura de financiamiento', texto: 'Comprometió una garantía real donde podría haber alcanzado un aval.' },
    { id: '04', frente: 'estructura de financiamiento', texto: 'Una operación de crédito le fue rechazada o demorada, y no quedó claro por qué.' },
    { id: '05', frente: 'estructura de financiamiento', texto: 'Desconoce si su empresa tiene hoy el Certificado MiPyME vigente.' },
    { id: '06', frente: 'información de gestión y carga fiscal', texto: 'Conoce la carga fiscal del ejercicio cuando se liquida, no antes.' },
    { id: '07', frente: 'información de gestión y carga fiscal', texto: 'Recibe los estados contables meses después del cierre.' },
    { id: '08', frente: 'información de gestión y carga fiscal', texto: 'Decide precios y compras sin un tablero de indicadores actualizado.' },
    { id: '09', frente: 'patrimonio del socio', texto: 'El patrimonio de los socios y el de la sociedad se ordenan por separado, o no se ordenan.' },
  ],
} as const

export const integracion = {
  eyebrow: 'Por qué una sola firma',
  titulo: 'Integrar las cinco áreas no es un detalle organizativo.',
  bajada:
    'Es lo que permite evaluar una decisión de financiamiento también por su impacto impositivo, por su efecto sobre los estados contables y por las alternativas disponibles fuera del circuito bancario tradicional.',
  introPlanos: 'Cada operación se evalúa en tres planos simultáneos.',
  planos: [
    {
      orden: '01',
      titulo: 'Cuánto cuesta después de impuestos',
      texto:
        'El costo del financiamiento cambia según la deducibilidad de intereses y gastos financieros, el tratamiento del ajuste por inflación impositivo y el efecto de la operación sobre la posición de IVA.',
    },
    {
      orden: '02',
      titulo: 'Qué garantía compromete',
      texto:
        'No es lo mismo comprometer un inmueble que gestionar un aval de Sociedad de Garantía Recíproca. La garantía que se entrega hoy condiciona la operación de mañana.',
    },
    {
      orden: '03',
      titulo: 'Qué capacidad de endeudamiento deja disponible',
      texto:
        'Cada operación consume capacidad de endeudamiento. La decisión se evalúa contra el plan del ejercicio, no de manera aislada.',
    },
  ],
  introAreas: 'Las cinco áreas, con los instrumentos que efectivamente maneja cada una.',
  areas: [
    {
      nombre: 'Tributaria',
      instrumentos: 'IVA, Ingresos Brutos, Tasa de Seguridad e Higiene, regímenes de información, Ganancias y Bienes Personales.',
    },
    {
      nombre: 'Contable',
      instrumentos:
        'Libro diario, balances de sumas y saldos, estados contables anuales y auditoría externa conforme a Resoluciones Técnicas vigentes.',
    },
    {
      nombre: 'Laboral',
      instrumentos: 'Haberes, recibos de sueldos y cargas sociales, altas y bajas, Libro de Sueldos Digital y Formulario 931.',
    },
    {
      nombre: 'Financiera',
      instrumentos: 'Estructura de capital, costo financiero total, garantías y capacidad de repago.',
    },
    {
      nombre: 'Mercado de capitales',
      instrumentos: 'Cheques de pago diferido, pagarés bursátiles, cauciones y obligaciones negociables.',
    },
  ],
} as const

export const sociedades = {
  eyebrow: 'Sociedades',
  titulo: 'Asesoramiento integral para sociedades',
  bajada: 'Su gestión, profesionalizada. Sus impuestos, optimizados. Su crecimiento, acompañado.',
  cuerpo:
    'Acompañamos a empresas del Noroeste Argentino a profesionalizar su gestión y tomar mejores decisiones de negocio. Desde Catamarca, ofrecemos un servicio de asesoramiento interdisciplinario que combina mirada tributaria, contable, laboral, financiera y de mercado de capitales: una única firma que cubre todo el ciclo financiero de su sociedad.',
  introObjetivos:
    'El acompañamiento persigue tres objetivos, que se corresponden con las variables que determinan el valor de su negocio.',
  objetivos: [
    {
      orden: '01',
      titulo: 'Reducción de la carga fiscal',
      texto:
        'Aprovechamos cada oportunidad de ahorro dentro del marco normativo vigente y sostenemos el cumplimiento en tiempo y forma, resguardando a su empresa de multas y sanciones.',
    },
    {
      orden: '02',
      titulo: 'Optimización de ingresos',
      texto:
        'Ponemos a su disposición información financiera precisa y oportuna, para que las decisiones estratégicas se apoyen en datos y no en estimaciones.',
    },
    {
      orden: '03',
      titulo: 'Reducción del costo de financiamiento',
      texto:
        'Facilitamos el acceso a la banca tradicional y al mercado de capitales en condiciones más competitivas que las alcanzables por gestión propia.',
    },
  ],
  servicios: [
    {
      orden: '01',
      titulo: 'Sus impuestos, optimizados y al día',
      detalle: [
        'Liquidación mensual de IVA, Ingresos Brutos, Tasa de Seguridad e Higiene y regímenes de información.',
        'Declaraciones juradas anuales de Ganancias y de Bienes Personales (Acciones y Participaciones).',
        'Atención de inspecciones, requerimientos, embargos y recursos ante organismos fiscales.',
      ],
    },
    {
      orden: '02',
      titulo: 'Su contabilidad, ordenada y auditada',
      detalle: [
        'Teneduría de libros en sistema online del Estudio, accesible para su empresa en todo momento.',
        'Balances de sumas y saldos y estados contables anuales.',
        'Auditoría externa conforme a Resoluciones Técnicas vigentes e Informe del Auditor Independiente.',
      ],
    },
    {
      orden: '03',
      titulo: 'Su equipo, correctamente gestionado',
      detalle: [
        'Liquidación mensual de haberes, recibos de sueldos y cargas sociales.',
        'Altas, bajas y modificaciones de personal ante los organismos correspondientes.',
        'Libro de Sueldos Digital y Formulario 931 de aportes y contribuciones.',
      ],
    },
    {
      orden: '04',
      titulo: 'Su capital, con acceso a más oportunidades',
      detalle: [
        'Estrategias de inversión y financiamiento alineadas con sus objetivos de negocio.',
        'Cheques de pago diferido, cauciones y obligaciones negociables.',
        'Análisis de rentabilidad, gestión del riesgo y obtención de garantías.',
      ],
    },
    {
      orden: '05',
      titulo: 'Su gestión, profesionalizada y estratégica',
      detalle: [
        'Organización y centralización de la información financiera relevante.',
        'Tableros e indicadores de flujo de caja, rentabilidad y estructura de capital.',
        'Acompañamiento estratégico presencial o virtual orientado a maximizar el valor para los accionistas.',
      ],
    },
  ],
  cta: 'Coordinar una reunión de diagnóstico',
} as const

export const financiamiento = {
  eyebrow: 'Financiamiento PyME',
  titulo: 'Qué obtiene su empresa',
  bajada:
    'Un trabajo por proyecto, con alcance propio y honorarios propios, que puede contratarse sin modificar el servicio contable que hoy tiene.',
  resultados: [
    {
      orden: '01',
      titulo: 'Reducción del costo financiero total',
      texto:
        'No trabajamos únicamente sobre la tasa nominal. Analizamos el costo financiero total efectivo: comisiones de otorgamiento, gastos administrativos, seguros asociados, impuesto de sellos y tratamiento impositivo del instrumento. Dos operaciones con la misma tasa pueden tener costos finales sustancialmente distintos.',
    },
    {
      orden: '02',
      titulo: 'Acceso a fuentes que no están en la ventanilla del banco',
      texto:
        'Mercado de capitales, avales de Sociedades de Garantía Recíproca, líneas del Consejo Federal de Inversiones (C.F.I.), programas provinciales sectoriales y líneas con tasa bonificada reservadas a empresas con Certificado MiPyME vigente.',
    },
    {
      orden: '03',
      titulo: 'Una estructura de deuda alineada al ciclo del negocio',
      texto:
        'Cada destino de fondos con el plazo y el instrumento que le corresponden. El calce entre el activo que se financia y el pasivo que lo financia es, en la práctica, la diferencia entre crecer y tensionar la caja.',
    },
    {
      orden: '04',
      titulo: 'Un legajo que resiste el análisis crediticio',
      texto:
        'La mayoría de los rechazos y de las demoras no responden a la calidad del negocio, sino a la calidad de la presentación. Preparamos el legajo con el estándar que el analista de riesgo espera encontrar.',
    },
    {
      orden: '05',
      titulo: 'Aprovechamiento del beneficio fiscal del endeudamiento',
      texto:
        'Deducibilidad de intereses y gastos financieros, tratamiento del ajuste por inflación impositivo y efecto de la operación sobre la posición de IVA. El financiamiento bien estructurado también reduce carga tributaria.',
    },
    {
      orden: '06',
      titulo: 'Confidencialidad y rigor normativo',
      texto:
        'El legajo, los estados contables y la información de deuda que se prepara para una operación no salen del ámbito de la entidad a la que se presentan, y quedan alcanzados por el secreto profesional que rige el ejercicio de las Ciencias Económicas.',
    },
  ],
  tituloInstrumentos: 'Instrumentos y fuentes de financiamiento con los que operamos',
  notaInstrumentos:
    'La mención de estos instrumentos, entidades y organismos indica el ámbito en el que gestionamos las operaciones. No supone vínculo, representación ni aval de ninguno de ellos, y el acceso a cada línea depende del encuadre y de la evaluación que haga la entidad correspondiente.',
  instrumentos: [
    'S.G.R.',
    'C.F.I.',
    'CAPRESCA',
    'Registro MiPyME',
    'Central de Deudores del B.C.R.A.',
    'Cheques de pago diferido',
    'Pagarés bursátiles',
    'Cauciones',
    'Obligaciones negociables',
    'Líneas con tasa bonificada',
    'Líneas prendarias e hipotecarias',
  ],
} as const

export const metodo = {
  eyebrow: 'Cómo trabajamos',
  titulo: 'Tres etapas, y lo que recibe al final de cada una',
  etapas: [
    {
      orden: '01',
      titulo: 'Diagnóstico y cuantificación de la necesidad',
      texto:
        'Analizamos la estructura de capital sobre el flujo de caja proyectado y los estados contables, definimos el destino de los fondos —capital de trabajo, bienes de capital o reestructuración de pasivos—, revisamos la situación en la Central de Deudores del B.C.R.A. y verificamos el encuadre en el Registro MiPyME.',
      entregable: 'Informe de diagnóstico financiero, con la necesidad cuantificada y la capacidad de repago determinada.',
    },
    {
      orden: '02',
      titulo: 'Diseño de la estructura de financiamiento',
      texto:
        'Evaluamos banca tradicional (líneas comerciales, prendarias, hipotecarias y con tasa subsidiada), mercado de capitales (cheques de pago diferido, pagarés bursátiles y cauciones), avales de S.G.R., líneas del C.F.I. y programas de organismos provinciales como CAPRESCA. Comparamos las alternativas por costo financiero total, plazo, exigencia de garantías y tiempo de acreditación.',
      entregable:
        'Comparativo de alternativas valuadas por costo financiero total efectivo y recomendación fundamentada de estructura de endeudamiento.',
    },
    {
      orden: '03',
      titulo: 'Gestión integral del legajo y las garantías',
      texto:
        'Confeccionamos el legajo crediticio, gestionamos activamente las garantías y los avales de S.G.R. e intervenimos técnicamente ante la entidad durante todo el análisis, siguiendo el expediente hasta la acreditación.',
      entregable: 'Legajo crediticio completo, más gestión y seguimiento del expediente hasta su acreditación.',
    },
  ],
  tituloEntregables: 'Qué queda documentado',
  entregables: [
    'Informe de diagnóstico financiero con la necesidad cuantificada y la capacidad de repago determinada.',
    'Comparativo de alternativas de financiamiento, valuadas por costo financiero total efectivo.',
    'Recomendación fundamentada de estructura de endeudamiento.',
    'Legajo crediticio completo, en condiciones de ser presentado ante cualquier entidad.',
    'Gestión y seguimiento de la operación ante la entidad, hasta su resolución.',
  ],
  honorarios:
    'Honorarios: honorario fijo por diagnóstico y diseño, más honorario por gestión exitosa. Se establecen antes de iniciar el trabajo y no incluyen los costos propios de la operación —sellados, comisiones de la entidad, aranceles de S.G.R. y gastos de constitución de garantías—, que se informan en el comparativo de la etapa 02.',
  salvaguarda:
    'No publicamos porcentajes de ahorro. El margen de mejora depende de su encuadre, su actividad y su estructura actual: se estima en la reunión de diagnóstico, con sus números a la vista.',
  cta: 'Revisar su estructura de financiamiento',
} as const

export const individuos = {
  eyebrow: 'Personas humanas',
  titulo: 'Asesoramiento integral para individuos',
  bajada: 'Su patrimonio, organizado. Sus impuestos, optimizados. Sus inversiones, con acceso al mercado de capitales.',
  cuerpo:
    'Acompañamos a profesionales, emprendedores y familias del Noroeste Argentino a tomar mejores decisiones financieras, con un asesoramiento interdisciplinario que combina mirada tributaria, contable, financiera y de mercado de capitales.',
  cita: 'Le abrimos el acceso a herramientas de inversión y financiamiento habitualmente reservadas al mundo corporativo.',
  compromiso:
    'Cada cliente recibe el mismo nivel de atención: análisis riguroso de su situación, soluciones diseñadas a medida y el acompañamiento de un equipo interdisciplinario que conoce el contexto del NOA. Trato directo con los profesionales del equipo: usted no es un número.',
  servicios: [
    {
      orden: '01',
      titulo: 'Sus impuestos, al día y optimizados',
      detalle: [
        'Liquidación mensual y anual: IVA, Ingresos Brutos, Ganancias y Bienes Personales.',
        'Atención de inspecciones, requerimientos fiscales y planes de facilidades de pago.',
        'Planificación tributaria personalizada para minimizar costos impositivos.',
      ],
    },
    {
      orden: '02',
      titulo: 'Su patrimonio, organizado y certificado',
      detalle: [
        'Preparación y certificación de manifestaciones de bienes y deudas.',
        'Estados anuales de ingresos y egresos según normativa profesional vigente.',
        'Documentación lista para presentar ante bancos, organismos públicos y terceros.',
      ],
    },
    {
      orden: '03',
      titulo: 'Sus inversiones, con asesoramiento experto',
      detalle: [
        'Estrategias de inversión y financiamiento a medida de su perfil.',
        'Acceso al mercado de capitales: cauciones y cheques de pago diferido.',
        'Análisis de rentabilidad y gestión del riesgo de su cartera.',
      ],
    },
    {
      orden: '04',
      titulo: 'Su gestión financiera, profesionalizada',
      detalle: [
        'Organización y centralización de su información financiera relevante.',
        'Tableros e indicadores de flujo de caja, rentabilidad y costo de capital.',
        'Acompañamiento estratégico, presencial o virtual, según sus tiempos.',
      ],
    },
  ],
  encuadre:
    'El Estudio interviene en el análisis, la planificación y la estructuración. La apertura de cuentas comitentes y la concertación y liquidación de las operaciones se cursan a través de agentes registrados ante la Comisión Nacional de Valores.',
  puente: {
    titulo: 'Si además dirige una sociedad',
    texto:
      'El Nivel 03 Estratégico integra ambos perímetros —la sociedad y los socios como personas humanas— en una misma planificación fiscal y patrimonial anual.',
  },
  cta: 'Coordinar una reunión de diagnóstico',
} as const

export const niveles = {
  eyebrow: 'Honorarios',
  titulo: 'Tres niveles de alcance creciente',
  bajada:
    'Los honorarios se organizan en tres niveles, para que su empresa contrate el que corresponde a su situación actual y avance conforme crezca. Los tres los ejecuta un mismo equipo interdisciplinario, con una visión única de su negocio.',
  cuerpo:
    'Cada nivel comprende el alcance del anterior. La progresión no es de tamaño sino de profundidad: el cumplimiento previene riesgos, la eficiencia reduce costos y optimiza ingresos, y la sinergia alinea el resultado de la sociedad con el patrimonio de sus accionistas.',
  dimensionamiento:
    'El nivel se dimensiona por parámetros objetivos: volumen de ventas y compras, sucursales, jurisdicciones en las que tributa, regímenes de retención, percepción e información aplicables, convenios colectivos, operaciones en moneda extranjera o de comercio exterior, composición accionaria y nómina.',
  proyectos: {
    titulo: 'Servicios por proyecto, disponibles en los tres niveles',
    texto:
      'Consultoría financiera integral, defensa fiscal ante inspecciones y determinaciones de oficio, y estructuración patrimonial. Se cotizan mediante propuesta previa a cada trabajo, con esquema de estructuración más comisión de éxito. La comisión de éxito se aplica a los trabajos de gestión y estructuración: la auditoría, las certificaciones y todo informe que requiera independencia se cotizan siempre con honorario fijo.',
  },
  cta: 'Solicitar propuesta económica para su empresa',
} as const

export const proceso = {
  eyebrow: 'Cómo se empieza',
  titulo: 'Tres pasos, y el primero no compromete nada',
  pasos: [
    {
      orden: '01',
      titulo: 'Reunión de diagnóstico',
      texto:
        'Conversamos con la dirección sobre la situación actual de su empresa, los objetivos del próximo ejercicio y los desafíos que enfrenta. Esta primera reunión nos permite dimensionar dónde podemos generar mayor valor.',
      etiqueta: '45 minutos · sin costo ni compromiso',
    },
    {
      orden: '02',
      titulo: 'Propuesta a medida',
      texto:
        'Diseñamos un plan de trabajo personalizado con alcance, plazos y honorarios claramente definidos. Su empresa decide qué servicios contratar, con total transparencia y sin sorpresas.',
      etiqueta: '',
    },
    {
      orden: '03',
      titulo: 'Acompañamiento continuo',
      texto:
        'Trabajamos como una extensión del equipo de su empresa: cumplimos vencimientos, generamos reportes para la dirección y proponemos oportunidades de optimización a lo largo de todo el año.',
      etiqueta: '',
    },
  ],
  nota:
    'La reunión puede ser presencial en Catamarca o virtual para el resto del NOA.',
} as const

export const estandar = {
  eyebrow: 'Bajo qué estándar trabajamos',
  titulo: 'La garantía es normativa, no reputacional',
  bajada:
    'No publicamos testimonios, logos de clientes ni cifras de resultados. Lo que sí podemos poner por escrito es el marco bajo el cual trabajamos.',
  pilares: [
    {
      titulo: 'Secreto profesional',
      texto:
        'La información patrimonial y financiera que nos confía queda amparada por el secreto profesional que rige el ejercicio de las Ciencias Económicas, con manejo discreto de la información sensible de su empresa.',
    },
    {
      titulo: 'Normativa contable',
      texto:
        'Auditoría externa conforme a Resoluciones Técnicas vigentes, con emisión del Informe del Auditor Independiente.',
    },
    {
      titulo: 'Cumplimiento en tiempo y forma',
      texto:
        'Sostenemos el cumplimiento en tiempo y forma, resguardando a su empresa de multas y sanciones, con actualización normativa permanente.',
    },
    {
      titulo: 'Ahorro dentro del marco normativo vigente',
      texto:
        'Aprovechamos cada oportunidad de ahorro dentro del marco normativo vigente. No ofrecemos atajos: el ahorro que no resiste una inspección no es un ahorro.',
    },
  ],
  valores: ['Compromiso', 'Profesionalismo', 'Honestidad', 'Cumplimiento normativo', 'Confidencialidad', 'Trabajo en equipo'],
} as const

export const equipo = {
  eyebrow: 'La firma',
  titulo: 'WL Hnos. y Asoc.',
  bajada:
    'Sociedad de profesionales en Ciencias Económicas nacida en 2018, radicada en la provincia de Catamarca y con alcance en todo el Noroeste Argentino.',
  mision:
    'Asistir a nuestros clientes brindando un servicio interdisciplinario de asesoría tributaria, contable, financiera y de mercado de capitales que impulse el crecimiento y genere valor en sus negocios. Esa es nuestra misión, y es también el criterio con el que evaluamos cada trabajo que aceptamos.',
  motivos: [
    {
      orden: '01',
      titulo: 'Experiencia comprobada',
      texto: 'Acompañamos a empresas del NOA desde 2018, con actualización normativa permanente y rigor técnico.',
    },
    {
      orden: '02',
      titulo: 'Una única firma, todas las áreas',
      texto: 'Asesoramiento tributario, contable, laboral, financiero y de mercado de capitales bajo un mismo equipo.',
    },
    {
      orden: '03',
      titulo: 'Visión estratégica',
      texto: 'No solo cumplimos obligaciones: anticipamos riesgos y proponemos oportunidades de mejora continua.',
    },
    {
      orden: '04',
      titulo: 'Confidencialidad y rigor',
      texto: 'Manejo discreto de la información sensible de su empresa, con los más altos estándares éticos.',
    },
  ],
  encuadreSocios:
    'Los tres niveles de servicio los ejecuta un mismo equipo interdisciplinario. En el Nivel 03, la interlocución es directamente con un socio, con reunión mensual de gestión.',
  /**
   * Socios de la firma.
   *
   * `foto` apunta a un archivo dentro de /public. Mientras el archivo no exista,
   * la tarjeta muestra un monograma en lugar de romperse (ver FotoSocio.tsx).
   *
   * PENDIENTE de confirmar con el Estudio: apellido y nombre del segundo socio,
   * título profesional, número de matrícula y Consejo Profesional de cada uno.
   * Hasta que lleguen esos datos la sección no se publica con siluetas ni con
   * fotografías de banco de imágenes: se muestra la tarjeta institucional.
   */
  socios: [
    // PENDIENTE de confirmación por escrito del Estudio antes de publicar:
    // apellido y nombre completos, título profesional, número de matrícula y
    // Consejo Profesional de inscripción, y el área a cargo de cada socio.
    //
    // Hasta entonces esta lista queda vacía a propósito y la sección muestra la
    // tarjeta institucional (ver Equipo.tsx). Publicar un título profesional sin
    // confirmarlo es, para una firma de matriculados, una afirmación que un
    // visitante puede verificar y que el Consejo puede observar.
    //
    // Forma de cada entrada, lista para completar:
    // {
    //   clave: 'christian',
    //   nombre: 'Christian Gabriel Walther Luna',
    //   monograma: 'CW',
    //   titulo: 'Contador Público · Matrícula N.º XXXX, C.P.C.E. Catamarca',
    //   credencial: 'Asesor Financiero acreditado por el Instituto Español de Analistas Financieros (IEAF)',
    //   area: 'Financiamiento y mercado de capitales',
    //   foto: '/images/socios/christian-walther.jpg',
    // },
  ] as ReadonlyArray<{
    clave: string
    nombre: string
    monograma: string
    titulo: string
    credencial?: string
    area: string
    foto?: string
  }>,
} as const

export const herramientasSeccion = {
  eyebrow: 'Herramientas de cálculo',
  titulo: 'El método, aplicado a sus números',
  bajada:
    'Dos calculadoras de acceso libre, sin registro y sin dejar su correo. Están construidas con el mismo criterio con el que trabajamos: nombrar cada concepto que se le descuenta y mostrar el resultado.',
  cierre:
    'El cálculo es la parte fácil. Si quiere revisar estos números sobre su estructura real de costos e impuestos, conversemos.',
  disclaimer: 'Herramientas orientativas. No reemplazan el asesoramiento profesional personalizado.',
  cta: 'Revisar estos números con un profesional',
} as const

export const preguntas = {
  eyebrow: 'Preguntas frecuentes',
  titulo: 'Lo que nos preguntan antes de contratar',
  items: [
    {
      pregunta: '¿Cuánto sale?',
      respuesta:
        'Los honorarios se definen en la propuesta, después de la reunión de diagnóstico. No es una evasiva: el importe depende de parámetros objetivos que publicamos en esta misma página —volumen de ventas y compras, sucursales, jurisdicciones en las que tributa, regímenes aplicables, convenios colectivos, operaciones en moneda extranjera y comercio exterior, composición accionaria y nómina—. Por eso la estructura de los tres niveles está publicada y el importe no: la estructura es la misma para todos, el importe no puede serlo.',
      enlace: { texto: 'Ver qué incluye cada nivel', href: '#niveles' },
    },
    {
      pregunta: '¿Tengo que dejar a mi contador actual?',
      respuesta:
        'No necesariamente. El trabajo de Financiamiento PyME es un proyecto con alcance y honorarios propios —honorario fijo por diagnóstico y diseño, más honorario por gestión exitosa— y puede contratarse sin modificar el servicio contable que hoy tiene. Lo mismo ocurre con la consultoría financiera integral, la defensa fiscal y la estructuración patrimonial. El cambio completo corresponde solo si decide contratar uno de los tres niveles mensuales.',
      enlace: { texto: 'Ver el trabajo de financiamiento', href: '#financiamiento' },
    },
    {
      pregunta: 'Mi empresa no está en Catamarca. ¿Trabajan a distancia?',
      respuesta:
        'Sí. La sede está en Catamarca y el alcance es todo el Noroeste Argentino. La reunión de diagnóstico es presencial en Catamarca o virtual para el resto del NOA, y el acompañamiento estratégico funciona en cualquiera de las dos modalidades. La teneduría de libros se lleva en el sistema online del Estudio, accesible para su empresa en todo momento.',
      enlace: null,
    },
    {
      pregunta: '¿Atienden monotributistas y profesionales independientes?',
      respuesta:
        'Sí. La propuesta para personas humanas está dirigida a profesionales, emprendedores y familias del NOA, e incluye la liquidación mensual y anual de impuestos, la certificación de manifestaciones de bienes y deudas, los estados anuales de ingresos y egresos según normativa profesional vigente y la planificación tributaria personalizada. También el acceso al mercado de capitales, que es donde más se nota la diferencia respecto de una gestión individual.',
      enlace: { texto: 'Ver el asesoramiento para individuos', href: '#individuos' },
    },
    {
      pregunta: 'Vengo con problemas fiscales de años anteriores. ¿Igual me toman?',
      respuesta:
        'Sí, y conviene decirlo en la primera reunión y no después. Atendemos inspecciones, requerimientos, intimaciones, embargos y recursos ante organismos fiscales, y gestionamos planes de facilidades de pago. La defensa fiscal ante inspecciones y determinaciones de oficio iniciadas mediante orden de intervención está disponible como servicio por proyecto. Los períodos fiscales anteriores al inicio de la relación profesional se cotizan por separado.',
      enlace: null,
    },
    {
      pregunta: '¿Qué me piden para empezar?',
      respuesta:
        'Para la primera reunión, nada. Son 45 minutos de conversación sobre la situación actual, los objetivos del próximo ejercicio y los desafíos que enfrenta. Recién en la propuesta definimos alcance, plazos y honorarios, y con el alcance definido queda claro qué documentación hace falta. La prestación comienza una vez recibida la documentación detallada en el listado de requerimientos que se adjunta a la propuesta.',
      enlace: null,
    },
    {
      pregunta: '¿Me garantizan que el crédito sale?',
      respuesta:
        'No. La aprobación depende de un tercero y nadie serio puede garantizarla. Lo que sí podemos afirmar es dónde se juega realmente: la mayoría de los rechazos y de las demoras no responden a la calidad del negocio, sino a la calidad de la presentación. Por eso el trabajo incluye la revisión previa de la situación en la Central de Deudores del B.C.R.A., la verificación del encuadre en el Registro MiPyME y la confección del legajo con el estándar que el analista de riesgo espera encontrar.',
      enlace: null,
    },
    {
      pregunta: '¿Pagar menos impuestos significa asumir un riesgo con el fisco?',
      respuesta:
        'No, porque el ahorro se busca exclusivamente dentro del marco normativo vigente. El cumplimiento en tiempo y forma es parte del mismo objetivo, no algo separado: resguarda a su empresa de multas y sanciones, que son un costo tan real como el impuesto. La diferencia que trabajamos no está entre pagar e incumplir, sino entre liquidar lo que corresponde con la información a mano y hacerlo habiendo revisado antes encuadres, regímenes y alternativas de ahorro previstas por la propia normativa.',
      enlace: null,
    },
    {
      pregunta: '¿Cuánto puedo ahorrar?',
      respuesta:
        'No publicamos porcentajes de ahorro. El margen de mejora depende de su encuadre, su actividad y su estructura actual: se estima en la reunión de diagnóstico, con sus números a la vista. Cualquier cifra que le prometiéramos antes de ver su situación sería un número inventado.',
      enlace: null,
    },
    {
      pregunta: '¿Qué pasa con la información sensible de mi empresa y de mi familia?',
      respuesta:
        'La información patrimonial y financiera que nos confía queda amparada por el secreto profesional que rige el ejercicio de las Ciencias Económicas. La confidencialidad es uno de los valores declarados de la firma y se sostiene con el manejo discreto de la información sensible. En cuanto a este sitio: el prediagnóstico y las calculadoras funcionan íntegramente en su navegador, no envían ni almacenan nada, y el formulario de contacto solo se usa para responderle.',
      enlace: { texto: 'Ver la política de privacidad', href: '/privacidad' },
    },
  ],
} as const

export const contacto = {
  titulo: 'CONVERSEMOS',
  bajada:
    'Agendemos una reunión de 45 minutos para conocer su situación y evaluar dónde podemos generar mayor valor. Sin costo ni compromiso, presencial en Catamarca o virtual en todo el NOA.',
  etiqueta: '45 minutos · sin costo ni compromiso',
  tituloFormulario: 'O déjenos sus datos y nos comunicamos con usted',
  cierre: 'Equipo WL Hnos. y Asoc. — Visión integral y estratégica para sus decisiones financieras.',
} as const
