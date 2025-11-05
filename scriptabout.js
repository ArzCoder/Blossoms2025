/**
 * Main script for Blossoms Website (Site-Wide)
 * * Includes:
 * 1. 3D Card Stack (Home Page)
 * 2. Scroll Animations (All Pages)
 */

// Wait for the entire page to load before starting any animations
window.addEventListener('load', () => {

    // --- 1. NO INTRO ANIMATION ---
    // Manually show all header elements and hero content on page load.
    
    const header = document.getElementById('main-header');
    if (header) {
        // Remove animation classes so it appears in its final state
        header.classList.remove('logo-center', 'animation-element');
        // Manually set opacity to 1 (in case CSS transition is slow)
        header.style.opacity = '1'; 
        header.style.visibility = 'visible';
    }
    
    // Show Blossoms Logo
    const logo = document.getElementById('blossoms-logo');
    if (logo) {
        logo.style.opacity = '1';
    }

    // Show Collage Logo
    const collageLogo = document.getElementById('collage-logo-container');
    if (collageLogo) {
        collageLogo.style.opacity = '1';
    }

    // Show Nav Bar Background
    const navBar = document.getElementById('main-nav');
    if (navBar) {
        navBar.style.opacity = '1';
    }

    // Show Nav Links
    const navLinks = document.querySelectorAll('#main-nav a');
    navLinks.forEach((link, index) => {
        link.classList.add('visible'); 
    });

    // Show Hero Content
    const heroElement = document.getElementById('hero');
    if (heroElement) {
        heroElement.style.visibility = 'visible';
        heroElement.style.opacity = '1';
    }


    // --- 2. 3D CARD STACK (Home Page Only) ---
    // We check if the card stack exists
    const cardStack = document.getElementById('event-card-stack');
    if (cardStack) {
        initCardStack(cardStack);
    }

    /**
     * Function to initialize the 3D card stack.
     * @param {HTMLElement} stackContainer - The main container element for the stack.
     */
    function initCardStack(stackContainer) {
        const cards = Array.from(stackContainer.getElementsByClassName('card-stack_item'));
        const nextButton = document.getElementById('card-stack-next');
        const prevButton = document.getElementById('card-stack-prev');
        
        // Details content
        const detailsTitle = document.getElementById('event-details-title');
        const detailsText = document.getElementById('event-details-text');
        const detailsButtonContainer = document.getElementById('event-details-button-container');

        // Dots navigation
        const dotsContainer = document.getElementById('card-stack-dots');
        let dots = [];

        // Create dots
        if (dotsContainer) {
            cards.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = 'card-stack-dot';
                dot.setAttribute('aria-label', `Go to card ${index + 1}`);
                dot.addEventListener('click', () => {
                    setActiveIndex(index);
                });
                dotsContainer.appendChild(dot);
                dots.push(dot);
            });
        }

        let activeIndex = 0;

        /**
         * Updates all cards and details based on the activeIndex.
         */
        function updateCardStack() {
            // 1. Update Card classes
            cards.forEach((card, index) => {
                card.classList.remove('is-active', 'is-prev', 'is-next');

                if (index === activeIndex) {
                    card.classList.add('is-active');
                } else if (index === (activeIndex - 1 + cards.length) % cards.length) {
                    card.classList.add('is-prev');
                } else if (index === (activeIndex + 1) % cards.length) {
                    card.classList.add('is-next');
                }
            });

            // 2. Update Details content
            const activeCard = cards[activeIndex];
            const title = activeCard.querySelector('h3').textContent;
            const detailsHTML = activeCard.querySelector('.card-details').innerHTML;
            
            if (detailsTitle) detailsTitle.textContent = title;
            if (detailsText) detailsText.innerHTML = detailsHTML;

            // 3. Update Dots
            if (dots.length > 0) {
                dots.forEach((dot, index) => {
                    if (index === activeIndex) {
                        dot.classList.add('is-active');
                    } else {
                        dot.classList.remove('is-active');
                    }
                });
            }
        }

        /**
         * Safely sets the active index and updates the stack.
         * @param {number} index - The new index to set.
         */
        function setActiveIndex(index) {
            activeIndex = index;
            updateCardStack();
        }

        // Click next
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                setActiveIndex((activeIndex + 1) % cards.length);
            });
        }

        // Click prev
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                setActiveIndex((activeIndex - 1 + cards.length) % cards.length);
            });
        }

        // Set initial state
        updateCardStack();
    }


    // --- 3. SCROLL ANIMATIONS (All Pages) ---
    // This function will run on all pages
    initScrollAnimations();

});


// ==========================================
// HELPER FUNCTIONS
// (These are outside the 'load' event so other functions can use them)
// ==========================================

/**
 * --- Helper for Scroll Animations ---
 * Sets up IntersectionObserver to animate elements as they scroll into view.
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null, // Use the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // --- CUSTOM: Handle Trophy Animation ---
                if (entry.target.id === 'achievements') {
                    // Check if animation has already run
                    if (entry.target.classList.contains('is-animated')) return;
                    
                    entry.target.classList.add('is-animated');
                    animateTrophies();
                } 
                // --- GENERIC: Handle all other animations ---
                else {
                    entry.target.classList.add('is-visible');
                }
                
                // Stop observing generic elements after they're visible
                if (!entry.target.id === 'achievements') {
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all generic animated elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // --- CUSTOM: Observe Trophy Section ---
    const achievementsSection = document.getElementById('achievements');
    if (achievementsSection) {
        observer.observe(achievementsSection);
    }
}

/**
 * --- Helper for Trophy Animation ---
 * Runs the custom keyframe animation for the trophies.
 */
function animateTrophies() {
    const trophies = document.querySelectorAll('.trophy-card .trophy-image');
    const texts = document.querySelectorAll('.trophy-card h3, .trophy-card p');

    // Keyframes for each trophy
    const keyframes = [
        [ // Trophy 1 (from left)
            { transform: 'translateX(-100vw) scale(0.5)', opacity: 0 },
            { transform: 'translateX(0) scale(1)', opacity: 1 }
        ],
        [ // Trophy 2 (from top)
            { transform: 'translateY(-50vh) scale(0.5)', opacity: 0 },
            { transform: 'translateY(0) scale(1)', opacity: 1 }
        ],
        [ // Trophy 3 (from right)
            { transform: 'translateX(100vw) scale(0.5)', opacity: 0 },
            { transform: 'translateX(0) scale(1)', opacity: 1 }
        ]
    ];

    const animationOptions = {
        duration: 1000, // 1 second
        easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)', // Ease-out quint
        fill: 'forwards'
    };

    // 1. Animate Trophies
    let longestAnimationTime = 0;
    trophies.forEach((trophy, index) => {
        if (keyframes[index]) {
            // Stagger the start time
            const delay = index * 200; // 0ms, 200ms, 400ms
            animationOptions.delay = delay;
            trophy.animate(keyframes[index], animationOptions);
            
            longestAnimationTime = animationOptions.duration + delay;
        }
    });

    // 2. Animate Texts (after trophies land)
    setTimeout(() => {
        texts.forEach((text, index) => {
            text.animate([
                { opacity: 0, transform: 'translateY(20px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ], {
                duration: 500,
                easing: 'ease-out',
                fill: 'forwards',
                delay: index * 100 // Stagger each text element
            });
        });
    }, longestAnimationTime - 200); // Start text fade-in slightly before trophies stop
}