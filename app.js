// Verifica se a Web Speech API é suportada pelo navegador
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = 'pt-BR';  // Definindo o idioma para português do Brasil
recognition.interimResults = true;  // Mostrar resultados intermediários
recognition.continuous = true;  // Continuar a gravação

// Elementos da página
const output = document.getElementById('output');
const startRecordBtn = document.getElementById('start-record-btn');
const stopRecordBtn = document.getElementById('stop-record-btn');


// Função para lidar com os resultados da fala
recognition.onresult = function(event) {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
    }
    output.value = transcript;  // Atualiza o texto transcrito na área de texto
};

// Função para lidar com erros
recognition.onerror = function(event) {
    console.error('Erro no reconhecimento de voz: ', event.error);
};

// Iniciar o reconhecimento de voz ao clicar no botão
startRecordBtn.addEventListener('click', () => {
    recognition.start();  // Inicia a gravação
    startRecordBtn.disabled = true;  // Desabilita o botão de iniciar
    stopRecordBtn.disabled = false;  // Habilita o botão de parar
    startRecordBtn.innerText = "Gravando...";
});

// Parar o reconhecimento de voz ao clicar no botão
stopRecordBtn.addEventListener('click', () => {
    recognition.stop();  // Para a gravação
    startRecordBtn.disabled = false;  // Habilita o botão de iniciar
    stopRecordBtn.disabled = true;  // Desabilita o botão de parar
    startRecordBtn.innerText = "Iniciar Gravação";
});

// Quando o reconhecimento parar, atualiza o texto do botão
recognition.onend = function() {
    startRecordBtn.disabled = false;  // Habilita o botão de iniciar
    stopRecordBtn.disabled = true;  // Desabilita o botão de parar
    startRecordBtn.innerText = "Iniciar Gravação";
};

