const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const btnStart = document.getElementById('btnStart');
const statusText = document.getElementById('statusText');
const commandText = document.getElementById('commandText');
const respuesta = document.getElementById('respuesta');
const texto = document.getElementById('texto');

let tamano = 16;

// escribe la respuesta y la lee en voz alta
function responder(mensaje) {
  respuesta.textContent = mensaje;
  const voz = new SpeechSynthesisUtterance(mensaje);
  voz.lang = 'es-ES';
  window.speechSynthesis.speak(voz);
}

// la uso con la voz y con los botones
function comando(transcript) {
  commandText.textContent = transcript;

  if (transcript.includes('rojo')) {
    document.body.style.backgroundColor = '#f8d7da';
    responder('Fondo cambiado');
  } else if (transcript.includes('verde')) {
    document.body.style.backgroundColor = '#d4edda';
    responder('Fondo cambiado');
  } else if (transcript.includes('azul')) {
    document.body.style.backgroundColor = '#cce5ff';
    responder('Fondo cambiado');
  } else if (transcript.includes('más grande')) {
    tamano = tamano + 4;
    texto.style.fontSize = tamano + 'px';
    responder('Letra aumentada');
  } else if (transcript.includes('más pequeño')) {
    tamano = tamano - 4;
    texto.style.fontSize = tamano + 'px';
    responder('Letra reducida');
  } else if (transcript.includes('modo oscuro')) {
    document.body.style.backgroundColor = '';
    document.body.classList.add('oscuro');
    responder('Tema oscuro puesto');
  } else if (transcript.includes('modo claro')) {
    document.body.style.backgroundColor = '';
    document.body.classList.remove('oscuro');
    responder('Tema claro puesto');
  } else if (transcript.includes('restablecer') || transcript.includes('blanco')) {
    document.body.style.backgroundColor = '#ffffff';
    document.body.classList.remove('oscuro');
    tamano = 16;
    texto.style.fontSize = '16px';
    responder('Todo como al principio');
  } else {
    responder('Comando no encontrado');
  }
}

if (!SpeechRecognition) {
  statusText.textContent = "Error: tu navegador no soporta la Web Speech API, usa los botones";
  btnStart.disabled = true;
} else {
  const recognition = new SpeechRecognition();

  recognition.lang = 'es-ES';
  recognition.continuous = true;
  recognition.interimResults = false;

  let isListening = false;

  btnStart.addEventListener('click', () => {
    if (!isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }
  });

  recognition.onstart = () => {
    isListening = true;
    statusText.textContent = "Estado: Escuchando...";
    btnStart.textContent = "Detener Micrófono";
  };

  recognition.onend = () => {
    isListening = false;
    // para que no se borre el error
    if (!statusText.textContent.includes('Error')) {
      statusText.textContent = "Estado: Inactivo";
    }
    btnStart.textContent = "Activar Micrófono";
  };

  recognition.onresult = (event) => {
    // si la página está hablando no se escucha a sí misma
    if (window.speechSynthesis.speaking) return;

    const lastIndex = event.results.length - 1;
    const transcript = event.results[lastIndex][0].transcript.trim().toLowerCase();
    comando(transcript);
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
