// ============================================
// TIMELINE - "PODRÓŻ W CZASIE" - Z NAWIGACJĄ STRZAŁKAMI
// Interactive timeline with arrow navigation
// Bus moves smoothly between years with animations
// ============================================

// Extended history data with all key years
const historyData = {
  1992: {
    title: "Początek Działalności",
    description:
      "Początki bywają trudne, ale pełne pasji. Nasza pierwsza trasa prowadziła tylko do sąsiedniej gminy, ale już wtedy wiedzieliśmy, że transport to nasza przyszłość. Z jednym autobusem i garścią klientów rozpoczęliśmy przygodę, która trwa do dziś.",
    fact: "Ciekawostka: Nasz pierwszy autobus miał tylko 20 miejsc!",
  },
  1998: {
    title: "Rozwój Floty",
    description:
      "Po sześciu latach ciężkiej pracy osiągnęliśmy pierwszy wielki kamień milowy - rozbudowę floty do 10 pojazdów. To był moment, kiedy z małej lokalnej firmy staliśmy się poważnym graczem na rynku transportu regionalnego. Każdy nowy autobus to nowe możliwości i nowi zadowoleni klienci.",
    fact: "Ciekawostka: W 1998 roku przewieźliśmy już ponad 50 000 pasażerów!",
  },
  2002: {
    title: "Przejazdy Turystyczne",
    description:
      "Rozpoczęliśmy organizację wycieczek turystycznych po Polsce i Europie. Od Mazur po Tatry, od Bałtyku po Karkonosze - nasze autobusy woziły turystów w najpiękniejsze zakątki kraju. To był początek nowej ery w naszej działalności, która otworzyła nam drzwi do międzynarodowego rynku turystycznego.",
    fact: "Ciekawostka: Pierwsza wycieczka zagraniczna prowadziła do Pragi - 45 szczęśliwych turystów!",
  },
  2004: {
    title: "Wejście do UE",
    description:
      "Wejście Polski do Unii Europejskiej otworzyło przed nami nowe możliwości. Rozszerzyliśmy nasze trasy międzynarodowe, oferując przewozy do Niemiec, Czech, Słowacji i Austrii. Nowe rynki, nowe wyzwania, ale przede wszystkim - nowe możliwości rozwoju dla naszej firmy.",
    fact: "Ciekawostka: W pierwszym roku po wejściu do UE nasze autobusy przejechały ponad 500 000 km tras międzynarodowych!",
  },
  2005: {
    title: "Certyfikaty Jakości",
    description:
      "Rok 2005 przyniósł nam oficjalne uznanie za wysoką jakość usług. Otrzymaliśmy certyfikaty bezpieczeństwa i jakości ISO, które potwierdziły nasz profesjonalizm. To był dowód na to, że nasze standardy obsługi i dbałość o bezpieczeństwo pasażerów są na najwyższym poziomie.",
    fact: "Ciekawostka: Byliśmy jedną z pierwszych firm transportowych w regionie z pełną certyfikacją ISO!",
  },
  2007: {
    title: "Nowe Autobusy Premium",
    description:
      "Zakup pierwszych klimatyzowanych autobusów premium był przełomem w naszej ofercie. Komfort podróży na najwyższym poziomie - klimatyzacja, wygodne fotele, system audio-video. Nasi pasażerowie docenili te udogodnienia, a my zyskaliśmy przewagę konkurencyjną na rynku.",
    fact: "Ciekawostka: Nasze nowe autobusy miały nawet małe lodówki na napoje!",
  },
  2009: {
    title: "Transport Korporacyjny",
    description:
      "Specjalizacja w transporcie pracowniczym dla dużych firm otworzyła nam drzwi do stabilnych, długoterminowych kontraktów. Codziennie wozimy setki pracowników do zakładów produkcyjnych, biur i centrów logistycznych. Punktualność i niezawodność to nasze drugie imię.",
    fact: "Ciekawostka: Codziennie przewozimy pracowników dla ponad 50 firm!",
  },
  2010: {
    title: "Ekspansja Ogólnopolska",
    description:
      "Dekada działalności za nami i wielki krok naprzód - rozszerzenie działalności na całą Polskę. Nasze autobusy zaczęły jeździć nie tylko po regionie, ale po całym kraju. Nowe trasy, nowe wyzwania, ale przede wszystkim - nowe możliwości dla naszych klientów. Otworzyliśmy oddziały w kilku miastach Polski.",
    fact: "Ciekawostka: W 2010 roku nasze autobusy przejechały łącznie ponad 1 milion kilometrów!",
  },
  2012: {
    title: "System Rezerwacji Online",
    description:
      "Wdrożenie nowoczesnego systemu rezerwacji przez internet było krokiem w przyszłość. Klienci mogą teraz zarezerwować przejazd z domu, sprawdzić dostępność miejsc i opłacić bilet online. Technologia w służbie wygody pasażerów.",
    fact: "Ciekawostka: W pierwszym miesiącu działania systemu online zarezerwowano ponad 1000 biletów!",
  },
  2014: {
    title: "Nagroda Jakości",
    description:
      "Wyróżnienie 'Najlepsza Firma Transportowa Roku' było dla nas ogromnym zaszczytem i potwierdzeniem, że idziemy w dobrym kierunku. Nagroda przyznana przez Izbę Gospodarczą za najwyższą jakość usług, profesjonalizm i innowacyjność.",
    fact: "Ciekawostka: Nagrodę odebraliśmy podczas uroczystej gali w Warszawie!",
  },
  2015: {
    title: "Modernizacja Floty",
    description:
      "Czas na wielką zmianę! Wymieniliśmy całą flotę na nowoczesne, ekologiczne pojazdy wyposażone w najnowsze technologie. Klimatyzacja, Wi-Fi, GPS, wygodne fotele, gniazdka USB - komfort pasażerów stał się naszym priorytetem. To była inwestycja w przyszłość, która zaowocowała jeszcze większym zaufaniem klientów.",
    fact: "Ciekawostka: Nasze nowe autobusy zużywają o 30% mniej paliwa niż poprzednie modele!",
  },
  2017: {
    title: "Transport Dostępny",
    description:
      "Wprowadzenie pojazdów przystosowanych dla osób niepełnosprawnych było dla nas ważnym krokiem w kierunku inkluzywności. Windy, rampy, specjalne mocowania dla wózków - każdy pasażer zasługuje na komfortową podróż. Dostępność to nie przywilej, to prawo.",
    fact: "Ciekawostka: Nasi kierowcy przeszli specjalne szkolenia z obsługi osób niepełnosprawnych!",
  },
  2019: {
    title: "500 Klientów",
    description:
      "Przekroczenie progu 500 stałych klientów biznesowych było dla nas ogromnym sukcesem. Od małych firm lokalnych po duże korporacje międzynarodowe - wszyscy zaufali MARBUS. To dowód na to, że jakość i profesjonalizm się opłacają.",
    fact: "Ciekawostka: Nasz najstarszy klient współpracuje z nami od 1995 roku!",
  },
  2020: {
    title: "Bezpieczeństwo COVID",
    description:
      "Pandemia była wyzwaniem dla całej branży transportowej. Wdrożyliśmy najwyższe standardy bezpieczeństwa sanitarnego - dezynfekcja pojazdów po każdym kursie, maseczki, płyny dezynfekujące, ograniczenie liczby pasażerów. Bezpieczeństwo naszych pasażerów było i jest naszym priorytetem.",
    fact: "Ciekawostka: Zainwestowaliśmy w profesjonalne lampy UV do dezynfekcji wnętrz autobusów!",
  },
  2022: {
    title: "30 Lat na Rynku",
    description:
      "Jubileusz 30-lecia działalności! Trzy dekady na rynku, miliony przejechanych kilometrów, setki tysięcy przewiezionych pasażerów. To był czas pełen wyzwań, sukcesów i nieustannego rozwoju. Dziękujemy wszystkim naszym klientom za zaufanie i wsparcie przez te wszystkie lata!",
    fact: "Ciekawostka: Rocznie przejeżdżamy ponad 2 miliony kilometrów - to jak 50 razy dookoła Ziemi!",
  },
  2023: {
    title: "Zielona Przyszłość",
    description:
      "Przyszłość to ekologia! Rozpoczęliśmy inwestycję w pojazdy elektryczne i hybrydowe. Dbamy nie tylko o komfort pasażerów, ale także o środowisko naturalne. Nasze autobusy elektryczne to cicha, czysta i nowoczesna alternatywa dla tradycyjnych pojazdów. Ekologia to nie moda, to odpowiedzialność.",
    fact: "Ciekawostka: Nasze pojazdy elektryczne emitują zero emisji spalin w centrach miast!",
  },
  2024: {
    title: "Nowe Technologie",
    description:
      "Aplikacja mobilna MARBUS i system monitoringu floty w czasie rzeczywistym to kolejny krok w cyfryzacji naszych usług. Pasażerowie mogą śledzić lokalizację autobusu na żywo, otrzymywać powiadomienia o opóźnieniach i zarządzać swoimi rezerwacjami z poziomu smartfona. Przyszłość jest cyfrowa!",
    fact: "Ciekawostka: Nasza aplikacja została pobrana ponad 10 000 razy w pierwszym miesiącu!",
  },
  2025: {
    title: "Dziś - Lider Branży",
    description:
      "Ponad 33 lata na rynku, 500+ zadowolonych klientów, miliony przejechanych kilometrów. Dziś jesteśmy liderem w branży transportu pracowniczego i przewozów okazjonalnych. Nasza historia to historia pasji, zaangażowania i nieustannego dążenia do doskonałości. A to dopiero początek kolejnego rozdziału!",
    fact: "Ciekawostka: Co roku przewozimy ponad 100 000 pasażerów, utrzymując 99% punktualności!",
  },
};

