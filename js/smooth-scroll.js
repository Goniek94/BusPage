// Smooth scroll for all anchor links
document.addEventListener("DOMContentLoaded", function () {
  // Get all anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");

      // Skip if it's just "#"
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      // Close mobile menu after clicking a link
      const navMenu = document.getElementById("nav-menu");
      const hamburger = document.getElementById("hamburger");
      if (navMenu && hamburger) {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
      }
    });
  });

  // Hamburger menu toggle - REMOVED
  // This is now handled by menu.js to avoid conflicts
  // menu.js has more advanced logic (scroll blocking, ESC key, etc.)
});
