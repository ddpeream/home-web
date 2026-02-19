// ═══════════════════════════════════════
// HOME — Dynamic Workers, Search, Filter
// ═══════════════════════════════════════

var currentCategory = 'todos';
var currentSearch = '';

// ─── Render workers to DOM ───
function renderWorkers(workers) {
  var grid = document.getElementById('workers-grid');
  var empty = document.getElementById('empty-state');

  if (!workers.length) {
    grid.innerHTML = '';
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';
  var html = '';

  for (var i = 0; i < workers.length; i++) {
    var w = workers[i];
    var onlineDot = w.online
      ? '<div class="online-dot"></div>'
      : '<div class="online-dot" style="background:#f5a623;"></div>';

    html += '<div class="worker-card" data-id="' + w.id + '" data-category="' + w.category + '">' +
      '<div class="avatar-wrap">' +
        '<div class="w-avatar ' + w.bg + '">' + w.emoji + '</div>' +
        onlineDot +
      '</div>' +
      '<div class="w-info">' +
        '<div class="w-name">' + w.name + '</div>' +
        '<div class="w-role">' + w.role + ' · ' + w.experience + '</div>' +
        '<div class="w-row">' +
          '<div class="w-badges">' +
            '<span class="w-badge wb-arl">ARL ✓</span>' +
            '<span class="w-badge wb-seg">Seguro ✓</span>' +
          '</div>' +
          '<div class="w-rating"><span>★ ' + w.rating + '</span> (' + w.reviews + ')</div>' +
        '</div>' +
        '<div class="w-footer">' +
          '<div>' +
            '<div class="w-price">' + w.priceDisplay + '</div>' +
            '<div class="w-price-sub">' + w.priceSub + '</div>' +
          '</div>' +
          '<button class="w-cta">Contratar</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  grid.innerHTML = html;
  bindWorkerEvents();
}

// ─── Filter workers by category + search ───
function filterWorkers() {
  var workers = SERVI_WORKERS;

  // Filter by category
  if (currentCategory && currentCategory !== 'todos') {
    workers = getWorkersByCategory(currentCategory);
  }

  // Filter by search
  if (currentSearch) {
    var q = currentSearch.toLowerCase();
    var filtered = [];
    for (var i = 0; i < workers.length; i++) {
      var w = workers[i];
      if (w.name.toLowerCase().indexOf(q) !== -1 ||
          w.role.toLowerCase().indexOf(q) !== -1 ||
          w.category.toLowerCase().indexOf(q) !== -1) {
        filtered.push(w);
      }
    }
    workers = filtered;
  }

  renderWorkers(workers);
}

// ─── Bind click events on worker cards ───
function bindWorkerEvents() {
  // Card click → profile
  document.querySelectorAll('.worker-card').forEach(function(card) {
    card.addEventListener('click', function() {
      var workerId = card.getAttribute('data-id');
      sessionStorage.setItem('servi_worker_id', workerId);
      card.style.transform = 'scale(0.98)';
      setTimeout(function() {
        window.location.href = 'perfil-trabajador.html';
      }, 150);
    });
  });

  // Contratar button → pago
  document.querySelectorAll('.w-cta').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();

      var card = btn.closest('.worker-card');
      var workerId = card.getAttribute('data-id');
      var w = getWorkerById(workerId);

      if (!w) return;

      sessionStorage.setItem('servi_pago', JSON.stringify({
        name: w.name,
        role: w.role,
        emoji: w.emoji,
        bg: w.bg,
        price: w.price,
        priceSub: w.priceSub,
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
}

// ─── Category pills ───
document.querySelectorAll('.cat-pill[data-category]').forEach(function(pill) {
  pill.addEventListener('click', function() {
    document.querySelectorAll('.cat-pill').forEach(function(p) { p.classList.remove('active'); });
    pill.classList.add('active');
    currentCategory = pill.getAttribute('data-category');
    currentSearch = '';
    document.getElementById('search-input').value = '';
    filterWorkers();
  });
});

// ─── Search ───
var searchInput = document.getElementById('search-input');
var searchBox = searchInput.closest('.search-box');

searchInput.addEventListener('input', function() {
  currentSearch = this.value.trim();
  // Reset category to "todos" when searching
  if (currentSearch) {
    document.querySelectorAll('.cat-pill').forEach(function(p) { p.classList.remove('active'); });
    document.querySelector('.cat-pill[data-category="todos"]').classList.add('active');
    currentCategory = 'todos';
  }
  filterWorkers();
});

searchInput.addEventListener('focus', function() {
  searchBox.style.boxShadow = '0 4px 20px rgba(242,169,126,0.2)';
  searchBox.style.border = '1.5px solid var(--peach)';
});

searchInput.addEventListener('blur', function() {
  searchBox.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
  searchBox.style.border = 'none';
});

// ─── Explorar servicios → scroll to categories ───
document.getElementById('btn-explorar').addEventListener('click', function() {
  var target = document.getElementById('categorias');
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// ─── "Ver todas" → reset to all ───
document.getElementById('btn-ver-todas').addEventListener('click', function() {
  document.querySelectorAll('.cat-pill').forEach(function(p) { p.classList.remove('active'); });
  document.querySelector('.cat-pill[data-category="todos"]').classList.add('active');
  currentCategory = 'todos';
  currentSearch = '';
  document.getElementById('search-input').value = '';
  filterWorkers();
});

// ─── "Filtrar" button same as Ver todas for now ───
document.getElementById('btn-filtrar').addEventListener('click', function() {
  var target = document.getElementById('categorias');
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// ─── Legal tiles → go to confianza.html ───
document.querySelectorAll('.legal-tile').forEach(function(tile) {
  tile.style.cursor = 'pointer';
  tile.addEventListener('click', function() {
    tile.style.transform = 'scale(0.97)';
    tile.style.transition = 'transform 0.15s';
    setTimeout(function() { window.location.href = 'confianza.html'; }, 150);
  });
});

// ─── Legal card (top banner) → go to confianza.html ───
var legalCard = document.querySelector('.legal-card');
if (legalCard) {
  legalCard.style.cursor = 'pointer';
  legalCard.addEventListener('click', function() {
    window.location.href = 'confianza.html';
  });
}

// ─── Initial render ───
filterWorkers();