// Get all years with stories (key milestones)
const keyYears = Object.keys(historyData)
  .map(Number)
  .sort((a, b) => a - b);

class Timeline {
  constructor() {
    this.wrapper = document.querySelector(".timeline-wrapper");
    this.track = document.querySelector(".timeline-track");
    this.items = document.querySelectorAll(".timeline-item");
    this.bus = document.querySelector(".timeline-bus");
    this.storyDisplay = document.getElementById("story-display");
    this.prevBtn = document.getElementById("timeline-prev");
    this.nextBtn = document.getElementById("timeline-next");

    this.currentIndex = 0; // Start at first key year
    this.isAnimating = false;
    this.autoPlayInterval = null;
    this.autoPlayEnabled = true;
    this.autoPlayDelay = 4000; // 4 seconds between transitions

    if (!this.wrapper || !this.track) return;

    this.init();
  }

  init() {
    // Setup arrow navigation
    this.setupArrowNavigation();

    // Initial position
    this.goToYear(keyYears[0], false);

    // Start automatic animation after a short delay
    setTimeout(() => {
      this.startAutoPlay();
    }, 2000);

    // Pause autoplay on hover
    if (this.wrapper) {
      this.wrapper.addEventListener("mouseenter", () => this.pauseAutoPlay());
      this.wrapper.addEventListener("mouseleave", () => this.resumeAutoPlay());
    }
  }

