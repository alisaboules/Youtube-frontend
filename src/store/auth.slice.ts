import type { TUser } from "@/types/user.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TAuthState {
  user: TUser | null;
  isLoggedIn: boolean | null;
  accessToken: string | null;
}

const initialState: TAuthState = {
  user: null,
  isLoggedIn: null,
  accessToken: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData(
      state, 
      action: PayloadAction<{
        user: TUser;
        accessToken: string
      }>) {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.accessToken = action.payload.accessToken;
      },
    clearAuthData(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.accessToken = null
  }
}})

export const { setAuthData, clearAuthData} = authSlice.actions;