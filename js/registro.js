var form = document.getElementById('registro-form');
var nameInput = document.getElementById('reg-name');
var emailInput = document.getElementById('reg-email');
var passInput = document.getElementById('reg-pass');
var pass2Input = document.getElementById('reg-pass2');
var errorBox = document.getElementById('reg-error');
var submitBtn = document.getElementById('reg-btn');
var spinner = document.getElementById('reg-spinner');
var btnText = document.getElementById('reg-btn-text');
var togglePass = document.getElementById('toggle-pass');
var togglePass2 = document.getElementById('toggle-pass2');
var toast = document.getElementById('reg-toast');

// Toggle passwords
togglePass.addEventListener('click', function() {
  if (passInput.type === 'password') {
    passInput.type = 'text';
    togglePass.textContent = '🙈';
  } else {
    passInput.type = 'password';
    togglePass.textContent = '👁️';
  }
});
togglePass2.addEventListener('click', function() {
  if (pass2Input.type === 'password') {
    pass2Input.type = 'text';
    togglePass2.textContent = '🙈';
  } else {
    pass2Input.type = 'password';
    togglePass2.textContent = '👁️';
  }
});

// Clear error on input
[nameInput, emailInput, passInput, pass2Input].forEach(function(input) {
  input.addEventListener('input', function() {
    errorBox.classList.remove('show');
  });
});

form.addEventListener('submit', function(e) {
  e.preventDefault();

  var name = nameInput.value.trim();
  var email = emailInput.value.trim();
  var pass = passInput.value;
  var pass2 = pass2Input.value;

  if (!name || !email || !pass || !pass2) {
    showError('Por favor completa todos los campos');
    return;
  }

  if (!email.includes('@') || !email.includes('.')) {
    showError('Ingresa un correo electrónico válido');
    return;
  }

  if (pass.length < 8) {
    showError('La contraseña debe tener mínimo 8 caracteres');
    return;
  }

  if (pass !== pass2) {
    showError('Las contraseñas no coinciden');
    pass2Input.value = '';
    pass2Input.focus();
    return;
  }

  // Show loading
  submitBtn.disabled = true;
  spinner.style.display = 'block';
  btnText.textContent = 'Creando cuenta...';

  setTimeout(function() {
    // Show success toast
    toast.classList.add('show');

    setTimeout(function() {
      toast.classList.remove('show');
      window.location.href = 'login.html';
    }, 2000);
  }, 1500);
});

function showError(msg) {
  errorBox.textContent = msg;
  errorBox.classList.add('show');
}
