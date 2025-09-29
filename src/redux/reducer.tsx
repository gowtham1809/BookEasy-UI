import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface SlotTypes {
  id: string;
  start_time: string;
  end_time: string;
  seats: string;
  available: boolean;
}

export interface BookingTypes {
  id: string;
  name: string;
  email: string;
  slot_id: string;
  slot?: SlotTypes;
  booking_date: string;
  booked_at: string;
}

export interface UserTypes {
  id: string;
  name: string;
  email: string;
}
export interface InitialStateTypes {
  error: string;
  loading: boolean;
  isAuthenticated: boolean;
  slots: SlotTypes[];
  user: UserTypes | null;
  bookings: BookingTypes[];
}

export const initialState: InitialStateTypes = {
  error: "",
  loading: false,
  isAuthenticated: false,
  slots: [],
  user: null,
  bookings: [],
};

const slice = createSlice({
  name: "states",
  initialState,
  reducers: {
    // --- LOGIN ---
    login(state, _action: PayloadAction<{ email: string; password: string }>) {
      state.loading = true;
      state.error = "";
    },
    loginSuccess(state, action: PayloadAction<UserTypes>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout(state) {
      state.loading = true;
      state.error = "";
    },
    logoutSuccess(state) {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    logoutFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    resetPassword(
      state,
      _action: PayloadAction<{ email: string; password: string }>
    ) {
      state.loading = true;
      state.error = "";
    },
    resetPasswordSuccess(state) {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    resetPasswordFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    fetchCreateUser(state, _action: PayloadAction<any>) {
      state.loading = true;
      state.error = "";
    },
    fetchCreateUserSuccess(state, _action) {
      state.loading = false;
    },
    fetchCreateUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // --- SLOTS ---
    fetchSlots(state, _action: PayloadAction<{ date: string }>) {
      state.loading = true;
      state.error = "";
    },
    fetchSlotsSuccess(state, action: PayloadAction<SlotTypes[]>) {
      state.loading = false;
      state.slots = action.payload;
    },
    fetchSlotsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // --- BOOKINGS ---
    fetchBookings(state) {
      state.loading = true;
      state.error = "";
    },
    fetchBookingsSuccess(state, action: PayloadAction<BookingTypes[]>) {
      state.loading = false;
      state.bookings = action.payload;
    },
    fetchBookingsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCreateBooking(state, _action: PayloadAction<any>) {
      state.loading = true;
      state.error = "";
    },
    fetchCreateBookingSuccess(state, _action: PayloadAction<BookingTypes[]>) {
      state.loading = false;
    },
    fetchCreateBookingFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    //--- BOOKING FORM ----
    fetchTodaysSlots(state) {
      state.loading = true;
      state.error = "";
    },
    fetchTodaysSlotsSuccess(state, action: PayloadAction<SlotTypes[]>) {
      state.loading = false;
      state.slots = action.payload;
    },
    fetchTodaysSlotsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCreateBookingAndUser(state, _action: PayloadAction<any>) {
      state.loading = true;
      state.error = "";
    },
    fetchCreateBookingAndUserSuccess(state) {
      state.loading = false;
    },
    fetchCreateBookingAndUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = slice;
export default reducer;
