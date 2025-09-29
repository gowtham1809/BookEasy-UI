import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import * as Api from "../services/apis"; // <-- your API module
import { actions } from "./reducer";
import { toast } from "react-toastify";

// ---- AUTH SAGA ----
function* handleLogin(
  action: PayloadAction<{ email: string; password: string }>
) {
  try {
    const result: AxiosResponse = yield call(Api.authLogin, action.payload);
    yield put(actions.loginSuccess(result.data));
    sessionStorage.setItem("user", JSON.stringify(result.data));
    toast.success("Login successful");
    window.location.href = "/slots";
  } catch (error: any) {
    yield put(actions.loginFailure(error.message || "Login failed"));
    toast.error(error.message || "Login failed");
  }
}

function* handleLogout() {
  try {
    yield call(Api.authLogout);
    yield put(actions.logoutSuccess());
    sessionStorage.clear();
    toast.success("Logout successful");
    window.location.href = "/login";
  } catch (error: any) {
    yield put(actions.logoutFailure(error.message || "Logout failed"));
    toast.error(error.message || "Logout failed");
  }
}

function* handleResetPassword(
  action: PayloadAction<{ email: string; password: string }>
) {
  try {
    const result: AxiosResponse = yield call(Api.resetPassword, action.payload);
    yield put(actions.logoutSuccess(result.data));
    toast.success(result.data.message);
    sessionStorage.clear();
    window.location.href = "/login";
  } catch (error: any) {
    yield put(actions.logoutFailure(error.message || "Logout failed"));
    toast.error(error.message || "Logout failed");
  }
}

function* handleCreateUser(action: PayloadAction<any>) {
  try {
    const result: AxiosResponse = yield call(Api.registerUser, action.payload);
    yield put(actions.fetchCreateUserSuccess(result.data));
    toast.success("Registration successful");
    window.location.href = "/login";
  } catch (error: any) {
    yield put(
      actions.fetchCreateUserFailure(error.message || "Registration failed")
    );
    toast.error(error.message || "Registration failed");
  }
}

// ---- SLOTS SAGA ----
function* handleFetchSlots(action: PayloadAction<{ date: String }>) {
  try {
    const result: AxiosResponse = yield call(Api.fetchSlots, action.payload);
    yield put(actions.fetchSlotsSuccess(result.data));
  } catch (error: any) {
    yield put(
      actions.fetchSlotsFailure(error.message || "Fetching slots failed")
    );
    toast.error(error.message || "Fetching slots failed");
  }
}

// ---- BOOKINGS SAGA ----
function* handleCreateBooking(action: PayloadAction<any>) {
  try {
    const result: AxiosResponse = yield call(Api.createBooking, action.payload);
    yield put(actions.fetchCreateBookingSuccess(result.data));
    toast.success("Booking created successfully");
    window.location.href = "/bookings";
  } catch (error: any) {
    yield put(
      actions.fetchCreateBookingFailure(
        error.message || "Creating booking failed"
      )
    );
    toast.error(error.message || "Creating booking failed");
  }
}
function* handleFetchBookings(action: PayloadAction<any>) {
  try {
    const result: AxiosResponse = yield call(Api.fetchBookings);
    yield put(actions.fetchBookingsSuccess(result.data));
  } catch (error: any) {
    yield put(
      actions.fetchBookingsFailure(error.message || "Fetching bookings failed")
    );
    toast.error(error.message || "Fetching bookings failed");
  }
}

// ----BOOKING FORM ----
function* handleFetchTodaysSlots() {
  try {
    const result: AxiosResponse = yield call(Api.fetchTodaysSlots);
    yield put(actions.fetchTodaysSlotsSuccess(result.data));
  } catch (error: any) {
    yield put(
      actions.fetchTodaysSlotsFailure(error.message || "Failed to fetch slots")
    );
  }
}

function* handleCreateBookingAndUser(action: any) {
  try {
    yield call(Api.createBookingAndUser, action.payload);
    yield put(actions.fetchCreateBookingAndUserSuccess());
    window.location.href = "/login";
    toast.success("User created and slot booked !");
  } catch (error: any) {
    yield put(
      actions.fetchCreateBookingAndUserFailure(
        error.message || "Booking failed"
      )
    );
  }
}

// ---- ROOT SAGA ----
export default function* rootSaga() {
  yield takeLatest(actions.login.type, handleLogin);
  yield takeLatest(actions.logout.type, handleLogout);
  yield takeLatest(actions.resetPassword.type, handleResetPassword);
  yield takeLatest(actions.fetchCreateUser.type, handleCreateUser);
  yield takeLatest(actions.fetchCreateBooking.type, handleCreateBooking);
  yield takeLatest(actions.fetchSlots.type, handleFetchSlots);
  yield takeLatest(actions.fetchBookings.type, handleFetchBookings);
  yield takeLatest(actions.fetchTodaysSlots.type, handleFetchTodaysSlots);
  yield takeLatest(
    actions.fetchCreateBookingAndUser.type,
    handleCreateBookingAndUser
  );
}
