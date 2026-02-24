import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, UserProfile } from '../types/auth.types';

/**
 * Initial Authentication State
 */
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

/**
 * Authentication Slice
 * Manages global authentication state shared across all Mini Apps
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Login action - Sets authenticated user profile
     */
    login: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    
    /**
     * Logout action - Clears user profile and authentication state
     */
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    }
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
