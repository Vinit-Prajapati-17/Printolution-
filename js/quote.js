// Quote page specific JavaScript
(function() {
    'use strict';

    const quoteForm = document.getElementById('quoteForm');
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-steps .step');
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const formStatus = document.querySelector('.form-status');
    
    let currentStep = 1;
    const formData = {};

    // Load saved progress from sessionStorage
    const savedData = sessionStorage.getItem('quoteFormData');
    if (savedData) {
        Object.assign(formData, JSON.parse(savedData));
        populateForm();
    }

    // Next button handlers
    nextBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (validateCurrentStep()) {
                saveCurrentStep();
                currentStep++;
                updateStep();
            }
        });
    });

    // Previous button handlers
    prevBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            currentStep--;
            updateStep();
        });
    });

    // Form submission
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Check honeypot
            const honeypot = quoteForm.querySelector('input[name="website"]');
            if (honeypot && honeypot.value) {
                return;
            }

            if (validateCurrentStep()) {
                saveCurrentStep();
                submitQuote();
            }
        });
    }

    // Category selection
    const categoryInputs = document.querySelectorAll('input[name="category"]');
    categoryInputs.forEach(input => {
        input.addEventListener('change', function() {
            formData.category = this.value;
            saveToSession();
        });
    });

    // Quantity and estimate calculation
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.addEventListener('input', updateEstimate);
    }

    function updateStep() {
        // Update form steps
        formSteps.forEach((step, index) => {
            step.classList.toggle('active', index + 1 === currentStep);
        });

        // Update progress steps
        progressSteps.forEach((step, index) => {
            const stepNum = index + 1;
            if (stepNum < currentStep) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (stepNum === currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function validateCurrentStep() {
        const currentFormStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
        const inputs = currentFormStep.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (input.type === 'radio') {
                const radioGroup = currentFormStep.querySelectorAll(`input[name="${input.name}"]`);
                const isChecked = Array.from(radioGroup).some(radio => radio.checked);
                if (!isChecked) {
                    isValid = false;
                    showError('Please select a category');
                }
            } else if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                const errorElement = input.parentElement.querySelector('.error-message');
                if (errorElement) {
                    errorElement.textContent = 'This field is required';
                    errorElement.style.display = 'block';
                }
            } else if (input.type === 'email' && !isValidEmail(input.value)) {
                isValid = false;
                input.classList.add('error');
                const errorElement = input.parentElement.querySelector('.error-message');
                if (errorElement) {
                    errorElement.textContent = 'Please enter a valid email';
                    errorElement.style.display = 'block';
                }
            } else {
                input.classList.remove('error');
                const errorElement = input.parentElement.querySelector('.error-message');
                if (errorElement) {
                    errorElement.style.display = 'none';
                }
            }
        });

        return isValid;
    }

    function saveCurrentStep() {
        const currentFormStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
        const inputs = currentFormStep.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            if (input.type === 'radio') {
                if (input.checked) {
                    formData[input.name] = input.value;
                }
            } else if (input.name && input.name !== 'website') {
                formData[input.name] = input.value;
            }
        });

        saveToSession();
    }

    function saveToSession() {
        sessionStorage.setItem('quoteFormData', JSON.stringify(formData));
    }

    function populateForm() {
        Object.keys(formData).forEach(key => {
            const input = quoteForm.querySelector(`[name="${key}"]`);
            if (input) {
                if (input.type === 'radio') {
                    const radio = quoteForm.querySelector(`input[name="${key}"][value="${formData[key]}"]`);
                    if (radio) radio.checked = true;
                } else {
                    input.value = formData[key];
                }
            }
        });
        updateEstimate();
    }

    function updateEstimate() {
        const category = formData.category || '';
        const quantity = parseInt(document.getElementById('quantity')?.value) || 0;
        
        if (!category || !quantity) {
            document.getElementById('estimateMin').textContent = '-';
            document.getElementById('estimateMax').textContent = '-';
            return;
        }

        // Simple estimation logic (customize based on actual pricing)
        const baseRates = {
            business: { min: 5, max: 15 },
            wedding: { min: 20, max: 50 },
            packaging: { min: 10, max: 30 },
            merchandise: { min: 100, max: 300 }
        };

        const rates = baseRates[category] || { min: 10, max: 30 };
        const estimateMin = rates.min * quantity;
        const estimateMax = rates.max * quantity;

        document.getElementById('estimateMin').textContent = estimateMin.toLocaleString();
        document.getElementById('estimateMax').textContent = estimateMax.toLocaleString();
    }

    function submitQuote() {
        const submitBtn = quoteForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            showStatus('Thank you! Your quote request has been submitted. We\'ll contact you within 24 hours.', 'success');
            
            // Clear form and session
            sessionStorage.removeItem('quoteFormData');
            quoteForm.reset();
            currentStep = 1;
            updateStep();
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Scroll to status message
            formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1500);
    }

    function showStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = 'form-status ' + type;
    }

    function showError(message) {
        alert(message); // Simple alert for category validation
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

})();
