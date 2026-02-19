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

// Worker card tap feedback
document.querySelectorAll('.worker-card').forEach(function(card) {
  card.addEventListener('click', function() {
    card.style.transform = 'scale(0.98)';
    setTimeout(function() { card.style.transform = ''; }, 200);
  });
});

// "Contratar" button → payment flow
document.querySelectorAll('.w-cta').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();

    var card = btn.closest('.worker-card');
    var name = card.querySelector('.w-name').textContent;
    var roleText = card.querySelector('.w-role').textContent;
    var role = roleText.split('·')[0].trim();
    var emoji = card.querySelector('.w-avatar').textContent.trim();
    var avatarEl = card.querySelector('.w-avatar');
    var bg = '';
    avatarEl.classList.forEach(function(c) { if (c.startsWith('bg-')) bg = c; });
    var priceText = card.querySelector('.w-price').textContent;
    var priceNum = parseInt(priceText.replace(/[^0-9]/g, '')) * 1000;
    var priceSub = card.querySelector('.w-price-sub').textContent;

    sessionStorage.setItem('servi_pago', JSON.stringify({
      name: name,
      role: role,
      emoji: emoji,
      bg: bg,
      price: priceNum,
      priceSub: priceSub,
      date: 'Hoy, 18 feb',
      time: '8:00 am - 4:00 pm',
      location: 'Tu hogar',
      from: 'index.html'
    }));

    btn.style.background = 'var(--peach)';
    btn.style.color = 'white';
    btn.textContent = '→';
    setTimeout(function() { window.location.href = 'pago.html'; }, 300);
  });
});
