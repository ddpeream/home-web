// Tab switching
var tabs = document.querySelectorAll('.tab');
var sections = document.querySelectorAll('.tab-content');

tabs.forEach(function(tab) {
  tab.addEventListener('click', function() {
    tabs.forEach(function(t) { t.classList.remove('active'); });
    tab.classList.add('active');

    var target = tab.getAttribute('data-tab');
    sections.forEach(function(s) {
      s.style.display = s.id === target ? 'block' : 'none';
    });
  });
});

// Star rating
document.querySelectorAll('.rating-stars').forEach(function(container) {
  var stars = container.querySelectorAll('.star');
  stars.forEach(function(star, index) {
    star.addEventListener('click', function() {
      stars.forEach(function(s, i) {
        if (i <= index) {
          s.classList.add('filled');
        } else {
          s.classList.remove('filled');
        }
      });
    });
  });
});

// Cancel button confirmation
document.querySelectorAll('.ac-btn-secondary').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    if (btn.textContent === 'Cancelar') {
      if (confirm('¿Seguro que deseas cancelar este servicio?')) {
        var card = btn.closest('.activity-card');
        card.style.opacity = '0.5';
        card.style.pointerEvents = 'none';
        btn.textContent = 'Cancelado';
      }
    }
  });
});
