import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./reducer";

const selectMainDomain = (state: any) => state.mainState || initialState;

export const selectIsAuthenticated = createSelector(
  [selectMainDomain],
  (mainState) => mainState.isAuthenticated
);

export const selectAuthLoading = createSelector(
  [selectMainDomain],
  (mainState) => mainState.loading
);

export const selectAuthError = createSelector(
  [selectMainDomain],
  (mainState) => mainState.error
);

export const selectAuthUser = createSelector(
  [selectMainDomain],
  (mainState) => mainState.user
);

export const selectSlots = createSelector(
  [selectMainDomain],
  (mainState) => mainState.slots
);

export const selectBookings = createSelector(
  [selectMainDomain],
  (mainState) => mainState.bookings
);

export const selectLoading = createSelector(
  [selectMainDomain],
  (mainState) => mainState.loading
);
export const selectUser = createSelector(
  [selectMainDomain],
  (mainState) => mainState.user
);
