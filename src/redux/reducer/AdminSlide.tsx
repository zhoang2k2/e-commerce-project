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
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });
  },
});



/*
import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../types/ProductType";
import { addProduct, fetchProducts } from "./ProductsSlide";
import type { RootState } from "../Store";

interface AdminState {
  fields: Product;
  products: Product[];
  addingPopUp: boolean;
  handlePop: string;
}

const initialState: AdminState = {
  fields: {
    id: 0,
    name: "",
    price: "",
    quantity: "",
    image: "",
    manufacturer: "",
    category: "",
    status: "",
  },
  products: [],
  addingPopUp: false,
  handlePop: "",
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setFields: (state, action) => {
      state.fields = action.payload;
    },
    setAddingPopUp: (state, action) => {
      state.addingPopUp = action.payload;
    },
    setHandlePop: (state, action) => {
      state.handlePop = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });
  },
});

export const { setFields, setAddingPopUp } = adminSlice.actions;

export const selectAdminState = (state: RootState) => state.admin;

export default adminSlice.reducer;

*/
export const selectAdminState = (state: RootState) => state.admin;

export default adminSlice.reducer;
