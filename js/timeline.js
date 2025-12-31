// ============================================
// TIMELINE - "PODRÓŻ W CZASIE" - Z AUTOMATYCZNYM PRZEWIJANIEM
// Interactive timeline with animated bus and auto-scroll
// ============================================

class Timeline {
  constructor() {
    this.wrapper = document.querySelector(".timeline-wrapper");
    this.track = document.querySelector(".timeline-track");
    this.items = document.querySelectorAll(".timeline-item");
    this.bus = document.querySelector(".timeline-bus");
    this.navLeft = document.querySelector(".timeline-nav-left button");
    this.navRight = document.querySelector(".timeline-nav-right button");

    if (!this.wrapper || !this.track) return;

    // Auto-scroll settings
    this.autoScrollEnabled = true;
    this.autoScrollSpeed = 0.5; // pixels per frame
    this.autoScrollInterval = null;
    this.userInteracted = false;
    this.pauseDuration = 3000; // pause for 3 seconds after user interaction

    this.init();
  }

  init() {
    // Initialize navigation
    this.setupNavigation();

    // Setup scroll sync for bus
    this.setupBusAnimation();

    // Setup item interactions
    this.setupItemInteractions();

    // Setup user interaction detection
    this.setupUserInteractionDetection();

    // Start auto-scroll after a short delay
    setTimeout(() => {
      this.startAutoScroll();
    }, 1000);

    // Update nav buttons on scroll
    this.wrapper.addEventListener("scroll", () => this.updateNavButtons());
    this.updateNavButtons();
  }

  setupNavigation() {
    if (this.navLeft) {
      this.navLeft.addEventListener("click", () => {
        this.pauseAutoScroll();
        this.scrollLeft();
      });
    }

    if (this.navRight) {
      this.navRight.addEventListener("click", () => {
        this.pauseAutoScroll();
        this.scrollRight();
      });
    }
  }

  scrollLeft() {
    this.wrapper.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  }

  scrollRight() {
    this.wrapper.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  }

  updateNavButtons() {
    const scrollLeft = this.wrapper.scrollLeft;
    const maxScroll = this.wrapper.scrollWidth - this.wrapper.clientWidth;

    // Disable left button at start
    if (this.navLeft) {
      this.navLeft.disabled = scrollLeft <= 0;
    }

    // Disable right button at end
    if (this.navRight) {
      this.navRight.disabled = scrollLeft >= maxScroll - 10;
    }
  }

  setupBusAnimation() {
    if (!this.bus) return;

    this.wrapper.addEventListener("scroll", () => {
      const scrollPercentage =
        this.wrapper.scrollLeft /
        (this.wrapper.scrollWidth - this.wrapper.clientWidth);

      // Move bus based on scroll
      const maxBusPosition = this.track.offsetWidth - 100;
      const busPosition = scrollPercentage * maxBusPosition;

      this.bus.style.left = `${busPosition}px`;
    });
  }

  setupItemInteractions() {
    this.items.forEach((item, index) => {
      const marker = item.querySelector(".timeline-marker");

      if (marker) {
        // Click to activate
        marker.addEventListener("click", () => {
          this.pauseAutoScroll();
          this.activateItem(item, index);
        });

        // Touch support for mobile
        marker.addEventListener("touchstart", (e) => {
          e.preventDefault();
          this.pauseAutoScroll();
          this.activateItem(item, index);
        });
      }
    });
  }

  setupUserInteractionDetection() {
    // Pause auto-scroll when user manually scrolls
    let scrollTimeout;
    this.wrapper.addEventListener("scroll", () => {
      if (!this.autoScrollEnabled) return;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // Resume auto-scroll after user stops scrolling
        if (this.userInteracted) {
          this.resumeAutoScroll();
        }
      }, 2000);
    });

    // Detect manual scroll
    this.wrapper.addEventListener("wheel", () => {
      this.pauseAutoScroll();
    });

    this.wrapper.addEventListener("touchstart", () => {
      this.pauseAutoScroll();
    });
  }

  startAutoScroll() {
    if (this.autoScrollInterval) return;

    this.autoScrollInterval = requestAnimationFrame(() =>
      this.autoScrollStep()
    );
  }

  autoScrollStep() {
    if (!this.autoScrollEnabled) return;

    const maxScroll = this.wrapper.scrollWidth - this.wrapper.clientWidth;
    const currentScroll = this.wrapper.scrollLeft;

    // Check if we reached the end
    if (currentScroll >= maxScroll - 1) {
      // Reset to beginning
      this.wrapper.scrollTo({
        left: 0,
        behavior: "smooth",
      });

      // Wait a bit before continuing
      setTimeout(() => {
        if (this.autoScrollEnabled) {
          this.autoScrollInterval = requestAnimationFrame(() =>
            this.autoScrollStep()
          );
        }
      }, 2000);
    } else {
      // Continue scrolling
      this.wrapper.scrollLeft += this.autoScrollSpeed;
      this.autoScrollInterval = requestAnimationFrame(() =>
        this.autoScrollStep()
      );
    }
  }

  pauseAutoScroll() {
    this.autoScrollEnabled = false;
    this.userInteracted = true;

    if (this.autoScrollInterval) {
      cancelAnimationFrame(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }

    // Resume after pause duration
    setTimeout(() => {
      this.resumeAutoScroll();
    }, this.pauseDuration);
  }

  resumeAutoScroll() {
    this.autoScrollEnabled = true;
    this.userInteracted = false;
    this.startAutoScroll();
  }

  activateItem(item, index) {
    // Remove active class from all items
    this.items.forEach((i) => i.classList.remove("active"));

    // Add active class to clicked item
    item.classList.add("active");

    // Scroll item into view
    const itemRect = item.getBoundingClientRect();
    const wrapperRect = this.wrapper.getBoundingClientRect();
    const scrollLeft =
      this.wrapper.scrollLeft +
      itemRect.left -
      wrapperRect.left -
      wrapperRect.width / 2 +
      itemRect.width / 2;

    this.wrapper.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });
  }
}

// Initialize timeline when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new Timeline();
});

// Reinitialize on window resize
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    new Timeline();
  }, 250);
});
