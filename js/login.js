var VALID_EMAIL = 'ddpeream@unal.edu.co';
var VALID_PASS = '12345678';

var form = document.getElementById('login-form');
var emailInput = document.getElementById('login-email');
var passInput = document.getElementById('login-pass');
var errorBox = document.getElementById('login-error');
var submitBtn = document.getElementById('login-btn');
var spinner = document.getElementById('login-spinner');
var btnText = document.getElementById('login-btn-text');
var togglePass = document.getElementById('toggle-pass');

// Toggle password visibility
togglePass.addEventListener('click', function() {
  if (passInput.type === 'password') {
    passInput.type = 'text';
    togglePass.textContent = '🙈';
  } else {
    passInput.type = 'password';
    togglePass.textContent = '👁️';
  }
});

// Clear error on input
emailInput.addEventListener('input', function() { hideError(); });
passInput.addEventListener('input', function() { hideError(); });

function hideError() {
  errorBox.classList.remove('show');
}

// Submit
form.addEventListener('submit', function(e) {
  e.preventDefault();

  var email = emailInput.value.trim();
  var pass = passInput.value;

  if (!email || !pass) {
    showError('Por favor completa todos los campos');
    return;
  }

  // Show loading
  submitBtn.disabled = true;
  spinner.style.display = 'block';
  btnText.textContent = 'Verificando...';

  // Simulate network delay
  setTimeout(function() {
    if (email === VALID_EMAIL && pass === VALID_PASS) {
      sessionStorage.setItem('servi_auth', 'true');
      sessionStorage.setItem('servi_user', JSON.stringify({
        name: 'Deimar Valencia',
        email: email
      }));
      window.location.href = 'index.html';
    } else {
      showError('Correo o contraseña incorrectos');
      submitBtn.disabled = false;
      spinner.style.display = 'none';
      btnText.textContent = 'Iniciar sesión';
      passInput.value = '';
      passInput.focus();
    }
  }, 1200);
});

function showError(msg) {
  errorBox.textContent = msg;
  errorBox.classList.add('show');
}
