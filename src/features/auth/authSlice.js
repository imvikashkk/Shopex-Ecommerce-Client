import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  loginUser,
  resetPassword,
  resetPasswordRequest,
  signOut,
} from "./authAPI";

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await createUser(userData);
      return response
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      return response
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resetPasswordRequestAsync = createAsyncThunk(
  "user/resetPasswordRequest",
  async (email, { rejectWithValue }) => {
    try {
      const response = await resetPasswordRequest(email);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resetPasswordAsync = createAsyncThunk(
  "user/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await resetPassword(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signOutAsync = createAsyncThunk("user/signOut", async () => {
  const response = await signOut();
  // The value we return becomes the `fulfilled` action payload
  return response;
});

/* Slice */
const initialState = {
  loggedInUser:null,
  status: "idle",
  error: null,
  userChecked: false,
  mailSent: false,
  passwordReset: false,
};

const authSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    resetAuth:(state)=>{
      state.status = "idle";
      state.loggedInUser = null;
      state.error = null;
      state.mailSent = false;
      state.passwordReset = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
        console.log(state.error);
      })
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.error = null;
        state.mailSent = false;
        state.status = 'loading';
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.mailSent = true;
      })
      .addCase(resetPasswordRequestAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(resetPasswordAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.passwordReset = true;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload
      })
  },
});

export const {resetAuth} = authSlice.actions;
export const selectError = (state) => state.auth.error;
export const selectLoggedInUser = (state) => state.auth.loggedInUser
export const selectMailSent = (state) => state.auth.mailSent;
export const selectPasswordReset = (state) => state.auth.passwordReset;
export const selectStatus = (state) => state.auth.status;

export default authSlice.reducer;