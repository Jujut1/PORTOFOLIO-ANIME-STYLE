// Portfolio Data - Edit this to customize your content
const portfolioData = {
    // Personal Info
    name: "Jeje",
    title: "Siswa SMPN1 Bontang",
    bio: "Hidup itu rumit, jadi kuncinya adalah selalu sabar!.",
    
    // Social Links
    social: {
        twitter: "https://twitter.com/AkhmadJFerbiansyah",
        instagram: "https://instagram.com/Jejee_iihir",
        artstation: "https://artstation.com/yourusername",
        github: "https://github.com/Jujut1"
    },
    
    // Skills
    skills: [
        { name: "Digital Illustration", level: 95 },
        { name: "UI/UX Design", level: 88 },
        { name: "Web Development", level: 85 },
        { name: "Character Design", level: 92 },
        { name: "Animation", level: 80 },
        { name: "3D Modeling", level: 75 }
    ],
    
    // Portfolio Projects
    projects: [
        {
            id: 1,
            title: "Forest Guardian Character",
            category: "art",
            description: "Original character design for a fantasy anime series featuring a forest spirit guardian.",
            tags: ["Character Design", "Digital Art", "Anime"],
            year: "2023"
        },
        {
            id: 2,
            title: "Anime Streaming UI",
            category: "ui",
            description: "User interface design for an anime streaming platform with personalized recommendations.",
            tags: ["UI Design", "Figma", "UX Research"],
            year: "2023"
        },
        {
            id: 3,
            title: "Cyberpunk City Website",
            category: "web",
            description: "Interactive website with parallax scrolling and neon visual effects for a cyberpunk anime project.",
            tags: ["Web Design", "JavaScript", "CSS Animations"],
            year: "2022"
        },
        {
            id: 4,
            title: "RPG Game Assets",
            category: "game",
            description: "Pixel art and character sprites for an indie Japanese-style RPG game.",
            tags: ["Pixel Art", "Game Design", "Aseprite"],
            year: "2022"
        },
        {
            id: 5,
            title: "Anime Studio Portfolio",
            category: "web",
            description: "Portfolio website for an anime production studio with project showcase and team profiles.",
            tags: ["Web Development", "React", "Responsive Design"],
            year: "2023"
        },
        {
            id: 6,
            title: "Manga Coloring Book App",
            category: "ui",
            description: "Mobile application for coloring manga pages with various brushes and color palettes.",
            tags: ["UI/UX", "Mobile Design", "Prototyping"],
            year: "2023"
        }
    ]
};

// Populate Portfolio Grid
function populatePortfolio() {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    portfolioData.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = `project-card ${project.category}`;
        projectCard.dataset.category = project.category;
        
        projectCard.innerHTML = `
            <div class="project-image"></div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-year">${project.year}</div>
            </div>
        `;
        
        grid.appendChild(projectCard);
    });
}

// Populate Skills
function populateSkills() {
    const skillsContainer = document.getElementById('skill-bars');
    if (!skillsContainer) return;
    
    skillsContainer.innerHTML = '';
    
    portfolioData.skills.forEach(skill => {
        const skillBar = document.createElement('div');
        skillBar.className = 'skill-bar';
        
        skillBar.innerHTML = `
            <div class="skill-label">
                <span>${skill.name}</span>
                <span class="skill-percentage">${skill.level}%</span>
            </div>
            <div class="skill-progress">
                <div class="skill-fill" style="width: ${skill.level}%"></div>
            </div>
        `;
        
        skillsContainer.appendChild(skillBar);
    });
}

// Populate Social Links
function populateSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        const platform = link.classList[1]; // twitter, instagram, etc.
        if (portfolioData.social[platform]) {
            link.href = portfolioData.social[platform];
            link.target = "_blank";
        }
    });
}

// Update Name
function updateName() {
    const nameElement = document.getElementById('typed-name');
    if (nameElement && portfolioData.name) {
        nameElement.textContent = portfolioData.name;
    }
    
    // Update page title
    document.title = `Anime Portfolio | ${portfolioData.name}`;
}

// Initialize all data
function initData() {
    updateName();
    populatePortfolio();
    populateSkills();
    populateSocialLinks();
    
    // Update current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Typing animation for name
    if (portfolioData.name && portfolioData.name !== "Your Name Here") {
        startTypingAnimation();
    }
}

// Typing animation for name
function startTypingAnimation() {
    const nameElement = document.getElementById('typed-name');
    const cursor = document.querySelector('.cursor');
    const name = portfolioData.name;
    let index = 0;
    
    nameElement.textContent = '';
    
    function typeChar() {
        if (index < name.length) {
            nameElement.textContent += name.charAt(index);
            index++;
            setTimeout(typeChar, 100);
        } else {
            cursor.style.animation = 'none';
            setTimeout(() => {
                cursor.style.animation = 'blink 1s infinite';
            }, 1000);
        }
    }
    
    setTimeout(typeChar, 1000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initData);

// Filter projects by category
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'block';
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            }, 100);
        } else {
            project.style.opacity = '0';
            project.style.transform = 'translateY(20px)';
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
}

// Export for use in main.js
window.portfolioData = portfolioData;
window.filterProjects = filterProjects;
