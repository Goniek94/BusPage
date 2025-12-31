// ============================================
// SERVICES SLIDER - Auto-slider for services section
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".service-card");
  const indicators = document.querySelectorAll(".service-dots .dot");

  if (slides.length === 0 || indicators.length === 0) return;

  let currentSlide = 0;
  const slideInterval = 5000; // 5 seconds
  let autoSlideTimer;

  // Show specific slide
  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => slide.classList.remove("active"));
    indicators.forEach((ind) => ind.classList.remove("active"));

    // Show selected slide
    slides[index].classList.add("active");
    indicators[index].classList.add("active");
    currentSlide = index;
  }

  // Move to next slide
  function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  // Start auto-slide
  function startAutoSlide() {
    autoSlideTimer = setInterval(nextSlide, slideInterval);
  }

  // Reset auto-slide timer
  function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  }

  // Handle indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showSlide(index);
      resetAutoSlide();
    });
  });

  // Start auto-slider
  startAutoSlide();

  // Pause auto-slider on hover
  const sliderContainer = document.querySelector(".services-right");
  if (sliderContainer) {
    sliderContainer.addEventListener("mouseenter", () => {
      clearInterval(autoSlideTimer);
    });
    sliderContainer.addEventListener("mouseleave", () => {
      startAutoSlide();
    });
  }
});
