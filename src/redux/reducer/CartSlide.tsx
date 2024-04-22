import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../Store";
import type { Product } from "../../types/ProductType";

interface Customer {
  id: string;
  products: Product[];
}

interface CartState {
  customers: Customer[];
  status: string;
}

const initialState: CartState = {
  customers: [],
  status: "IDLE",
};

export const fetchProductInCart = createAsyncThunk(
  "cart/fetch",
  async (customerId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/custombers${customerId}/products`
      );
      return response.data;
    } catch (error) {
      console.error("Error when get products in cart");
      throw error;
    }
  }
);

export const addProductsToCart = createAsyncThunk(
  "cart/add",
  async ({ customerId, product }: { customerId: string; product: Product }) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/customers/${customerId}/products`,
        {
          product,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error when adding products into cart");
      throw error;
    }
  }
);

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductInCart.fulfilled, (state, action) => {
        const { customerId, product } = action.payload;
        const customerIndex = state.customers.findIndex(
          (customer) => customer.id === customerId
        );
        if (customerIndex !== -1) {
          state.customers[customerIndex].products.push(product);
          state.status = "SUCCESS";
        }
      })
      .addCase(fetchProductInCart.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchProductInCart.rejected, (state) => {
        state.status = "FAIL";
      });
  },
});

export default CartSlice;
export const selectCartState = (state: RootState) => state.cart;
