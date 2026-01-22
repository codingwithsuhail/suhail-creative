// Initialize EmailJS
(function() {
    emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS User ID
})();

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            document.body.classList.add('loaded');
        }
    }, 1500);
});

// DOM Elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const scrollToTop = document.getElementById('scrollToTop');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const projectsSlider = document.querySelector('.projects-slider');
const themeToggle = document.getElementById('themeToggle');

// Dark Mode Toggle
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    const icon = themeToggle.querySelector('i');
    if (newTheme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
if (savedTheme === 'dark') {
    const icon = themeToggle.querySelector('i');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

// Navigation Toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Scroll to Top Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTop.classList.add('show');
    } else {
        scrollToTop.classList.remove('show');
    }
});

scrollToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Projects Slider
let currentSlide = 0;
const slideWidth = 370; // card width + gap
const maxSlide = projectsSlider ? projectsSlider.children.length - 1 : 0;

function slideTo(slideIndex) {
    if (!projectsSlider) return;
    
    const maxScroll = projectsSlider.scrollWidth - projectsSlider.clientWidth;
    const slidePosition = Math.min(slideIndex * slideWidth, maxScroll);
    
    projectsSlider.scrollTo({
        left: slidePosition,
        behavior: 'smooth'
    });
    
    currentSlide = slideIndex;
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            slideTo(currentSlide - 1);
        }
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        if (currentSlide < maxSlide) {
            slideTo(currentSlide + 1);
        }
    });
}

// Auto-slide for projects
let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        if (currentSlide < maxSlide) {
            slideTo(currentSlide + 1);
        } else {
            slideTo(0);
        }
    }, 4000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

if (projectsSlider) {
    startAutoSlide();
    
    projectsSlider.addEventListener('mouseenter', stopAutoSlide);
    projectsSlider.addEventListener('mouseleave', startAutoSlide);
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .contact-item, .feature, .stat');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add animation classes dynamically
const style = document.createElement('style');
style.textContent = `
    .service-card,
    .project-card,
    .contact-item,
    .feature,
    .stat {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .service-card.animate-in,
    .project-card.animate-in,
    .contact-item.animate-in,
    .feature.animate-in,
    .stat.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .service-card:nth-child(1).animate-in { transition-delay: 0.1s; }
    .service-card:nth-child(2).animate-in { transition-delay: 0.2s; }
    .service-card:nth-child(3).animate-in { transition-delay: 0.3s; }
    
    .feature:nth-child(1).animate-in { transition-delay: 0.1s; }
    .feature:nth-child(2).animate-in { transition-delay: 0.2s; }
    .feature:nth-child(3).animate-in { transition-delay: 0.3s; }
    .feature:nth-child(4).animate-in { transition-delay: 0.4s; }
    
    .stat:nth-child(1).animate-in { transition-delay: 0.1s; }
    .stat:nth-child(2).animate-in { transition-delay: 0.2s; }
    .stat:nth-child(3).animate-in { transition-delay: 0.3s; }
`;
document.head.appendChild(style);

// Button click effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        // Remove existing ripples
        this.querySelectorAll('.ripple').forEach(r => r.remove());
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (hero && heroVisual) {
        const speed = 0.5;
        heroVisual.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// Counter animation for stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
    }, 20);
}

