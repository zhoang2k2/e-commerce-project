import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../Store";
import type { Product } from "../../types/ProductType";

interface CartState {
  cart: Product[];
  status: string;
}

const initialState: CartState = {
  cart: [],
  status: "IDLE",
};

export const fetchProductsFromCart = createAsyncThunk(
  "cart/fetch",
  async () => {
    try {
      const response = await axios.get("http://localhost:3000/add-to-cart");
      return response.data;
    } catch (error) {
      console.error("Error when get products in cart");
      throw error;
    }
  }
);

export const addProductsToCart = createAsyncThunk(
  "cart/add",
  async (product: Product) => {
    try {
      const response = await axios.post("http://localhost:3000/add-to-cart", {
        product,
      });
      return response.data;
    } catch (error) {
      console.error("Error when adding products into cart");
      throw error;
    }
  }
);

export const deleleProductFromCart = createAsyncThunk(
  "cart/delete",
  async (productID: string) => {
    try {
      await axios.delete(`http://localhost:3000/add-to-cart/${productID}`);
      return productID;
    } catch (error) {
      console.error("Error when delete product from cart");
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
      .addCase(fetchProductsFromCart.fulfilled, (state, action) => {
        if (action.payload) {
          state.cart = action.payload;
          state.status = "SUCCESS";
        }
      })
      .addCase(fetchProductsFromCart.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchProductsFromCart.rejected, (state) => {
        state.status = "FAIL";
      });
  },
});

export default CartSlice;
export const selectCartState = (state: RootState) => state.cart;
