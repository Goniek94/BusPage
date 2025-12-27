// ============================================
// TIMELINE - "PODRÓŻ W CZASIE"
// Interactive timeline with animated bus
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

    this.init();
  }

  init() {
    // Initialize navigation
    this.setupNavigation();

    // Setup scroll sync for bus
    this.setupBusAnimation();

    // Setup item interactions
    this.setupItemInteractions();

    // Auto-scroll on load
    this.autoScrollToCenter();

    // Update nav buttons on scroll
    this.wrapper.addEventListener("scroll", () => this.updateNavButtons());
    this.updateNavButtons();
  }

  setupNavigation() {
    if (this.navLeft) {
      this.navLeft.addEventListener("click", () => this.scrollLeft());
    }

    if (this.navRight) {
      this.navRight.addEventListener("click", () => this.scrollRight());
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

      // Add bounce effect when scrolling
      this.bus.style.animation = "none";
      setTimeout(() => {
        this.bus.style.animation = "";
      }, 10);
    });
  }

  setupItemInteractions() {
    this.items.forEach((item, index) => {
      const marker = item.querySelector(".timeline-marker");

      if (marker) {
        // Click to activate
        marker.addEventListener("click", () => {
          this.activateItem(item, index);
        });

        // Touch support for mobile
        marker.addEventListener("touchstart", (e) => {
          e.preventDefault();
          this.activateItem(item, index);
        });
      }
    });
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

    // Move bus to item
    if (this.bus) {
      const itemPosition = item.offsetLeft;
      this.bus.style.transition = "left 1s ease-in-out";
      this.bus.style.left = `${itemPosition}px`;

      setTimeout(() => {
        this.bus.style.transition = "";
      }, 1000);
    }
  }

  autoScrollToCenter() {
    // Auto-scroll to show middle items on load
    setTimeout(() => {
      const centerScroll =
        (this.wrapper.scrollWidth - this.wrapper.clientWidth) / 2;
      this.wrapper.scrollTo({
        left: centerScroll,
        behavior: "smooth",
      });
    }, 500);
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
