import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./Slices/userAuthSlice";
import productSlices from "./Slices/productSlices";
import categorySlices from "./Slices/categorySlices";
import cartSlices from "./Slices/cartSlices";
import newsSlice from "../Redux/Slices/newsSlice";

export const store = configureStore({
  reducer: {
    users: userAuthSlice,
    products: productSlices,
    categories: categorySlices,
    cartSlices: cartSlices,
    newsSlice: newsSlice,
  },
});
