// ═══════════════════════════════════
// PAGO — Payment Flow Logic
// ═══════════════════════════════════

var pagoData = null;
var selectedMethod = 'visa-4521';
var totalAmount = 0;
var basePrice = 0;
var comision = 0;

// ─── Initialize ───
(function() {
  var raw = sessionStorage.getItem('HOGARIUM_pago');
  if (!raw) {
    window.location.href = 'index.html';
    return;
  }
  pagoData = JSON.parse(raw);
  loadResumen();
})();

// ─── Load order summary ───
function loadResumen() {
  document.getElementById('ps-avatar').textContent = pagoData.emoji;
  document.getElementById('ps-name').textContent = pagoData.name;
  document.getElementById('ps-role').textContent = pagoData.role;
  document.getElementById('ps-date').textContent = pagoData.date;
  document.getElementById('ps-time').textContent = pagoData.time;
  document.getElementById('ps-location').textContent = pagoData.location;

  var avatar = document.getElementById('ps-avatar');
  if (pagoData.bg) {
    avatar.className = 'ps-avatar ' + pagoData.bg;
  }

  basePrice = pagoData.price;
  comision = Math.round(basePrice * 0.08);
  totalAmount = basePrice + comision;

  document.getElementById('pr-subtotal').textContent = formatPrice(basePrice);
  document.getElementById('pr-comision').textContent = formatPrice(comision);
  document.getElementById('pr-total').textContent = formatPrice(totalAmount);

  updateTotals();
}

// ─── Format price (Colombian pesos) ───
function formatPrice(num) {
  var str = num.toString();
  var result = '';
  var count = 0;
  for (var i = str.length - 1; i >= 0; i--) {
    if (count > 0 && count % 3 === 0) result = '.' + result;
    result = str[i] + result;
    count++;
  }
  return '$' + result;
}

// ─── Update all total displays ───
function updateTotals() {
  var formatted = formatPrice(totalAmount);
  var el1 = document.getElementById('cta-total');
  var el2 = document.getElementById('cta-total-tarjeta');
  if (el1) el1.textContent = formatted;
  if (el2) el2.textContent = formatted;
}

// ─── Screen navigation ───
function pagoGoTo(screenId) {
  document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
  document.getElementById(screenId).classList.add('active');
  window.scrollTo(0, 0);
}

// ─── Back button (resumen → previous page) ───
document.getElementById('btn-back-resumen').addEventListener('click', function() {
  var from = pagoData && pagoData.from ? pagoData.from : 'index.html';
  window.location.href = from;
});

// ─── Payment method selection ───
function selectMethod(el) {
  document.querySelectorAll('.pm-item').forEach(function(item) { item.classList.remove('selected'); });
  el.classList.add('selected');
  selectedMethod = el.getAttribute('data-method');
}

// ─── Process payment (from method screen) ───
function procesarPago() {
  pagoGoTo('screen-procesando');

  setTimeout(function() {
    // Always succeed for demo (use Math.random() > 0.15 for occasional errors)
    mostrarExito();
  }, 3000);
}

// ─── Process payment (from card form) ───
function procesarPagoTarjeta() {
  var num = document.getElementById('card-number').value.replace(/\s/g, '');
  var name = document.getElementById('card-name').value.trim();
  var exp = document.getElementById('card-expiry').value.trim();
  var cvv = document.getElementById('card-cvv').value.trim();

  var hasError = false;

  if (num.length < 15) {
    document.getElementById('card-number').closest('.card-input-wrap').classList.add('error');
    hasError = true;
  }
  if (!name) {
    document.getElementById('card-name').closest('.card-input-wrap').classList.add('error');
    hasError = true;
  }
  if (exp.length < 5) {
    document.getElementById('card-expiry').closest('.card-input-wrap').classList.add('error');
    hasError = true;
  }
  if (cvv.length < 3) {
    document.getElementById('card-cvv').closest('.card-input-wrap').classList.add('error');
    hasError = true;
  }

  if (hasError) {
    setTimeout(function() {
      document.querySelectorAll('.card-input-wrap.error').forEach(function(el) {
        el.classList.remove('error');
      });
    }, 2000);
    return;
  }

  selectedMethod = 'Tarjeta •••• ' + num.slice(-4);
  procesarPago();
}

