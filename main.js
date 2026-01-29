// Main JavaScript for Anime Portfolio

// DOM Elements
const themeToggle = document.getElementById('theme-btn');
const soundManager = window.soundManager;
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');
const filterButtons = document.querySelectorAll('.filter-btn');
const exploreBtn = document.getElementById('explore-btn');
const playMusicBtn = document.getElementById('play-music');
const messageForm = document.getElementById('message-form');
const clearFormBtn = document.getElementById('clear-form');

// Current page state
let currentPage = 'home';

// Initialize floating elements
function initFloatingElements() {
    createFloatingLeaves();
    createFireflies();
}

// Create floating leaves
function createFloatingLeaves() {
    const container = document.getElementById('floating-leaves');
    if (!container) return;
    
    // Clear existing leaves
    container.innerHTML = '';
    
    // Number of leaves based on screen size
    const leafCount = Math.floor(window.innerWidth / 50);
    
    for (let i = 0; i < leafCount; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        
        // Random properties
        const size = Math.random() * 20 + 20;
        const startX = Math.random() * 100;
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 20;
        
        leaf.style.width = `${size}px`;
        leaf.style.height = `${size}px`;
        leaf.style.left = `${startX}vw`;
        leaf.style.animationDelay = `${delay}s`;
        leaf.style.animationDuration = `${duration}s`;
        
        // Random color variation
        const hue = Math.random() * 30 + 160; // Green to brown range
        leaf.style.backgroundColor = `hsl(${hue}, 70%, 50%)`;
        
        container.appendChild(leaf);
    }
}

// Create fireflies
function createFireflies() {
    const container = document.getElementById('fireflies');
    if (!container) return;
    
    // Clear existing fireflies
    container.innerHTML = '';
    
    // Number of fireflies
    const fireflyCount = 15;
    
    for (let i = 0; i < fireflyCount; i++) {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';
        
        // Random properties
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const size = Math.random() * 4 + 3;
        const duration = Math.random() * 5 + 8;
        const delay = Math.random() * 10;
        
        firefly.style.width = `${size}px`;
        firefly.style.height = `${size}px`;
        firefly.style.left = `${startX}vw`;
        firefly.style.top = `${startY}vh`;
        firefly.style.animationDelay = `${delay}s`;
        firefly.style.animationDuration = `${duration}s`;
        
        // Opacity variation
        firefly.style.opacity = Math.random() * 0.5 + 0.3;
        
        container.appendChild(firefly);
    }
}

// Theme toggle
function toggleTheme() {
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');
    const themeText = themeToggle.querySelector('.theme-text');
    
    if (body.classList.contains('night-mode')) {
        // Switch to day mode
        body.classList.remove('night-mode');
        themeIcon.className = 'fas fa-moon';
        themeText.textContent = 'Night';
        document.title = document.title.replace('Night', 'Day');
    } else {
        // Switch to night mode
        body.classList.add('night-mode');
        themeIcon.className = 'fas fa-sun';
        themeText.textContent = 'Day';
        document.title = document.title.replace('Day', 'Night');
    }
    
    // Play sound if available
    if (soundManager && soundManager.sfxEnabled) {
        soundManager.playClickSound();
    }
}

// Page navigation
function navigateToPage(pageId) {
    // Update current page
    currentPage = pageId;
    
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
        page.style.opacity = '0';
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        setTimeout(() => {
            targetPage.style.opacity = '1';
        }, 50);
    }
    
    // Update active nav item
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === pageId) {
            item.classList.add('active');
        }
    });
    
    // Update URL hash
    window.location.hash = pageId;
    
    // Play transition sound
    if (soundManager && soundManager.sfxEnabled) {
        soundManager.playClickSound();
    }
    
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Filter portfolio items
function setupFilterButtons() {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            const filter = this.dataset.filter;
            if (window.filterProjects) {
                window.filterProjects(filter);
            }
            
            // Play sound
            if (soundManager && soundManager.sfxEnabled) {
                soundManager.playClickSound();
            }
        });
    });
}

// Form handling
function setupForms() {
    // Message form submission
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('sender-name').value,
                email: document.getElementById('sender-email').value,
                subject: document.getElementById('message-subject').value,
                message: document.getElementById('message-content').value
            };
            
            // In a real application, you would send this to a server
            // For now, we'll just show a confirmation
            showMessageConfirmation(formData);
            
            // Play sound
            if (soundManager && soundManager.sfxEnabled) {
                soundManager.playClickSound();
            }
        });
    }
    
    // Clear form button
    if (clearFormBtn) {
        clearFormBtn.addEventListener('click', function() {
            messageForm.reset();
            
            // Play sound
            if (soundManager && soundManager.sfxEnabled) {
                soundManager.playClickSound();
            }
        });
    }
}

