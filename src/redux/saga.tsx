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
    toast.success("Login successful");
  } catch (error: any) {
    const message = error?.response?.data?.message || "Login failed";
    yield put(actions.loginFailure(message));
    toast.error(message);
  }
}

function* handleLogout() {
  try {
    yield call(Api.authLogout);
    yield put(actions.logoutSuccess());
    toast.success("Logout successful");
  } catch (error: any) {
    const message = error?.response?.data?.message || "Logout failed";
    yield put(actions.logoutFailure(message));
    toast.error(message);
  }
}

function* handleResetPassword(
  action: PayloadAction<{ email: string; password: string }>
) {
  try {
    const result: AxiosResponse = yield call(Api.resetPassword, action.payload);
    yield put(actions.logoutSuccess(result.data));
    toast.success(result.data.message);
    window.location.href = "/login";
  } catch (error: any) {
    const message = error?.response?.data?.message || "Logout failed";
    yield put(actions.logoutFailure(message));
    toast.error(message);
  }
}

function* handleCreateUser(action: PayloadAction<any>) {
  try {
    const result: AxiosResponse = yield call(Api.registerUser, action.payload);
    yield put(actions.fetchCreateUserSuccess(result.data));
    toast.success("Registration successful");
    window.location.href = "/login";
  } catch (error: any) {
    const message = error?.response?.data?.message;
    yield put(actions.fetchCreateUserFailure(message || "Registration failed"));
    toast.error(message || "Registration failed");
  }
}

// ---- SLOTS SAGA ----
function* handleFetchSlots(action: PayloadAction<{ date: String }>) {
  try {
    const result: AxiosResponse = yield call(Api.fetchSlots, action.payload);
    yield put(actions.fetchSlotsSuccess(result.data));
  } catch (error: any) {
    const message = error?.response?.data?.message;
    yield put(actions.fetchSlotsFailure(message || "Fetching slots failed"));
    toast.error(message || "Fetching slots failed");
  }
}

// ---- BOOKINGS SAGA ----
function* handleCreateBooking(
  action: PayloadAction<{ data: any; onSuccess?: () => void }>
) {
  try {
    const result: AxiosResponse = yield call(Api.createBooking, action.payload.data);
    yield put(actions.fetchCreateBookingSuccess(result.data));
    toast.success("Booking created successfully");
    if (action.payload.onSuccess) {
      action.payload.onSuccess();
    }
  } catch (error: any) {
    const message = error?.response?.data?.message;
    yield put(
      actions.fetchCreateBookingFailure(message || "Creating booking failed")
    );
    toast.error(message || "Creating booking failed");
  }
}
function* handleFetchBookings(action: PayloadAction<any>) {
  try {
    const result: AxiosResponse = yield call(Api.fetchBookings);
    yield put(actions.fetchBookingsSuccess(result.data));
  } catch (error: any) {
    const message = error?.response?.data?.message;
    yield put(
      actions.fetchBookingsFailure(message || "Fetching bookings failed")
    );
    toast.error(message || "Fetching bookings failed");
  }
}

// ----BOOKING FORM ----
function* handleFetchTodaysSlots() {
  try {
    const result: AxiosResponse = yield call(Api.fetchTodaysSlots);
    yield put(actions.fetchTodaysSlotsSuccess(result.data));
  } catch (error: any) {
    const message = error?.response?.data?.message;
    yield put(
      actions.fetchTodaysSlotsFailure(message || "Failed to fetch slots")
    );
  }
}

function* handleCreateBookingAndUser(action: PayloadAction<any>) {
  try {
    yield call(Api.createBookingAndUser, action.payload);
    yield put(actions.fetchCreateBookingAndUserSuccess());
    window.location.href = "/login";
    toast.success("User created and slot booked !");
  } catch (error: any) {
    const message = error?.response?.data?.message;
    yield put(
      actions.fetchCreateBookingAndUserFailure(message || "Booking failed")
    );
    toast.error(message || "Booking failed");
  }
}
// ---AUTH SAGA ---
function* handleCheckAuth(
  action: PayloadAction<{ email: string; password: string }>
) {
  try {
    const result: AxiosResponse = yield call(Api.authMe);
    yield put(actions.checkAuthSuccess(result.data));
  } catch (error: any) {
    const message = error?.response?.data?.message;
    yield put(actions.checkAuthSuccess(message || "Auth failed"));
    toast.error(message || "Auth failed");
  }
}

// ---- ROOT SAGA ----
export default function* rootSaga() {
  yield takeLatest(actions.checkAuth.type, handleCheckAuth);
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
