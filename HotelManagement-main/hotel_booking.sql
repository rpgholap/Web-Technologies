CREATE DATABASE hotel_booking;

USE hotel_booking;

CREATE TABLE Hotel (
    hotel_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    address TEXT,
    phone VARCHAR(15)
);

CREATE TABLE Staff (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    position VARCHAR(50),
    salary DECIMAL(10, 2),
    hotel_id INT,
    FOREIGN KEY (hotel_id) REFERENCES Hotel(hotel_id)
);

CREATE TABLE RoomType (
    room_type_id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(50),
    description TEXT,
    capacity INT,
    base_price DECIMAL(10, 2)
);

CREATE TABLE Rooms (
    room_id INT AUTO_INCREMENT PRIMARY KEY,
    room_no VARCHAR(10),
    floor VARCHAR(10),
    status ENUM('available', 'booked', 'maintenance'),
    room_type_id INT,
    hotel_id INT,
    FOREIGN KEY (room_type_id) REFERENCES RoomType(room_type_id),
    FOREIGN KEY (hotel_id) REFERENCES Hotel(hotel_id)
);

CREATE TABLE Customer (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    phone VARCHAR(15),
    address TEXT
);

CREATE TABLE Bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    check_in_date DATE,
    check_out_date DATE,
    status ENUM('confirmed', 'cancelled'),
    total_cost DECIMAL(10, 2),
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
);

CREATE TABLE Services (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(100),
    price DECIMAL(10, 2)
);

CREATE TABLE Payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT,
    amount DECIMAL(10, 2),
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    method VARCHAR(50),
    FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id)
);

CREATE TABLE Reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    ratings INT,
    comments TEXT,
    review_date DATE,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
);