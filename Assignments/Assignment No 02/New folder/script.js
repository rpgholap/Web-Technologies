// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const header = document.getElementById('header');

    // Mobile menu toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });

        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Dropdown menu functionality
    const dropdowns = document.querySelectorAll('[data-dropdown]');
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('[data-dropdown-trigger]');
        const menu = dropdown.querySelector('[data-dropdown-menu]');
        
        if (trigger && menu) {
            // For mobile, toggle on click
            trigger.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    menu.style.opacity = menu.style.opacity === '1' ? '0' : '1';
                    menu.style.visibility = menu.style.visibility === 'visible' ? 'hidden' : 'visible';
                }
            });
        }
    });

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone')?.value || '',
                interest: document.getElementById('interest')?.value || '',
                message: document.getElementById('message').value
            };

            console.log('Contact form submitted:', formData);
            
            // Show success message
            alert('Thank you for your interest in Lamborghini! Our team will contact you shortly.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Sign In Form Handler
    const signinForm = document.getElementById('signinForm');
    if (signinForm) {
        signinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Basic validation
            if (!email || !password) {
                alert('Please fill in all fields.');
                return;
            }

            const formData = {
                email: email,
                password: password
            };

            console.log('Sign in submitted:', formData);
            
            alert('Welcome back! Redirecting to your account...');
            
            // Redirect to home page
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });

        // Forgot password handler
        const forgotPassword = document.getElementById('forgotPassword');
        if (forgotPassword) {
            forgotPassword.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Forgot password clicked');
                alert('Password reset instructions have been sent to your email.');
            });
        }
    }

    // Sign Up Form Handler
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Validation
            if (!name || !email || !password || !confirmPassword) {
                alert('Please fill in all fields.');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match. Please try again.');
                return;
            }

            if (password.length < 8) {
                alert('Password must be at least 8 characters long.');
                return;
            }

            const formData = {
                name: name,
                email: email,
                password: password
            };

            console.log('Sign up submitted:', formData);
            
            alert('Account created successfully! Welcome to Lamborghini.');
            
            // Redirect to configurator or home page
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerOffset = 100;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe model cards and other animated elements
    const animatedElements = document.querySelectorAll('.model-card, .value-card, .stat-item, .timeline-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Button hover sound effect (optional, can be enabled)
    // Uncomment to add subtle interaction feedback
    /*
    const buttons = document.querySelectorAll('.btn, .nav-link');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            // Add hover effect class
            this.style.transition = 'all 0.3s ease';
        });
    });
    */

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroContent = document.querySelector('.hero-content');
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
                heroContent.style.opacity = 1 - (scrolled / 600);
            }
        });
    }

    // Prevent dropdown menu from closing when clicking inside
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });

    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksAll = document.querySelectorAll('.nav-link');
    navLinksAll.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else if (currentPage === '' && href === 'index.html') {
            link.classList.add('active');
        }
    });

    // Model card hover effect enhancement
    const modelCards = document.querySelectorAll('.model-card');
    modelCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Loading animation (optional)
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
});

// Utility function to detect mobile device
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Add touch event support for mobile
if (isMobileDevice()) {
    document.addEventListener('DOMContentLoaded', function() {
        const cards = document.querySelectorAll('.model-card, .value-card');
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            card.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    });
}
