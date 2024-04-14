import { configureStore } from "@reduxjs/toolkit";
import ProductsSlide from "./reducer/ProductsSlide";
import { HomepageSlice } from "./reducer/HomepageSlide";
import AccountSlice from "./reducer/AccountsSlide";

const store = configureStore({
  reducer: {
    accounts: AccountSlice.reducer,
    products: ProductsSlide.reducer,
    homepage: HomepageSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
