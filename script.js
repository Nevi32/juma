// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease',
    once: true,
    offset: 100
});

// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        // Animate hero elements after preloader is gone
        setTimeout(() => {
            document.querySelectorAll('.hero [data-aos]').forEach(item => {
                item.classList.add('aos-animate');
            });
        }, 500);
    }, 1500); // Show preloader for 1.5 seconds
});

// Navigation
const nav = document.querySelector('nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

// Navigation scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Back to top functionality
if (document.querySelector('.back-to-top')) {
    document.querySelector('.back-to-top').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Portfolio filter - Fixed version
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Get filter value
        const filter = btn.getAttribute('data-filter');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
                // Add small delay to allow display property to take effect before animation
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                // Add transition delay before hiding completely
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300); // This should match transition duration in CSS
            }
        });
    });
});

// Make sure portfolio items have proper initial state
portfolioItems.forEach(item => {
    item.style.display = 'block';
    item.style.opacity = '1';
    item.style.transform = 'scale(1)';
    // Add transition for smooth animation
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
});

// Testimonial Slider
const testimonialItems = document.querySelectorAll('.testimonial-item');
const dots = document.querySelectorAll('.dot');
let currentTestimonial = 0;

// Function to switch testimonials
function showTestimonial(index) {
    // Reset active class
    testimonialItems.forEach(item => item.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Set active testimonial and dot
    testimonialItems[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentTestimonial = index;
}

// Click event for dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
    });
});

// Auto switch testimonials
setInterval(() => {
    let nextTestimonial = currentTestimonial + 1;
    if (nextTestimonial >= testimonialItems.length) {
        nextTestimonial = 0;
    }
    showTestimonial(nextTestimonial);
}, 5000);

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        // For demonstration purposes, we'll just show a success message
        
        // Clear form fields
        contactForm.reset();
        
        // Show success message (you could create a more sophisticated notification)
        alert(`Thank you, ${name}! Your message has been sent successfully. We'll get back to you soon.`);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Create special entrance animations for sections
const createObserver = () => {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                
                // Add special animations to portfolio items when section is visible
                if (entry.target.id === 'portfolio') {
                    portfolioItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 100);
                    });
                }
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
};

// Initialize observers when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    createObserver();
    
    // Start typing effect
    typeEffect();
    
    // Custom cursor effect (creative touch)
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    
    // Add cursor effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .service-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('expand');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('expand');
        });
    });
    
    // Add custom styles for cursor
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: rgba(255, 107, 107, 0.3);
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 9999;
            transition: width 0.3s, height 0.3s, background 0.3s;
            mix-blend-mode: difference;
        }
        
        .custom-cursor.expand {
            width: 50px;
            height: 50px;
            background: rgba(255, 107, 107, 0.5);
        }
        
        /* Hide cursor on mobile devices */
        @media (max-width: 768px) {
            .custom-cursor {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add creative scroll animations
    const addScrollAnimations = () => {
        const scrollAnimElements = document.querySelectorAll('.service-card, .portfolio-item, .about-image, .contact-form');
        
        scrollAnimElements.forEach(el => {
            el.style.transition = 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.6s ease';
        });
        
        window.addEventListener('scroll', () => {
            scrollAnimElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const isVisible = (rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0);
                
                if (isVisible) {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0) rotate(0)';
                } else {
                    if (rect.top > window.innerHeight) {
                        el.style.opacity = '0';
                        el.style.transform = 'translateY(50px) rotate(3deg)';
                    }
                }
            });
        });
    };
    
    addScrollAnimations();
    
    // Initialize newsletter form
    const newsletterForm = document.querySelector('.footer-newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput.value.trim() !== '') {
                alert(`Thank you for subscribing to our newsletter with ${emailInput.value}!`);
                emailInput.value = '';
            }
        });
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    if (scrollPosition < window.innerHeight) {
        const heroImage = document.querySelector('.hero-image');
        const shapes = document.querySelectorAll('.shape');
        
        if (heroImage) {
            heroImage.style.transform = `perspective(1000px) rotateY(-15deg) translateY(${scrollPosition * 0.05}px)`;
        }
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${scrollPosition * speed}px) rotate(${scrollPosition * 0.02}deg)`;
        });
    }
});

// Creative hover effects for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) - 0.5;
        const y = ((e.clientY - rect.top) / rect.height) - 0.5;
        
        card.style.transform = `translateY(-15px) rotateX(${y * 10}deg) rotateY(${x * 10}deg)`;
        
        const serviceIcon = card.querySelector('.service-icon');
        if (serviceIcon) {
            serviceIcon.style.transform = `translateX(${x * 20}px) translateY(${y * 20}px)`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(-15px) rotateX(0) rotateY(0)';
        
        const serviceIcon = card.querySelector('.service-icon');
        if (serviceIcon) {
            serviceIcon.style.transform = 'translateX(0) translateY(0)';
        }
    });
});

// Typing effect for hero section
function typeEffect() {
    const text = "Elevating brands through creative visual communication";
    const speed = 50; // typing speed in milliseconds
    const heroText = document.querySelector('.hero-content p');
    
    if (heroText) {
        heroText.innerHTML = '';
        let i = 0;
        
        function typing() {
            if (i < text.length) {
                heroText.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        
        setTimeout(() => {
            typing();
        }, 1000); // Start typing after 1 second
    }
}

// Portfolio item details popup
document.querySelectorAll('.portfolio-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get portfolio item details
        const portfolioItem = this.closest('.portfolio-item');
        const title = portfolioItem.querySelector('h3').textContent;
        const category = portfolioItem.querySelector('p').textContent;
        const imgSrc = portfolioItem.querySelector('img').src;
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'portfolio-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${imgSrc}" alt="${title}">
                <div class="modal-details">
                    <h3>${title}</h3>
                    <p>${category}</p>
                    <p class="modal-description">This is a detailed description of the ${title} project. Here we would include information about the client, the challenge, our approach, and the results achieved through this design.</p>
                </div>
            </div>
        `;
        
        // Add styles for modal
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .portfolio-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .modal-content {
                background: #fff;
                max-width: 800px;
                width: 90%;
                border-radius: 10px;
                overflow: hidden;
                position: relative;
                transform: translateY(20px);
                transition: transform 0.3s ease;
            }
            
            .close-modal {
                position: absolute;
                top: 15px;
                right: 15px;
                font-size: 24px;
                cursor: pointer;
                color: #fff;
                background: #ff6b6b;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10;
            }
            
            .modal-content img {
                width: 100%;
                height: auto;
                display: block;
            }
            
            .modal-details {
                padding: 20px;
            }
            
            .modal-details h3 {
                margin-bottom: 5px;
                color: #333;
            }
            
            .modal-details p {
                color: #666;
                margin-bottom: 10px;
            }
            
            .modal-description {
                margin-top: 15px;
                line-height: 1.6;
            }
            
            .portfolio-modal.active {
                opacity: 1;
            }
            
            .portfolio-modal.active .modal-content {
                transform: translateY(0);
            }
        `;
        document.head.appendChild(modalStyle);
        
        // Add modal to body
        document.body.appendChild(modal);
        
        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Close modal on click
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
        });
    });
});

// Implement scroll progress indicator
const createScrollProgressIndicator = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    
    const progressStyle = document.createElement('style');
    progressStyle.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(to right, #ff6b6b, #45a29e);
            z-index: 1000;
            transition: width 0.2s;
        }
    `;
    
    document.head.appendChild(progressStyle);
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${scrollPercentage}%`;
    });
};

// Initialize scroll progress indicator
createScrollProgressIndicator();
