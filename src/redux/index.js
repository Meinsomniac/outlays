import {configureStore} from '@reduxjs/toolkit';
import {api} from './apiInterceptor';
import {authSlice} from './auth/authSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [authSlice.name]: authSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});
