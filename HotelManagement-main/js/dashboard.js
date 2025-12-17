// ===================================
// Dashboard JavaScript
// ===================================

document.addEventListener("DOMContentLoaded", function () {
  // Check if user is logged in
  checkAuthenticationDashboard();

  // Initialize dashboard
  loadUserProfile();
  loadBookings();
  initializeTabs();
  initializeModals();
});

// ===================================
// Check Authentication
// ===================================
function checkAuthenticationDashboard() {
  const currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }
}

// ===================================
// Load User Profile
// ===================================
function loadUserProfile() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    // Update welcome message
    const userName = document.getElementById("userName");
    if (userName) {
      userName.textContent = currentUser.firstName || "Guest";
    }

    // Update profile section
    document.getElementById(
      "profileName"
    ).textContent = `${currentUser.firstName} ${currentUser.lastName}`;
    document.getElementById("profileEmail").textContent = currentUser.email;
    document.getElementById("profilePhone").textContent =
      currentUser.phone || "Not provided";

    // Populate edit form
    document.getElementById(
      "editName"
    ).value = `${currentUser.firstName} ${currentUser.lastName}`;
    document.getElementById("editEmail").value = currentUser.email;
    document.getElementById("editPhone").value = currentUser.phone || "";
  }
}

// ===================================
// Load Bookings
// ===================================
function loadBookings(filter = "upcoming") {
  const bookings = JSON.parse(localStorage.getItem("hotelBookings") || "[]");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Filter bookings for current user
  const userBookings = bookings.filter(
    (b) => b.guestEmail === currentUser.email
  );

  // Sort by date (newest first)
  userBookings.sort(
    (a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)
  );

  // Apply tab filter
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let filteredBookings = userBookings;

  if (filter === "upcoming") {
    filteredBookings = userBookings.filter((b) => {
      const checkInDate = new Date(b.checkIn);
      return checkInDate >= today && b.status === "confirmed";
    });
  } else if (filter === "past") {
    filteredBookings = userBookings.filter((b) => {
      const checkOutDate = new Date(b.checkOut);
      return checkOutDate < today || b.status === "completed";
    });
  } else if (filter === "cancelled") {
    filteredBookings = userBookings.filter((b) => b.status === "cancelled");
  }

  // Update statistics
  updateStatistics(userBookings);

  // Display bookings
  displayBookings(filteredBookings);
}

// ===================================
// Update Statistics
// ===================================
function updateStatistics(bookings) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const totalBookings = bookings.length;
  const upcomingBookings = bookings.filter((b) => {
    const checkInDate = new Date(b.checkIn);
    return checkInDate >= today && b.status === "confirmed";
  }).length;
  const completedBookings = bookings.filter((b) => {
    const checkOutDate = new Date(b.checkOut);
    return checkOutDate < today || b.status === "completed";
  }).length;

  document.getElementById("totalBookings").textContent = totalBookings;
  document.getElementById("upcomingBookings").textContent = upcomingBookings;
  document.getElementById("completedBookings").textContent = completedBookings;
}

// ===================================
// Display Bookings
// ===================================
function displayBookings(bookings) {
  const bookingsList = document.getElementById("bookingsList");

  if (bookings.length === 0) {
    bookingsList.innerHTML = `
            <div class="no-bookings">
                <i class="fas fa-calendar-times"></i>
                <p>No bookings found</p>
                <a href="booking.html" class="btn btn-primary">Make a Booking</a>
            </div>
        `;
    return;
  }

  bookingsList.innerHTML = bookings
    .map(
      (booking) => `
        <div class="booking-item" data-booking-id="${booking.id}">
            <div class="booking-header">
                <h4>${booking.roomType}</h4>
                <span class="booking-status status-${
                  booking.status
                }">${capitalizeFirst(booking.status)}</span>
            </div>
            <div class="booking-details">
                <div class="booking-detail">
                    <i class="fas fa-calendar-check"></i>
                    <span>Check-in: ${formatDate(booking.checkIn)}</span>
                </div>
                <div class="booking-detail">
                    <i class="fas fa-calendar-times"></i>
                    <span>Check-out: ${formatDate(booking.checkOut)}</span>
                </div>
                <div class="booking-detail">
                    <i class="fas fa-users"></i>
                    <span>${booking.guests} Guest${
        booking.guests > 1 ? "s" : ""
      }</span>
                </div>
                <div class="booking-detail">
                    <i class="fas fa-door-open"></i>
                    <span>${booking.rooms} Room${
        booking.rooms > 1 ? "s" : ""
      }</span>
                </div>
            </div>
            <div class="booking-actions">
                <button onclick="viewBookingDetails('${booking.id}')">
                    <i class="fas fa-eye"></i> View Details
                </button>
                ${
                  booking.status === "confirmed"
                    ? `
                    <button onclick="modifyBooking('${booking.id}')" style="color: #17a2b8;">
                        <i class="fas fa-edit"></i> Modify
                    </button>
                    <button onclick="cancelBooking('${booking.id}')" style="color: #dc3545;">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                `
                    : ""
                }
            </div>
        </div>
    `
    )
    .join("");
}

// ===================================
// Initialize Tabs
// ===================================
function initializeTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all tabs
      tabButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked tab
      this.classList.add("active");

      // Load bookings with filter
      const filter = this.getAttribute("data-tab");
      loadBookings(filter);
    });
  });
}

