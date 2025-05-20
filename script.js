
const wordAudioMap = {
  aama: "audio/arm.mp3",
  kwahi: "audio/back.mp3",
  motso: "audio/beard.mp3"
};

function playAudio() {
  const word = document.getElementById("word-select").value;
  const audio = new Audio(wordAudioMap[word]);
  audio.play();
}

function startListening() {
  const word = document.getElementById("word-select").value;
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  document.getElementById("feedback").textContent = "Listening...";

  recognition.onresult = (event) => {
    const spoken = event.results[0][0].transcript.toLowerCase().trim();
    if (spoken.includes(word)) {
      document.getElementById("feedback").textContent = `✅ You said: ${spoken}`;
    } else {
      document.getElementById("feedback").textContent = `❌ You said: ${spoken} — Try again.`;
    }
  };

  recognition.onerror = (event) => {
    document.getElementById("feedback").textContent = `⚠️ Error: ${event.error}`;
  };

  recognition.start();
}
