// ============================================
// SERVICES FLIP CARDS
// Handle flip card interactions with 180° rotation
// ============================================

(function () {
  "use strict";

  // Wait for DOM to be fully loaded
  document.addEventListener("DOMContentLoaded", function () {
    initFlipCards();
  });

  function initFlipCards() {
    const flipCards = document.querySelectorAll(".flip-card");

    if (!flipCards.length) {
      console.warn("No flip cards found");
      return;
    }

    flipCards.forEach((card) => {
      const flipButton = card.querySelector(".flip-button");
      const flipBackButton = card.querySelector(".flip-button-back");

      if (!flipButton || !flipBackButton) {
        console.warn("Flip buttons not found in card");
        return;
      }

      // Flip to back
      flipButton.addEventListener("click", function (e) {
        e.preventDefault();
        card.classList.add("flipped");
      });

      // Flip to front
      flipBackButton.addEventListener("click", function (e) {
        e.preventDefault();
        card.classList.remove("flipped");
      });
    });

    // Preload images for better performance
    preloadCardImages();
  }

  // Preload all card images
  function preloadCardImages() {
    const images = document.querySelectorAll(
      ".flip-card-front .card-image img"
    );
    images.forEach((img) => {
      const src = img.getAttribute("src");
      if (src) {
        const preloadImg = new Image();
        preloadImg.src = src;
      }
    });
  }

  // Smooth scroll to services section
  const servicesLinks = document.querySelectorAll('a[href="#services"]');
  servicesLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const servicesSection = document.querySelector("#services");
      if (servicesSection) {
        servicesSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
})();
