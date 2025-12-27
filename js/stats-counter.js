// ============================================
// STATS COUNTER - Animowane liczniki
// ============================================

class StatsCounter {
  constructor() {
    this.counters = document.querySelectorAll(".stat-number[data-target]");
    this.hasAnimated = false;

    if (this.counters.length > 0) {
      this.init();
    }
  }

  init() {
    // Intersection Observer dla animacji przy scrollu
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.hasAnimated = true;
            this.animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    // Obserwuj pierwszą kartę statystyk
    const firstCard = document.querySelector(".stat-card");
    if (firstCard) {
      observer.observe(firstCard);
    }
  }

  animateCounters() {
    this.counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      const duration = 2000; // 2 sekundy
      const increment = target / (duration / 16); // 60 FPS
      let current = 0;

      const updateCounter = () => {
        current += increment;

        if (current < target) {
          counter.textContent = this.formatNumber(Math.floor(current));
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = this.formatNumber(target);
        }
      };

      updateCounter();
    });
  }

  formatNumber(num) {
    // Format liczb z separatorami tysięcy
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(".", ",") + "M";
    } else if (num >= 1000) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    return num.toString();
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new StatsCounter();
});
