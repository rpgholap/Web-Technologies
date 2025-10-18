const roomPrices = {
  Single: 50,
  Double: 80,
  Suite: 120,
};

// User credentials
// User credentials
const users = {
  admin: "password123",
  "gholaprutuja9@gmail.com": "myhotelpass", // <-- Add this line
};

// Login functionality
document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (users[username] === password) {
    alert("Login successful!");
    document.getElementById("login-form").style.display = "none";

    if (username === "admin") {
      document.getElementById("admin-dashboard").style.display = "block";
    } else {
      document.getElementById("booking-form").style.display = "block";
      document.getElementById("payment-section").style.display = "block";
    }
  } else {
    alert("Invalid username or password!");
  }
});

// Booking functionality
document.getElementById("roomForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const roomType = document.getElementById("roomType").value;
  const nights = parseInt(document.getElementById("nights").value, 10);
  const cost = roomPrices[roomType] * nights;

  const booking = { name, roomType, nights, cost };
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  alert("Booking successful! Please proceed to payment.");
  document.getElementById("roomForm").reset();
});

// Payment functionality
document.getElementById("paymentForm").addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Payment successful! Thank you for booking.");
  document.getElementById("paymentForm").reset();
});

// Admin Dashboard
document.getElementById("viewBookings").addEventListener("click", () => {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const adminBookingList = document.getElementById("adminBookingList");
  adminBookingList.innerHTML = "";

  bookings.forEach((booking, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <strong>${index + 1}. ${booking.name}</strong> - ${
      booking.roomType
    } for ${booking.nights} nights. Total: $${booking.cost}
    `;
    adminBookingList.appendChild(listItem);
  });
});
