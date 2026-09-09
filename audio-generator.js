// Audio Generator - Creates sound effects using Web Audio API
// This eliminates the need for external audio files

class AudioGenerator {
    constructor() {
        this.audioContext = null;
        this.initAudioContext();
    }

    initAudioContext() {
        if (!window.AudioContext && !window.webkitAudioContext) {
            console.log('Web Audio API not supported');
            return;
        }

        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    // Create a simple beep sound
    playBeep(frequency = 800, duration = 100, volume = 0.3) {
        if (!this.audioContext) return;

        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.frequency.value = frequency;
        gain.gain.setValueAtTime(volume, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration / 1000);

        osc.start(now);
        osc.stop(now + duration / 1000);
    }

    // Correct answer sound (ascending tones)
    playCorrectSound() {
        if (!this.audioContext) return;

        const now = this.audioContext.currentTime;
        const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
        const duration = 150;

        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                this.playBeep(freq, duration, 0.3);
            }, index * 150);
        });
    }

    // Incorrect answer sound (descending tones)
    playIncorrectSound() {
        if (!this.audioContext) return;

        const now = this.audioContext.currentTime;
        const frequencies = [523.25, 392, 261.63]; // C5, G4, C4
        const duration = 150;

        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                this.playBeep(freq, duration, 0.2);
            }, index * 150);
        });
    }

    // Click sound (short beep)
    playClickSound() {
        if (!this.audioContext) return;
        this.playBeep(1000, 50, 0.2);
    }

    // Jungle ambient background - creates atmospheric sound
    playJungleAmbient() {
        if (!this.audioContext) return;

        const now = this.audioContext.currentTime;
        const baseFrequencies = [261.63, 329.63, 392]; // C4, E4, G4

        // Create a loop of atmospheric sounds
        const playLoop = () => {
            baseFrequencies.forEach((freq, index) => {
                setTimeout(() => {
                    this.playBeep(freq, 300, 0.15);
                }, index * 200);
            });
        };

        playLoop();
        // Repeat every 2 seconds
        setInterval(playLoop, 2000);
    }

    // Success chime (ascending with multiple frequencies)
    playSuccessChime() {
        if (!this.audioContext) return;

        const now = this.audioContext.currentTime;
        const notes = [
            { freq: 523.25, time: 0 },    // C5
            { freq: 659.25, time: 150 },  // E5
            { freq: 783.99, time: 300 },  // G5
            { freq: 1046.50, time: 450 }  // C6
        ];

        notes.forEach(note => {
            setTimeout(() => {
                this.playBeep(note.freq, 200, 0.3);
            }, note.time);
        });
    }
}

// Initialize audio generator
const audioGenerator = new AudioGenerator();

// Override audio elements with generated sounds
document.addEventListener('DOMContentLoaded', function() {
    // Create synthetic sounds for audio elements
    const correctSound = document.getElementById('correctSound');
    if (correctSound) {
        correctSound.play = function() {
            audioGenerator.playCorrectSound();
            return Promise.resolve();
        };
    }

    const incorrectSound = document.getElementById('incorrectSound');
    if (incorrectSound) {
        incorrectSound.play = function() {
            audioGenerator.playIncorrectSound();
            return Promise.resolve();
        };
    }

    const clickSound = document.getElementById('clickSound');
    if (clickSound) {
        clickSound.play = function() {
            audioGenerator.playClickSound();
            return Promise.resolve();
        };
    }

    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        bgMusic.play = function() {
            audioGenerator.playJungleAmbient();
            return Promise.resolve();
        };
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AudioGenerator;
}
