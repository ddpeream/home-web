// ═══════════════════════════════════════
// DATA — Centralized Worker Database
// ═══════════════════════════════════════

var SERVI_WORKERS = [
  {
    id: 'maria-rodriguez',
    name: 'María Rodríguez',
    role: 'Empleada del Hogar',
    category: 'hogar',
    emoji: '👩‍🍳',
    bg: 'bg-peach',
    rating: 4.9,
    reviews: 127,
    experience: '8 años',
    price: 85000,
    priceSub: 'por día',
    priceDisplay: '$85k',
    online: true,
    about: 'María es profesional en administración del hogar con más de 8 años de experiencia en familias de Medellín. Especialista en limpieza profunda, organización de espacios, lavandería y planchado. Cocina platos colombianos y maneja compras del mercado. Puntual, discreta y de absoluta confianza.',
    services: [
      { name: 'Limpieza general', price: 85000, unit: 'día completo' },
      { name: 'Limpieza profunda', price: 110000, unit: 'día completo' },
      { name: 'Lavandería y planchado', price: 50000, unit: 'media jornada' },
      { name: 'Cocina y mercado', price: 95000, unit: 'día completo' }
    ],
    legal: {
      arl: { provider: 'Positiva Compañía de Seguros S.A.', status: 'Vigente', since: '2017' },
      seguro: { provider: 'Seguros Bolívar – Póliza de Responsabilidad Civil', status: 'Vigente', coverage: 'Hasta $50.000.000 COP' },
      contrato: { type: 'Contrato Digital de Prestación de Servicios', law: 'Ley 527 de 1999 – Comercio Electrónico', signed: 'Firmado digitalmente' },
      background: { provider: 'Certicámara S.A.', check: 'Antecedentes penales, disciplinarios y fiscales', lastCheck: 'Enero 2025' }
    },
    history: [
      { client: 'Carolina M.', date: '15 feb 2025', rating: 5, comment: 'Excelente trabajo, dejó la casa impecable. Super puntual y organizada.' },
      { client: 'Andrés P.', date: '10 feb 2025', rating: 5, comment: 'Muy profesional, la cocina quedó divina. La recomiendo 100%.' },
      { client: 'Laura G.', date: '5 feb 2025', rating: 5, comment: 'Llevamos 3 meses con María y es de total confianza. Excelente persona.' },
      { client: 'Diego R.', date: '28 ene 2025', rating: 4, comment: 'Buen servicio, limpieza profunda de calidad.' },
      { client: 'Valentina S.', date: '20 ene 2025', rating: 5, comment: 'Siempre puntual y muy cuidadosa con todo.' }
    ]
  },
  {
    id: 'carlos-mejia',
    name: 'Carlos Mejía',
    role: 'Paseador de Perros',
    category: 'mascotas',
    emoji: '🐕‍🦺',
    bg: 'bg-sky',
    rating: 5.0,
    reviews: 48,
    experience: '3 años',
    price: 35000,
    priceSub: 'por paseo',
    priceDisplay: '$35k',
    online: true,
    about: 'Carlos es paseador profesional certificado en comportamiento canino. Maneja hasta 3 perros simultáneamente con arnés de seguridad GPS. Conoce las mejores rutas de El Poblado y Laureles. Envía fotos y ubicación en tiempo real durante el paseo.',
    services: [
      { name: 'Paseo individual (1h)', price: 35000, unit: 'por paseo' },
      { name: 'Paseo grupal (1h)', price: 25000, unit: 'por perro' },
      { name: 'Cuidado de día', price: 60000, unit: 'por día' },
      { name: 'Hospedaje nocturno', price: 80000, unit: 'por noche' }
    ],
    legal: {
      arl: { provider: 'Positiva Compañía de Seguros S.A.', status: 'Vigente', since: '2022' },
      seguro: { provider: 'Seguros Bolívar – Póliza de Responsabilidad Civil', status: 'Vigente', coverage: 'Hasta $30.000.000 COP' },
      contrato: { type: 'Contrato Digital de Prestación de Servicios', law: 'Ley 527 de 1999 – Comercio Electrónico', signed: 'Firmado digitalmente' },
      background: { provider: 'Certicámara S.A.', check: 'Antecedentes penales, disciplinarios y fiscales', lastCheck: 'Diciembre 2024' }
    },
    history: [
      { client: 'Mariana T.', date: '17 feb 2025', rating: 5, comment: 'Mi perro ama a Carlos, siempre regresa feliz del paseo.' },
      { client: 'Felipe H.', date: '14 feb 2025', rating: 5, comment: 'Super confiable, manda fotos durante todo el paseo.' },
      { client: 'Sandra L.', date: '10 feb 2025', rating: 5, comment: 'El mejor paseador que hemos tenido. Responsable y cariñoso con los peludos.' },
      { client: 'Juan C.', date: '5 feb 2025', rating: 5, comment: 'Excelente servicio, siempre puntual.' }
    ]
  },
  {
    id: 'luis-herrera',
    name: 'Luis Herrera',
    role: 'Técnico Electricista',
    category: 'tecnico',
    emoji: '🔧',
    bg: 'bg-sage',
    rating: 4.7,
    reviews: 93,
    experience: '6 años',
    price: 60000,
    priceSub: 'por visita',
    priceDisplay: '$60k',
    online: false,
    about: 'Técnico electricista certificado por el SENA con más de 6 años de experiencia en instalaciones residenciales y comerciales. Especialista en diagnóstico de fallas, instalación de iluminación LED, tomacorrientes, tableros eléctricos y redes de datos. Trabaja bajo normas RETIE.',
    services: [
      { name: 'Diagnóstico eléctrico', price: 60000, unit: 'por visita' },
      { name: 'Reparación general', price: 80000, unit: 'por trabajo' },
      { name: 'Instalación LED completa', price: 120000, unit: 'por zona' },
      { name: 'Revisión tablero eléctrico', price: 90000, unit: 'por revisión' }
    ],
    legal: {
      arl: { provider: 'Positiva Compañía de Seguros S.A.', status: 'Vigente', since: '2019' },
      seguro: { provider: 'Seguros Bolívar – Póliza de Responsabilidad Civil', status: 'Vigente', coverage: 'Hasta $50.000.000 COP' },
      contrato: { type: 'Contrato Digital de Prestación de Servicios', law: 'Ley 527 de 1999 – Comercio Electrónico', signed: 'Firmado digitalmente' },
      background: { provider: 'Certicámara S.A.', check: 'Antecedentes penales, disciplinarios y fiscales', lastCheck: 'Enero 2025' }
    },
    history: [
      { client: 'Roberto A.', date: '15 feb 2025', rating: 5, comment: 'Solucionó un cortocircuito que otros no pudieron encontrar. Muy profesional.' },
      { client: 'Patricia M.', date: '12 feb 2025', rating: 5, comment: 'Excelente trabajo con la instalación de luces LED en toda la casa.' },
      { client: 'Camilo R.', date: '8 feb 2025', rating: 4, comment: 'Buen trabajo, resolvió el problema rápido.' },
      { client: 'Martha J.', date: '1 feb 2025', rating: 5, comment: 'Muy honesto, solo cobró lo justo. Recomendado.' }
    ]
  },
  {
    id: 'ana-garcia',
    name: 'Ana García',
    role: 'Cuidadora de Adultos',
    category: 'cuidado',
    emoji: '👵',
    bg: 'bg-lav',
    rating: 4.8,
    reviews: 64,
    experience: '5 años',
    price: 90000,
    priceSub: 'por día',
    priceDisplay: '$90k',
    online: true,
    about: 'Técnica en enfermería del SENA con 5 años de experiencia en cuidado de adultos mayores. Administra medicamentos según prescripción, apoya con ejercicios de rehabilitación, prepara dietas especiales y brinda compañía integral. Capacitada en primeros auxilios y emergencias geriátricas.',
    services: [
      { name: 'Cuidado diurno (8h)', price: 90000, unit: 'por día' },
      { name: 'Cuidado nocturno (12h)', price: 120000, unit: 'por noche' },
      { name: 'Acompañamiento médico', price: 70000, unit: 'por cita' },
      { name: 'Rehabilitación básica', price: 80000, unit: 'por sesión' }
    ],
    legal: {
      arl: { provider: 'Positiva Compañía de Seguros S.A.', status: 'Vigente', since: '2020' },
      seguro: { provider: 'Seguros Bolívar – Póliza de Responsabilidad Civil', status: 'Vigente', coverage: 'Hasta $50.000.000 COP' },
      contrato: { type: 'Contrato Digital de Prestación de Servicios', law: 'Ley 527 de 1999 – Comercio Electrónico', signed: 'Firmado digitalmente' },
      background: { provider: 'Certicámara S.A.', check: 'Antecedentes penales, disciplinarios y fiscales', lastCheck: 'Febrero 2025' }
    },
    history: [
      { client: 'Ricardo L.', date: '16 feb 2025', rating: 5, comment: 'Cuidó a mi mamá con mucho cariño y profesionalismo.' },
      { client: 'Marta C.', date: '11 feb 2025', rating: 5, comment: 'Excelente cuidadora, muy atenta con los medicamentos.' },
      { client: 'Jorge P.', date: '7 feb 2025', rating: 4, comment: 'Buena experiencia, mi padre se sintió muy cómodo.' },
      { client: 'Isabel R.', date: '30 ene 2025', rating: 5, comment: 'Ana es un ángel. Volvería a contratarla sin duda.' }
    ]
  },
  {
    id: 'jorge-martinez',
    name: 'Jorge Martínez',
    role: 'Jardinero Profesional',
    category: 'jardin',
    emoji: '🌿',
    bg: 'bg-sage',
    rating: 4.9,
    reviews: 76,
    experience: '7 años',
    price: 70000,
    priceSub: 'por visita',
    priceDisplay: '$70k',
    online: true,
    about: 'Jardinero profesional con 7 años de experiencia en paisajismo urbano y mantenimiento de jardines residenciales. Especialista en poda ornamental, sistemas de riego, control de plagas orgánico y diseño de jardines verticales. Maneja su propia herramienta profesional.',
    services: [
      { name: 'Mantenimiento básico', price: 70000, unit: 'por visita' },
      { name: 'Poda ornamental', price: 90000, unit: 'por sesión' },
      { name: 'Diseño de jardín', price: 150000, unit: 'por diseño' },
      { name: 'Sistema de riego', price: 200000, unit: 'por instalación' }
    ],
    legal: {
      arl: { provider: 'Positiva Compañía de Seguros S.A.', status: 'Vigente', since: '2018' },
      seguro: { provider: 'Seguros Bolívar – Póliza de Responsabilidad Civil', status: 'Vigente', coverage: 'Hasta $30.000.000 COP' },
      contrato: { type: 'Contrato Digital de Prestación de Servicios', law: 'Ley 527 de 1999 – Comercio Electrónico', signed: 'Firmado digitalmente' },
      background: { provider: 'Certicámara S.A.', check: 'Antecedentes penales, disciplinarios y fiscales', lastCheck: 'Enero 2025' }
    },
    history: [
      { client: 'Natalia F.', date: '16 feb 2025', rating: 5, comment: 'El jardín quedó hermoso, Jorge tiene un talento increíble.' },
      { client: 'Eduardo B.', date: '12 feb 2025', rating: 5, comment: 'Muy profesional, trajo todas sus herramientas y dejó todo impecable.' },
      { client: 'Carmen V.', date: '6 feb 2025', rating: 5, comment: 'El mejor jardinero de Medellín. Puntual y dedicado.' },
      { client: 'Pedro G.', date: '29 ene 2025', rating: 4, comment: 'Buen trabajo con la poda. Recomendado.' }
    ]
  },
  {
    id: 'pedro-sanchez',
    name: 'Pedro Sánchez',
    role: 'Conductor Privado',
    category: 'conductor',
    emoji: '🚗',
    bg: 'bg-sky',
    rating: 4.8,
    reviews: 112,
    experience: '4 años',
    price: 45000,
    priceSub: 'por hora',
    priceDisplay: '$45k',
    online: true,
    about: 'Conductor privado profesional con licencia C2 y 4 años de experiencia. Conoce toda el área metropolitana de Medellín. Vehículo propio SUV modelo 2023 con seguros al día. Ofrece servicio ejecutivo, traslados aeropuerto, diligencias y acompañamiento por horas. Siempre puntual y discreto.',
    services: [
      { name: 'Servicio por horas', price: 45000, unit: 'por hora' },
      { name: 'Traslado aeropuerto', price: 80000, unit: 'por trayecto' },
      { name: 'Día completo (8h)', price: 280000, unit: 'por día' },
      { name: 'Diligencias (4h)', price: 160000, unit: 'medio día' }
    ],
    legal: {
      arl: { provider: 'Positiva Compañía de Seguros S.A.', status: 'Vigente', since: '2021' },
      seguro: { provider: 'Seguros Bolívar – SOAT + Póliza Todo Riesgo', status: 'Vigente', coverage: 'Hasta $100.000.000 COP' },
      contrato: { type: 'Contrato Digital de Prestación de Servicios', law: 'Ley 527 de 1999 – Comercio Electrónico', signed: 'Firmado digitalmente' },
      background: { provider: 'Certicámara S.A.', check: 'Antecedentes penales, disciplinarios, fiscales + licencia vigente', lastCheck: 'Febrero 2025' }
    },
    history: [
      { client: 'Juliana M.', date: '17 feb 2025', rating: 5, comment: 'Puntualísimo, el carro impecable. Excelente servicio al aeropuerto.' },
      { client: 'Andrés V.', date: '14 feb 2025', rating: 5, comment: 'Muy profesional y discreto. El mejor conductor privado.' },
      { client: 'Carolina H.', date: '10 feb 2025', rating: 4, comment: 'Buen servicio, me ayudó con todas mis diligencias.' },
      { client: 'Miguel T.', date: '5 feb 2025', rating: 5, comment: 'Llevamos usando a Pedro 3 meses. Super recomendado.' }
    ]
  }
];

