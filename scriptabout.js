/**
 * Script for About Page
 * Includes:
 * 1. Typing Animation for Hero Description
 * 2. Staggered Fade-in Animations for Sections
 * 3. Scroll Animations
 */

// Wait for the entire page to load before starting any animations
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

    // --- HEADER ANIMATIONS (same as index.html) ---

    // Scene 1: Logo scaling animation
    const logoContainer = document.getElementById('logo-container');
    if (logoContainer) {
        logoContainer.style.visibility = 'visible'; // Make visible immediately
        logoContainer.style.opacity = '1'; // Make visible immediately
        logoContainer.style.transform = 'scale(1)'; // Start at full scale
    }

    // Scene 2: Navigation links fade-in
    const nav = document.getElementById('main-nav');
    if (nav) {
        nav.style.visibility = 'visible'; // Make visible immediately
        nav.style.opacity = '1'; // Make visible immediately
        setTimeout(() => {
            nav.style.transition = 'opacity 0.5s ease-in-out';
            nav.style.opacity = '1';
        }, 1500);
    }

    // Scene 3: Collage logo fade-in
    const collageLogo = document.getElementById('collage-logo');
    if (collageLogo) {
        collageLogo.style.visibility = 'visible'; // Make visible immediately
        collageLogo.style.opacity = '1'; // Make visible immediately
        setTimeout(() => {
            collageLogo.style.transition = 'opacity 1s ease-in-out';
            collageLogo.style.opacity = '1';
        }, 2000);
    }

    // --- 1. HERO LOGO ANIMATION ---
    const heroLogo = document.querySelector('.hero-logo');
    if (heroLogo) {
        heroLogo.style.opacity = '0';
        heroLogo.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroLogo.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            heroLogo.style.opacity = '1';
            heroLogo.style.transform = 'translateY(0)';
        }, 500);
    }

    // --- 2. STAGGERED FADE-IN ANIMATIONS ---
    function initStaggeredAnimations() {
        const journeyPhases = document.querySelectorAll('.journey-phase');
        const detailItems = document.querySelectorAll('.detail-item');
        const callToAction = document.querySelector('.call-to-action');

        // Animate journey phases with stagger
        journeyPhases.forEach((phase, index) => {
            phase.style.opacity = '0';
            phase.style.transform = 'translateY(30px)';
            setTimeout(() => {
                phase.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                phase.style.opacity = '1';
                phase.style.transform = 'translateY(0)';
            }, index * 300); // Stagger delay
        });

        // Animate team details with stagger
        detailItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            setTimeout(() => {
                item.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, (journeyPhases.length * 300) + (index * 200)); // Start after journey phases
        });

        // Animate call-to-action
        if (callToAction) {
            callToAction.style.opacity = '0';
            callToAction.style.transform = 'scale(0.95)';
            setTimeout(() => {
                callToAction.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
                callToAction.style.opacity = '1';
                callToAction.style.transform = 'scale(1)';
            }, (journeyPhases.length * 300) + (detailItems.length * 200) + 500); // Start after details
        }
    }

    // Initialize staggered animations
    initStaggeredAnimations();

    // --- 3. SCROLL ANIMATIONS ---
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