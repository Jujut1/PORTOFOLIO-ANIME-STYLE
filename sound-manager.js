// Sound Manager for Anime Portfolio
class SoundManager {
    constructor() {
        this.sounds = {
            ambient: document.getElementById('ambient-sound'),
            hover: document.getElementById('hover-sound'),
            click: document.getElementById('click-sound')
        };
        
        this.ambientEnabled = true;
        this.sfxEnabled = true;
        this.volume = 0.5;
        
        this.init();
    }
    
    init() {
        // Set initial volume
        this.setVolume(this.volume);
        
        // Setup event listeners for sound toggles
        document.getElementById('ambient-toggle').addEventListener('click', () => this.toggleAmbient());
        document.getElementById('sfx-toggle').addEventListener('click', () => this.toggleSFX());
        document.getElementById('volume-slider').addEventListener('input', (e) => this.setVolume(e.target.value / 100));
        
        // Start ambient sound (muted until user interaction)
        this.sounds.ambient.muted = true;
        this.playAmbient();
        
        // Add click sounds to buttons and links
        this.addClickSounds();
        this.addHoverSounds();
        
        // Unmute on first user interaction
        document.addEventListener('click', () => this.unmuteOnInteraction(), { once: true });
    }
    
    unmuteOnInteraction() {
        this.sounds.ambient.muted = false;
        this.sounds.hover.muted = false;
        this.sounds.click.muted = false;
    }
    
    playAmbient() {
        if (this.ambientEnabled) {
            this.sounds.ambient.play().catch(e => console.log("Autoplay prevented:", e));
        }
    }
    
    playHoverSound() {
        if (this.sfxEnabled) {
            this.sounds.hover.currentTime = 0;
            this.sounds.hover.play();
        }
    }
    
    playClickSound() {
        if (this.sfxEnabled) {
            this.sounds.click.currentTime = 0;
            this.sounds.click.play();
        }
    }
    
    toggleAmbient() {
        this.ambientEnabled = !this.ambientEnabled;
        const btn = document.getElementById('ambient-toggle');
        const status = btn.querySelector('.sound-status');
        
        if (this.ambientEnabled) {
            btn.classList.add('active');
            status.textContent = 'ON';
            this.sounds.ambient.play();
        } else {
            btn.classList.remove('active');
            status.textContent = 'OFF';
            this.sounds.ambient.pause();
        }
        
        this.playClickSound();
    }
    
    toggleSFX() {
        this.sfxEnabled = !this.sfxEnabled;
        const btn = document.getElementById('sfx-toggle');
        const status = btn.querySelector('.sound-status');
        
        if (this.sfxEnabled) {
            btn.classList.add('active');
            status.textContent = 'ON';
        } else {
            btn.classList.remove('active');
            status.textContent = 'OFF';
        }
        
        // Play sound even when toggling off
        this.sounds.click.currentTime = 0;
        this.sounds.click.play();
    }
    
    setVolume(value) {
        this.volume = value;
        Object.values(this.sounds).forEach(sound => {
            sound.volume = value;
        });
        
        // Update slider position
        document.getElementById('volume-slider').value = value * 100;
    }
    
    addClickSounds() {
        const clickElements = document.querySelectorAll(
            'button, .nav-item, .filter-btn, .social-link, .project-card, .tool-item'
        );
        
        clickElements.forEach(element => {
            element.addEventListener('click', () => this.playClickSound());
        });
    }
    
    addHoverSounds() {
        const hoverElements = document.querySelectorAll(
            'button, .nav-item, .filter-btn, .social-link, .project-card, .tool-item, .stat-card'
        );
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => this.playHoverSound());
        });
    }
}

// Initialize sound manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.soundManager = new SoundManager();
});

// Forest sound simulation (fallback if audio files don't exist)
function createForestSoundFallback() {
    // Create audio context for Web Audio API fallback
    if (!window.AudioContext && !window.webkitAudioContext) return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create wind sound
    function createWindSound() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(80, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(120, audioContext.currentTime + 5);
        
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 5);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 5);
        
        // Repeat every 8 seconds
        setTimeout(createWindSound, 8000);
    }
    
    // Create bird chirp sound
    function createBirdChirp() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(2000, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(3000, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0, audioContext.currentTime + 0.2);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);
        
        // Random chirps
        setTimeout(createBirdChirp, Math.random() * 3000 + 1000);
    }
    
    // Start sounds if ambient is enabled
    if (window.soundManager && window.soundManager.ambientEnabled) {
        setTimeout(createWindSound, 1000);
        setTimeout(createBirdChirp, 2000);
    }
}

// Call fallback after page loads
window.addEventListener('load', createForestSoundFallback);
