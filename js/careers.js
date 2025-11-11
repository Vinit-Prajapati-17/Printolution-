// Careers page specific JavaScript
(function() {
    'use strict';

    const modal = document.getElementById('applicationModal');
    const modalClose = document.getElementById('modalClose');
    const applyBtns = document.querySelectorAll('.apply-btn');
    const applicationForm = document.getElementById('applicationForm');
    const positionNameSpan = document.getElementById('positionName');
    const positionInput = document.getElementById('positionInput');
    const formStatus = document.querySelector('.form-status');

    // Open modal
    applyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const position = this.getAttribute('data-position');
            positionNameSpan.textContent = position;
            positionInput.value = position;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        applicationForm.reset();
        formStatus.style.display = 'none';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Form submission
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Check honeypot
            const honeypot = applicationForm.querySelector('input[name="website"]');
            if (honeypot && honeypot.value) {
                return;
            }

            // Validate form
            if (!window.validateForm(applicationForm)) {
                return;
            }

            // Validate file
            const resumeInput = document.getElementById('resume');
            if (resumeInput.files.length === 0) {
                resumeInput.classList.add('error');
                const errorElement = resumeInput.parentElement.querySelector('.error-message');
                if (errorElement) {
                    errorElement.textContent = 'Please upload your resume';
                    errorElement.style.display = 'block';
                }
                return;
            }

            // Get form data
            const formData = new FormData(applicationForm);
            
            // Submit application
            submitApplication(formData);
        });

        // Real-time validation
        const inputs = applicationForm.querySelectorAll('input:not([type="file"]), textarea');
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

    function submitApplication(formData) {
        const submitBtn = applicationForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            showStatus('Thank you for your application! We\'ll review your resume and get back to you soon.', 'success');
            
            // Reset form after delay
            setTimeout(() => {
                closeModal();
            }, 2000);
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // For actual implementation:
            // fetch('your-backend-endpoint', {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => response.json())
            // .then(result => {
            //     showStatus('Application submitted successfully!', 'success');
            //     setTimeout(closeModal, 2000);
            // })
            // .catch(error => {
            //     showStatus('Failed to submit application. Please try again.', 'error');
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
    }

})();
