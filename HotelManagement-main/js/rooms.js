// ===================================
// Rooms Page JavaScript
// ===================================

// Adds filtering functionality (so users can view rooms by type — like Deluxe, Standard, Suite, etc.)
//This ensures that all HTML elements (DOM) are fully loaded before JavaScript starts running.
document.addEventListener("DOMContentLoaded", function () {
  initializeRoomFilters(); // sets up the filter buttons.
  initializeRoomAnimations(); // activates scroll-based animations.
});

// ===================================
// Room Filters
// ===================================
function initializeRoomFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const roomCards = document.querySelectorAll(".room-card");

  // Adds a click event listener to each button.
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons : only for visual feedback.
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Reads which category the button represents (like "deluxe", "standard", or "all") using HTML’s data-filter attribute.
      const filter = this.getAttribute("data-filter");

      // Filter rooms : checks room cards against the selected filter.
      roomCards.forEach((card) => {
        const category = card.getAttribute("data-category");

        // CSS transitions with opacity and transform to create that nice “slide-up” animation.
        if (filter === "all" || category === filter) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 10);
        }
      });
    });
  });
}
