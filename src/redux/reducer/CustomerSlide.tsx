import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../Store";

export interface CustomerInfo {
  id: string;
  username: string;
  password: string;
}

interface CustomerState {
  customerInfo: CustomerInfo[];
  status: string;
}

const initialState: CustomerState = {
  customerInfo: [],
  status: "IDLE",
};

export const fetchCustomerData = createAsyncThunk(
  "customer/fetch",
  async () => {
    try {
      const response = await axios.get("http://localhost:3000/customers");
      return response.data;
    } catch (error) {
      console.error("Error when get customer info");
      throw error;
    }
  }
);

export const addCustomerData = createAsyncThunk(
  "customer/add",
  async (newAccount: CustomerInfo) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/customers",
        newAccount
      );
      return response.data;
    } catch (error) {
      console.error("Error when add new customer info");
      throw error;
    }
  }
);

const CustomerSlide = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerData.fulfilled, (state, action) => {
        if (action.payload) {
          state.customerInfo = action.payload;
          state.status = "SUCCESS";
        }
      })
      .addCase(fetchCustomerData.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchCustomerData.rejected, (state) => {
        state.status = "FAIL";
      });
  },
});

export default CustomerSlide;
export const selectCustomerState = (state: RootState) => state.customer;
