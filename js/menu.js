// ============================================
// MENU - Fullscreen Hamburger Menu for Mobile
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const body = document.body;

  // Toggle menu on hamburger click
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      const isActive = hamburger.classList.contains("active");

      if (isActive) {
        // Close menu
        closeMenu();
      } else {
        // Open menu
        openMenu();
      }
    });

    // Close menu when clicking on navigation links
    const navLinks = document.querySelectorAll("#nav-menu a");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        // Allow smooth scroll to work
        closeMenu();
      });
    });

    // Close menu when clicking outside (on the overlay)
    navMenu.addEventListener("click", (event) => {
      // Only close if clicking directly on the nav (overlay), not on ul or links
      if (event.target === navMenu) {
        closeMenu();
      }
    });

    // Close menu on ESC key press
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navMenu.classList.contains("active")) {
        closeMenu();
      }
    });
  }

  // Function to open menu
  function openMenu() {
    hamburger.classList.add("active");
    navMenu.classList.add("active");
    body.classList.add("menu-open");

    // Prevent background scrolling on mobile
    const scrollY = window.scrollY;
    body.style.top = `-${scrollY}px`;
  }

  // Function to close menu
  function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    body.classList.remove("menu-open");

    // Restore scroll position
    const scrollY = body.style.top;
    body.style.top = "";
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }

  // Handle window resize - close menu if resizing to desktop
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768 && navMenu.classList.contains("active")) {
        closeMenu();
      }
    }, 250);
  });
});
