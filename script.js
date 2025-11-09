// Hamburger menu toggle
const hamburgerMenu = document.querySelector(".hamburger-menu");
const hamburgerMenuToggle = document.querySelector(".hamburger-menu-toggle");

if (hamburgerMenuToggle) {
  hamburgerMenuToggle.onclick = () => {
    hamburgerMenu.classList.toggle("show");
  };
}

// ---- Vibrant Flashcard Slideshow ----
let currentFlash = 0;
const flashcards = document.querySelectorAll(".flashcard");
const dotsContainer = document.querySelector(".flash-dots");

function showFlash(index) {
  flashcards.forEach((card, i) => {
    card.classList.remove("active");
  });
  flashcards[index].classList.add("active");

  // Update dots
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.remove("active");
  });
  if (dots[index]) {
    dots[index].classList.add("active");
  }
}

function nextFlash() {
  currentFlash = (currentFlash + 1) % flashcards.length;
  showFlash(currentFlash);
}

function prevFlash() {
  currentFlash = (currentFlash - 1 + flashcards.length) % flashcards.length;
  showFlash(currentFlash);
}

function goToFlash(index) {
  currentFlash = index;
  showFlash(currentFlash);
}

// Create dots dynamically
if (flashcards.length > 0 && dotsContainer) {
  for (let i = 0; i < flashcards.length; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToFlash(i));
    dotsContainer.appendChild(dot);
  }
}

let slideshowInterval;

function startSlideshow() {
  slideshowInterval = setInterval(nextFlash, 4000);
}

function stopSlideshow() {
  clearInterval(slideshowInterval);
}

if (flashcards.length > 0) {
  showFlash(currentFlash);
  startSlideshow();

  // Pause on hover
  const slideshow = document.querySelector('.flashcard-slideshow');
  slideshow.addEventListener('mouseenter', stopSlideshow);
  slideshow.addEventListener('mouseleave', startSlideshow);
}
