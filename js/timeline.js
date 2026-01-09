// ============================================
// TIMELINE - "PODRÓŻ W CZASIE" - NATYCHMIASTOWE PRZEMIESZCZANIE
// Bus moves instantly to next point, arrows at story card
// ============================================

// History data with all key years from 1992 to 2002
const historyData = {
  1992: {
    title: "Początek Działalności",
    description:
      "Początki bywają trudne, ale pełne pasji. Nasza pierwsza trasa prowadziła tylko do sąsiedniej gminy, ale już wtedy wiedzieliśmy, że transport to nasza przyszłość. Z jednym autobusem i garścią klientów rozpoczęliśmy przygodę, która trwa do dziś.",
    fact: "Ciekawostka: Nasz pierwszy autobus miał tylko 20 miejsc!",
  },
  1993: {
    title: "Pierwsze Sukcesy",
    description:
      "Po roku działalności zdobyliśmy zaufanie lokalnych firm. Regularnie obsługiwaliśmy już kilka tras, a nasza reputacja rosła z każdym miesiącem. To był czas intensywnej nauki i budowania relacji z klientami.",
    fact: "Ciekawostka: W 1993 roku mieliśmy już 2 autobusy w flocie!",
  },
  1994: {
    title: "Rozbudowa Tras",
    description:
      "Rozszerzyliśmy nasze trasy o kolejne gminy. Coraz więcej osób korzystało z naszych usług, co pozwoliło nam na dalszy rozwój i inwestycje w nowe pojazdy.",
    fact: "Ciekawostka: Obsługiwaliśmy już 5 różnych tras regularnych!",
  },
  1995: {
    title: "Rozwój Floty",
    description:
      "Po trzech latach ciężkiej pracy osiągnęliśmy pierwszy wielki kamień milowy - rozbudowę floty do 5 pojazdów. To był moment, kiedy z małej lokalnej firmy staliśmy się poważnym graczem na rynku transportu regionalnego.",
    fact: "Ciekawostka: W 1995 roku przewieźliśmy już ponad 30 000 pasażerów!",
  },
  1996: {
    title: "Nowe Kierunki",
    description:
      "Rozpoczęliśmy obsługę nowych kierunków, w tym tras do większych miast. Nasi klienci doceniali punktualność i komfort podróży.",
    fact: "Ciekawostka: Pierwsza trasa międzymiastowa liczyła 120 km!",
  },
  1997: {
    title: "Modernizacja",
    description:
      "Zainwestowaliśmy w modernizację floty. Nowe autobusy z klimatyzacją i wygodnymi fotelami podniosły standard naszych usług.",
    fact: "Ciekawostka: Byliśmy jedną z pierwszych firm w regionie z klimatyzowanymi autobusami!",
  },
  1998: {
    title: "10 Pojazdów w Flocie",
    description:
      "Po sześciu latach działalności nasza flota liczyła już 10 pojazdów. Obsługiwaliśmy dziesiątki tras i tysiące zadowolonych pasażerów.",
    fact: "Ciekawostka: W 1998 roku przewieźliśmy ponad 50 000 pasażerów!",
  },
  1999: {
    title: "Przygotowania do Nowego Tysiąclecia",
    description:
      "Rok przygotowań do nowego tysiąclecia. Planowaliśmy dalszą ekspansję i rozwój usług turystycznych.",
    fact: "Ciekawostka: Planowaliśmy pierwszą wycieczkę zagraniczną na rok 2000!",
  },
  2000: {
    title: "Nowe Tysiąclecie",
    description:
      "Wkroczyliśmy w nowe tysiąclecie z ambitnymi planami. Rozpoczęliśmy organizację wycieczek turystycznych po Polsce.",
    fact: "Ciekawostka: Pierwsza wycieczka turystyczna prowadziła nad morze - 60 szczęśliwych turystów!",
  },
  2001: {
    title: "Wycieczki Krajowe",
    description:
      "Rozwinęliśmy ofertę wycieczek krajowych. Od Mazur po Tatry, od Bałtyku po Karkonosze - nasze autobusy woziły turystów w najpiękniejsze zakątki kraju.",
    fact: "Ciekawostka: Najpopularniejszym kierunkiem były Mazury!",
  },
  2002: {
    title: "Przejazdy Turystyczne",
    description:
      "Rozpoczęliśmy organizację wycieczek turystycznych po Polsce i Europie. Nasza oferta turystyczna cieszyła się coraz większym zainteresowaniem.",
    fact: "Ciekawostka: Pierwsza wycieczka zagraniczna prowadziła do Pragi - 45 szczęśliwych turystów!",
  },
};

// Get all years sorted
const keyYears = Object.keys(historyData)
  .map(Number)
  .sort((a, b) => a - b);