  startAutoPlay() {
    if (!this.autoPlayEnabled) return;

    this.autoPlayInterval = setInterval(() => {
      if (!this.isAnimating) {
        // Move to next year
        if (this.currentIndex < keyYears.length - 1) {
          this.currentIndex++;
        } else {
          // Loop back to start
          this.currentIndex = 0;
        }
        this.goToYear(keyYears[this.currentIndex], true);
        this.updateButtonStates();
      }
    }, this.autoPlayDelay);
  }

  pauseAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  resumeAutoPlay() {
    if (this.autoPlayEnabled && !this.autoPlayInterval) {
      this.startAutoPlay();
    }
  }

  stopAutoPlay() {
    this.autoPlayEnabled = false;
    this.pauseAutoPlay();
  }

  setupArrowNavigation() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.navigatePrev());
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.navigateNext());
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.navigatePrev();
      } else if (e.key === "ArrowRight") {
        this.navigateNext();
      }
    });

    // Update button states
    this.updateButtonStates();
  }

  navigatePrev() {
    if (this.isAnimating || this.currentIndex <= 0) return;

    // Stop autoplay when user manually navigates
    this.stopAutoPlay();

    this.currentIndex--;
    this.goToYear(keyYears[this.currentIndex], true);
    this.updateButtonStates();
  }

  navigateNext() {
    if (this.isAnimating || this.currentIndex >= keyYears.length - 1) return;

    // Stop autoplay when user manually navigates
    this.stopAutoPlay();

    this.currentIndex++;
    this.goToYear(keyYears[this.currentIndex], true);
    this.updateButtonStates();
  }

  updateButtonStates() {
    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentIndex <= 0;
      this.prevBtn.style.opacity = this.currentIndex <= 0 ? "0.3" : "1";
    }

    if (this.nextBtn) {
      this.nextBtn.disabled = this.currentIndex >= keyYears.length - 1;
      this.nextBtn.style.opacity =
        this.currentIndex >= keyYears.length - 1 ? "0.3" : "1";
    }
  }

  goToYear(year, animate = true) {
    if (this.isAnimating) return;

    // Find the item for this year
    const targetItem = Array.from(this.items).find((item) => {
      const yearElement = item.querySelector(".timeline-year");
      return yearElement && parseInt(yearElement.textContent) === year;
    });

    if (!targetItem) return;

    if (animate) {
      this.isAnimating = true;
    }

    // Scroll to item
    const itemRect = targetItem.getBoundingClientRect();
    const wrapperRect = this.wrapper.getBoundingClientRect();
    const scrollLeft =
      this.wrapper.scrollLeft +
      itemRect.left -
      wrapperRect.left -
      wrapperRect.width / 2 +
      itemRect.width / 2;

    this.wrapper.scrollTo({
      left: scrollLeft,
      behavior: animate ? "smooth" : "auto",
    });

    // Move bus to this position using TRANSFORM (GPU-accelerated)
    const itemOffsetLeft = targetItem.offsetLeft;
    const busPosition = itemOffsetLeft - 40; // Center bus on marker

    // Debug logging
    console.log("🚌 Moving bus to year:", year);
    console.log("📍 Target item offsetLeft:", itemOffsetLeft);
    console.log("🎯 Bus position:", busPosition);

    if (animate) {
      // Add driving animation class
      this.bus.classList.add("driving");

      // Add acceleration effect at start
      this.bus.classList.add("accelerating");
      setTimeout(() => {
        this.bus.classList.remove("accelerating");
      }, 400);

      // GPU-accelerated animation using TRANSFORM
      this.bus.style.transition =
        "transform 1.8s cubic-bezier(0.42, 0, 0.58, 1)";
      this.bus.style.transform = `translateX(${busPosition}px) translateY(-50%) translateZ(0)`;

      console.log("✅ Bus transform set to:", this.bus.style.transform);

      // Add deceleration effect near end
      setTimeout(() => {
        this.bus.classList.add("decelerating");
      }, 1400);

      // Remove driving class after animation
      setTimeout(() => {
        this.bus.classList.remove("driving");
        this.bus.classList.remove("decelerating");
        this.isAnimating = false;
      }, 1800);
    } else {
      this.bus.style.transition = "none";
      this.bus.style.transform = `translateX(${busPosition}px) translateY(-50%) translateZ(0)`;
    }

    // Update story display with delay for better sync
    if (historyData[year]) {
      if (animate) {
        // Start fading out immediately
        this.updateStoryDisplay(year);
      } else {
        this.updateStoryDisplay(year);
      }
    }

    // Highlight active item with pulse effect
    this.items.forEach((item) => item.classList.remove("active"));
    targetItem.classList.add("active");

    // Add pulse animation to marker
    const marker = targetItem.querySelector(".timeline-marker");
    if (marker && animate) {
      marker.classList.add("pulse");
      setTimeout(() => {
        marker.classList.remove("pulse");
      }, 600);
    }
  }

  updateStoryDisplay(year) {
    if (!this.storyDisplay || !historyData[year]) return;

    const data = historyData[year];

    // Add fade-out class
    this.storyDisplay.classList.add("fade-out");

    // Wait for fade-out animation
    setTimeout(() => {
      // Update content
      const yearBg = this.storyDisplay.querySelector(".story-year-bg");
      const title = this.storyDisplay.querySelector(".story-title");
      const description = this.storyDisplay.querySelector(".story-description");
      const factText = this.storyDisplay.querySelector(".fact-text");

      if (yearBg) yearBg.textContent = year;
      if (title) title.textContent = data.title;
      if (description) description.textContent = data.description;
      if (factText) factText.textContent = data.fact;

      // Remove fade-out and add fade-in
      this.storyDisplay.classList.remove("fade-out");
      this.storyDisplay.classList.add("fade-in");

      // Remove fade-in class after animation
      setTimeout(() => {
        this.storyDisplay.classList.remove("fade-in");
      }, 400);
    }, 200);
  }
}

// Initialize timeline when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new Timeline();
});

// Reinitialize on window resize (debounced)
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    new Timeline();
  }, 250);
});