// ─── Show success ───
function mostrarExito() {
  document.getElementById('rx-txn').textContent = '#TXN-' + Math.floor(10000 + Math.random() * 90000);
  document.getElementById('rx-service').textContent = pagoData.role;
  document.getElementById('rx-worker').textContent = pagoData.name;
  document.getElementById('rx-total').textContent = formatPrice(totalAmount);

  var methodNames = {
    'visa-4521': 'Visa •••• 4521',
    'pse': 'PSE - Transferencia',
    'nequi': 'Nequi',
    'daviplata': 'Daviplata',
    'efecty': 'Efecty',
    'mercadopago': 'MercadoPago',
    'paypal': 'PayPal'
  };
  document.getElementById('rx-method').textContent = methodNames[selectedMethod] || selectedMethod;

  var now = new Date();
  var months = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  var h = now.getHours();
  var m = now.getMinutes();
  var ampm = h >= 12 ? 'pm' : 'am';
  h = h % 12 || 12;
  document.getElementById('rx-date').textContent = now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear() + ' · ' + h + ':' + (m < 10 ? '0' : '') + m + ' ' + ampm;

  pagoGoTo('screen-exito');
}

// ─── Show error ───
function mostrarError(msg) {
  document.getElementById('error-msg').textContent = msg;
  pagoGoTo('screen-error');
}

// ─── Retry ───
function reintentar() {
  pagoGoTo('screen-metodo');
}

// ─── Coupon code ───
document.getElementById('coupon-btn').addEventListener('click', function() {
  var code = document.getElementById('coupon-input').value.trim().toUpperCase();
  var btn = this;

  if (code === 'HOGARIUM10') {
    var descuento = Math.round(basePrice * 0.10);
    totalAmount = basePrice + comision - descuento;
    document.getElementById('pr-descuento').textContent = '-' + formatPrice(descuento);
    document.getElementById('promo-row').style.display = 'flex';
    document.getElementById('pr-total').textContent = formatPrice(totalAmount);
    btn.textContent = '✓ Aplicado';
    btn.classList.add('applied');
    btn.disabled = true;
    document.getElementById('coupon-input').disabled = true;
    updateTotals();
  } else if (code) {
    btn.textContent = 'No válido';
    btn.style.background = 'var(--red)';
    setTimeout(function() {
      btn.textContent = 'Aplicar';
      btn.style.background = '';
    }, 2000);
  }
});

// ─── Card form: format number ───
document.getElementById('card-number').addEventListener('input', function() {
  var val = this.value.replace(/\D/g, '').substring(0, 16);
  var formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ');
  this.value = formatted;

  // Update card visual
  var clean = val;
  var groups = [];
  for (var i = 0; i < 16; i += 4) {
    var group = '';
    for (var j = i; j < i + 4; j++) {
      group += j < clean.length ? clean[j] : '•';
    }
    groups.push(group);
  }
  document.getElementById('cv-number').textContent = groups.join(' ');

  // Detect card type
  var type = 'VISA';
  if (val.startsWith('5')) type = 'MASTERCARD';
  else if (val.startsWith('3')) type = 'AMEX';
  else if (val.startsWith('4')) type = 'VISA';
  document.getElementById('cv-type').textContent = type;
});

// ─── Card form: name ───
document.getElementById('card-name').addEventListener('input', function() {
  document.getElementById('cv-holder').textContent = this.value.toUpperCase() || 'TU NOMBRE';
});

// ─── Card form: expiry ───
document.getElementById('card-expiry').addEventListener('input', function() {
  var val = this.value.replace(/\D/g, '').substring(0, 4);
  if (val.length >= 2) {
    val = val.substring(0, 2) + '/' + val.substring(2);
  }
  this.value = val;
  document.getElementById('cv-expiry').textContent = val || 'MM/AA';
});

// ─── Clear error state on focus ───
document.querySelectorAll('.card-input').forEach(function(input) {
  input.addEventListener('focus', function() {
    var wrap = this.closest('.card-input-wrap');
    if (wrap) wrap.classList.remove('error');
  });
});