class Timeline {
  constructor() {
    this.track = document.querySelector(".timeline-track");
    this.wrapper = document.querySelector(".timeline-wrapper");
    this.items = document.querySelectorAll(".timeline-item");
    this.bus = document.querySelector(".timeline-bus");
    this.storyDisplay = document.getElementById("story-display");
    this.prevBtn = document.getElementById("timeline-prev");
    this.nextBtn = document.getElementById("timeline-next");
    this.progressBar = document.querySelector(".timeline-progress-bar");

    this.currentIndex = 0;
    this.isAnimating = false;

    if (!this.track || !this.wrapper || !this.bus) return;

    this.init();
  }

  init() {
    // Setup navigation
    this.setupNavigation();

    // Set initial position (first year - bus at the beginning)
    this.goToIndex(0, false);

    // Update button states
    this.updateButtonStates();
  }

  setupNavigation() {
    // Arrow buttons - at the story card
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.prev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.next());
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.prev();
      if (e.key === "ArrowRight") this.next();
    });

    // Click on timeline items
    this.items.forEach((item, index) => {
      item.addEventListener("click", () => {
        this.goToIndex(index, true);
      });
      item.style.cursor = "pointer";
    });
  }

  prev() {
    if (this.isAnimating || this.currentIndex <= 0) return;
    this.goToIndex(this.currentIndex - 1, true);
  }

  next() {
    if (this.isAnimating || this.currentIndex >= keyYears.length - 1) return;
    this.goToIndex(this.currentIndex + 1, true);
  }

  goToIndex(index, animate = true) {
    if (index < 0 || index >= keyYears.length) return;
    if (this.isAnimating && animate) return;

    this.currentIndex = index;
    const year = keyYears[index];

    if (animate) {
      this.isAnimating = true;
    }

    // Get target item position
    const targetItem = this.items[index];
    if (!targetItem) return;

    const marker = targetItem.querySelector(".timeline-marker");
    if (!marker) return;

    // Calculate bus position - move bus to the marker position
    const trackRect = this.track.getBoundingClientRect();
    const markerRect = marker.getBoundingClientRect();

    // Position relative to track - center bus on marker
    const busWidth = 80; // Bus width from CSS
    const busX =
      markerRect.left - trackRect.left + markerRect.width / 2 - busWidth / 2;

    // Move bus instantly (no transition)
    this.bus.style.transition = "none";
    this.bus.style.left = `${busX}px`;

    // Update active state on items
    this.items.forEach((item, i) => {
      item.classList.toggle("active", i === index);
    });

    // Update progress bar
    this.updateProgressBar();

    // Update story display
    this.updateStory(year);

    // Update button states
    this.updateButtonStates();

    // Reset animation flag
    if (animate) {
      setTimeout(() => {
        this.isAnimating = false;
      }, 100);
    }
  }

  updateProgressBar() {
    if (!this.progressBar) return;

    const progress = (this.currentIndex / (keyYears.length - 1)) * 100;
    this.progressBar.style.width = `${progress}%`;
  }

  updateStory(year) {
    if (!this.storyDisplay || !historyData[year]) return;

    const data = historyData[year];

    // Update content immediately
    const yearBg = this.storyDisplay.querySelector(".story-year-bg");
    const title = this.storyDisplay.querySelector(".story-title");
    const description = this.storyDisplay.querySelector(".story-description");
    const factText = this.storyDisplay.querySelector(".fact-text");

    if (yearBg) yearBg.textContent = year;
    if (title) title.textContent = data.title;
    if (description) description.textContent = data.description;
    if (factText) factText.textContent = data.fact;

    // Quick fade effect
    this.storyDisplay.style.transition = "opacity 0.2s ease";
    this.storyDisplay.style.opacity = "0.8";
    setTimeout(() => {
      this.storyDisplay.style.opacity = "1";
    }, 100);
  }

  updateButtonStates() {
    if (this.prevBtn) {
      const disabled = this.currentIndex <= 0;
      this.prevBtn.disabled = disabled;
      this.prevBtn.style.opacity = disabled ? "0.3" : "1";
      this.prevBtn.style.pointerEvents = disabled ? "none" : "auto";
    }

    if (this.nextBtn) {
      const disabled = this.currentIndex >= keyYears.length - 1;
      this.nextBtn.disabled = disabled;
      this.nextBtn.style.opacity = disabled ? "0.3" : "1";
      this.nextBtn.style.pointerEvents = disabled ? "none" : "auto";
    }
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Small delay to ensure components are loaded
  setTimeout(() => {
    new Timeline();
  }, 100);
});

// Reinitialize on window resize (debounced)
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    new Timeline();
  }, 250);
});
