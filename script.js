
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

  const feedback = document.getElementById("feedback");
  feedback.textContent = "🎤 Listening...";

  recognition.onresult = (event) => {
    const spoken = event.results[0][0].transcript.toLowerCase().trim();
    console.log("RESULT:", spoken);
    if (spoken.includes(word)) {
      feedback.textContent = `✅ You said: ${spoken}`;
    } else {
      feedback.textContent = `❌ You said: ${spoken} — Try again.`;
    }
  };

  recognition.onerror = (event) => {
    console.error("ERROR:", event.error);
    feedback.textContent = `⚠️ Error: ${event.error}`;
  };

  recognition.onend = () => {
    console.log("Recognition ended");
    if (feedback.textContent === "🎤 Listening...") {
      feedback.textContent = "⚠️ No speech detected. Try again.";
    }
  };

  recognition.onspeechend = () => {
    recognition.stop();
  };

  recognition.start();
}
