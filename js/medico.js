function goTo(screenId) {
  document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
  document.getElementById(screenId).classList.add('active');
  window.scrollTo(0, 0);
}

function selectModality(el) {
  document.querySelectorAll('.modality-card').forEach(function(c) { c.classList.remove('selected'); });
  el.classList.add('selected');
  var price = el.querySelector('.mod-price').textContent;
  document.querySelector('.cta-price-num').textContent = price;
  var tipo = el.querySelector('.mod-name').textContent.toLowerCase();
  document.querySelector('.cta-price-label').textContent = 'consulta ' + tipo;
}

function selectTipo(el) {
  document.querySelectorAll('.tipo-card').forEach(function(c) { c.classList.remove('selected'); });
  el.classList.add('selected');
}

function selectUrgency(el, isUrgent) {
  document.querySelectorAll('.urgency-chip').forEach(function(c) { c.classList.remove('selected'); });
  el.classList.add('selected');
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
