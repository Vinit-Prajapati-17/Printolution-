// Home page specific JavaScript
(function() {
    'use strict';

    // Smooth scroll reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const animateElements = document.querySelectorAll(`
        .highlight-card,
        .why-reason,
        .process-card,
        .work-item,
        .client-logo,
        .faq-item
    `);

    animateElements.forEach(el => {
        el.classList.add('fade-in');
        fadeInObserver.observe(el);
    });

    // Services section animations
    const servicesSidebar = document.querySelector('.services-sidebar');
    const servicesContent = document.querySelector('.services-content');
    
    if (servicesSidebar) {
        servicesSidebar.classList.add('slide-in-left');
        fadeInObserver.observe(servicesSidebar);
    }
    
    if (servicesContent) {
        servicesContent.classList.add('slide-in-right');
        fadeInObserver.observe(servicesContent);
    }

    // Service menu items animation
    const serviceMenuButtons = document.querySelectorAll('.service-menu-item');
    serviceMenuButtons.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${0.1 + (index * 0.1)}s`;
        fadeInObserver.observe(item);
    });

    // Section fade-in
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('section-fade');
        fadeInObserver.observe(section);
    });

    // Counter animation for highlights
    const counterElements = document.querySelectorAll('.highlight-number[data-target]');
    let countersAnimated = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                animateCounters();
                counterObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });

    if (counterElements.length > 0) {
        counterObserver.observe(counterElements[0].parentElement);
    }

    function animateCounters() {
        counterElements.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }

    // Process timeline animation
    const processTimeline = document.querySelector('.process-timeline');
    
    if (processTimeline) {
        const processObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    processObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        processObserver.observe(processTimeline);
    }

    // Testimonial carousel
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (testimonialTrack && testimonialCards.length > 0) {
        let currentIndex = 0;
        let autoplayInterval;
        const autoplayDelay = 5000;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Create dots
        testimonialCards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.carousel-dot');

        function goToSlide(index) {
            currentIndex = index;
            testimonialTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });

            resetAutoplay();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            goToSlide(currentIndex);
        }

        function startAutoplay() {
            if (!prefersReducedMotion) {
                autoplayInterval = setInterval(nextSlide, autoplayDelay);
            }
        }

        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }

        function resetAutoplay() {
            stopAutoplay();
            startAutoplay();
        }

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        testimonialTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoplay();
        }, { passive: true });

        testimonialTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoplay();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left
                    nextSlide();
                } else {
                    // Swipe right
                    currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
                    goToSlide(currentIndex);
                }
            }
        }

        // Pause on hover
        testimonialTrack.addEventListener('mouseenter', stopAutoplay);
        testimonialTrack.addEventListener('mouseleave', startAutoplay);

        startAutoplay();
    }

    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Scroll cue hide on scroll
    const scrollCue = document.querySelector('.scroll-cue');
    
    if (scrollCue) {
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                scrollCue.style.opacity = '0';
            } else {
                scrollCue.style.opacity = '1';
            }
        }, { passive: true });
    }

    // Why Choose Us animation on scroll
    const whyChooseSection = document.querySelector('.why-choose');
    
    if (whyChooseSection) {
        const whyReasons = document.querySelectorAll('.why-reason');
        const whyCircle = document.querySelector('.why-circle');
        let hasAnimated = false;
        
        const whyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    
                    // Animate circle
                    if (whyCircle) {
                        whyCircle.style.animation = 'pulseCircle 3s ease-in-out infinite, scaleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
                    }
                    
                    // Animate reasons with stagger
                    whyReasons.forEach((reason, index) => {
                        setTimeout(() => {
                            reason.style.animation = 'slideInRight 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
                            
                            // Add hover pulse effect after animation
                            setTimeout(() => {
                                reason.addEventListener('mouseenter', function() {
                                    this.style.animation = 'none';
                                    setTimeout(() => {
                                        this.style.animation = '';
                                    }, 10);
                                });
                            }, 800);
                        }, index * 150);
                    });
                }
            });
        }, { threshold: 0.2 });
        
        whyObserver.observe(whyChooseSection);
    }

    // Services tab switching with mobile enhancements
    const serviceMenuTabs = document.querySelectorAll('.service-menu-item');
    const servicePanels = document.querySelectorAll('.service-panel');
    const servicesMenu = document.querySelector('.services-menu');
    
    serviceMenuTabs.forEach(item => {
        item.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-service');
            
            // Remove active class from all menu items
            serviceMenuTabs.forEach(menuItem => {
                menuItem.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Scroll clicked item into view on mobile
            if (window.innerWidth <= 768 && servicesMenu) {
                const itemRect = this.getBoundingClientRect();
                const menuRect = servicesMenu.getBoundingClientRect();
                const scrollLeft = this.offsetLeft - (menuRect.width / 2) + (itemRect.width / 2);
                
                servicesMenu.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth'
                });
            }
            
            // Hide all panels
            servicePanels.forEach(panel => {
                panel.classList.remove('active');
            });
            
            // Show selected panel with animation
            const targetPanel = document.querySelector(`.service-panel[data-panel="${serviceType}"]`);
            if (targetPanel) {
                setTimeout(() => {
                    targetPanel.classList.add('active');
                    
                    // Scroll panel into view on mobile
                    if (window.innerWidth <= 768) {
                        setTimeout(() => {
                            targetPanel.scrollIntoView({
                                behavior: 'smooth',
                                block: 'nearest'
                            });
                        }, 100);
                    }
                }, 50);
            }
        });
    });

    // Mobile: Add touch feedback to service menu items
    if (window.innerWidth <= 768) {
        serviceMenuTabs.forEach(item => {
            item.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            item.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
        
        // Add scroll indicators for services menu
        if (servicesMenu) {
            let isScrolling;
            servicesMenu.addEventListener('scroll', function() {
                // Clear timeout
                window.clearTimeout(isScrolling);
                
                // Add scrolling class
                this.classList.add('is-scrolling');
                
                // Remove class after scrolling stops
                isScrolling = setTimeout(() => {
                    this.classList.remove('is-scrolling');
                }, 150);
            });
        }
    }

    // Testimonials functionality
    const avatarBtns = document.querySelectorAll('.avatar-btn');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const navPrev = document.querySelector('.nav-prev');
    const navNext = document.querySelector('.nav-next');
    let currentTestimonial = 1;
    const totalTestimonials = testimonialItems.length;

    function showTestimonial(index) {
        // Remove active class from all
        avatarBtns.forEach(btn => btn.classList.remove('active'));
        testimonialItems.forEach(item => item.classList.remove('active'));
        
        // Add active class to selected
        const selectedAvatar = document.querySelector(`.avatar-btn[data-testimonial="${index}"]`);
        const selectedTestimonial = document.querySelector(`.testimonial-item[data-content="${index}"]`);
        
        if (selectedAvatar && selectedTestimonial) {
            selectedAvatar.classList.add('active');
            setTimeout(() => {
                selectedTestimonial.classList.add('active');
            }, 50);
        }
        
        currentTestimonial = index;
    }

    // Avatar click handlers
    avatarBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const testimonialId = parseInt(this.getAttribute('data-testimonial'));
            showTestimonial(testimonialId);
        });
    });

    // Navigation arrows
    if (navPrev) {
        navPrev.addEventListener('click', function() {
            let prevIndex = currentTestimonial - 1;
            if (prevIndex < 1) prevIndex = totalTestimonials;
            showTestimonial(prevIndex);
        });
    }

    if (navNext) {
        navNext.addEventListener('click', function() {
            let nextIndex = currentTestimonial + 1;
            if (nextIndex > totalTestimonials) nextIndex = 1;
            showTestimonial(nextIndex);
        });
    }

    // Auto-rotate testimonials (optional)
    let autoRotate = setInterval(() => {
        let nextIndex = currentTestimonial + 1;
        if (nextIndex > totalTestimonials) nextIndex = 1;
        showTestimonial(nextIndex);
    }, 5000);

    // Pause auto-rotate on hover
    const testimonialsSection = document.querySelector('.testimonials');
    if (testimonialsSection) {
        testimonialsSection.addEventListener('mouseenter', () => {
            clearInterval(autoRotate);
        });
        
        testimonialsSection.addEventListener('mouseleave', () => {
            autoRotate = setInterval(() => {
                let nextIndex = currentTestimonial + 1;
                if (nextIndex > totalTestimonials) nextIndex = 1;
                showTestimonial(nextIndex);
            }, 5000);
        });
    }

})();
