// Auth guard — protect only sensitive pages
(function() {
  var isLoggedIn = sessionStorage.getItem('HOGARIUM_auth');
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // Public pages can load without session
  // (index/login/registro/confianza stay open for better UX)
  var protectedPages = [
    'actividad.html',
    'mensajes.html',
    'perfil.html',
    'perfil-trabajador.html',
    'pago.html',
    'medico.html'
  ];

  if (!isLoggedIn && protectedPages.indexOf(currentPage) !== -1) {
    window.location.href = 'login.html';
  }
})();
