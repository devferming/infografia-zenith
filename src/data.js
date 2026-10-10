export const AUTHORS = {
  cardenas: { short: 'Cárdenas Obregón, 2020', name: 'Cárdenas Obregón', year: 2020 },
  zayed: { short: 'Zayed, 2021', name: 'Zayed', year: 2021 },
  hallgren: { short: 'Hällgren, 2019', name: 'Hällgren', year: 2019 },
  unesco: { short: 'UNESCO, 2023', name: 'UNESCO', year: 2023 },
};

export const SECTIONS = [
  { id: 'inicio', num: '•', label: 'Inicio' },
  { id: 'que-son', num: '1', label: '¿Qué son?' },
  { id: 'transformaciones', num: '2', label: 'Transformaciones' },
  { id: 'oportunidades', num: '3', label: 'Oportunidades y riesgos' },
  { id: 'profesional', num: '4', label: 'Ejercicio profesional' },
  { id: 'conclusion', num: '5', label: 'Conclusión' },
  { id: 'reto', num: '★', label: 'Reto final' },
];

/* Section 1: the four verbs of the definition, each with a mini scene for the phone */
export const PRACTICES = [
  {
    id: 'actuar',
    word: 'actuar',
    icon: 'spark',
    color: 'var(--blue)',
    title: 'Nuevas formas de actuar',
    chat: [
      { from: 'app', text: 'Recordatorio: entrega del trabajo hoy 23:59 ⏰' },
      { from: 'me', text: 'Lo subo desde el móvil en el bus 🚌' },
      { from: 'app', text: '✅ Archivo recibido' },
    ],
  },
  {
    id: 'comunicarnos',
    word: 'comunicarnos',
    icon: 'chat',
    color: 'var(--violet)',
    title: 'Nuevas formas de comunicarnos',
    chat: [
      { from: 'other', text: '¿Videollamada en 5? 📹' },
      { from: 'me', text: '¡Dale! Te mando el enlace' },
      { from: 'other', text: '🙌 Nos vemos ahí' },
    ],
  },
  {
    id: 'identidad',
    word: 'construir identidad',
    icon: 'user',
    color: 'var(--rose)',
    title: 'Nuevas formas de construir identidad',
    chat: [
      { from: 'app', text: 'Editar perfil · Foto, bio, intereses' },
      { from: 'me', text: 'Bio: “Docente en formación · lectora · 🌱”' },
      { from: 'app', text: '❤️ 24 personas reaccionaron a tu publicación' },
    ],
  },
  {
    id: 'relacionarnos',
    word: 'relacionarnos',
    icon: 'users',
    color: 'var(--green)',
    title: 'Nuevas formas de relacionarnos',
    chat: [
      { from: 'other', text: 'Grupo “Proyecto final” · 6 participantes' },
      { from: 'other', text: 'Laura: ¿Repartimos las partes?' },
      { from: 'me', text: 'Yo tomo la conclusión ✍️' },
    ],
  },
];

/* Section 2 */
export const TRANSFORMATIONS = [
  {
    id: 'comunicacion',
    icon: 'chat',
    tone: 'blue',
    title: 'Comunicación y virtualidad',
    text: 'Facilitan intercambios a distancia y reconfiguran las relaciones sociales.',
    cites: ['cardenas', 'zayed'],
    back: {
      example: 'Una tutoría por videollamada, un grupo de estudio en mensajería o una clase híbrida.',
      question: '¿Qué se gana y qué se pierde cuando la conversación pasa a la pantalla?',
    },
  },
  {
    id: 'identidad',
    icon: 'user',
    tone: 'violet',
    title: 'Identidad digital',
    text: 'Las redes permiten presentar quiénes somos y recibir respuestas de otras personas, influyendo en cómo nos vemos y pertenecemos.',
    cites: ['hallgren'],
    back: {
      example: 'Elegir qué foto publicar, qué contar en la biografía o a qué comunidades unirse.',
      question: '¿Tu perfil muestra quién eres o quién esperan que seas?',
    },
  },
  {
    id: 'datos',
    icon: 'chart',
    tone: 'green',
    title: 'Datos y consumo',
    text: 'Las plataformas digitales forman parte de las prácticas sociales y pueden orientar lo que vemos y compartimos; conviene cuestionar su influencia.',
    cites: ['cardenas'],
    back: {
      example: 'El feed que “adivina” lo que te gusta o las recomendaciones que deciden qué ver después.',
      question: '¿Cuándo fue la última vez que elegiste algo fuera de lo que te recomendaron?',
    },
  },
  {
    id: 'aprendizaje',
    icon: 'cap',
    tone: 'amber',
    title: 'Aprendizaje y cambio educativo',
    text: 'WhatsApp y otras tecnologías pueden ayudar a estudiar las transformaciones educativas y la interacción social.',
    cites: ['zayed'],
    back: {
      example: 'Un chat de curso que se convierte en espacio de dudas, apoyo y aprendizaje entre pares.',
      question: '¿Las herramientas que usas te ayudan a aprender o solo a cumplir?',
    },
  },
];

