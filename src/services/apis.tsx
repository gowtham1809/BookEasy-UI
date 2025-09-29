import axios from "axios";
const baseURL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// Auth
export const authMe = () => api.get("/auth/me");
export const authLogout = () => api.post("/auth/logout");
export const authLogin = (data: { email: String; password: String }) =>
  api.post("/auth/login", data);

// User
export const registerUser = (data: {
  name: String;
  email: String;
  password: String;
}) => api.post("/users/register", data);

export const resetPassword = (data: {
  email: String;
  password: String;
}) => api.post("/users/reset", data);

// Slots
export const fetchSlots = (data: { date: String }) =>
  api.get(`/slots?date=${data.date}`);

// Booking
export const fetchBookings = () => api.get("/bookings/myBookings");
export const createBooking = (data: any) => api.post("/bookings/create", data);

// Booking Form

export const fetchTodaysSlots = () => api.get("/slots/today");
export const createBookingAndUser = (data: any) => api.post("/bookings/createwithuser", data);

