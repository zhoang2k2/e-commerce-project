import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product, ProductState } from "../../types/ProductType";
import axios from "axios";

const initialState: ProductState = {
  products: [],
};

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await axios.get("http://localhost:3000/products");
  return response.data as Product[];
});

export const addProduct = createAsyncThunk(
  "products/post",
  async (newProduct: Product) => {
    const response = await axios.post(
      "http://localhost:3000/products",
      newProduct
    );
    return response.data as Product;
  }
);

export const deleteProduct = createAsyncThunk(
  "propducts/delete",
  async (id: number) => {
    await axios.delete(`http://localhost:3000/products/${id}`);
    return id;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });

    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    });
  },
});

export default productSlice.reducer;
