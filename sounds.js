
/* The Lost Adventure - Sound Effects */

let gameAudio = null;

function getGameAudio() {
  if (!gameAudio) {
    gameAudio = new (
      window.AudioContext ||
      window.webkitAudioContext
    )();
  }

  if (gameAudio.state === "suspended") {
    gameAudio.resume();
  }

  return gameAudio;
}

function playTone(startFreq, endFreq, duration, type, volume) {
  const audio = getGameAudio();
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();

  const now = audio.currentTime;

  oscillator.type = type;

  oscillator.frequency.setValueAtTime(startFreq, now);
  oscillator.frequency.exponentialRampToValueAtTime(
    endFreq,
    now + duration
  );

  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    now + duration
  );

  oscillator.connect(gain);
  gain.connect(audio.destination);

  oscillator.start(now);
  oscillator.stop(now + duration);
}

// 💎 Crystal collection sound
function crystalSound() {
  playTone(650, 1100, 0.15, "sine", 0.12);

  setTimeout(() => {
    playTone(900, 1450, 0.2, "sine", 0.1);
  }, 90);
}

// 🦘 Jump sound
function jumpSound() {
  playTone(220, 520, 0.18, "square", 0.055);
}
