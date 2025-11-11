// Page Loader with Percentage Counter
(function() {
    'use strict';

    // Create enhanced minimal loader HTML
    const loaderHTML = `
        <div class="page-loader" id="pageLoader">
            <div class="loader-bg-gradient"></div>
            <div class="loader-bg-pattern"></div>
            <div class="loader-particles">
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
            </div>
            <div class="loader-content">
                <div class="loader-logo-container">
                    <!-- SVG Circle Progress with Gradient -->
                    <div class="loader-circle-progress">
                        <svg class="progress-ring" width="300" height="300">
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:#FFC107;stop-opacity:1" />
                                    <stop offset="50%" style="stop-color:#FFD54F;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:#FFC107;stop-opacity:1" />
                                </linearGradient>
                            </defs>
                            <circle class="progress-ring-circle" cx="150" cy="150" r="135"></circle>
                            <circle class="progress-ring-progress" cx="150" cy="150" r="135"></circle>
                        </svg>
                    </div>
                    
                    <!-- Animated Dots -->
                    <div class="loader-dots">
                        <div class="loader-dot"></div>
                        <div class="loader-dot"></div>
                        <div class="loader-dot"></div>
                        <div class="loader-dot"></div>
                        <div class="loader-dot"></div>
                        <div class="loader-dot"></div>
                        <div class="loader-dot"></div>
                        <div class="loader-dot"></div>
                    </div>
                    
                    <!-- Logo -->
                    <img src="img/Nev.png" alt="Printolution" class="loader-logo">
                </div>
                <div class="loader-text">LOADING</div>
                <div class="loader-bar">
                    <div class="loader-bar-fill"></div>
                </div>
            </div>
        </div>
    `;

    // Insert loader at the beginning of body - ONLY ONCE PER SESSION
    document.addEventListener('DOMContentLoaded', function() {
        // Check if loader has already been shown in this session
        const loaderShown = sessionStorage.getItem('loaderShown');
        
        // If loader was already shown, don't show it again
        if (loaderShown === 'true') {
            return;
        }
        
        // Mark that loader has been shown
        sessionStorage.setItem('loaderShown', 'true');
        
        // Insert loader HTML
        document.body.insertAdjacentHTML('afterbegin', loaderHTML);
        
        const loader = document.getElementById('pageLoader');
        let loadingComplete = false;

        // When page is fully loaded
        window.addEventListener('load', function() {
            loadingComplete = true;
            hideLoader();
        });

        // Hide loader function
        function hideLoader() {
            setTimeout(() => {
                loader.classList.add('hidden');
                
                // Remove from DOM after transition
                setTimeout(() => {
                    if (loader && loader.parentNode) {
                        loader.parentNode.removeChild(loader);
                    }
                }, 800);
            }, 600);
        }

        // Fallback: Hide loader after 5 seconds maximum
        setTimeout(() => {
            if (!loader.classList.contains('hidden')) {
                hideLoader();
            }
        }, 5000);
    });

    // Prevent scrolling while loading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.style.overflow = originalOverflow;
        }, 800);
    });

})();
