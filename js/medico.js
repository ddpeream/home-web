// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// MÃ‰DICO â€” Module Logic
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

var selectedPrice = 85000;
var isUrgent = false;
var urgentFee = 20000;

function goTo(screenId) {
  document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
  document.getElementById(screenId).classList.add('active');
  window.scrollTo(0, 0);
}

function getTotalPrice() {
  return isUrgent ? selectedPrice + urgentFee : selectedPrice;
}

function formatPrice(num) {
  return '$' + num.toLocaleString('es-CO');
}

function updateAgendarPrice() {
  var total = getTotalPrice();
  var btn = document.querySelector('.submit-btn');
  if (btn) btn.textContent = 'Confirmar y pagar ' + formatPrice(total) + ' â†’';

  // Update resumen card price
  var resPrice = document.querySelector('.res-price');
  if (resPrice) resPrice.textContent = formatPrice(total / 1000) .replace('$', '$') + 'k';
}

function goToPago() {
  var selectedMod = document.querySelector('.modality-card.selected');
  var tipo = 'Domicilio';
  if (selectedMod) {
    tipo = selectedMod.querySelector('.mod-name').textContent;
  }

  // Check tipo-card selection on agendar screen too
  var selectedTipo = document.querySelector('.tipo-card.selected');
  if (selectedTipo) {
    tipo = selectedTipo.querySelector('.tipo-name').textContent;
  }

  var total = getTotalPrice();
  var priceSub = 'consulta ' + tipo.toLowerCase();
  if (isUrgent) priceSub += ' (urgente)';

  sessionStorage.setItem('servi_pago', JSON.stringify({
    name: 'Dr. Frank Rosales',
    role: 'MÃ©dico General',
    emoji: 'ðŸ‘¨â€âš•ï¸',
    bg: 'bg-sky',
    price: total,
    priceSub: priceSub,
    date: 'Mar 18 feb',
    time: '10:00 am',
    location: tipo,
    from: 'medico.html'
  }));
  window.location.href = 'pago.html';
}

function selectModality(el) {
  document.querySelectorAll('.modality-card').forEach(function(c) { c.classList.remove('selected'); });
  el.classList.add('selected');
  var priceText = el.querySelector('.mod-price').textContent;
  selectedPrice = parseInt(priceText.replace(/[^0-9]/g, ''));
  document.querySelector('.cta-price-num').textContent = priceText;
  var tipo = el.querySelector('.mod-name').textContent.toLowerCase();
  document.querySelector('.cta-price-label').textContent = 'consulta ' + tipo;

  // Sync tipo-cards on agendar screen
  var tipoCards = document.querySelectorAll('.tipo-card');
  tipoCards.forEach(function(c) { c.classList.remove('selected'); });
  if (tipo.indexOf('domicilio') !== -1 || tipo.indexOf('a domicilio') !== -1) {
    if (tipoCards[0]) tipoCards[0].classList.add('selected');
  } else {
    if (tipoCards[1]) tipoCards[1].classList.add('selected');
  }

  updateAgendarPrice();
}

function selectTipo(el) {
  document.querySelectorAll('.tipo-card').forEach(function(c) { c.classList.remove('selected'); });
  el.classList.add('selected');

  var priceText = el.querySelector('.tipo-price').textContent;
  selectedPrice = parseInt(priceText.replace(/[^0-9]/g, ''));

  // Sync modality cards on perfil screen
  var tipoName = el.querySelector('.tipo-name').textContent.toLowerCase();
  document.querySelectorAll('.modality-card').forEach(function(c) { c.classList.remove('selected'); });
  if (tipoName.indexOf('domicilio') !== -1) {
    document.querySelector('.modality-card.domicilio').classList.add('selected');
  } else {
    document.querySelector('.modality-card.virtual').classList.add('selected');
  }

  // Update perfil screen CTA
  document.querySelector('.cta-price-num').textContent = priceText;
  document.querySelector('.cta-price-label').textContent = 'consulta ' + tipoName;

  // Update resumen card tipo text
  var resRole = document.querySelector('.res-role');
  if (resRole) {
    resRole.textContent = 'Mar 18 Â· 10:00 am Â· ' + el.querySelector('.tipo-name').textContent;
  }

  updateAgendarPrice();
}

function selectUrgency(el, urgent) {
  document.querySelectorAll('.urgency-chip').forEach(function(c) { c.classList.remove('selected'); });
  el.classList.add('selected');
  isUrgent = urgent;
  updateAgendarPrice();
}

// Time slots toggle
document.querySelectorAll('.time-slot:not(.taken)').forEach(function(slot) {
  slot.addEventListener('click', function() {
    document.querySelectorAll('.time-slot').forEach(function(s) { s.classList.remove('active'); });
    slot.classList.add('active');
  });
});

// Day chips toggle
document.querySelectorAll('.day-chip:not(.unavail)').forEach(function(chip) {
  chip.addEventListener('click', function() {
    document.querySelectorAll('.day-chip').forEach(function(c) { c.classList.remove('active'); });
    chip.classList.add('active');
  });
});

// Download PDF button
var downloadBtn = document.querySelector('.download-btn');
if (downloadBtn) {
  downloadBtn.addEventListener('click', function() {
    alert('La descarga de PDF estarÃ¡ disponible prÃ³ximamente.');
  });
}

// â”€â”€â”€ Hash-based navigation â”€â”€â”€
(function() {
  if (window.location.hash === '#postconsulta') {
    goTo('screen-postconsulta');
  }
})();

