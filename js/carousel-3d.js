// ============================================
// 3D CAROUSEL - Services
// ============================================

class Carousel3D {
  constructor() {
    this.wrapper = document.getElementById("carousel-wrapper");
    this.cards = document.querySelectorAll(".carousel-card");
    this.prevBtn = document.getElementById("carousel-prev");
    this.nextBtn = document.getElementById("carousel-next");
    this.dots = document.querySelectorAll(".carousel-dots .dot");

    this.currentIndex = 0;
    this.totalCards = this.cards.length;

    if (this.cards.length > 0) {
      this.init();
    }
  }

  init() {
    // Navigation buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.prev());
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.next());
    }

    // Dots navigation
    this.dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        const index = parseInt(e.target.getAttribute("data-index"));
        this.goToSlide(index);
      });
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.prev();
      if (e.key === "ArrowRight") this.next();
    });

    // Touch/Swipe support
    this.setupSwipe();

    // Card flip functionality
    this.setupCardFlip();

    // Auto-rotate - karty się ruszają automatycznie
    this.startAutoRotate();
  }

  setupCardFlip() {
    // Add click event to all CTA buttons
    document.querySelectorAll(".carousel-cta").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent carousel navigation
        const card = e.target.closest(".carousel-card");
        if (card && card.classList.contains("active")) {
          card.classList.toggle("flipped");
        }
      });
    });
  }

  updateCards() {
    this.cards.forEach((card, index) => {
      // Remove all classes
      card.classList.remove("active", "left", "right", "hidden");

      // Calculate position relative to current
      const diff = index - this.currentIndex;

      if (diff === 0) {
        card.classList.add("active");
      } else if (diff === -1 || diff === this.totalCards - 1) {
        card.classList.add("left");
      } else if (diff === 1 || diff === -(this.totalCards - 1)) {
        card.classList.add("right");
      } else {
        card.classList.add("hidden");
      }
    });

    // Update dots
    this.dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentIndex);
    });
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.totalCards;
    this.updateCards();
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.totalCards) % this.totalCards;
    this.updateCards();
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateCards();
  }

  setupSwipe() {
    let startX = 0;
    let endX = 0;

    this.wrapper.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    this.wrapper.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      this.handleSwipe(startX, endX);
    });

    // Mouse drag support
    let isDragging = false;

    this.wrapper.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.clientX;
    });

    this.wrapper.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
    });

    this.wrapper.addEventListener("mouseup", (e) => {
      if (!isDragging) return;
      isDragging = false;
      endX = e.clientX;
      this.handleSwipe(startX, endX);
    });

    this.wrapper.addEventListener("mouseleave", () => {
      isDragging = false;
    });
  }

  handleSwipe(startX, endX) {
    const threshold = 50; // Minimum swipe distance
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.next(); // Swipe left
      } else {
        this.prev(); // Swipe right
      }
    }
  }

  startAutoRotate() {
    setInterval(() => {
      this.next();
    }, 5000); // Rotate every 5 seconds
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new Carousel3D();
});
