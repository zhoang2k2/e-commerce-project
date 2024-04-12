import { configureStore } from "@reduxjs/toolkit";
import ProductsSlide from "./reducer/ProductsSlide";
import adminSlice from "./reducer/AdminSlide";
import { homepageSlice } from "./reducer/HomepageSlide";

const store = configureStore({
  reducer: {
    getProducts: ProductsSlide,
    admin: adminSlice,
    homepage: homepageSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
