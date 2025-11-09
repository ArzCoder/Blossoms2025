// Wait for the entire page to load before starting the animation
window.addEventListener('load', () => {

    // ==========================================
    // --- 0. FLOWER PARTICLES ANIMATION ---
    // ==========================================

    /**
     * Creates and animates flower particles from left bottom and right bottom corners diagonally.
     */
    function initFlowerParticles() {
        const container = document.getElementById('flower-particles-container');
        if (!container) return;

        // Function to create a single particle
        function createParticle(startX, startY, directionX, directionY) {
            const particle = document.createElement('div');
            particle.className = 'flower-particle';
            particle.style.left = startX + 'px';
            particle.style.bottom = startY + 'px';
            container.appendChild(particle);

            // Randomize size slightly (larger for visibility)
            const size = Math.random() * 10 + 20; // 20-30px
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';

            // Animate the particle
            let x = startX;
            let y = startY;
            let opacity = 0.8;
            const speedX = directionX * (Math.random() * 2 + 1); // Random speed (faster)
            const speedY = directionY * (Math.random() * 2 + 1);
            const fadeSpeed = 0.005; // Slower fade out

            function animate() {
                x += speedX;
                y += speedY;
                opacity -= fadeSpeed;

                particle.style.left = x + 'px';
                particle.style.bottom = y + 'px';
                particle.style.opacity = opacity;

                if (opacity > 0 && y < window.innerHeight + 50) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            }

            animate();
        }

        // Create particles every 500ms (increased frequency for visibility)
        setInterval(() => {
            // From left bottom corner, moving diagonally up-right (2-4 particles)
            for (let i = 0; i < Math.floor(Math.random() * 3) + 2; i++) {
                createParticle(-50, -50, 1, 1);
            }

            // From right bottom corner, moving diagonally up-left (2-4 particles)
            for (let i = 0; i < Math.floor(Math.random() * 3) + 2; i++) {
                createParticle(window.innerWidth - 50, -50, -1, 1);
            }
        }, 500);
    }

    // Initialize flower particles
    initFlowerParticles();

    // ==========================================
    // --- 1. INTRO ANIMATION (LOGO & NAV) ---
    // ==========================================

    /**
     * No animation: just show everything instantly.
     */
    function startMainAnimation() {
        // Show header instantly
        showElement('main-header');
        const logo = document.getElementById('blossoms-logo');
        if (logo) {
            logo.style.opacity = '1';
        }

        // Show nav and collage instantly
        showFinalNav();
    }




    /**
     * --- Scene 2 Helper ---
     * Fades in a DOM element by ID.
     */
    function showElement(elementId) {
        const el = document.getElementById(elementId);
        if (el) {
            el.style.visibility = 'visible';
            el.style.opacity = '1';
        }
    }


    /**
     * --- Scene 4 Helper (REWRITTEN) ---
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
        // Time it to appear just as the last link is fading in.
        setTimeout(() => {
            showElement('hero'); // UPDATED: Was 'main-content'
        }, navLinks.length * 100); // Stagger after the last link
    }

    // Start the intro animation as soon as the page is loaded
    startMainAnimation();

    // ==========================================
    // --- 2. EVENT CATEGORY CARD STACK ---
    // ==========================================

    /**
     * Initializes the 3D card stack functionality
     */
    function initCardStack(stackId) {
        const stackContainer = document.getElementById(stackId);
        if (!stackContainer) return; // Don't run if element doesn't exist

        // Get all elements
        const cards = Array.from(stackContainer.getElementsByClassName('card-stack_item'));
        const nextButton = document.getElementById('card-stack-next');
        const prevButton = document.getElementById('card-stack-prev');
        
        // Detail elements on the right
        const detailTitle = document.getElementById('event-details-title');
        const detailCategories = document.getElementById('event-details-categories');
        const detailButtonContainer = document.getElementById('event-details-button-container');

        // Navigation dots
        const dotsContainer = document.getElementById('card-stack-dots');
        let dots = []; // To store the dot elements

        let activeIndex = 0; // Tracks the current active card

        // Create a dot for each card
        cards.forEach((card, index) => {
            const dot = document.createElement('button');
            dot.className = 'card-stack-dot';
            dot.setAttribute('aria-label', `Go to card ${index + 1}`);
            
            // Add click event to move to that card
            dot.addEventListener('click', () => {
                activeIndex = index;
                updateCardStack();
            });
            
            dotsContainer.appendChild(dot);
            dots.push(dot); // Add to our array
        });

        /**
         * This function is the main controller. It updates all card classes,
         * dot classes, and the details text based on the `activeIndex`.
         */
        function updateCardStack() {
            // 1. Update Card Classes (is-active, is-prev, is-next)
            cards.forEach((card, index) => {
                card.classList.remove('is-active', 'is-prev', 'is-next');

                if (index === activeIndex) {
                    card.classList.add('is-active');
                } else if (index === (activeIndex - 1 + cards.length) % cards.length) {
                    // This handles the wrap-around for the previous card
                    card.classList.add('is-prev');
                } else if (index === (activeIndex + 1) % cards.length) {
                    // This handles the wrap-around for the next card
                    card.classList.add('is-next');
                }
            });

            // 2. Update Dot Classes
            dots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('is-active');
                } else {
                    dot.classList.remove('is-active');
                }
            });

            // 3. Update Details Text (on the right)
            const activeCard = cards[activeIndex];
            const eventName = activeCard.getAttribute('data-event-name');
            const details = activeCard.querySelector('.card-details'); // Get hidden details

            if (details) {
                // Get only the p content (description)
                const categoriesText = details.querySelector('p').innerHTML;
                const button = details.querySelector('a').cloneNode(true); // Clone button

                // Set the text content on the right
                detailTitle.textContent = eventName;
                detailCategories.innerHTML = categoriesText;

                // Update the register button
                detailButtonContainer.innerHTML = ''; // Clear old button
                detailButtonContainer.appendChild(button); // Add new button
            }
        }

        // --- Event Listeners for Buttons ---
        nextButton.addEventListener('click', () => {
            activeIndex = (activeIndex + 1) % cards.length; // Move next, wrap to start
            updateCardStack();
        });

        prevButton.addEventListener('click', () => {
            activeIndex = (activeIndex - 1 + cards.length) % cards.length; // Move prev, wrap to end
            updateCardStack();
        });

        // Set the initial state (show card 1)
        updateCardStack();
    }

    // Initialize the event card stack
    initCardStack('event-card-stack');


    // ==========================================
    // --- 3. ACHIEVEMENTS SCROLL ANIMATION ---
    // ==========================================
    
    /**
     * This function runs the animation for the achievements section
     * using the Web Animations API when it scrolls into view.
     */
    function animateAchievements() {
        const cards = document.querySelectorAll('#achievements .trophy-card');
        if (cards.length < 3) return; // Not enough cards to animate

        // --- Keyframes ---
        // Keyframes for the icons
        const iconKeyframesLeft = [
            { transform: 'translate(-150px, -50px) scale(0.5)', opacity: 0 },
            { transform: 'translate(0, 0) scale(1)', opacity: 1 }
        ];
        
        const iconKeyframesTop = [
            { transform: 'translateY(-150px) scale(0.5)', opacity: 0 },
            { transform: 'translate(0, 0) scale(1)', opacity: 1 }
        ];

        const iconKeyframesRight = [
            { transform: 'translate(150px, -50px) scale(0.5)', opacity: 0 },
            { transform: 'translate(0, 0) scale(1)', opacity: 1 }
        ];
        
        // Keyframes for the text (h3 and p)
        const textKeyframes = [
            { transform: 'translateY(20px)', opacity: 0 },
            { transform: 'translateY(0)', opacity: 1 }
        ];

        // --- Timings ---
        const iconTiming = { duration: 1000, easing: 'ease-out', fill: 'forwards' };
        const textTiming = { duration: 500, easing: 'ease-out', fill: 'forwards' };

        // --- Get elements for Card 1 (Left) ---
        const card1Icon = cards[0].querySelector('.trophy-image'); // UPDATED
        const card1H3 = cards[0].querySelector('h3');
        const card1P = cards[0].querySelector('p');
        
        // Animate elements if they exist
        if (card1Icon) {
            card1Icon.style.opacity = 0; // Set initial state
            card1Icon.animate(iconKeyframesLeft, { ...iconTiming, delay: 0 });
        }
        if (card1H3) {
            card1H3.style.opacity = 0;
            card1H3.animate(textKeyframes, { ...textTiming, delay: 1000 }); // After icon
        }
        if (card1P) {
            card1P.style.opacity = 0;
            card1P.animate(textKeyframes, { ...textTiming, delay: 1100 });
        }


        // --- Get elements for Card 2 (Top/Center) ---
        const card2Icon = cards[1].querySelector('.trophy-image'); // UPDATED
        const card2H3 = cards[1].querySelector('h3');
        const card2P = cards[1].querySelector('p');

        if (card2Icon) {
            card2Icon.style.opacity = 0;
            card2Icon.animate(iconKeyframesTop, { ...iconTiming, delay: 200 }); // Staggered start
        }
        if (card2H3) {
            card2H3.style.opacity = 0;
            card2H3.animate(textKeyframes, { ...textTiming, delay: 1200 });
        }
        if (card2P) {
            card2P.style.opacity = 0;
            card2P.animate(textKeyframes, { ...textTiming, delay: 1300 });
        }

        // --- Get elements for Card 3 (Right) ---
        const card3Icon = cards[2].querySelector('.trophy-image'); // UPDATED
        const card3H3 = cards[2].querySelector('h3');
        const card3P = cards[2].querySelector('p');
        
        if (card3Icon) {
            card3Icon.style.opacity = 0;
            card3Icon.animate(iconKeyframesRight, { ...iconTiming, delay: 400 }); // Staggered start
        }
        if (card3H3) {
            card3H3.style.opacity = 0;
            card3H3.animate(textKeyframes, { ...textTiming, delay: 1400 });
        }
        if (card3P) {
            card3P.style.opacity = 0;
            card3P.animate(textKeyframes, { ...textTiming, delay: 1500 });
        }
    }

    /**
     * Sets up Intersection Observers to trigger animations when elements scroll into view.
     */
    function initScrollAnimations() {
        // Get all elements that should fade in on scroll
        const scrollElements = document.querySelectorAll('.animate-on-scroll');
        
        // Create an observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // When the element is 20% visible
                if (entry.isIntersecting) {
                    
                    // Check which section is intersecting
                    if (entry.target.id === 'achievements') {
                        animateAchievements(); // Run the trophy animation
                        observer.unobserve(entry.target); // Stop observing
                    }
                    
                    // Check for generic scroll-in elements
                    if (entry.target.classList.contains('animate-on-scroll')) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target); // Stop observing
                    }
                }
            });
        }, { 
            threshold: 0.2 // Trigger when 20% of the element is visible
        });

        // Add the 'achievements' section to the observer
        const achievementsSection = document.getElementById('achievements');
        if (achievementsSection) {
            observer.observe(achievementsSection);
        }

        // Add all generic scroll elements to the observer
        scrollElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Initialize all scroll-triggered animations
    initScrollAnimations();

// Modal functions for image display
function showImageModal(imageSrc) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    modal.style.display = 'block';
    modalImg.src = imageSrc;
}

function closeImageModal() {
    const modal = document.getElementById('image-modal');
    modal.style.display = 'none';
}

// Close modal when clicking outside the image
window.onclick = function(event) {
    const modal = document.getElementById('image-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

}); // End of window.addEventListener('load')

