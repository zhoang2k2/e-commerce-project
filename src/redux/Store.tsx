import { configureStore } from "@reduxjs/toolkit";
import ProductsSlide from "./reducer/ProductsSlide";
import TheadSlide from "./reducer/TheadSlide";
import adminSlice from "./reducer/AdminSlide";

const store = configureStore({
  reducer: {
    getProducts: ProductsSlide,
    getTheadItems: TheadSlide,
    admin: adminSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
