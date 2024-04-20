import { configureStore } from "@reduxjs/toolkit";
import ProductsSlide from "./reducer/ProductsSlide";
import { HomepageSlice } from "./reducer/HomepageSlide";
import AccountSlice from "./reducer/AccountsSlide";
import AuthAccountSlice from "./reducer/AuthAccountSlides";
import CartSlice from "./reducer/CartSlide";

const store = configureStore({
  reducer: {
    currentAccount: AuthAccountSlice.reducer,
    accounts: AccountSlice.reducer,
    products: ProductsSlide.reducer,
    homepage: HomepageSlice.reducer,
    cart: CartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
