import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteItemFromCart,
  fetchItemsByUserId,
  resetCart,
  updateCart,
  fetchItemsDetails,
} from "./cartAPI";

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (itemId) => {
    const response = await addToCart(itemId);
    return response.data;
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchItemsByUserId",
  async () => {
    const response = await fetchItemsByUserId();
    return response.data;
  }
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);

export const deleteItemFromCartAsync = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (itemId) => {
    const response = await deleteItemFromCart(itemId);
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk("cart/resetCart", async () => {
  const response = await resetCart();
  return response.data;
});

export const fetchItemDetailsAsync = createAsyncThunk(
  "cart/fetchItemDetails",
  async () => {
    const response = await fetchItemsDetails();
    return response.data;
  }
);

/* Slice */
const initialState = {
  status: "idle",
  cartItems:[],
  items: [],
  cartLoaded: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(fetchItemsByUserIdAsync.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(fetchItemDetailsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemDetailsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems = action.payload;
        state.cartLoaded = true;
      })
      .addCase(fetchItemDetailsAsync.rejected, (state) => {
        state.status = "idle";
        state.cartLoaded = true;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        state.cartItems[index] = action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        const index = state.cartItems.findIndex(
          (item) => item.id === action.payload.id
          );
          state.items.splice(index, 1)
          state.cartItems.splice(index, 1);
          state.status = "idle";
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state) => {
        state.status = "idle";
        state.items = [];
        state.cartItems = [];
      });
  },
});

export const selectItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartLoaded = (state) => state.cart.cartLoaded;
export const selectCartItem = (state) => state.cart.cartItems

export default cartSlice.reducer;
