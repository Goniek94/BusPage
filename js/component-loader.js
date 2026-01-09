// ============================================
// COMPONENT LOADER - Loads HTML components
// Senior Developer Level - Clean Architecture
// ============================================

/**
 * Loads HTML component into specified container
 */
async function loadComponent(componentPath, containerId) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) {
      throw new Error(`Failed to load ${componentPath}: ${response.status}`);
    }
    const html = await response.text();
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = html;
    }
  } catch (error) {
    console.error(`Error loading component: ${error.message}`);
  }
}

/**
 * Loads all page components
 */
async function loadAllComponents() {
  const components = [
    { path: "components/header.html", id: "header-container" },
    { path: "components/hero.html", id: "hero-container" },
    { path: "components/about.html", id: "about-container" },
    { path: "components/services.html", id: "services-container" },
    { path: "components/stats.html", id: "stats-container" },
    { path: "components/contact.html", id: "contact-container" },
    { path: "components/footer.html", id: "footer-container" },
  ];

  // Load all components sequentially to maintain order
  for (const comp of components) {
    await loadComponent(comp.path, comp.id);
  }

  // Initialize all scripts after components are loaded
  initializeAllScripts();
}

/**
 * Initialize all scripts after components are loaded
 */
function initializeAllScripts() {
  // Initialize AOS
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
      offset: 100,
    });
  }

  // Initialize Menu
  initializeMenu();

  // Initialize Timeline
  initializeTimeline();

  // Initialize Services (flip cards)
  initializeServices();

  // Initialize Stats Counter
  initializeStatsCounter();

  // Initialize Smooth Scroll
  initializeSmoothScroll();

  console.log("All components and scripts initialized!");
}

/**
 * Initialize hamburger menu
 */
function initializeMenu() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const body = document.body;

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      const isActive = hamburger.classList.contains("active");
      if (isActive) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        body.classList.remove("menu-open");
      } else {
        hamburger.classList.add("active");
        navMenu.classList.add("active");
        body.classList.add("menu-open");
      }
    });

    // Close menu when clicking on links
    const navLinks = document.querySelectorAll("#nav-menu a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        body.classList.remove("menu-open");
      });
    });
  }
}

/**
 * Initialize timeline - uses Timeline class from timeline.js
 * Timeline class handles bus animation, story display, and navigation
 */
function initializeTimeline() {
  // Timeline is initialized by timeline.js which has the full Timeline class
  // We just need to trigger a custom event to let it know components are loaded
  if (typeof Timeline !== "undefined") {
    new Timeline();
  }
}

/**
 * Initialize flip cards
 */
function initializeServices() {
  const flipButtons = document.querySelectorAll(".flip-button");
  const flipBackButtons = document.querySelectorAll(".flip-button-back");

  flipButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".flip-card");
      if (card) card.classList.add("flipped");
    });
  });

  flipBackButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".flip-card");
      if (card) card.classList.remove("flipped");
    });
  });
}

/**
 * Initialize stats counter animation
 */
function initializeStatsCounter() {
  const counters = document.querySelectorAll(".stat-number");

  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };
    updateCounter();
  };

  // Use Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

/**
 * Initialize smooth scroll
 */
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// Load components when DOM is ready
document.addEventListener("DOMContentLoaded", loadAllComponents);
