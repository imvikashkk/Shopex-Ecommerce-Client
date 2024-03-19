import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";
import productReducer from "../features/product/productSlice";
import userReducer from "../features/user/userSlice";
import alertReducer from "../features/alert/alertSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  alert:alertReducer,
  auth: authReducer,
  cart: cartReducer,
  order: orderReducer,
  product: productReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false, 
    })
  }
});

const persistor = persistStore(store);

export { store, persistor };
