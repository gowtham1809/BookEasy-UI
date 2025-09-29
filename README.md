# EasyBooking UI Documentation

Welcome to the EasyBooking UI project! It explains the structure, features, and usage of the app, folder by folder and feature by feature.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Folder Structure](#folder-structure)
- [Feature Overview](#feature-overview)
- [How the App Works](#how-the-app-works)
- [Key Screens & Features](#key-screens--features)
- [How to Run the App](#how-to-run-the-app)
- [FAQ](#faq)

---

## Project Overview

EasyBooking UI is a modern web application for booking  slots. It is designed to be user-friendly, responsive, and visually appealing. You can log in, view available slots, select seats, make bookings, and manage your account.

---

## Folder Structure

```
src/
├── components/
│   ├── booking/        # Booking form and details
│   ├── seats/          # Seat selection UI
├── features/
│   ├── bookings/       # My Bookings page
│   ├── login/          # Login page
│   ├── register/       # Registration page
│   ├── slots/          # Slot selection page
├── redux/
│   ├── reducer.tsx     # State management logic
│   ├── saga.tsx        # Async actions (API calls)
│   ├── selector.tsx    # State selectors
│   ├── store.tsx       # Redux store setup
├── routes/
│   └── index.tsx       # App routing (navigation)
├── services/
│   └── apis.tsx        # API definitions
├── utils/
│   └── dateUtils.tsx   # Date formatting helpers
├── layout.tsx          # Main layout wrapper
├── layout.scss         # Layout styles
├── index.tsx           # App entry point
├── index.scss          # Global styles and variables
├── auth.tsx            # Authentication logic
```

---

## Feature Overview

### 1. Authentication

- **Login**: Enter email and password to access the app.
- **Register**: Create a new account with name, email, and password.
- **Auth.tsx**: Handles user authentication and redirects.

### 2. Slot Selection

- **Slots Page**: View available time slots for booking.
- **Select a date**: Use the date picker to choose your travel date.
- **See slot status**: Available or booked slots are color-coded.

### 3. Seat Selection

- **Seats Page**: Choose your seat from a visual seat map.
- **Aisle and sections**: Seats are divided with a visible aisle for clarity.

### 4. Booking

- **Booking Form**: Enter details and confirm your booking.
- **User details**: If logged in, your info is pre-filled.
- **Success/Error messages**: Toast notifications for feedback.

### 5. My Bookings

- **Bookings Page**: View all your bookings, with details like date, time, seat, and price.
- **Status**: See if your booking is confirmed.

### 6. Layout & Navigation

- **Header**: Fixed at the top, always visible.
- **Content**: Scrolls below the header.
- **Navigation**: Use the menu or buttons to move between pages.

---

## How the App Works

1. **Start at Login/Register**: Create an account or log in.
2. **Select a Slot**: Pick a date and choose an available slot.
3. **Choose Seats**: Select your preferred seat(s).
4. **Complete Booking**: Confirm your booking and see a success message.
5. **View Bookings**: Go to 'My Bookings' to see all your reservations.
6. **Logout**: Use the header button to log out securely.

---

## Key Screens & Features

- **Login/Register**: Simple forms, clear error messages.
- **Slots**: Date picker, slot cards, status legend.
- **Seats**: Visual seat map, aisle, responsive design.
- **Booking**: User info, slot details, confirmation.
- **My Bookings**: List of bookings, status, details.
- **Header**: Always visible, logout button, user greeting.

---

## How to Run the App

1. **Install dependencies**: Run `npm install` in the project folder.
2. **Start the app**: Run `npm start`.
3. **Open in browser**: Go to [http://localhost:3000](http://localhost:3000).

---

## FAQ

**Q: How do I book a seat?**
A: Log in, select a slot, and confirm booking.

**Q: How do I see my bookings?**
A: Click 'My Bookings' in the menu or header.

**Q: How do I log out?**
A: Click the logout button in the header.

**Q: What do the colors mean?**
A: Green = available, Red = booked, Blue = primary actions.

---

## Need Help?

If you have questions, ask your team or check the documentation above. This app is designed to be easy for everyone!

---

_Last updated: September 2025_
