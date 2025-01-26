// Mobile Hero Slideshow Logic
let currentHeroSlide = 0;
const heroSlides = document.querySelectorAll('.hero-slide');

function showHeroSlide(index) {
  if (index < 0) {
    currentHeroSlide = heroSlides.length - 1;
  } else if (index >= heroSlides.length) {
    currentHeroSlide = 0;
  } else {
    currentHeroSlide = index;
  }

  heroSlides.forEach((slide, i) => {
    slide.classList.remove('active');
  });

  heroSlides[currentHeroSlide].classList.add('active');
}

// Change slide every 5 seconds for mobile
setInterval(() => {
  showHeroSlide(currentHeroSlide + 1);
}, 5000);

// Initial render
showHeroSlide(currentHeroSlide);

// Toggle mobile menu visibility
function toggleMenu() {
  const menu = document.querySelector('header nav ul');
  menu.classList.toggle('active');
}
// Mobile Hero Slideshow Logic
const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".slideshow-dot");
let currentSlide = 0;

// Show a specific slide
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

// Next slide logic
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Set interval for automatic sliding
setInterval(nextSlide, 3000);

// Add dot navigation functionality
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});

// Initialize
showSlide(currentSlide);
