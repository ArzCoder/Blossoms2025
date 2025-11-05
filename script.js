const hamburgerMenu = document.querySelector(".hamburger-menu");
const hamburgerMenuToggle = document.querySelector(".hamburger-menu-toggle");

if (hamburgerMenuToggle) {
  hamburgerMenuToggle.onclick = () => {
    hamburgerMenu.classList.toggle("show");
  };
}

let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

if (slides.length > 0) {
  showSlide(currentSlide);
  setInterval(nextSlide, 4000);
}

// Calendar Navigation
const navBtns = document.querySelectorAll('.nav-btn');
const calendarFlashcards = document.querySelectorAll('.calendar-flashcard');

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const month = btn.getAttribute('data-month');
    
    // Remove active class from all buttons
    navBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');
    
    // Hide all calendars
    calendarFlashcards.forEach(card => {
      card.style.display = 'none';
    });
    
    // Show selected calendar
    const selectedCalendar = document.getElementById(month);
    if (selectedCalendar) {
      selectedCalendar.style.display = 'block';
    }
  });
});
