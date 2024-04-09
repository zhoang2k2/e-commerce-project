import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../types/ProductType";
import { addProduct, fetchProducts } from "./ProductsSlide";
import type { RootState } from "../Store";

interface AdminState {
  products: Product[];
  addingPopUp: boolean;
  handlePop: string;
}

const initialState: AdminState = {
  products: [],
  addingPopUp: false,
  handlePop: "",
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });
  },
});

export const selectAdminState = (state: RootState) => state.admin;

export default adminSlice.reducer;
