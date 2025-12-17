// ===================================
// Main JavaScript for Hotel Management System
// ===================================

// Check authentication status on page load
document.addEventListener("DOMContentLoaded", function () {
  checkAuthStatus();
  initializeScrollAnimations();
  initializeContactForm();
  initializeNavigation();
});

// ===================================
// Authentication Status Check
// ===================================
function checkAuthStatus() {
  const currentUser = localStorage.getItem("currentUser");
  const loginBtn = document.querySelector(".btn-login");
  const signupBtn = document.querySelector(".btn-signup");
  const dashboardBtn = document.getElementById("dashboardBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (currentUser) {
    const user = JSON.parse(currentUser);

    // Hide login/signup buttons
    if (loginBtn) loginBtn.style.display = "none";
    if (signupBtn) signupBtn.style.display = "none";

    // Show dashboard and logout buttons
    if (dashboardBtn) dashboardBtn.style.display = "inline-flex";
    if (logoutBtn) {
      logoutBtn.style.display = "inline-flex";
      logoutBtn.addEventListener("click", handleLogout);
    }
  } else {
    // Show login/signup buttons
    if (loginBtn) loginBtn.style.display = "inline-block";
    if (signupBtn) signupBtn.style.display = "inline-block";

    // Hide dashboard and logout buttons
    if (dashboardBtn) dashboardBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "none";
  }
}

// ===================================
// Logout Handler
// ===================================
function handleLogout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("currentUser");
    showNotification("Logged out successfully!", "success");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  }
}

// ===================================
// Navigation
// ===================================
function initializeNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// ===================================
// Scroll Animations
// ===================================
function initializeScrollAnimations() {
  const scrollIndicator = document.querySelector(".scroll-indicator");

  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    });
  }

  // Fade in elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe feature cards, room cards, etc.
  const animatedElements = document.querySelectorAll(
    ".feature-card, .room-card, .stat"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// ===================================
// Contact Form
// ===================================
function initializeContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);

      // Simulate sending message
      showNotification(
        "Thank you for your message! We will get back to you soon.",
        "success"
      );
      contactForm.reset();
    });
  }

  // Newsletter form
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        showNotification(
          "Thank you for subscribing to our newsletter!",
          "success"
        );
        emailInput.value = "";
      }
    });
  }
}

// ===================================
// Notification System
// ===================================
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Add styles
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "1rem 1.5rem",
    borderRadius: "5px",
    boxShadow: "0 5px 25px rgba(0,0,0,0.2)",
    zIndex: "10000",
    animation: "slideInRight 0.3s ease",
    maxWidth: "300px",
    color: "#fff",
    fontWeight: "500",
  });

  // Set background color based on type
  const colors = {
    success: "#28a745",
    error: "#dc3545",
    warning: "#ffc107",
    info: "#17a2b8",
  };
  notification.style.background = colors[type] || colors.info;

  // Add to body
  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add animation styles
if (!document.getElementById("notification-animations")) {
  const style = document.createElement("style");
  style.id = "notification-animations";
  style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);
}

// ===================================
// Utility Functions
// ===================================
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}

// Export functions for use in other scripts
window.hotelApp = {
  checkAuthStatus,
  handleLogout,
  showNotification,
  formatDate,
  formatCurrency,
};
