import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";
import productReducer from "../features/product/productSlice";
import userReducer from "../features/user/userSlice";
import alertReducer from "../features/alert/alertSlice";

const rootReducer = {
  alert:alertReducer,
  auth: authReducer,
  cart: cartReducer,
  order: orderReducer,
  product: productReducer,
  user: userReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false, 
    })
  }
});


