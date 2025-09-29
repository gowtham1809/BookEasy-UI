import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "../features/auths/login";
import Slots from "../features/slots";
import Bookings from "../features/bookings";
import Register from "../features/auths/register";
import Layout from "../layout";
import BookingForm from "../components/booking/bookingForm";
import ResetPassword from "../features/auths/reset";
// import AuthenticateUser from "../auth";

const Router = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="/public-booking" element={<BookingForm />} />

      {/* Protected routes under Layout */}
      {/* <Route path="/" element={<AuthenticateUser />}> */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Slots />} />
        <Route path="/slots" element={<Slots />} />
        <Route path="bookings" element={<Bookings />} />
        {/* </Route> */}
      </Route>
    </Routes>
  );
};

export default Router;
