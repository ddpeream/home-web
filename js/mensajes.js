var chatList = document.getElementById('chat-list-view');
var chatDetail = document.getElementById('chat-detail-view');
var backBtn = document.getElementById('chat-back');
var chatHeaderName = document.getElementById('chat-detail-name');
var chatHeaderAvatar = document.getElementById('chat-detail-avatar');
var messagesContainer = document.getElementById('chat-messages');
var chatInput = document.getElementById('chat-msg-input');
var sendBtn = document.getElementById('chat-send-btn');

// Chat data
var chats = {
  maria: {
    name: 'María Rodríguez',
    emoji: '👩‍🍳',
    bg: 'bg-peach',
    messages: [
      { text: 'Hola, ¿a qué hora llego mañana?', sent: false, time: '9:15 am' },
      { text: '¡Hola María! A las 8:00 am por favor', sent: true, time: '9:16 am' },
      { text: 'Perfecto, llevo los implementos de limpieza', sent: false, time: '9:18 am' },
      { text: 'Genial, muchas gracias 🙌', sent: true, time: '9:18 am' },
    ]
  },
  carlos: {
    name: 'Carlos Mejía',
    emoji: '🐕‍🦺',
    bg: 'bg-sky',
    messages: [
      { text: '¡Hola! Ya estoy llegando a recoger a Max', sent: false, time: '2:00 pm' },
      { text: 'Perfecto Carlos, te abrimos ya', sent: true, time: '2:01 pm' },
    ]
  },
  andres: {
    name: 'Dr. Franck Rosales',
    emoji: '👨‍⚕️',
    bg: 'bg-sky',
    messages: [
      { text: 'Buenas tardes, le confirmo su cita para mañana a las 10:00 am a domicilio.', sent: false, time: '4:30 pm' },
      { text: 'Confirmo doctor, muchas gracias', sent: true, time: '4:32 pm' },
      { text: 'Recuerde tener a la mano su documento de identidad y estar en ayunas si es posible.', sent: false, time: '4:33 pm' },
    ]
  }
};

// Open chat
document.querySelectorAll('.chat-item').forEach(function(item) {
  item.addEventListener('click', function() {
    var chatId = item.getAttribute('data-chat');
    openChat(chatId);
  });
});

function openChat(chatId) {
  var chat = chats[chatId];
  if (!chat) return;

  chatHeaderName.textContent = chat.name;
  chatHeaderAvatar.textContent = chat.emoji;
  chatHeaderAvatar.className = 'chat-header-avatar ' + chat.bg;

  messagesContainer.innerHTML = '';
  chat.messages.forEach(function(msg) {
    addMessage(msg.text, msg.sent, msg.time);
  });

  chatList.style.display = 'none';
  chatDetail.style.display = 'flex';
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addMessage(text, isSent, time) {
  var div = document.createElement('div');
  div.className = 'msg-bubble ' + (isSent ? 'sent' : 'received');
  div.innerHTML = text + '<div class="msg-time">' + time + '</div>';
  messagesContainer.appendChild(div);
}

// Back button
if (backBtn) {
  backBtn.addEventListener('click', function() {
    chatDetail.style.display = 'none';
    chatList.style.display = 'block';
  });
}

// Send message
function sendMessage() {
  var text = chatInput.value.trim();
  if (!text) return;

  var now = new Date();
  var hours = now.getHours();
  var mins = now.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12;
  var timeStr = hours + ':' + (mins < 10 ? '0' : '') + mins + ' ' + ampm;

  addMessage(text, true, timeStr);
  chatInput.value = '';
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Simulate reply
  setTimeout(function() {
    var replies = [
      'Entendido, gracias 👍',
      'Perfecto, así quedamos',
      'De acuerdo, nos vemos entonces',
      '¡Listo! Cualquier cosa me escribes',
    ];
    var reply = replies[Math.floor(Math.random() * replies.length)];
    addMessage(reply, false, timeStr);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 1500);
}

if (sendBtn) {
  sendBtn.addEventListener('click', sendMessage);
}
if (chatInput) {
  chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendMessage();
  });
}

// Search filter
var searchInput = document.querySelector('.msg-search-input');
if (searchInput) {
  searchInput.addEventListener('input', function() {
    var query = searchInput.value.toLowerCase();
    document.querySelectorAll('.chat-item').forEach(function(item) {
      var name = item.querySelector('.chat-name').textContent.toLowerCase();
      item.style.display = name.includes(query) ? 'flex' : 'none';
    });
  });
}
