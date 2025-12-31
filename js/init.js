// ============================================
// INITIALIZATION - Main app initialization
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== "undefined") {
    AOS.init({
      offset: 120,
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
    });
  }
});
