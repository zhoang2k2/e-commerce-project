import { configureStore } from "@reduxjs/toolkit";
import ProductsSlide from "./reducer/ProductsSlide";
import { HomepageSlice } from "./reducer/HomepageSlide";
import AccountSlice from "./reducer/AccountsSlide";
import AuthAccountSlice from "./reducer/AuthAccountSlides";
import CartSlice from "./reducer/CartSlide";
import CustomerSlide from "./reducer/CustomerSlide";
import AuthCustomerSlice from "./reducer/AuthCustomerSlide";

const store = configureStore({
  reducer: {
    accounts: AccountSlice.reducer,
    currentAccount: AuthAccountSlice.reducer,
    products: ProductsSlide.reducer,
    homepage: HomepageSlice.reducer,
    cart: CartSlice.reducer,
    customer: CustomerSlide.reducer,
    currentCustomer: AuthCustomerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
