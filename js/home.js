// Category pill selection
document.querySelectorAll('.cat-pill').forEach(function(pill) {
  pill.addEventListener('click', function(e) {
    if (pill.tagName === 'A') return; // let links navigate
    document.querySelectorAll('.cat-pill').forEach(function(p) { p.classList.remove('active'); });
    pill.classList.add('active');
  });
});

// Search focus effect
var searchInput = document.querySelector('.search-input');
var searchBox = document.querySelector('.search-box');
if (searchInput && searchBox) {
  searchInput.addEventListener('focus', function() {
    searchBox.style.boxShadow = '0 4px 20px rgba(242,169,126,0.2)';
    searchBox.style.border = '1.5px solid var(--peach)';
  });
  searchInput.addEventListener('blur', function() {
    searchBox.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
    searchBox.style.border = 'none';
  });
}

// Worker card CTA hover feedback
document.querySelectorAll('.worker-card').forEach(function(card) {
  card.addEventListener('click', function() {
    var cta = card.querySelector('.w-cta');
    if (cta) {
      cta.style.background = 'var(--peach)';
      cta.style.color = 'white';
      setTimeout(function() {
        cta.style.background = '';
        cta.style.color = '';
      }, 200);
    }
  });
});