// Utility: find worker by ID
function getWorkerById(id) {
  for (var i = 0; i < SERVI_WORKERS.length; i++) {
    if (SERVI_WORKERS[i].id === id) return SERVI_WORKERS[i];
  }
  return null;
}

// Utility: filter workers by category
function getWorkersByCategory(cat) {
  if (!cat || cat === 'todos') return SERVI_WORKERS;
  var result = [];
  for (var i = 0; i < SERVI_WORKERS.length; i++) {
    if (SERVI_WORKERS[i].category === cat) result.push(SERVI_WORKERS[i]);
  }
  return result;
}

// Utility: search workers by name or role
function searchWorkers(query) {
  if (!query) return SERVI_WORKERS;
  var q = query.toLowerCase();
  var result = [];
  for (var i = 0; i < SERVI_WORKERS.length; i++) {
    var w = SERVI_WORKERS[i];
    if (w.name.toLowerCase().indexOf(q) !== -1 ||
        w.role.toLowerCase().indexOf(q) !== -1 ||
        w.category.toLowerCase().indexOf(q) !== -1) {
      result.push(w);
    }
  }
  return result;
}

// Utility: format price to Colombian pesos
function formatPriceCOP(num) {
  var str = num.toString();
  var result = '';
  var count = 0;
  for (var i = str.length - 1; i >= 0; i--) {
    if (count > 0 && count % 3 === 0) result = '.' + result;
    result = str[i] + result;
    count++;
  }
  return '$' + result;
}