/* Section 3 */
export const OPPORTUNITIES = [
  { id: 'o1', text: 'Acceso a información', icon: 'globe' },
  { id: 'o2', text: 'Comunicación inmediata', icon: 'chat' },
  { id: 'o3', text: 'Creatividad y colaboración', icon: 'palette' },
  { id: 'o4', text: 'Nuevas formas de aprender', icon: 'bulb' },
];
export const RISKS = [
  { id: 'r1', text: 'Exposición de la intimidad', icon: 'eye' },
  { id: 'r2', text: 'Conexión excesiva', icon: 'clock' },
  { id: 'r3', text: 'Debilitamiento de encuentros presenciales', icon: 'users' },
  { id: 'r4', text: 'Desigualdad en acceso y beneficios', icon: 'scale' },
];
export const UNESCO_CRITERIA = [
  { id: 'pertinente', label: 'Pertinente', hint: '¿Responde a una necesidad real de aprendizaje?' },
  { id: 'equitativo', label: 'Equitativo', hint: '¿Todas las personas pueden acceder y beneficiarse?' },
  { id: 'sostenible', label: 'Sostenible', hint: '¿Puede mantenerse en el tiempo sin dejar a nadie atrás?' },
  { id: 'personas', label: 'Centrado en las personas', hint: '¿Pone a estudiantes y docentes en el centro?' },
];

/* Section 4 */
export const COMPETENCIES = [
  { id: 'actualizar', icon: 'refresh', label: 'Actualizar competencias', detail: 'Aprender de forma continua a medida que cambian las herramientas.' },
  { id: 'evaluar', icon: 'brain', label: 'Evaluar críticamente la información', detail: 'Contrastar fuentes antes de creer o compartir.' },
  { id: 'responsable', icon: 'shield', label: 'Usar herramientas con responsabilidad', detail: 'Cuidar datos, privacidad y bienestar de las personas.' },
];

/* Section 5 */
export const CHALLENGES = [
  { id: 'autonomia', icon: 'spark', label: 'Autonomía', text: 'Decidir por nosotros mismos, no por lo que el algoritmo sugiere.' },
  { id: 'privacidad', icon: 'lock', label: 'Privacidad', text: 'Saber qué compartimos, con quién y para qué.' },
  { id: 'critico', icon: 'brain', label: 'Pensamiento crítico', text: 'Preguntar, contrastar y dudar de lo que llega fácil.' },
  { id: 'vinculos', icon: 'heart', label: 'Vínculos humanos', text: 'Que la pantalla acerque, no que reemplace el encuentro.' },
];

export const SELF_CHECK = [
  { id: 's1', text: 'Reviso el móvil apenas me despierto, casi sin pensarlo.', reverse: true },
  { id: 's2', text: 'Antes de compartir una noticia, verifico de dónde viene.', reverse: false },
  { id: 's3', text: 'Sé qué datos personales comparten mis apps más usadas.', reverse: false },
  { id: 's4', text: 'Termino viendo contenido que no elegí durante más tiempo del que quería.', reverse: true },
  { id: 's5', text: 'Tengo momentos del día sin pantallas para estar con otras personas.', reverse: false },
];

export const QUIZ = [
  {
    q: 'Según la infografía, las prácticas emergentes son…',
    options: [
      'Solo el uso de redes sociales por jóvenes',
      'Nuevas formas de actuar, comunicarnos, construir identidad y relacionarnos mediadas o transformadas por tecnologías digitales',
      'Programas de computación para escuelas',
      'Cambios exclusivamente económicos',
    ],
    answer: 1,
    why: 'La definición abarca actuar, comunicarnos, construir identidad y relacionarnos (Cárdenas Obregón, 2020; Zayed, 2021).',
  },
  {
    q: '¿Qué plantea la UNESCO (2023) sobre la tecnología en educación?',
    options: [
      'Mejora automáticamente el aprendizaje',
      'Debe reemplazar al docente',
      'Su uso debe ser pertinente, equitativo, sostenible y centrado en las personas',
      'Solo sirve para educación a distancia',
    ],
    answer: 2,
    why: 'La tecnología no mejora automáticamente el aprendizaje: depende de cómo se use.',
  },
  {
    q: '¿Cuál de estos es un RIESGO mencionado?',
    options: ['Creatividad y colaboración', 'Acceso a información', 'Exposición de la intimidad', 'Nuevas formas de aprender'],
    answer: 2,
    why: 'Los riesgos incluyen exposición de la intimidad, conexión excesiva, debilitamiento de encuentros presenciales y desigualdad.',
  },
  {
    q: 'En educación, la tecnología debe…',
    options: [
      'Sustituir la interacción humana',
      'Apoyar —no sustituir— la interacción humana y responder a las necesidades de los estudiantes',
      'Usarse lo menos posible',
      'Decidir qué aprende cada estudiante',
    ],
    answer: 1,
    why: 'Apoyar, no sustituir (Zayed, 2021; UNESCO, 2023).',
  },
  {
    q: 'Sobre la identidad digital, Hällgren (2019) señala que las redes…',
    options: [
      'No influyen en cómo nos vemos',
      'Permiten presentar quiénes somos y recibir respuestas que influyen en cómo nos vemos y pertenecemos',
      'Solo sirven para entretenimiento',
      'Eliminan la necesidad de pertenecer a grupos',
    ],
    answer: 1,
    why: 'La respuesta de otras personas influye en nuestra autoimagen y pertenencia.',
  },
];
