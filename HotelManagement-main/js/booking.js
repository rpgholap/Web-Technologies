// ===================================
// Booking Page JavaScript
// ===================================

// event listener waits until the HTML is fully loaded before running any JS.
document.addEventListener("DOMContentLoaded", function () {
  initializeBookingForm();
  setMinDate();
  handleURLParameters();
  updateSummary();
});

// Room nne
// a key-value pair object where each room type has a fixed nightly rate.
// Used later in price calculations.
const roomPrices = {
  standard: 1000,
  "standard-plus": 1200,
  deluxe: 2000,
  "deluxe-family": 3500,
  "executive-suite": 5000,
  "presidential-suite": 10000,
};

// ===================================
// Initialize Booking Form
// ===================================

// whenever the user changes a value, the summary recalculates instantly.
function initializeBookingForm() {
  const bookingForm = document.getElementById("bookingForm");

  if (bookingForm) {
    // Add event listeners for real-time updates
    document
      .getElementById("roomType")
      .addEventListener("change", updateSummary);
    document
      .getElementById("checkIn")
      .addEventListener("change", updateSummary);
    document
      .getElementById("checkOut")
      .addEventListener("change", updateSummary);
    document.getElementById("guests").addEventListener("change", updateSummary);
    document.getElementById("rooms").addEventListener("change", updateSummary);

    // Handle form submission : a submit event listener for when the user confirms the booking.
    bookingForm.addEventListener("submit", handleBookingSubmit);
  }

  // Populate guest information if user is logged in
  // to autofill details if user data is saved.
  populateGuestInfo();
}

// ===================================
// Set Minimum Date for Check-in
// ===================================

// users can’t pick past dates or invalid combinations.
function setMinDate() {
  // takes the date input fields from the HTML page by their IDs
  const checkInInput = document.getElementById("checkIn");
  const checkOutInput = document.getElementById("checkOut");

  if (checkInInput) {
    // Set minimum date to today
    // It gets today’s date, converts it to the "YYYY-MM-DD" format, and sets it as the earliest selectable (min) check-in date.
    const today = new Date().toISOString().split("T")[0];
    checkInInput.setAttribute("min", today);

    // so whenever the user selects a new check-in date, this block of code will run automatically.
    checkInInput.addEventListener("change", function () {
      // Set check-out minimum to day after check-in
      // It takes the selected check-in date, adds one day to ensure the check-out is later, formats it as "YYYY-MM-DD",
      // and sets it as the earliest possible check-out date.
      const checkInDate = new Date(this.value);
      checkInDate.setDate(checkInDate.getDate() + 1);
      const minCheckOut = checkInDate.toISOString().split("T")[0];
      checkOutInput.setAttribute("min", minCheckOut);

      // Clear check-out if it's before new minimum
      // If the user had already selected a check-out date that is
      // now earlier than or equal to the new check-in date,
      // Then it clears the check-out field (sets it to empty) to force the user to pick a valid one.
      if (checkOutInput.value && checkOutInput.value <= this.value) {
        checkOutInput.value = "";
      }
    });
  }
}

// ===================================
// Handle URL Parameters
// ===================================

// Allows deep linking — if someone clicks a “Book Deluxe Room” button,
//  the URL might include ?room=deluxe, and the correct room gets pre-selected.
function handleURLParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const roomType = urlParams.get("room");

  if (roomType) {
    const roomSelect = document.getElementById("roomType");
    if (roomSelect) {
      roomSelect.value = roomType;
      updateSummary();
    }
  }
}

// ===================================
// Populate Guest Information
// ===================================

// Retrieves logged-in user details from localStorage
// and fills in the booking form fields like name email automatically.
function populateGuestInfo() {
  // localStorage.getItem("currentUser") gets a string that was previously stored in the browser’s local storage
  // {"firstName":"Rutuja","lastName":"Gholap","email":"rutuja@gmail.com","phone":"9876543210"}'
  const currentUser = localStorage.getItem("currentUser");

  if (currentUser) {
    // JSON.parse() converts a JSON-formatted string into a usable JavaScript object
    const user = JSON.parse(currentUser);
    // JSON.parse() takes that JSON string and converts it back into a JavaScript object,
    // so you can easily access data using dot notation — like user.firstName or user.email
    const guestName = document.getElementById("guestName");
    const guestEmail = document.getElementById("guestEmail");
    const guestPhone = document.getElementById("guestPhone");

    if (guestName) guestName.value = `${user.firstName} ${user.lastName}`;
    if (guestEmail) guestEmail.value = user.email;
    if (guestPhone) guestPhone.value = user.phone || "";
  }
}