// ===================================
// Initialize Modals
// ===================================
function initializeModals() {
  // Edit Profile Modal
  const editProfileBtn = document.getElementById("editProfileBtn");
  const editProfileModal = document.getElementById("editProfileModal");
  const editProfileForm = document.getElementById("editProfileForm");

  if (editProfileBtn) {
    editProfileBtn.addEventListener("click", () => {
      editProfileModal.classList.add("active");
    });
  }

  if (editProfileForm) {
    editProfileForm.addEventListener("submit", function (e) {
      e.preventDefault();
      saveProfile();
    });
  }

  // Close modal buttons
  document.querySelectorAll(".modal-close").forEach((btn) => {
    btn.addEventListener("click", function () {
      this.closest(".modal").classList.remove("active");
    });
  });

  // Close modal on outside click
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        this.classList.remove("active");
      }
    });
  });
}

// ===================================
// Save Profile
// ===================================
function saveProfile() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const fullName = document.getElementById("editName").value.split(" ");

  currentUser.firstName = fullName[0] || "";
  currentUser.lastName = fullName.slice(1).join(" ") || "";
  currentUser.email = document.getElementById("editEmail").value;
  currentUser.phone = document.getElementById("editPhone").value;

  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  // Update users array if exists
  const users = JSON.parse(localStorage.getItem("hotelUsers") || "[]");
  const userIndex = users.findIndex((u) => u.id === currentUser.id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...currentUser };
    localStorage.setItem("hotelUsers", JSON.stringify(users));
  }

  loadUserProfile();
  document.getElementById("editProfileModal").classList.remove("active");

  if (window.hotelApp) {
    window.hotelApp.showNotification(
      "Profile updated successfully!",
      "success"
    );
  }
}

// ===================================
// View Booking Details
// ===================================
function viewBookingDetails(bookingId) {
  const bookings = JSON.parse(localStorage.getItem("hotelBookings") || "[]");
  const booking = bookings.find((b) => b.id === bookingId);

  if (!booking) return;

  const modal = document.getElementById("bookingModal");
  const modalBody = document.getElementById("bookingModalBody");

  modalBody.innerHTML = `
        <div class="booking-details-full">
            <h3>${booking.roomType}</h3>
            <div class="detail-row">
                <strong>Booking ID:</strong>
                <span>#${booking.id}</span>
            </div>
            <div class="detail-row">
                <strong>Status:</strong>
                <span class="booking-status status-${
                  booking.status
                }">${capitalizeFirst(booking.status)}</span>
            </div>
            <div class="detail-row">
                <strong>Guest Name:</strong>
                <span>${booking.guestName}</span>
            </div>
            <div class="detail-row">
                <strong>Email:</strong>
                <span>${booking.guestEmail}</span>
            </div>
            <div class="detail-row">
                <strong>Phone:</strong>
                <span>${booking.guestPhone}</span>
            </div>
            <div class="detail-row">
                <strong>Check-In:</strong>
                <span>${formatDate(booking.checkIn)}</span>
            </div>
            <div class="detail-row">
                <strong>Check-Out:</strong>
                <span>${formatDate(booking.checkOut)}</span>
            </div>
            <div class="detail-row">
                <strong>Guests:</strong>
                <span>${booking.guests}</span>
            </div>
            <div class="detail-row">
                <strong>Rooms:</strong>
                <span>${booking.rooms}</span>
            </div>
            <div class="detail-row">
                <strong>Total Amount:</strong>
                <span style="color: var(--primary-color); font-size: 1.2rem; font-weight: bold;">₹${booking.total.replace(
                  /[^0-9]/g,
                  ""
                )}</span>
            </div>
            ${
              booking.specialRequests
                ? `
                <div class="detail-row" style="display: block;">
                    <strong>Special Requests:</strong>
                    <p style="margin-top: 0.5rem; color: var(--text-light);">${booking.specialRequests}</p>
                </div>
            `
                : ""
            }
            <div class="detail-row">
                <strong>Booked On:</strong>
                <span>${formatDate(booking.bookingDate)}</span>
            </div>
        </div>
    `;

  // Add styles for detail rows
  const style = document.createElement("style");
  style.textContent = `
        .booking-details-full { padding: 1rem; }
        .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 0.8rem 0;
            border-bottom: 1px solid var(--border-color);
        }
        .detail-row:last-child { border-bottom: none; }
    `;
  if (!document.getElementById("booking-detail-styles")) {
    style.id = "booking-detail-styles";
    document.head.appendChild(style);
  }

  modal.classList.add("active");
}

// ===================================
// Modify Booking
// ===================================
function modifyBooking(bookingId) {
  if (confirm("Redirect to booking page to modify this reservation?")) {
    window.location.href = `booking.html?modify=${bookingId}`;
  }
}

// ===================================
// Cancel Booking
// ===================================
function cancelBooking(bookingId) {
  if (confirm("Are you sure you want to cancel this booking?")) {
    const bookings = JSON.parse(localStorage.getItem("hotelBookings") || "[]");
    const bookingIndex = bookings.findIndex((b) => b.id === bookingId);

    if (bookingIndex !== -1) {
      bookings[bookingIndex].status = "cancelled";
      localStorage.setItem("hotelBookings", JSON.stringify(bookings));

      if (window.hotelApp) {
        window.hotelApp.showNotification(
          "Booking cancelled successfully",
          "success"
        );
      }

      // Reload bookings
      const activeTab = document
        .querySelector(".tab-btn.active")
        .getAttribute("data-tab");
      loadBookings(activeTab);
    }
  }
}

// ===================================
// Utility Functions
// ===================================
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Make functions globally available
window.viewBookingDetails = viewBookingDetails;
window.modifyBooking = modifyBooking;
window.cancelBooking = cancelBooking;