// Show message confirmation
function showMessageConfirmation(formData) {
    // Create confirmation element
    const confirmation = document.createElement('div');
    confirmation.className = 'message-confirmation';
    confirmation.innerHTML = `
        <div class="confirmation-content">
            <i class="fas fa-paper-plane"></i>
            <h3>Message Sent!</h3>
            <p>Thank you, ${formData.name}. Your message has been delivered to the digital forest.</p>
            <p>I'll respond to you at ${formData.email} soon!</p>
            <button class="btn-primary" id="close-confirmation">OK</button>
        </div>
    `;
    
    // Style the confirmation
    confirmation.style.position = 'fixed';
    confirmation.style.top = '0';
    confirmation.style.left = '0';
    confirmation.style.width = '100%';
    confirmation.style.height = '100%';
    confirmation.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    confirmation.style.display = 'flex';
    confirmation.style.justifyContent = 'center';
    confirmation.style.alignItems = 'center';
    confirmation.style.zIndex = '1000';
    confirmation.style.backdropFilter = 'blur(10px)';
    
    const content = confirmation.querySelector('.confirmation-content');
    content.style.background = 'var(--card-bg)';
    content.style.padding = '40px';
    content.style.borderRadius = 'var(--radius-large)';
    content.style.textAlign = 'center';
    content.style.maxWidth = '500px';
    content.style.boxShadow = 'var(--shadow-heavy)';
    content.style.animation = 'pageFadeIn 0.5s forwards';
    
    document.body.appendChild(confirmation);
    
    // Add close functionality
    document.getElementById('close-confirmation').addEventListener('click', function() {
        document.body.removeChild(confirmation);
        messageForm.reset();
        
        // Play sound
        if (soundManager && soundManager.sfxEnabled) {
            soundManager.playClickSound();
        }
    });
}

// Explore button functionality
if (exploreBtn) {
    exploreBtn.addEventListener('click', function() {
        navigateToPage('works');
        
        // Animate scroll to top of works section
        const worksSection = document.getElementById('works');
        if (worksSection) {
            worksSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Play forest music button
if (playMusicBtn) {
    playMusicBtn.addEventListener('click', function() {
        if (soundManager) {
            soundManager.toggleAmbient();
            
            // Update button text
            const icon = this.querySelector('i');
            const isPlaying = soundManager.ambientEnabled;
            
            if (isPlaying) {
                icon.className = 'fas fa-volume-up';
                this.innerHTML = '<i class="fas fa-volume-up"></i> Pause Forest Melody';
            } else {
                icon.className = 'fas fa-volume-mute';
                this.innerHTML = '<i class="fas fa-volume-mute"></i> Play Forest Melody';
            }
        }
    });
}

// Handle hash changes for direct page links
function handleHashChange() {
    const hash = window.location.hash.substring(1);
    if (hash && hash !== currentPage) {
        navigateToPage(hash);
    }
}

// Animate skill bars when in viewport
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    const aboutPage = document.getElementById('about');
    
    if (!aboutPage) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.transition = 'width 1.5s ease';
                    // Trigger reflow to restart animation
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                observer.unobserve(aboutPage);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(aboutPage);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize floating elements
    initFloatingElements();
    
    // Setup event listeners
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Navigation
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.dataset.page;
            navigateToPage(pageId);
        });
    });
    
    // Filter buttons
    setupFilterButtons();
    
    // Forms
    setupForms();
    
    // Hash change handling
    window.addEventListener('hashchange', handleHashChange);
    
    // Initial hash check
    handleHashChange();
    
    // Animate skill bars
    setTimeout(animateSkillBars, 1000);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && !href.includes('#')) {
                return;
            }
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Handle window resize
window.addEventListener('resize', function() {
    // Recreate floating elements on resize
    initFloatingElements();
});

// Add some interactive effects
document.addEventListener('mousemove', function(e) {
    // Parallax effect for floating elements
    const leaves = document.querySelectorAll('.leaf');
    const fireflies = document.querySelectorAll('.firefly');
    
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    leaves.forEach((leaf, index) => {
        const speed = 0.5 + (index % 3) * 0.2;
        const xOffset = (x - 0.5) * 20 * speed;
        const yOffset = (y - 0.5) * 20 * speed;
        
        leaf.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
    
    fireflies.forEach((firefly, index) => {
        const speed = 0.3 + (index % 5) * 0.1;
        const xOffset = (x - 0.5) * 10 * speed;
        const yOffset = (y - 0.5) * 10 * speed;
        
        firefly.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Easter egg activated!
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    // Create special effect
    const egg = document.createElement('div');
    egg.style.position = 'fixed';
    egg.style.top = '0';
    egg.style.left = '0';
    egg.style.width = '100%';
    egg.style.height = '100%';
    egg.style.zIndex = '9999';
    egg.style.pointerEvents = 'none';
    
    // Add anime characters floating
    for (let i = 0; i < 10; i++) {
        const char = document.createElement('div');
        char.style.position = 'absolute';
        char.style.fontSize = '3rem';
        char.style.opacity = '0';
        char.style.animation = `float-up 3s ${i * 0.3}s forwards`;
        
        // Random anime emojis
        const emojis = ['🌸', '⚔️', '🐉', '🎎', '🎌', '🗾', '🍥', '🎴', '👺', '🏯'];
        char.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        char.style.left = `${Math.random() * 100}vw`;
        char.style.top = '100vh';
        
        egg.appendChild(char);
    }
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-up {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(egg);
    
    // Remove after animation
    setTimeout(() => {
        document.body.removeChild(egg);
        document.head.removeChild(style);
    }, 4000);
    
    // Play special sound if available
    if (soundManager && soundManager.sfxEnabled) {
        soundManager.playClickSound();
    }
}
