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
