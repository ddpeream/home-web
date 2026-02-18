// Auth guard — include this on every protected page
(function() {
  var isLoggedIn = sessionStorage.getItem('servi_auth');
  var publicPages = ['login.html', 'registro.html'];
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  if (!isLoggedIn && publicPages.indexOf(currentPage) === -1) {
    window.location.href = 'login.html';
  }
})();
