import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addAddress,
  fetchLoggedInUser,
  updateAddress,
  removeAddress,
  updateUser,
  changePassword,
} from "./userAPI";


export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetchLoggedInUser",
  async () => {
    const response = await fetchLoggedInUser();
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (data) => {
    const response = await updateUser(data);
    return response.data;
  }
);

export const changePasswordAsync = createAsyncThunk(
  "user/changePassword",
  async (data) => {
    const response = await changePassword(data);
    return response.data;
  }
);

export const addAddressAsync = createAsyncThunk(
  "user/addAddressAsync",
  async (address) => {
    const response = await addAddress(address);
    return response.data;
  }
);

export const updateAddressAsync = createAsyncThunk(
  "user/updateAddressAsync",
  async (address, id) => {
    const response = await updateAddress(address, id);
    return response.data;
  }
);

export const removeAddressAsync = createAsyncThunk(
  "user/removeAddressAsync",
  async (addressId) => {
    const response = await removeAddress(addressId);
    return response.data;
  }
);

/* Slice */
const initialState = {
  status: "idle",
  userInfo: null,
  orders:[]
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(changePasswordAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changePasswordAsync.fulfilled, (state) => {
        state.status = "idle";
        window.alert("Password Changed Successfully !")
      })
      .addCase(changePasswordAsync.rejected, (state) => {
        state.status = "idle";
        window.alert("Something wrong !")
      })
      .addCase(addAddressAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAddressAsync.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(updateAddressAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAddressAsync.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(removeAddressAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeAddressAsync.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      });
  },
});

export const selectUserOrders = (state) => state.user.orders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserInfoStatus = (state) => state.user.status;
export const selectPasswordError = (state) => state.user.error;
export const selectPasswordChanged = (state) => state.user.isPasswordChanged;

export default userSlice.reducer;
