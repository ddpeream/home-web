// Expandable coverage cards
document.querySelectorAll('.coverage-card').forEach(function(card) {
  card.addEventListener('click', function() {
    var detail = card.querySelector('.cc-detail');
    var arrow = card.querySelector('.cc-expand');
    if (detail) {
      detail.classList.toggle('open');
      if (arrow) arrow.classList.toggle('open');
    }
  });
});

// Animate trust score on load
window.addEventListener('DOMContentLoaded', function() {
  var bar = document.querySelector('.trust-bar');
  if (bar) {
    bar.style.width = '0%';
    setTimeout(function() {
      bar.style.width = bar.getAttribute('data-percent') + '%';
    }, 300);
  }

  // Animate score number
  var scoreEl = document.querySelector('.trust-score');
  if (scoreEl) {
    var target = parseInt(scoreEl.getAttribute('data-target'));
    var current = 0;
    var step = Math.ceil(target / 30);
    var interval = setInterval(function() {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      scoreEl.textContent = current + '%';
    }, 30);
  }
});
