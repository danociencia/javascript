const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const btnStart = document.getElementById('btnStart');
const statusText = document.getElementById('statusText');
const inputProducto = document.getElementById('producto');
const listaHTML = document.getElementById('lista');

// se guarda en localStorage para que no se borre al recargar
let lista = JSON.parse(localStorage.getItem('lista')) || [];

function mostrarLista() {
  listaHTML.innerHTML = '';
  for (let i = 0; i < lista.length; i++) {
    const li = document.createElement('li');
    li.textContent = lista[i];
    listaHTML.appendChild(li);
  }
  localStorage.setItem('lista', JSON.stringify(lista));
}

function hablar(mensaje) {
  statusText.textContent = mensaje;
  const voz = new SpeechSynthesisUtterance(mensaje);
  voz.lang = 'es-ES';
  window.speechSynthesis.speak(voz);
}

function anadir(producto) {
  lista.push(producto);
  mostrarLista();
  hablar('He añadido ' + producto);
}

function quitar(producto) {
  if (lista.includes(producto)) {
    lista.splice(lista.indexOf(producto), 1);
    mostrarLista();
    hablar('He quitado ' + producto);
  } else {
    hablar(producto + ' no está en la lista');
  }
}

function vaciar() {
  lista = [];
  mostrarLista();
  hablar('He vaciado la lista');
}

// botones para usarlo sin micrófono
document.getElementById('btnAnadir').addEventListener('click', () => anadir(inputProducto.value.trim().toLowerCase()));
document.getElementById('btnQuitar').addEventListener('click', () => quitar(inputProducto.value.trim().toLowerCase()));
document.getElementById('btnVaciar').addEventListener('click', vaciar);

if (!SpeechRecognition) {
  statusText.textContent = "Error: tu navegador no soporta la Web Speech API, usa los botones";
  btnStart.disabled = true;
} else {
  const recognition = new SpeechRecognition();

  recognition.lang = 'es-ES';
  recognition.continuous = false;
  recognition.interimResults = false;

  btnStart.addEventListener('click', () => {
    recognition.start();
  });

  recognition.onstart = () => {
    statusText.textContent = "Estado: Escuchando...";
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.trim().toLowerCase();

    // el producto es lo que va después de "añade" o "quita"
    if (transcript.includes('añade ')) {
      anadir(transcript.replace('añade ', ''));
    } else if (transcript.includes('quita ')) {
      quitar(transcript.replace('quita ', ''));
    } else if (transcript.includes('vacía') || transcript.includes('vaciar')) {
      vaciar();
    } else {
      hablar('No te he entendido');
    }
  };

  recognition.onerror = (event) => {
    if (event.error == 'not-allowed') {
      statusText.textContent = "Error: no has dado permiso al micrófono";
    } else if (event.error == 'no-speech') {
      statusText.textContent = "Error: no se ha oído nada";
    } else {
      statusText.textContent = "Error: " + event.error;
    }
  };
}

mostrarLista();