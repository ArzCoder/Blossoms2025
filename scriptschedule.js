// Schedule page JavaScript for month navigation

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
