// Schedule page JavaScript for month navigation

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

            // Randomize size slightly (smaller for better performance)
            const size = Math.random() * 5 + 10; // 10-15px
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';

            // Animate the particle
            let x = startX;
            let y = startY;
            let opacity = 0.7;
            const speedX = directionX * (Math.random() * 1 + 0.5); // Random speed (slower)
            const speedY = directionY * (Math.random() * 1 + 0.5);
            const fadeSpeed = 0.01; // Faster fade out

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

        // Create particles every 1000ms (reduced frequency to improve performance)
        setInterval(() => {
            // From left bottom corner, moving diagonally up-right (1-2 particles)
            for (let i = 0; i < Math.floor(Math.random() * 2) + 1; i++) {
                createParticle(-50, -50, 1, 1);
            }

            // From right bottom corner, moving diagonally up-left (1-2 particles)
            for (let i = 0; i < Math.floor(Math.random() * 2) + 1; i++) {
                createParticle(window.innerWidth + 50, -50, -1, 1);
            }
        }, 1000);
    }

    // Initialize flower particles
    initFlowerParticles();

});

document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const calendarFlashcards = document.querySelectorAll('.calendar-flashcard');

    // Initially show November and hide December
    document.getElementById('november').style.display = 'block';
    document.getElementById('december').style.display = 'none';
    document.querySelector('[data-month="november"]').classList.add('active');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            navButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get the month to show
            const monthToShow = this.getAttribute('data-month');

            // Hide all calendar flashcards
            calendarFlashcards.forEach(card => {
                card.style.display = 'none';
            });

            // Show the selected month
            const selectedCard = document.getElementById(monthToShow);
            if (selectedCard) {
                selectedCard.style.display = 'block';
            }
        });
    });
});
