import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

/**
 * Redux Store Configuration
 * Central store managing global state for SuperApp and all Mini Apps
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

/**
 * Type Definitions for Redux
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
