import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CustomerState {
  value: Customer[];
}

interface AddFoodToCustomerPayload {
  food: string;
  id: string;
}
interface Customer {
  id: string;
  name: string;
  index?: number;
  tableNumber: number;
  food: string[];
}

const initialState: CustomerState = {
  value: [],
};

export const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.value.push(action.payload);
    },

    removeCustomer: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter(
        (customer) => customer.id !== action.payload
      );
    },
    addFoodToCustomer: (
      state,
      action: PayloadAction<AddFoodToCustomerPayload>
    ) => {
      state.value.forEach((customer) => {
        if (customer.id === action.payload.id) {
          customer.food.push(action.payload.food);
        }
      });
    },
  },
});

export const { addCustomer, removeCustomer, addFoodToCustomer } =
  customersSlice.actions;
export default customersSlice.reducer;
