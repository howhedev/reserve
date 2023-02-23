import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./../features/customerSlice";
import reservationsReducer from "./../features/reservationSlice";

export const store = configureStore({
  reducer: {
    reservations: reservationsReducer,
    customers: customerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
