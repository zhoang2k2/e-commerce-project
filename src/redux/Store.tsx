import { configureStore } from "@reduxjs/toolkit";
import ProductsSlide from "./reducer/ProductsSlide";
import { HomepageSlice } from "./reducer/HomepageSlide";

const store = configureStore({
  reducer: {
    products: ProductsSlide.reducer,
    homepage: HomepageSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
