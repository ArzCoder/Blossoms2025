/**
 * Main script for Blossoms Website
 * * Includes:
 * 1. Intro Animation (Home Page)
 * 2. 3D Card Stack (Home Page)
 * 3. Scroll Animations (All Pages)
 */

// Wait for the entire page to load before starting any animations
window.addEventListener('load', () => {

    // --- 1. INTRO ANIMATION (Home Page Only) ---
    // We check if the particle container exists, so this only runs on index.html
    const particleContainer = document.getElementById('flower-particles-container');
    if (particleContainer) {
        startMainAnimation();
    }

    /**
     * Function to run the entire logo intro animation.
     */
    function startMainAnimation() {
        const header = document.getElementById('main-header');
        
        // --- Animation Timeline ---

        // SCENE 1: Flower particles
        // Create 30 flowers over 1.5 seconds
        createFlowerStream(30, 1500, particleContainer);

        // SCENE 2: Show Center Logo
        // Wait 2s for flowers to fly in, then fade in logo
        setTimeout(() => {
            showElement('main-header');
            const logo = document.getElementById('blossoms-logo');
            if (logo) {
                logo.style.opacity = '1';
            }
        }, 2000); // 2s delay

        // SCENE 3: Move Logo to Top-Left
        // Wait 4.5s total (2s for flowers, 1s for logo fade, 1.5s pause)
        setTimeout(() => {
            if (header) {
                header.classList.remove('logo-center');
            }
        }, 4500); // 4.5s delay

        // SCENE 4: Show Final Navigation
        if (header) {
            header.addEventListener('transitionend', (event) => {
                // We only care about the 'transform' transition ending
                if (event.propertyName === 'transform') {
                    if (!header.classList.contains('logo-center')) {
                        showFinalNav();
                    }
                }
            });
        }
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
 * --- Helper for Scene 1 ---
 * Creates a stream of flower particles.
 * @param {number} count - Number of particles.
 * @param {number} duration - Total duration of the stream (ms).
 * @param {HTMLElement} container - The container to append particles to.
 */
function createFlowerStream(count, duration, container) {
    if (!container) return; // Fail safe
    const interval = duration / count;
    const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const flower = document.createElement('div');
            flower.className = 'flower-particle';

            // Assign a corner to this flower
            const corner = corners[i % 4];

            const size = Math.random() * 20 + 10;
            flower.style.width = `${size}px`;
            flower.style.height = `${size}px`;

            flower.style.backgroundColor = Math.random() > 0.5 ? 'var(--primary-pink)' : 'var(--darker-pink)';

            container.appendChild(flower);
            animateFlower(flower, corner);

        }, i * interval);
    }
}

/**
 * --- Helper for Scene 1 ---
 * Animates a single flower from one of four corners
 * @param {HTMLElement} flowerElement - The particle element.
 * @param {string} startCorner - 'top-left', 'top-right', 'bottom-left', or 'bottom-right'.
 */
function animateFlower(flowerElement, startCorner) {
    let startX, startY, endX, endY;

    // Define start positions based on corner (at screen corners)
    switch (startCorner) {
        case 'top-left':
            startX = 0; // Start at top-left corner
            startY = 0;
            break;
        case 'top-right':
            startX = 100; // Start at top-right corner
            startY = 0;
            break;
        case 'bottom-left':
            startX = 0; // Start at bottom-left corner
            startY = 100;
            break;
        case 'bottom-right':
            startX = 100; // Start at bottom-right corner
            startY = 100;
            break;
    }

    // All flowers fly to the center cluster
    endX = Math.random() * 10 + 45; // 45vw to 55vw
    endY = Math.random() * 10 + 45; // 45vh to 55vh

    flowerElement.animate([
        {
            transform: `translate(${startX}vw, ${startY}vh) scale(1)`,
            opacity: 0.7
        },
        {
            // Fly to the center cluster point
            transform: `translate(${endX - startX}vw, ${endY - startY}vh) scale(0)`,
            opacity: 0
        }
    ], {
        duration: Math.random() * 2000 + 1000, // 1s to 3s duration
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)', // Ease-in
        fill: 'forwards'
    });

    // Remove the DOM element after animation
    setTimeout(() => {
        flowerElement.remove();
    }, 3000);
}


/**
 * --- Helper for Scene 2 ---
 * Fades in a DOM element by ID.
 * @param {string} elementId - The ID of the element to show.
 */
function showElement(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
        el.style.visibility = 'visible';
        el.style.opacity = '1';
    }
}


/**
 * --- Helper for Scene 4 ---
 * Shows the final nav bar, collage logo, links, and main content in sequence.
 */
function showFinalNav() {
    const collageLogo = document.getElementById('collage-logo-container');
    const navBar = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('#main-nav a');

    // 1. Fade in the Collage Logo (top right)
    if (collageLogo) {
        collageLogo.style.opacity = '1';
    }

    // 2. Fade in the Nav Bar background
    if (navBar) {
        navBar.style.opacity = '1';
    }

    // 3. Stagger-fade in the nav links
    // This happens *after* the nav bar background is visible
    setTimeout(() => {
        navLinks.forEach((link, index) => {
            // Stagger the animation
            setTimeout(() => {
                link.classList.add('visible');
            }, index * 100); // 100ms delay between each link
        });
    }, 100); // Short delay to let nav background fade in

    // 4. After the links start appearing, fade in the main content
    // We'll time it to appear just as the last link is fading in.
    const heroElement = document.getElementById('hero');
    if (heroElement) {
        setTimeout(() => {
            heroElement.style.visibility = 'visible';
            heroElement.style.opacity = '1';
        }, navLinks.length * 100); // Stagger after the last link
    }
}


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

