# Grand Hotel - Hotel Management System

A modern, fully responsive hotel management system built with HTML, CSS, and JavaScript. This web application allows users to browse rooms, make bookings, and manage their reservations through an interactive dashboard.

## 🌟 Features

### User Features
- **User Authentication**
  - Sign up with email and password
  - Login with validation
  - Demo credentials available
  - Password visibility toggle
  - Remember me functionality

- **Browse Rooms**
  - Filter rooms by category (Standard, Deluxe, Suite)
  - Detailed room information with images
  - Real-time pricing
  - Room features and amenities display

- **Booking System**
  - Interactive booking form
  - Date selection with validation
  - Real-time price calculation
  - Booking summary with tax calculation
  - Special requests option
  - Multiple rooms and guests support

- **User Dashboard**
  - View all bookings (Upcoming, Past, Cancelled)
  - Booking statistics
  - Profile management
  - Cancel bookings
  - View detailed booking information

### Technical Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Local Storage**: Persistent data storage for users and bookings
- **Interactive UI**: Smooth animations and transitions
- **Form Validation**: Real-time form validation and error handling
- **Modern CSS**: CSS Grid, Flexbox, and CSS Variables
- **Clean Code**: Well-organized and commented JavaScript

## 📁 Project Structure

```
hotel-management-system/
│
├── index.html              # Home page with hero section
├── login.html              # User login page
├── signup.html             # User registration page
├── rooms.html              # Room gallery and listings
├── booking.html            # Booking form page
├── dashboard.html          # User dashboard
├── README.md               # Project documentation
│
├── css/
│   └── style.css           # Main stylesheet
│
├── js/
│   ├── main.js             # Main JavaScript utilities
│   ├── auth.js             # Authentication logic
│   ├── rooms.js            # Rooms filtering and display
│   ├── booking.js          # Booking form logic
│   └── dashboard.js        # Dashboard functionality
│
└── images/                 # Image assets folder
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs entirely in the browser!

### Installation

1. **Download or Clone the Project**
   ```bash
   cd hotel-management-system
   ```

2. **Open in Browser**
   - Simply open `index.html` in your web browser
   - Or use a local development server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```

3. **Start Exploring**
   - Browse the home page
   - Check out available rooms
   - Sign up for an account or use demo credentials

## 🔐 Demo Credentials

For quick testing, use these demo credentials:

**Email:** demo@grandhotel.com  
**Password:** demo123

## 💻 Usage Guide

### For Users

1. **Sign Up / Login**
   - Click "Sign Up" to create a new account
   - Or use the demo credentials to login
   - Fill in your information and submit

2. **Browse Rooms**
   - Navigate to "Rooms" page
   - Filter by room type (Standard, Deluxe, Suite)
   - Click "Book Now" on your preferred room

3. **Make a Booking**
   - Fill in guest information (auto-populated if logged in)
   - Select room type and dates
   - Choose number of guests and rooms
   - Review the booking summary
   - Submit your booking

4. **Manage Bookings**
   - Go to Dashboard after logging in
   - View all your bookings organized by status
   - View detailed booking information
   - Cancel bookings if needed
   - Edit your profile

## 🎨 Features Breakdown

### Home Page
- Hero section with call-to-action buttons
- Features showcase (WiFi, Pool, Restaurant, Spa, etc.)
- About section with statistics
- Contact form
- Newsletter subscription
- Smooth scroll animations

### Rooms Page
- Grid layout of available rooms
- Filter by category
- Room cards with images from Unsplash
- Pricing and features display
- Direct booking links

### Booking Page
- Multi-section form
- Guest information
- Room selection with dropdown
- Date picker with validation
- Real-time summary updates
- Price calculation with tax
- Special requests field

### Dashboard
- User welcome message
- Booking statistics (Total, Upcoming, Completed)
- Tabbed booking list
- Profile management
- Quick actions sidebar
- Support information

## 🛠️ Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Grid and Flexbox
- **JavaScript (ES6+)**: Vanilla JavaScript, no frameworks
- **Local Storage**: Client-side data persistence
- **Font Awesome**: Icon library
- **Unsplash**: High-quality hotel images

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🔄 Data Storage

All data is stored in the browser's Local Storage:
- **hotelUsers**: Array of registered users
- **currentUser**: Currently logged-in user
- **hotelBookings**: Array of all bookings

## ⚙️ Customization

### Change Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #d4af37;  /* Gold */
    --secondary-color: #2c3e50; /* Dark Blue */
    /* ... more variables */
}
```

### Add More Rooms
Edit `rooms.html` and add room cards, then update `booking.html` dropdown.

### Modify Pricing
Update the `roomPrices` object in `js/booking.js`:
```javascript
const roomPrices = {
    'standard': 99,
    'deluxe': 199,
    // ... add more
};
```

## 🐛 Known Limitations

- Data is stored locally (cleared when browser cache is cleared)
- No backend server (all client-side)
- No payment processing (demo purposes)
- Images are loaded from external CDN (Unsplash)

## 🔮 Future Enhancements

- Backend integration with database
- Payment gateway integration
- Email notifications
- Admin panel for hotel management
- Room availability calendar
- Reviews and ratings system
- Multi-language support
- Dark mode toggle

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Created as a demonstration project for a hotel management system.

## 🙏 Acknowledgments

- Images from [Unsplash](https://unsplash.com)
- Icons from [Font Awesome](https://fontawesome.com)
- Inspired by modern hotel booking websites

## 📞 Support

For issues or questions, please check the code comments or modify as needed for your use case.

---

**Enjoy managing your hotel bookings with Grand Hotel! 🏨**

