// Contact page specific JavaScript
(function() {
    'use strict';

    const contactForm = document.getElementById('contactForm');
    const formStatus = document.querySelector('.form-status');
    let lastSubmitTime = 0;
    const cooldownPeriod = 30000; // 30 seconds

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Check honeypot
            const honeypot = contactForm.querySelector('input[name="website"]');
            if (honeypot && honeypot.value) {
                return; // Bot detected
            }

            // Rate limiting
            const now = Date.now();
            if (now - lastSubmitTime < cooldownPeriod) {
                showStatus('Please wait before submitting again.', 'error');
                return;
            }

            // Validate form
            if (!window.validateForm(contactForm)) {
                return;
            }

            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                projectType: formData.get('projectType'),
                message: formData.get('message')
            };

            // Simulate form submission (replace with actual backend call)
            submitForm(data);
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }

    function validateField(field) {
        const errorElement = field.parentElement.querySelector('.error-message');
        
        if (!field.value.trim() && field.hasAttribute('required')) {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = 'This field is required';
                errorElement.style.display = 'block';
            }
            return false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = 'Please enter a valid email';
                errorElement.style.display = 'block';
            }
            return false;
        } else {
            field.classList.remove('error');
            if (errorElement) {
                errorElement.style.display = 'none';
            }
            return true;
        }
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function submitForm(data) {
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate API call (replace with actual backend integration)
        setTimeout(() => {
            lastSubmitTime = Date.now();
            
            // Success
            showStatus('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
            contactForm.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // For actual implementation, use:
            // fetch('your-backend-endpoint', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // })
            // .then(response => response.json())
            // .then(result => {
            //     showStatus('Message sent successfully!', 'success');
            //     contactForm.reset();
            // })
            // .catch(error => {
            //     showStatus('Failed to send message. Please try again.', 'error');
            // })
            // .finally(() => {
            //     submitBtn.textContent = originalText;
            //     submitBtn.disabled = false;
            // });
        }, 1500);
    }

    function showStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = 'form-status ' + type;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }

})();
