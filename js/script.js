// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Set initial theme (Dark by default if no preference is saved)
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
} else {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
}

themeToggle.addEventListener('click', () => {
    let currentTheme = document.documentElement.getAttribute('data-theme');
    let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        themeIcon.className = 'fa-solid fa-moon';
    }
}

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const mobileMenuIcon = mobileMenuBtn.querySelector('i');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
        mobileMenuIcon.className = 'fa-solid fa-xmark';
    } else {
        mobileMenuIcon.className = 'fa-solid fa-bars';
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuIcon.className = 'fa-solid fa-bars';
    });
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 70;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Animations (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // observer.unobserve(entry.target); // Uncomment to animate only once
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    observer.observe(el);
});

// Typing effect for Hero terminal
const typingTitle = document.querySelector('.typing-text');
const originalText = "System initialized. Access granted.";
let i = 0;

setTimeout(() => {
    function typeWriter() {
        if (i < originalText.length) {
            typingTitle.innerHTML += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    if(typingTitle) {
        typingTitle.innerHTML = "";
        typeWriter();
    }
}, 500);

// Custom Cursor Animation
const cursorAmbient = document.querySelector('.cursor-glow-ambient');

document.addEventListener('mousemove', (e) => {
    // Update ambient glow position (follows exactly, CSS blur handles the rest)
    if (cursorAmbient) {
        cursorAmbient.style.left = e.clientX + 'px';
        cursorAmbient.style.top = e.clientY + 'px';
    }
});

// Hide cursor when leaving the window
document.addEventListener('mouseleave', () => {
    if (cursorAmbient) cursorAmbient.style.opacity = '0';
});

// Show cursor when entering the window
document.addEventListener('mouseenter', () => {
    if (cursorAmbient) cursorAmbient.style.opacity = '0.15';
});

// Add hover effect for links and buttons
const interactables = document.querySelectorAll('a, button, .project-card, .service-card');

interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursorAmbient) cursorAmbient.style.opacity = '0.3'; // Make ambient slightly stronger on hover
    });
    
    el.addEventListener('mouseleave', () => {
        if (cursorAmbient) cursorAmbient.style.opacity = '0.15';
    });
});
