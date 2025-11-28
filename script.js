// Enhanced Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navOverlay = document.querySelector('.nav-overlay');
const body = document.body;

function toggleMobileMenu() {
    const isActive = navMenu.classList.contains('active');
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    navOverlay.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (!isActive) {
        body.style.overflow = 'hidden';
        // Add slight delay to menu items animation
        setTimeout(() => {
            navMenu.classList.add('animate-items');
        }, 100);
    } else {
        body.style.overflow = '';
        navMenu.classList.remove('animate-items');
    }
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    navOverlay.classList.remove('active');
    body.style.overflow = '';
    navMenu.classList.remove('animate-items');
}

hamburger.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// Close mobile menu when clicking on overlay
navOverlay.addEventListener('click', closeMobileMenu);

// Close mobile menu when clicking outside (but not on hamburger)
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Scroll to Top Button Functionality
document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Add keyboard support for accessibility
        scrollToTopBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20; // Extra 20px padding
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll handling is now in the optimized scroll function above

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .feature, .tech-item, .expertise-item, .client-category');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Add staggered animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });
});

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat h4');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('+', ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Form submission handling
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
    const statusMessage = contactForm.querySelector('.form-status');
    
    const updateStatus = (message, state = 'info') => {
        if (!statusMessage) return;
        statusMessage.textContent = message;
        statusMessage.className = `form-status ${state}`;
    };
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();
        const subject = formData.get('subject')?.trim();
        const message = formData.get('message')?.trim();
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            updateStatus('Please fill in all fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            updateStatus('Please enter a valid email address.', 'error');
            return;
        }
        
        updateStatus('Sending your message...', 'sending');
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (response.ok && result.success) {
                updateStatus(result.message || 'Thank you! Your message has been sent.', 'success');
                contactForm.reset();
            } else {
                throw new Error(result.message || 'Unable to send your message. Please try again later.');
            }
        } catch (error) {
            updateStatus(error.message || 'Something went wrong. Please try again.', 'error');
        }
    });
}

// Parallax effect is now handled in the optimized scroll function above

// Enhanced loading animation with performance optimization
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add loading class to elements for staggered reveal
    const elementsToLoad = document.querySelectorAll('section, .hero-content > *, .floating-card');
    elementsToLoad.forEach((el, index) => {
        el.classList.add('loading');
        setTimeout(() => {
            el.classList.add('loaded');
        }, index * 100);
    });
});

// Optimize scroll performance with throttling
let ticking = false;

function updateOnScroll() {
    // Navbar background on scroll with class-based approach
    const navbar = document.querySelector('.navbar');
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show/hide scroll to top button
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
    
    // Parallax effect for hero section (reduced for mobile performance)
    if (window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        const speed = scrolled * 0.3; // Reduced speed for better performance
        
        if (parallax) {
            parallax.style.transform = `translateY(${speed}px)`;
        }
    }
    
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Enhanced typing effect for hero title with HTML support
const typeWriter = (element, speed = 40) => {
    // Define the text parts with proper line breaks
    const textParts = [
        { text: 'Transforming Ideas', isGradient: false, isFirstLine: true },
        { text: 'into ', isGradient: false, isFirstLine: false },
        { text: 'Digital Solutions', isGradient: true, isFirstLine: false }
    ];
    
    let currentPartIndex = 0;
    let currentCharIndex = 0;
    
    // Ensure element is properly hidden and cleared
    element.style.opacity = '0';
    element.innerHTML = '';
    element.classList.add('typing-active');
    element.style.borderRight = '2px solid rgba(255, 255, 255, 0.8)';
    
    // Force a reflow to ensure styles are applied
    element.offsetHeight;
    
    // Make visible for typing
    element.style.opacity = '1';
    
    // Create a container div to control layout
    const textContainer = document.createElement('div');
    textContainer.style.display = 'block';
    element.appendChild(textContainer);
    
    // Create line containers
    const firstLine = document.createElement('div');
    const secondLine = document.createElement('div');
    
    textContainer.appendChild(firstLine);
    textContainer.appendChild(secondLine);
    
    const type = () => {
        if (currentPartIndex < textParts.length) {
            const currentPart = textParts[currentPartIndex];
            let targetElement;
            
            if (currentPart.isFirstLine) {
                targetElement = firstLine;
            } else {
                if (currentPart.isGradient) {
                    // Create a separate span for gradient text within the second line
                    if (!secondLine.querySelector('.gradient-text')) {
                        const gradientSpan = document.createElement('span');
                        gradientSpan.className = 'gradient-text';
                        secondLine.appendChild(gradientSpan);
                    }
                    targetElement = secondLine.querySelector('.gradient-text');
                } else {
                    // Regular text goes directly in the second line
                    targetElement = secondLine;
                }
            }
            
            if (currentCharIndex < currentPart.text.length) {
                const char = currentPart.text.charAt(currentCharIndex);
                targetElement.innerHTML += char;
                currentCharIndex++;
                
                // Adjust speed for spaces and punctuation
                const currentSpeed = (char === ' ') ? speed * 0.4 : speed;
                setTimeout(type, currentSpeed);
            } else {
                // Move to next part
                currentPartIndex++;
                currentCharIndex = 0;
                // Small pause between parts, longer pause between lines
                const pauseTime = (currentPart.isFirstLine) ? speed * 4 : speed * 1.5;
                setTimeout(type, pauseTime);
            }
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    type();
};

// Initialize typing effect - multiple event listeners for robustness
const initTypingEffect = () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && !heroTitle.classList.contains('typing-initialized')) {
        heroTitle.classList.add('typing-initialized');
        
        // Ensure text is hidden immediately
        heroTitle.style.opacity = '0';
        heroTitle.innerHTML = '';
        
        setTimeout(() => {
            typeWriter(heroTitle, 35);
        }, 600);
    }
};

// Multiple initialization points for different loading scenarios
document.addEventListener('DOMContentLoaded', initTypingEffect);
window.addEventListener('load', () => {
    // Fallback in case DOMContentLoaded already fired
    setTimeout(initTypingEffect, 100);
});

// Immediate execution for cases where scripts load after DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTypingEffect);
} else if (document.readyState === 'interactive' || document.readyState === 'complete') {
    setTimeout(initTypingEffect, 100);
}

// Enhanced hover effects for service cards
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Add hover effects for tech items
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Lazy loading for images (if any are added later)
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Add smooth reveal animation for sections
const revealSections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.15 });

revealSections.forEach(section => {
    section.classList.add('reveal');
    sectionObserver.observe(section);
});

// Add CSS for reveal animation
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);
