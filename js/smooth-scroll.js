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

  // Hamburger menu toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
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
