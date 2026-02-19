// ═══════════════════════════════════════
// PERFIL TRABAJADOR — Worker Profile Logic
// ═══════════════════════════════════════

(function() {
  var workerId = sessionStorage.getItem('servi_worker_id');
  if (!workerId) {
    window.location.href = 'index.html';
    return;
  }

  var w = getWorkerById(workerId);
  if (!w) {
    window.location.href = 'index.html';
    return;
  }

  // Top nav
  document.getElementById('wk-top-title').textContent = w.role;

  // Hero
  var avatarEl = document.getElementById('wk-avatar');
  avatarEl.textContent = w.emoji;
  avatarEl.className = 'wk-avatar ' + w.bg;

  document.getElementById('wk-name').textContent = w.name;
  document.getElementById('wk-role').textContent = w.role + ' · ' + w.experience;

  // Badges
  var badgesHTML = '<span class="wk-badge wk-badge-arl">ARL ✓</span>' +
    '<span class="wk-badge wk-badge-seg">Seguro ✓</span>' +
    '<span class="wk-badge wk-badge-contrato">Contrato ✓</span>';
  if (w.online) {
    badgesHTML += '<span class="wk-badge wk-badge-online">● Disponible</span>';
  } else {
    badgesHTML += '<span class="wk-badge wk-badge-busy">● Ocupado</span>';
  }
  document.getElementById('wk-badges').innerHTML = badgesHTML;

  // Stats
  document.getElementById('wk-rating').textContent = w.rating;
  document.getElementById('wk-reviews').textContent = w.reviews;
  document.getElementById('wk-exp').textContent = w.experience;
  document.getElementById('wk-services-count').textContent = w.services.length;

  // About
  document.getElementById('wk-about').textContent = w.about;

  // Services
  var servicesEl = document.getElementById('wk-services-list');
  var servicesHTML = '';
  for (var i = 0; i < w.services.length; i++) {
    var svc = w.services[i];
    servicesHTML += '<div class="wk-service-item">' +
      '<div><div class="wk-svc-name">' + svc.name + '</div>' +
      '<div class="wk-svc-unit">' + svc.unit + '</div></div>' +
      '<div class="wk-svc-price">' + formatPriceCOP(svc.price) + '</div>' +
      '</div>';
  }
  servicesEl.innerHTML = servicesHTML;

  // Legal
  var legalEl = document.getElementById('wk-legal-items');
  var leg = w.legal;
  var legalHTML = '' +
    '<div class="wk-legal-item">' +
      '<div class="wk-legal-dot">✓</div>' +
      '<div>' +
        '<div class="wk-legal-text">ARL – Riesgos Laborales</div>' +
        '<div class="wk-legal-provider">' + leg.arl.provider + '</div>' +
        '<div class="wk-legal-sub">Estado: ' + leg.arl.status + ' · Desde ' + leg.arl.since + '</div>' +
      '</div>' +
    '</div>' +
    '<div class="wk-legal-item">' +
      '<div class="wk-legal-dot">✓</div>' +
      '<div>' +
        '<div class="wk-legal-text">Seguro de Responsabilidad Civil</div>' +
        '<div class="wk-legal-provider">' + leg.seguro.provider + '</div>' +
        '<div class="wk-legal-sub">Cobertura: ' + leg.seguro.coverage + '</div>' +
      '</div>' +
    '</div>' +
    '<div class="wk-legal-item">' +
      '<div class="wk-legal-dot">✓</div>' +
      '<div>' +
        '<div class="wk-legal-text">' + leg.contrato.type + '</div>' +
        '<div class="wk-legal-provider">' + leg.contrato.law + '</div>' +
        '<div class="wk-legal-sub">' + leg.contrato.signed + '</div>' +
      '</div>' +
    '</div>' +
    '<div class="wk-legal-item">' +
      '<div class="wk-legal-dot">✓</div>' +
      '<div>' +
        '<div class="wk-legal-text">Verificación de antecedentes</div>' +
        '<div class="wk-legal-provider">' + leg.background.provider + '</div>' +
        '<div class="wk-legal-sub">' + leg.background.check + ' · ' + leg.background.lastCheck + '</div>' +
      '</div>' +
    '</div>';
  legalEl.innerHTML = legalHTML;

  // Reviews
  document.getElementById('wk-reviews-num').textContent = w.rating;
  document.getElementById('wk-reviews-count').textContent = w.reviews + ' reseñas';

  var starsText = '';
  var full = Math.floor(w.rating);
  for (var s = 0; s < 5; s++) {
    starsText += s < full ? '★' : '☆';
  }
  document.getElementById('wk-reviews-stars').textContent = starsText;

  var reviewsEl = document.getElementById('wk-review-list');
  var reviewsHTML = '';
  for (var r = 0; r < w.history.length; r++) {
    var rev = w.history[r];
    var revStars = '';
    for (var rs = 0; rs < rev.rating; rs++) revStars += '★';
    reviewsHTML += '<div class="wk-review-item">' +
      '<div class="wk-review-top">' +
        '<div class="wk-review-client">' + rev.client + '</div>' +
        '<div class="wk-review-date">' + rev.date + '</div>' +
      '</div>' +
      '<div class="wk-review-rating">' + revStars + '</div>' +
      '<div class="wk-review-comment">' + rev.comment + '</div>' +
    '</div>';
  }
  reviewsEl.innerHTML = reviewsHTML;

  // CTA
  document.getElementById('wk-cta-price').textContent = formatPriceCOP(w.price);
  document.getElementById('wk-cta-sub').textContent = w.priceSub;

  // Contratar button → pago.html
  document.getElementById('wk-cta-contratar').addEventListener('click', function() {
    sessionStorage.setItem('servi_pago', JSON.stringify({
      name: w.name,
      role: w.role,
      emoji: w.emoji,
      bg: w.bg,
      price: w.price,
      priceSub: w.priceSub,
      date: 'Hoy, 18 feb',
      time: 'A convenir',
      location: 'Tu hogar',
      from: 'perfil-trabajador.html'
    }));
    window.location.href = 'pago.html';
  });

  // Message button → mensajes.html
  document.getElementById('wk-cta-msg').addEventListener('click', function() {
    window.location.href = 'mensajes.html';
  });

})();
