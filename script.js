// Preloader
const preloader = document.querySelector('.preloader');
window.addEventListener('load', () => {
    preloader.classList.add('fade-out');
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Custom Cursor
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.achievement-card, .gallery-item, .timeline-item, .achievement-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroOverlay = document.querySelector('.hero-overlay');
    
    if (hero && heroOverlay) {
        heroOverlay.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Medal hover effects
document.querySelectorAll('.achievement-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Image Popup Functionality
function openImagePopup(imageSrc, title) {
    // Create popup overlay
    const popupOverlay = document.createElement('div');
    popupOverlay.className = 'image-popup-overlay';
    popupOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    // Create popup content
    const popupContent = document.createElement('div');
    popupContent.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        background: white;
        border-radius: 15px;
        padding: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;

    // Create close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.cssText = `
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        font-size: 2rem;
        color: #666;
        cursor: pointer;
        z-index: 10001;
        transition: color 0.3s ease;
    `;
    closeButton.onmouseover = () => closeButton.style.color = '#d4af37';
    closeButton.onmouseout = () => closeButton.style.color = '#666';

    // Create image
    const popupImage = document.createElement('img');
    popupImage.src = imageSrc;
    popupImage.alt = title;
    popupImage.style.cssText = `
        max-width: 100%;
        max-height: 80vh;
        border-radius: 10px;
        display: block;
        margin: 0 auto;
    `;

    // Create title
    const popupTitle = document.createElement('h3');
    popupTitle.textContent = title;
    popupTitle.style.cssText = `
        text-align: center;
        margin: 15px 0 0 0;
        font-family: 'Playfair Display', serif;
        color: #1a1a2e;
        font-size: 1.5rem;
    `;

    // Assemble popup
    popupContent.appendChild(closeButton);
    popupContent.appendChild(popupImage);
    popupContent.appendChild(popupTitle);
    popupOverlay.appendChild(popupContent);
    document.body.appendChild(popupOverlay);

    // Animate in
    setTimeout(() => {
        popupOverlay.style.opacity = '1';
        popupContent.style.transform = 'scale(1)';
    }, 10);

    // Close functionality
    const closePopup = () => {
        popupOverlay.style.opacity = '0';
        popupContent.style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(popupOverlay);
        }, 300);
    };

    closeButton.onclick = closePopup;
    popupOverlay.onclick = (e) => {
        if (e.target === popupOverlay) {
            closePopup();
        }
    };

    // Close on escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closePopup();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Gallery item click effect
document.querySelectorAll('.gallery-item a').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const imageSrc = this.href;
        basicLightbox.create(`
            <img src="${imageSrc}">
        `).show();
    });
});

// Timeline item animation on scroll
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, {
    threshold: 0.3
});

document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    if (index % 2 === 0) {
        item.style.transform = 'translateX(-50px)';
    } else {
        item.style.transform = 'translateX(50px)';
    }
    
    timelineObserver.observe(item);
});

// Hero stats (no animation)
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    const statNumbers = heroStats.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const value = stat.textContent;
        stat.textContent = value;
    });
}

// Flower Rain Animation
function createFlowerRain() {
    const flowerRainContainer = document.getElementById('flowerRain');
    if (!flowerRainContainer) return;

    const flowerEmojis = ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼', '🌿'];
    const numFlowers = 50;
    
    // Clear any existing flowers
    flowerRainContainer.innerHTML = '';
    
    for (let i = 0; i < numFlowers; i++) {
        setTimeout(() => {
            const flower = document.createElement('div');
            flower.className = 'flower-rain';
            flower.style.left = Math.random() * 100 + '%';
            flower.style.fontSize = (15 + Math.random() * 15) + 'px';
            flower.style.animationDelay = Math.random() * 0.5 + 's';
            flower.style.animationDuration = (2 + Math.random() * 2) + 's';
            flower.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
            
            flowerRainContainer.appendChild(flower);
            
            // Remove flower after animation completes
            setTimeout(() => {
                if (flower.parentNode) {
                    flower.parentNode.removeChild(flower);
                }
            }, 4000);
        }, i * 50); // Stagger the creation of flowers
    }
}

// Tribute Button Event Listener
document.addEventListener('DOMContentLoaded', () => {
    const tributeBtn = document.getElementById('tributeBtn');
    if (tributeBtn) {
        tributeBtn.addEventListener('click', () => {
            createFlowerRain();
            
            // Add a subtle button animation
            tributeBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                tributeBtn.style.transform = '';
            }, 150);
        });
    }
});

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const elementsToAnimate = [
        { selector: '.section-header', class: 'fade-in' },
        { selector: '.bio-text', class: 'slide-in-left' },
        { selector: '.bio-image', class: 'slide-in-right' },
        { selector: '.achievement-card', class: 'scale-in' },
        { selector: '.gallery-item', class: 'rotate-in' },
        { selector: '.newspaper-item', class: 'stagger-item' },
        { selector: '.timeline-item', class: 'fade-in' }
    ];

    elementsToAnimate.forEach(({ selector, class: animationClass }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.classList.add(animationClass);
            observer.observe(element);
        });
    });
}

// Enhanced parallax effect
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-overlay, .floating-flowers');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        initScrollAnimations();
        initParallaxEffects();
    }, 100);
});

// Add ripple effect to buttons and cards
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

// Add ripple effect to achievement cards and newspaper clippings
document.querySelectorAll('.achievement-card, .newspaper-clipping').forEach(card => {
    card.addEventListener('click', createRipple);
});

// Add hover effects for newspaper clippings
document.querySelectorAll('.newspaper-clipping').forEach(clipping => {
    clipping.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) rotateX(8deg) scale(1.02)';
    });
    
    clipping.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0deg) scale(1)';
    });
});

// Add typing effect to hero title
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

// Initialize typing effect on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 150);
        }
    }, 1000);
});


// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(212, 175, 55, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .achievement-card {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);


// Initialize Particles.js
Particles.init({
    selector: '.particles-canvas',
    color: '#d4af37',
    connectParticles: true,
    maxParticles: 80,
    sizeVariations: 3,
    speed: 0.5
});

// Initialize Vanilla-Tilt.js
VanillaTilt.init(document.querySelector(".hero-image"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
});