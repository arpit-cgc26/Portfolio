// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contactForm');
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');
const downloadResume = document.getElementById('downloadResume');
const scrollProgressBar = document.querySelector('.scroll-progress-bar');

// Modal Elements
const projectModal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

// Theme Toggle
let isDarkMode = false;

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);

    // Update theme toggle icon
    const icon = themeToggle.querySelector('i');
    if (isDarkMode) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        isDarkMode = true;
        document.body.classList.add('dark-mode');
        themeToggle.querySelector('i').className = 'fas fa-sun';
    }
}

// Scroll Progress
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgressBar.style.width = scrollPercent + '%';
}

// Back to Top Button
function toggleBackToTop() {
    const scrollTop = window.pageYOffset;
    if (scrollTop > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Animated Counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat h4, .resume-stat h3');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        const increment = target / 100;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : counter.textContent.includes('%') ? '%' : '');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : counter.textContent.includes('%') ? '%' : '');
            }
        }, 20);
    });
}

// Skill Progress Bars Animation
function animateSkillBars() {
    const progressBars = document.querySelectorAll('.progress-fill');

    progressBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        bar.style.width = percentage + '%';
    });
}

// Resume Download
function handleResumeDownload() {
    const link = document.createElement('a');
    link.href = '2220867_Arpit.pdf';
    link.download = '2220867_Arpit.pdf';
    link.click();

    // Show success message
    showNotification('Resume download started!', 'success');
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Hide notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Navigation Toggle for Mobile
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link on scroll
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Scroll animations
function handleScrollAnimations() {
    const scrollTop = window.pageYOffset;

    sections.forEach(section => {
        const offset = section.offsetTop - window.innerHeight + 100;

        if (scrollTop > offset) {
            section.classList.add('visible');
        }
    });
}

// Navbar background change on scroll
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset;

    if (scrollTop > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// Typing animation for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Contact form handling
function handleContactForm(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Basic form validation
    if (!data.name || !data.email || !data.subject || !data.message) {
        showFormMessage('Please fill in all fields.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Simulate form submission
    showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');

    // Reset form
    contactForm.reset();
}

function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = contactForm.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;

    // Insert message before submit button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    contactForm.insertBefore(messageDiv, submitBtn);

    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Skill cards hover effect
function handleSkillCardHover() {
    const skillCards = document.querySelectorAll('.skill-item');

    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotate(2deg)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
}

// Project cards hover effect
function handleProjectCardHover() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const image = card.querySelector('.project-image img');

        card.addEventListener('mouseenter', () => {
            image.style.transform = 'scale(1.1)';
        });

        card.addEventListener('mouseleave', () => {
            image.style.transform = 'scale(1)';
        });
    });
}

// Project Modal Functions
function openProjectModal(projectData) {
    modalTitle.textContent = projectData.title;
    modalBody.innerHTML = `
        <img src="${projectData.image}" alt="${projectData.title}" class="modal-image" loading="lazy">
        <p class="modal-description">${projectData.description}</p>
        <div class="modal-details">
            <div class="modal-detail-item">
                <h4>Category</h4>
                <p>${projectData.category}</p>
            </div>
            <div class="modal-detail-item">
                <h4>Status</h4>
                <p>${projectData.status}</p>
            </div>
            <div class="modal-detail-item">
                <h4>Duration</h4>
                <p>${projectData.duration}</p>
            </div>
            <div class="modal-detail-item">
                <h4>Client</h4>
                <p>${projectData.client}</p>
            </div>
        </div>
        <div class="modal-tech-stack">
            <h4>Technologies Used</h4>
            <div class="modal-tech-tags">
                ${projectData.technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
        </div>
        <div class="modal-links">
            ${projectData.liveLink ? `<a href="${projectData.liveLink}" target="_blank" class="modal-link">View Live <i class="fas fa-external-link-alt"></i></a>` : ''}
            ${projectData.githubLink ? `<a href="${projectData.githubLink}" target="_blank" class="modal-link">View Code <i class="fab fa-github"></i></a>` : ''}
        </div>
    `;

    projectModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    projectModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function handleProjectDetailClick(e) {
    const button = e.target.closest('.project-btn[data-action="details"]');
    if (!button) return;

    const card = button.closest('.project-card');
    const projectData = {
        title: card.querySelector('.project-title').textContent,
        image: card.querySelector('.project-image img').src,
        description: card.getAttribute('data-description') || 'No description available.',
        category: card.getAttribute('data-category') || 'Web Development',
        status: card.querySelector('.project-status').textContent,
        duration: card.getAttribute('data-duration') || '3 months',
        client: card.getAttribute('data-client') || 'Personal Project',
        technologies: card.getAttribute('data-technologies') ? card.getAttribute('data-technologies').split(',') : ['HTML', 'CSS', 'JavaScript'],
        liveLink: card.getAttribute('data-live-link'),
        githubLink: card.getAttribute('data-github-link')
    };

    openProjectModal(projectData);
}

// Parallax effect for hero section
function handleParallax() {
    const hero = document.querySelector('.hero');
    const scrollTop = window.pageYOffset;

    if (hero) {
        hero.style.backgroundPositionY = scrollTop * 0.5 + 'px';
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load saved theme
    loadTheme();

    // Start typing animation
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        setTimeout(() => {
            typeWriter(heroSubtitle, 'Full Stack Developer & UI/UX Designer', 80);
        }, 1000);
    }

    // Add scroll animations to sections
    sections.forEach(section => {
        section.classList.add('fade-in-up');
    });

    // Initialize scroll handlers
    handleScrollAnimations();
    updateActiveNavLink();
    handleNavbarScroll();
    updateScrollProgress();
    toggleBackToTop();

    // Add event listeners
    window.addEventListener('scroll', () => {
        handleScrollAnimations();
        updateActiveNavLink();
        handleNavbarScroll();
        updateScrollProgress();
        toggleBackToTop();
        handleParallax();
    });

    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Back to top button
    if (backToTop) {
        backToTop.addEventListener('click', scrollToTop);
    }

    // Resume download
    if (downloadResume) {
        downloadResume.addEventListener('click', (e) => {
            e.preventDefault();
            handleResumeDownload();
        });
    }

    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Hover effects
    handleSkillCardHover();
    handleProjectCardHover();

    // Project modal event listeners
    document.addEventListener('click', handleProjectDetailClick);

    if (modalClose) {
        modalClose.addEventListener('click', closeProjectModal);
    }

    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });
    }

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('show')) {
            closeProjectModal();
        }
    });

    // Animate counters when resume section is visible
    const resumeSection = document.querySelector('.resume');
    if (resumeSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(resumeSection);
    }

    // Animate skill bars when skills section is visible
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(skillsSection);
    }

    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        }

        .notification.show {
            transform: translateX(0);
        }

        .notification.success {
            background: linear-gradient(135deg, #00d2d3 0%, #54a0ff 100%);
        }

        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 80px;
            left: 0;
            right: 0;
            background: white;
            padding: 2rem;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }

        body.dark-mode .nav-menu.active {
            background: #2d3748;
        }

        @media (min-width: 769px) {
            .nav-menu.active {
                display: flex !important;
                flex-direction: row !important;
                position: static !important;
                background: transparent !important;
                padding: 0 !important;
                box-shadow: none !important;
            }
        }
    `;
    document.head.appendChild(style);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add some CSS for loading state
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);