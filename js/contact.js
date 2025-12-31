// ============================================
// CONTACT SECTION - CLEAN & SIMPLE
// Basic form validation without excessive animations
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".equal-form");
  const inputs = document.querySelectorAll(
    ".input-group input, .input-group textarea"
  );
  const submitBtn = document.querySelector(".submit-btn");

  // ============================================
  // FORM VALIDATION
  // ============================================

  // Input focus animations
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", function () {
      if (!this.value) {
        this.parentElement.classList.remove("focused");
      }
    });

    // Real-time validation
    input.addEventListener("input", function () {
      validateInput(this);
    });
  });

  // Validation function
  function validateInput(input) {
    const inputGroup = input.parentElement;
    let isValid = false;

    if (input.type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(input.value);
    } else if (input.type === "tel") {
      const phoneRegex = /^[\d\s\+\-\(\)]+$/;
      isValid = phoneRegex.test(input.value) && input.value.length >= 9;
    } else {
      isValid = input.value.trim().length > 0;
    }

    if (isValid) {
      inputGroup.classList.add("valid");
      inputGroup.classList.remove("invalid");
    } else if (input.value.length > 0) {
      inputGroup.classList.add("invalid");
      inputGroup.classList.remove("valid");
    } else {
      inputGroup.classList.remove("valid", "invalid");
    }

    return isValid;
  }

  // ============================================
  // FORM SUBMISSION
  // ============================================
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validate all inputs
      let allValid = true;
      inputs.forEach((input) => {
        if (!validateInput(input)) {
          allValid = false;
        }
      });

      if (allValid) {
        // Success animation
        submitBtn.classList.add("loading");
        submitBtn.innerHTML = `
          <span>Wysyłanie...</span>
          <div class="spinner"></div>
        `;

        // Simulate form submission
        setTimeout(() => {
          submitBtn.classList.remove("loading");
          submitBtn.classList.add("success");
          submitBtn.innerHTML = `
            <span>Wysłano!</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          `;

          // Show success message
          showNotification(
            "Dziękujemy! Wkrótce się z Tobą skontaktujemy.",
            "success"
          );

          // Reset form
          setTimeout(() => {
            contactForm.reset();
            inputs.forEach((input) => {
              input.parentElement.classList.remove("valid", "focused");
            });
            submitBtn.classList.remove("success");
            submitBtn.innerHTML = `
              <span>Wyślij zapytanie</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            `;
          }, 3000);
        }, 2000);
      } else {
        // Error animation
        submitBtn.classList.add("error");
        showNotification("Proszę poprawnie wypełnić wszystkie pola.", "error");

        setTimeout(() => {
          submitBtn.classList.remove("error");
        }, 500);
      }
    });
  }

  // ============================================
  // NOTIFICATION SYSTEM
  // ============================================
  function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.classList.add("notification", type);
    notification.innerHTML = `
      <div class="notification-icon">
        ${
          type === "success"
            ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>'
            : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>'
        }
      </div>
      <div class="notification-content">
        <p>${message}</p>
      </div>
      <button class="notification-close">×</button>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => notification.classList.add("show"), 10);

    // Close button
    notification
      .querySelector(".notification-close")
      .addEventListener("click", () => {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 300);
      });

    // Auto remove
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  // ============================================
  // PHONE NUMBER FORMATTING
  // ============================================
  const phoneInput = document.querySelector('input[type="tel"]');
  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");

      // Format: +48 XXX XXX XXX
      if (value.length > 0) {
        if (value.startsWith("48")) {
          value = value.substring(2);
        }

        let formatted = "+48 ";
        for (let i = 0; i < value.length && i < 9; i++) {
          if (i > 0 && i % 3 === 0) {
            formatted += " ";
          }
          formatted += value[i];
        }

        e.target.value = formatted;
      }
    });
  }

  console.log(
    "%c✅ Contact Form Ready",
    "color: #4facfe; font-size: 14px; font-weight: bold;"
  );
});
