// ============================================
// MENU - Hamburger menu functionality
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  // Toggle menu on hamburger click
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close menu when clicking on navigation links
    const navLinks = document.querySelectorAll("#nav-menu a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      const isClickInsideMenu = navMenu.contains(event.target);
      const isClickOnHamburger = hamburger.contains(event.target);

      if (
        !isClickInsideMenu &&
        !isClickOnHamburger &&
        navMenu.classList.contains("active")
      ) {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
      }
    });
  }
});