// Initialize counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                animateCounter(stat, number);
            });
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// Form validation (if contact form is added later)
function validateForm(form) {
    const email = form.querySelector('input[type="email"]');
    const message = form.querySelector('textarea');
    
    let isValid = true;
    
    if (email && !email.value.includes('@')) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    if (message && message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

function showError(element, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #f5576c;
        font-size: 0.8rem;
        margin-top: 0.5rem;
    `;
    
    element.parentNode.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);

// Touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

if (projectsSlider) {
    projectsSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    projectsSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    if (!projectsSlider) return;
    
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && currentSlide < maxSlide) {
            // Swipe left - next slide
            slideTo(currentSlide + 1);
        } else if (diff < 0 && currentSlide > 0) {
            // Swipe right - previous slide
            slideTo(currentSlide - 1);
        }
    }
}

// Contact Form Functionality
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!email.includes('@')) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            formSuccess.classList.add('show');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.remove('show');
            }, 5000);
            
            // Send notification to you (in real app, this would send to your server)
            sendNotificationToOwner(name, email, message);
            
            // Log form data
            console.log('Form submitted:', { name, email, message });
        }, 2000);
    });
}

// Send notification to owner
function sendNotificationToOwner(name, email, message) {
    // Create notification data
    const notification = {
        type: 'new_message',
        customerName: name,
        customerEmail: email,
        message: message,
        timestamp: new Date().toISOString(),
        read: false
    };
    
    // Store in localStorage for demo
    let notifications = JSON.parse(localStorage.getItem('ownerNotifications') || '[]');
    notifications.unshift(notification);
    localStorage.setItem('ownerNotifications', JSON.stringify(notifications));
    
    // Send email to your Gmail (using EmailJS service)
    sendEmailToGmail(name, email, message);
    
    // Show browser notification if permissions granted
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('New Message from ' + name, {
            body: `${email}: ${message.substring(0, 50)}...`,
            icon: '/favicon.ico'
        });
    }
    
    // Show notification indicator on page
    showNotificationIndicator();
    
    console.log('Notification sent to owner:', notification);
}

// Initialize EmailJS with your actual API keys
(function() {
    emailjs.init("Jo8AoKnxqBRFEVN39"); // Your Public Key
})();

// Alternative: Use Formspree for direct email (no setup required)
function sendEmailToGmail(name, customerEmail, message) {
    // Option 1: EmailJS (configured with your keys)
    const serviceID = 'service_jravces'; // Your Service ID
    const templateID = 'template_default'; // Default template
    const userID = 'Jo8AoKnxqBRFEVN39'; // Your Public Key
    
    const templateParams = {
        from_name: name,
        from_email: customerEmail,
        message: message,
        to_email: 'thugbhai86@gmail.com',
        subject: `New Message from ${name} via codingwithsuhail Website`
    };
    
    // Option 2: Formspree (easier - guaranteed to work)
    const formspreeURL = 'https://formspree.io/f/xayrjgvd'; // Formspree endpoint
    
    // Try Formspree first (more reliable)
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', customerEmail);
    formData.append('message', message);
    formData.append('subject', `New Message from ${name} via codingwithsuhail Website`);
    
    fetch(formspreeURL, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('✅ Formspree email sent successfully!');
            showEmailSentConfirmation(name, customerEmail, 'Formspree');
        } else {
            throw new Error('Formspree failed');
        }
    })
    .catch(error => {
        console.log('❌ Formspree failed, trying EmailJS:', error);
        
        // Fallback to EmailJS
        try {
            emailjs.send(serviceID, templateID, templateParams)
                .then(function(response) {
                    console.log('✅ EmailJS backup worked!', response.status, response.text);
                    showEmailSentConfirmation(name, customerEmail, 'EmailJS');
                })
                .catch(function(emailjsError) {
                    console.log('❌ Both services failed, using mailto:', emailjsError);
                    // Final fallback to mailto
                    const mailtoLink = `mailto:thugbhai86@gmail.com?subject=${encodeURIComponent(`New Message from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${customerEmail}\n\nMessage:\n${message}`)}`;
                    window.open(mailtoLink, '_blank');
                    showEmailSentConfirmation(name, customerEmail, 'Mail App');
                });
        } catch (fallbackError) {
            console.log('❌ All services failed, using mailto:', fallbackError);
            // Direct fallback to mailto
            const mailtoLink = `mailto:thugbhai86@gmail.com?subject=${encodeURIComponent(`New Message from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${customerEmail}\n\nMessage:\n${message}`)}`;
            window.open(mailtoLink, '_blank');
            showEmailSentConfirmation(name, customerEmail, 'Mail App');
        }
    });
}

// Show email sent confirmation
function showEmailSentConfirmation(name, email) {
    const confirmation = document.createElement('div');
    confirmation.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 184, 148, 0.3);
        z-index: 10000;
        max-width: 300px;
        animation: slideInRight 0.5s ease;
    `;
    
    confirmation.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-check-circle" style="font-size: 1.2rem;"></i>
            <div>
                <strong style="display: block; margin-bottom: 5px;">Email Sent to Gmail!</strong>
                <small style="opacity: 0.9;">Message from ${name} (${email})</small>
            </div>
        </div>
    `;
    
    document.body.appendChild(confirmation);
    
    // Auto-hide after 8 seconds
    setTimeout(() => {
        if (confirmation.parentNode) {
            confirmation.remove();
        }
    }, 8000);
}

// Show notification indicator
function showNotificationIndicator() {
    // Create notification badge if it doesn't exist
    let badge = document.getElementById('notificationBadge');
    if (!badge) {
        badge = document.createElement('div');
        badge.id = 'notificationBadge';
        badge.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 10px 15px;
            border-radius: 25px;
            font-weight: 600;
            z-index: 10000;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            animation: slideInRight 0.5s ease;
        `;
        badge.innerHTML = '<i class="fas fa-bell"></i> New Message';
        document.body.appendChild(badge);
        
        // Add click to view notifications
        badge.addEventListener('click', viewNotifications);
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (badge.parentNode) {
                badge.remove();
            }
        }, 10000);
    }
}

// View notifications
function viewNotifications() {
    const notifications = JSON.parse(localStorage.getItem('ownerNotifications') || '[]');
    
    if (notifications.length === 0) {
        alert('No new notifications');
        return;
    }
    
    // Create notifications modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        max-width: 500px;
        max-height: 400px;
        overflow-y: auto;
        position: relative;
    `;
    
    content.innerHTML = `
        <h3 style="margin-bottom: 20px; color: #2d3436;">Customer Messages</h3>
        ${notifications.map((notif, index) => `
            <div style="border-bottom: 1px solid #e9ecef; padding: 15px 0; ${notif.read ? 'opacity: 0.7;' : ''}">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <strong style="color: #667eea;">${notif.customerName}</strong>
                    <small style="color: #636e72;">${new Date(notif.timestamp).toLocaleString()}</small>
                </div>
                <div style="color: #636e72; margin-bottom: 5px;">${notif.customerEmail}</div>
                <div style="color: #2d3436;">${notif.message}</div>
            </div>
        `).join('')}
        <button onclick="this.parentElement.parentElement.remove(); markNotificationsRead();" style="
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 25px;
            cursor: pointer;
            margin-top: 20px;
            font-weight: 600;
        ">Close</button>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Mark notifications as read
function markNotificationsRead() {
    const notifications = JSON.parse(localStorage.getItem('ownerNotifications') || '[]');
    notifications.forEach(notif => notif.read = true);
    localStorage.setItem('ownerNotifications', JSON.stringify(notifications));
    
    // Remove notification badge
    const badge = document.getElementById('notificationBadge');
    if (badge) {
        badge.remove();
    }
}

// Request notification permission on page load
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

// Dynamic year in footer
const year = new Date().getFullYear();
const footerText = document.querySelector('.footer-text');
if (footerText) {
    footerText.innerHTML = `© ${year} suhail creative — Founded by Ahmed`;
}

// Console branding
console.log('%c suhail creative - Premium Ads & IT Agency ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 16px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%c Founded by Ahmed | Creative & IT Solutions ', 'background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; font-size: 12px; padding: 8px 16px; border-radius: 3px;');
