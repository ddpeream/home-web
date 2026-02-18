// Toggle switches
document.querySelectorAll('.toggle-switch').forEach(function(toggle) {
  toggle.addEventListener('click', function() {
    toggle.classList.toggle('on');
  });
});

// Menu item click feedback
document.querySelectorAll('.menu-item').forEach(function(item) {
  item.addEventListener('click', function() {
    // Visual feedback
    item.style.background = 'rgba(0,0,0,0.03)';
    setTimeout(function() { item.style.background = ''; }, 200);
  });
});

// Logout
var logoutBtn = document.querySelector('.logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', function() {
    if (confirm('¿Seguro que deseas cerrar sesión?')) {
      window.location.href = 'index.html';
    }
  });
}

// Edit profile (avatar click)
var avatar = document.querySelector('.profile-avatar');
if (avatar) {
  avatar.addEventListener('click', function() {
    avatar.style.transform = 'scale(0.9)';
    setTimeout(function() { avatar.style.transform = ''; }, 200);
  });
}
