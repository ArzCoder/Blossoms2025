/**
 * Countdown Timer Logic
 */

// --- SET YOUR TARGET DATE HERE ---
// Format: "Month Day, Year HH:MM:SS"
const countdownTargetDate = new Date("Dec 18, 2025 09:00:00").getTime();
// ---------------------------------

// Get all the card elements
const flipCards = document.querySelectorAll('.flip-card');

// Initialize the timer
updateAllCards();

// Start the countdown interval (runs every second)
const timerInterval = setInterval(() => {
    updateAllCards();
}, 1000);

/**
 * Main function to update all cards every second.
 */
function updateAllCards() {
    const now = new Date().getTime();
    const timeRemaining = countdownTargetDate - now;

    // Stop the timer if the date has passed
    if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        // You could also set all cards to '0' here
        return; 
    }

    // Calculate time parts
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Format numbers to two digits (e.g., "09")
    const daysStr = String(days).padStart(2, '0');
    const hoursStr = String(hours).padStart(2, '0');
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');

    // Update each flip card
    updateFlipCard(document.querySelector('[data-digit="days-tens"]'), daysStr[0]);
    updateFlipCard(document.querySelector('[data-digit="days-ones"]'), daysStr[1]);
    
    updateFlipCard(document.querySelector('[data-digit="hours-tens"]'), hoursStr[0]);
    updateFlipCard(document.querySelector('[data-digit="hours-ones"]'), hoursStr[1]);

    updateFlipCard(document.querySelector('[data-digit="minutes-tens"]'), minutesStr[0]);
    updateFlipCard(document.querySelector('[data-digit="minutes-ones"]'), minutesStr[1]);

    updateFlipCard(document.querySelector('[data-digit="seconds-tens"]'), secondsStr[0]);
    updateFlipCard(document.querySelector('[data-digit="seconds-ones"]'), secondsStr[1]);
}

/**
 * Updates a single flip card with a new number.
 * @param {HTMLElement} card - The .flip-card element.
 * @param {string} newNumber - The new single digit to display.
 */
function updateFlipCard(card, newNumber) {
    if (!card) return;

    const currentNumber = card.getAttribute('data-current') || card.querySelector('.top-half').textContent;

    // If the number is already correct, do nothing
    if (currentNumber === newNumber) {
        return;
    }

    // --- Start the flip animation ---

    // 1. Set the 'next' number (for the top half that flips down)
    card.setAttribute('data-next', newNumber);
    // 2. Set the 'current' number (for the bottom half that flips down)
    card.setAttribute('data-current', currentNumber);

    // 3. Set the static bottom half to the NEW number
    // (This is what you see *after* the flip)
    card.querySelector('.bottom-half').textContent = newNumber;

    // 4. Add the flipping class
    card.classList.add('is-flipping');

    // 5. Wait for the animation to end
    card.addEventListener('animationend', () => {
        // --- Clean up after animation ---

        // 1. Set the static top half to the NEW number
        card.querySelector('.top-half').textContent = newNumber;
        
        // 2. Update the 'current' data attribute to the NEW number
        card.setAttribute('data-current', newNumber);
        
        // 3. Remove the flipping class
        card.classList.remove('is-flipping');
        
    }, { once: true }); // Automatically remove this listener after it runs
}