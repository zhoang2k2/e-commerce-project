import { configureStore } from "@reduxjs/toolkit";
import ProductsSlide from "./reducer/ProductsSlide";
import TheadSlide from "./reducer/TheadSlide";

const store = configureStore({
  reducer: {
    getProducts: ProductsSlide,
    getTheadItems: TheadSlide,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
