import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../types/ProductType";
import axios from "axios";
import type { RootState } from "../Store";

interface ItemQuantity {
  productId: string;
  productQuantity: number;
}

export interface CustomerOrder {
  orderId: string;
  inTotal: string;
  id: string;
  username: string;
  password: string;
  phone: string;
  address: string;
  products: Product[];
  detailQuantities: ItemQuantity[];
}

export interface CustomerOrderState {
  orders: CustomerOrder[];
  status: string;
}

const initialState: CustomerOrderState = {
  orders: [],
  status: "IDLE",
};

export const fetchOrder = createAsyncThunk("order/fetch", async () => {
  try {
    const response = await axios.get("http://localhost:3000/orders");
    return response.data;
  } catch (error) {
    console.error("Error when fetch orders");
    throw error;
  }
});

export const addOrder = createAsyncThunk(
  "order/add",
  async (newOrder: CustomerOrder) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/orders",
        newOrder
      );
      return response.data;
    } catch (error) {
      console.error("Error when add new order");
      throw error;
    }
  }
);

const OrderSlide = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.fulfilled, (state, action) => {
        if (action.payload) {
          state.orders = action.payload;
          state.status = "SUCCESS";
        }
      })
      .addCase(fetchOrder.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.status = "FAIL";
      });
  },
});

export default OrderSlide;
export const selectOrderState = (state: RootState) => state.order;