// ===================================
// Update Booking Summary
// ===================================
function updateSummary() {
  // Grabs the current values from the booking form fields.
  const roomType = document.getElementById("roomType").value;
  const checkIn = document.getElementById("checkIn").value;
  const checkOut = document.getElementById("checkOut").value;
  const guests = document.getElementById("guests").value;
  const rooms = document.getElementById("rooms").value;

  // Update summary room type
  // if the dropdown shows “Deluxe Room – $199/night”,
  // then .split(" - ") extracts “Deluxe Room” only.
  const selectedOption = document.getElementById("roomType").selectedOptions[0];
  const roomTypeName = selectedOption.text.split(" - ")[0] || "-";

  // Fills in the summary section with the chosen room type, dates, guests, and room count.
  //If dates are missing, it shows “–”
  document.getElementById("summaryRoomType").textContent = roomTypeName;

  // Update check-in and check-out dates
  document.getElementById("summaryCheckIn").textContent = checkIn
    ? formatDate(checkIn)
    : "-";
  document.getElementById("summaryCheckOut").textContent = checkOut
    ? formatDate(checkOut)
    : "-";

  // Update guests and rooms
  document.getElementById("summaryGuests").textContent = guests;
  document.getElementById("summaryRooms").textContent = rooms;

  // Calculate nights
  // Subtracts check-in from check-out (in milliseconds) and converts it to days.
  // Math.ceil() rounds it up to avoid fractions like 2.7 days.
  let nights = 0;
  if (checkIn && checkOut) {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    if (nights < 0) nights = 0;
  }

  document.getElementById("nightsCount").textContent = `${nights} night${
    nights !== 1 ? "s" : ""
  }`;
  document.getElementById("summaryNights").textContent = nights;

  // Calculate prices
  const pricePerNight = roomPrices[roomType] || 0;
  const numberOfRooms = parseInt(rooms) || 1;
  const subtotal = pricePerNight * nights * numberOfRooms;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  // Update price displays:
  // Uses helper functions like formatCurrency() to show nice, readable values:
  document.getElementById("summaryPricePerNight").textContent =
    formatCurrency(pricePerNight);
  document.getElementById("summarySubtotal").textContent =
    formatCurrency(subtotal);
  document.getElementById("summaryTax").textContent = formatCurrency(tax);
  document.getElementById("summaryTotal").textContent = formatCurrency(total);
}

// ===================================
// Handle Booking Submission
// ===================================

// When the user clicks “Book Now,” it validates data,
// saves the booking in localStorage, and redirects to the dashboard.
function handleBookingSubmit(e) {
  // Prevents the form from refreshing the page.
  e.preventDefault();

  // Get all form values
  // Creates a single object with all form values.
  const formData = {
    // Date.now().toString() generates a unique booking ID using the current timestamp.
    id: Date.now().toString(),
    guestName: document.getElementById("guestName").value,
    guestEmail: document.getElementById("guestEmail").value,
    guestPhone: document.getElementById("guestPhone").value,
    guestCountry: document.getElementById("guestCountry").value,
    roomType: document
      .getElementById("roomType")
      .selectedOptions[0].text.split(" - ")[0],
    roomTypeValue: document.getElementById("roomType").value,
    guests: document.getElementById("guests").value,
    rooms: document.getElementById("rooms").value,
    checkIn: document.getElementById("checkIn").value,
    checkOut: document.getElementById("checkOut").value,
    specialRequests: document.getElementById("specialRequests").value,
    status: "confirmed",
    bookingDate: new Date().toISOString(),
    total: document.getElementById("summaryTotal").textContent,
  };

  // Validate dates
  // Ensures the user has entered valid, chronological dates.
  if (!formData.checkIn || !formData.checkOut) {
    showBookingAlert("Please select check-in and check-out dates", "error");
    return;
  }

  if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
    showBookingAlert("Check-out date must be after check-in date", "error");
    return;
  }

  // Get existing bookings or create new array
  // It fetches saved bookings from localStorage, or uses an empty array
  // if none exist, and JSON.parse() converts that JSON string into a
  // real JavaScript array for adding new data.
  let bookings = JSON.parse(localStorage.getItem("hotelBookings") || "[]");

  // Add new booking

  // Appends the new booking data to the array and saves it back to localStorage
  // by converting the array back into a JSON string using JSON.stringify().
  // JSON.stringify() converts a JavaScript object or array into a JSON-formatted
  // string — so it can be easily stored (like in localStorage) or sent to a server.
  bookings.push(formData);
  localStorage.setItem("hotelBookings", JSON.stringify(bookings));

  // Show success message
  showBookingAlert("Booking confirmed successfully!", "success");

  // Redirect to dashboard after short delay
  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 2000);
}

// ===================================
// Show Booking Alert
// ===================================

// Shows success or error messages (like “Booking confirmed” or “Invalid dates”).
function showBookingAlert(message, type) {
  const alertElement = document.getElementById("bookingAlert");

  // Updates the alert box text and applies a CSS class based on the type (e.g., alert-success or alert-error).

  if (alertElement) {
    alertElement.textContent = message;
    alertElement.className = `alert alert-${type}`;
    alertElement.style.display = "block";

    // Scroll to alert
    alertElement.scrollIntoView({ behavior: "smooth", block: "nearest" });

    // Auto hide success messages
    // It automatically hides the success alert after 5 seconds.
    if (type === "success") {
      setTimeout(() => {
        alertElement.style.display = "none";
      }, 5000);
    }
  }
}

// ===================================
// Utility Functions
// ===================================

// makes numbers display like real prices — properly formatted with currency symbols.

// Makes raw date strings look nice and readable
function formatDate(dateString) {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-IN", options);
  // This converts it to a friendly format like "Tue, Oct 28, 2025".
}

// Formats numbers into US currency style.
// Formats numbers into Indian Rupee style.
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount); // converts numbers like 1000 → "₹1,000" automatically with commas and symbol.
}
